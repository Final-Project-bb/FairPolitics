"""Dynamic proportional ranking rules."""

from __future__ import print_function
import sys
import functools
from itertools import combinations
# try:
#     from gmpy2 import mpq as Fraction
# except ImportError:
#     print("Warning: module gmpy2 not found, "
#           + "resorting to Python's fractions.Fraction")
    # from fractions import Fraction
from fractions import Fraction    
from abcvoting import abcrules_gurobi
from abcvoting.misc import sort_committees
from abcvoting.misc import hamming
from abcvoting.misc import enough_approved_candidates
from abcvoting.misc import str_committees_header
from abcvoting.misc import str_candset, str_candsets
from abcvoting.misc import header
from abcvoting import scores

########################################################################




class DPRRule:
    """Class for DPR rules containing basic information and function call"""

    def __init__(self, rule_id, shortname, longname, fct,
                 algorithms=("standard"), resolute=(True, False)):
        self.rule_id = rule_id
        self.shortname = shortname
        self.longname = longname
        self.fct = fct
        self.algorithms = algorithms
        # algorithms should be sorted by speed (fastest first)
        self.resolute = resolute

        assert len(resolute) > 0
        assert len(algorithms) > 0

    def compute(self, profile, tau, **kwargs):
        return self.fct(profile, tau, **kwargs)

    # def fastest_algo(self):
    #     for algo in self.algorithms:
    #         if algo == "gurobi" and not abcrules_gurobi.available:
    #             continue
    #         return algo


########################################################################



def compute_lazy_seqpav(profile, tau, resolute=True, verbose=0):
    score_fct = scores.get_scorefct('pav', len(profile))
    
    # optional output
    if verbose:
        print(header(rules["lseqpav"].longname))
    # end of optional output

    candidate_scores = []
    candidate_scores = scores.marginal_thiele_scores_add(
        score_fct, profile, tau)
    
    # optional output
    if verbose:
        print("Using marginal contributions of")
        for cand in range(profile.num_cand):
            if candidate_scores[cand] >= 0:
                print("Candidate " + str(cand) + ": " + str(candidate_scores[cand]))
    # end of optional output
    
    # in lazy rules we can just ignore canidates from tau and remove them later
    ranking = sorted(range(len(candidate_scores)),
        key=lambda k: candidate_scores[k],
        reverse=True)
    ranking =  [cand for cand in ranking if not cand in tau]

    # optional output
    if verbose:
        print("The ranking, using tau=" + str(tau) + " is ")
        print(ranking)
    # end of optional output

    return ranking


def compute_dynamic_seqpav(profile, tau, resolute=True, verbose=0):
    scorefct_str = 'pav'
    score_fct = scores.get_scorefct('pav', len(profile))
    
    # optional output
    if verbose:
        print(header(rules["dseqpav"].longname))
    # end of optional output

    ranking = []

    # optional output
    if verbose >= 2:
        output = "starting with the empty committee and tau = "
        output += str(tau)
        output += " (score = "
        output += str(scores.thiele_score(
            scorefct_str, profile, tau + ranking)) + ")"
        print(output + "\n")
    # end of optional output

    # build the ranking starting with the empty set
    for _ in range(profile.num_cand):
        d = tau + ranking
        additional_score_cand = scores.marginal_thiele_scores_add(
            score_fct, profile, d)
        # print(additional_score_cand)
        next_cand = additional_score_cand.index(max(additional_score_cand))
        # check whether all candidates outide of tau have been ranked
        if max(additional_score_cand) < 0:
            break
        ranking.append(next_cand)
        # optional output
        if verbose >= 2:
            output = "adding candidate number "
            output += str(len(ranking)) + ": "
            output += profile.names[next_cand] + "\n"
            output += " score increases by "
            output += str(max(additional_score_cand))
            output += " to a total of "
            output += str(scores.thiele_score(
                scorefct_str, profile, tau + ranking))
            tied_cands = [c for c in range(len(additional_score_cand))
                          if (c > next_cand and
                              (additional_score_cand[c]
                               == max(additional_score_cand)))]
            if len(tied_cands) > 0:
                output += " tie broken in favor of " + str(next_cand)
                output += " candidates " + str_candset(tied_cands)
                output += " would increase the score by the same amount ("
                output += str(max(additional_score_cand)) + ")"
            print(output + "\n")
        # end of optional output

    # optional output
    if verbose:
        print("The ranking, using tau=" + str(tau) + " is ")
        print(ranking)
    # end of optional output
    return ranking



def __phragmen_loads_from_sequence(profile, sequence, verbose=0):
    """Algorithm for computing Phragmen-loads w.r.t. to a sequence of candidates"""

    load = {v: 0 for v, _ in enumerate(profile)}
    # print("----------------load: " + str(load))

    # compute loads w.r.t. sequence
    for cand in sequence:
        # sort supporters of cand by load
        supp_cand = [v for v, pref in enumerate(profile) if cand in pref]
        supp_cand = sorted(supp_cand, key=lambda k: load[k])

        # optional output
        if verbose >= 2:
            print("Adding load for candidate " + str(cand))
            print("N_c of candidate = " + str(supp_cand))
            print("Current loads are " + str(load))
        # end of optional output

        # find supporter-group with minimal load distribution
        cutoff_index = 0
        new_load = 0
        for index in range(len(supp_cand)):
            # compute difference of max induced load and current load of the next candidate
            # if we take the first index-many candidates
            loads_of_first_supps = [val for ind, val in enumerate(load.values()) if ind in supp_cand[:index+1]]

            # optional output
            if verbose >= 2:
                print("loads of the first " + str(index) + " voters in N_c are")
                print(loads_of_first_supps)
            # end of optional output

            load_sum = sum(loads_of_first_supps)
            # load_sum = sum(load[supp_cand[:index]])
            new_load = Fraction(1 + load_sum, index +1)
            if index == len(supp_cand) - 1:
                # if we make it to the last supporter, she will be taken
                cutoff_index = index + 1

                # optional output
                if verbose >= 2:
                    message = "Load difference was positive throughout N_c"
                    message += " thus all voters in N_c share load."
                    print(message)
                # end of opitonal output
                
                break
            load_diff = new_load - load[supp_cand[index + 1]]
            if load_diff <= 0:
                cutoff_index = index + 1

                # optional output
                if verbose >= 2:
                    print("Load difference for the next candidate is <= 0")
                    print("cutoff index is " + str(cutoff_index))
                # end of optional output

                break
        supporters = supp_cand[:cutoff_index]

        # optional output
        if verbose >= 2:
            print("Supporters carrying the load are " + str(supporters))
            print("Their new load is " + str(new_load))
        # end of optional output

        # assign new loads
        for v in supporters:
            load[v] = new_load
    return load



def compute_lazy_seqphrag(profile, tau, resolute=True, verbose=0):
    """Lazy sequential Phragmen (lazy-seq-Phragmen)"""

    # optional output
    if verbose:
        print(header(rules["lseqphrag"].longname))
    # end of optional output

    approvers_weight = {}
    for c in range(profile.num_cand):
        approvers_weight[c] = sum(pref.weight for pref in profile if c in pref)
    no_supporters = [c for c, weight in approvers_weight.items() if weight == 0]
    if len(no_supporters) > 0:
        raise NotImplementedError("Cannot cope with candidates without supporters.")

    ranking =[]
    cands = [c for c in range(profile.num_cand) if c not in tau]
    induced_loads = {}
    sorted_induced_loads = {}

    # compute induced loads for each candidate
    for cand in cands:
        curr_tau = tau + [cand]
        induced_loads[cand] = __phragmen_loads_from_sequence(
                profile, curr_tau, verbose)
        sorted_induced_loads[cand] = sorted(induced_loads[cand].values(), reverse=True)

    # optional output
    if verbose:
        print("Induced loads by adding candidate x to tau are")
        print(induced_loads)
    # end of optional output

    # compare induced loads lexicographically to obtain ranking
    ranking = [k for k, v in sorted(sorted_induced_loads.items(), key= lambda item: item[1])]

    # optional output
    if verbose:
        print("The ranking, using tau=" + str(tau) + " is ")
        print(ranking)
    # end of optional output

    return ranking



def compute_dynamic_seqphrag(profile, tau, resolute=True, verbose=0):
    """Dynamic sequential Phragmen (dynamic-seq-Phragmen)"""

    # optional output
    if verbose:
        print(header(rules["dseqphrag"].longname))
    # end of optional output

    ranking =[]

    approvers_weight = {}
    for c in range(profile.num_cand):
        approvers_weight[c] = sum(pref.weight for pref in profile if c in pref)
    no_supporters = [c for c, weight in approvers_weight.items() if weight == 0]
    if len(no_supporters) > 0:
        raise NotImplementedError("Cannot cope with candidates without supporters.")

    for pos in range(profile.num_cand - len(tau)):
        already_ranked = tau + ranking
        # exclude = already_ranked + no_supporters
        cands = [c for c in range(profile.num_cand) if c not in already_ranked]
        induced_loads = {}
        curr_induced_loads = []
        min_induced_loads = [float("inf")]
        next_cand = -1

        # compute induced loads for each candidate and find lex. minimum
        for cand in cands:
            curr_tau = tau + ranking + [cand]
            induced_loads[cand] = __phragmen_loads_from_sequence(
                    profile, curr_tau, verbose)
            curr_induced_loads = sorted(induced_loads[cand].values(), reverse=True)
            if curr_induced_loads < min_induced_loads:
                min_induced_loads = curr_induced_loads
                next_cand = cand

        # optional output
        if verbose:
            print("Filling position " + str(pos + 1) + " of the ranking.")
            print("Induced max load by adding candidate x to the ranking are")
            for cand, load in induced_loads.items():
                print("candidate " + str(cand) + ": " + str(max(load.values())))
            print("Thus, candidate " + str(next_cand) + " is chosen.\n")
        # end of optional output

        # append lex. argmin to the ranking
        ranking.append(next_cand)

    # optional output
    if verbose:
        print("The ranking, using tau=" + str(tau) + " is ")
        print(ranking)
    # end of optional output

    return ranking


def compute_av(profile, tau, resolute=True, verbose=0):
    """Dynamic sequential Phragmen (dynamic-seq-Phragmen)"""

    # optional output
    if verbose:
        print(header(rules["av"].longname))
    # end of optional output

    ranking =[]
    appr_scores = [0] * profile.num_cand
    for pref in profile:
        for cand in pref:
            # (Classic) Approval Voting
            appr_scores[cand] += pref.weight
    
    # sort candidates by approval ranking and output ranking\tau
    ranking = sorted(range(len(appr_scores)),
        key=lambda k: appr_scores[k],
        reverse=True)
    ranking =  [cand for cand in ranking if not cand in tau]

    # optional output
    if verbose:
        print("The ranking, using tau=" + str(tau) + " is ")
        print(ranking)
    # end of optional output

    return ranking


__RULESINFO = [
    ("lseqpav", "lazy seq-PAV", "lazy sequential PAV", compute_lazy_seqpav,
     ("standard",), (True, False)),
    ("dseqpav", "dynamic seq-PAV", "dynamic sequential PAV", compute_dynamic_seqpav,
     ("standard",), (True, False)),
    ("lseqphrag", "lazy seq-Phragmen", "lazy sequential Phragmen", compute_lazy_seqphrag,
     ("standard",), (True, False)),
    ("dseqphrag", "dynamic seq-Phragmen", "dynamic sequential Phragmen", compute_dynamic_seqphrag,
     ("standard",), (True, False)),
    ("av", "AV", "approval voting", compute_av,
     ("standard",), (True, False))
]
rules = {}
for ruleinfo in __RULESINFO:
    rules[ruleinfo[0]] = DPRRule(*ruleinfo)