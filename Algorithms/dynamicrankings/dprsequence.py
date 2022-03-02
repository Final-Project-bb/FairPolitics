"""
Sequence of consecutive DPR elections with implementations.
"""

from dynamicrankings import dprrules

import random
import math

# TODO:
#       - improve verbose output

class DPRSequence(object):
    """
    Sequence of consecutive DPR elections with implementations.
    """
    def __init__(self, profile, rule_name, info=None):
        self.profile = profile
        self.rule = dprrules.rules[rule_name]
        self.outcomes = None
        self.info = info

    def set_profile(self, profile):
        self.profile = profile
    
    def set_rule(self, rule_name):
        self.rule = rule_name

    def set_outcomes(self, outcomes):
        """ Behavior is undefined if outcomes does not match profile! """
        # TODO: Maybe add checks here?
        self.outcomes = outcomes

    def set_info(self, info):
        self.info = info

    def run_random(self, windowheight, timehorizon, prob_type='unif', verbose=0, resolute=True):
        """
        Let election run for timehorizon many steps, where candidates get implemented
        according to prob_type among the first windowheight many canidates in each round.
        This depends on the voting rule used!
        """
        if timehorizon > self.profile.num_cand:
            message = "Timehorizon is set too high for profile of "
            message += str(self.profile.num_cand) + " candidates."
            raise ValueError(message)
        if prob_type not in ['unif', 'decr', 'gctr']:
            message = "Probability type "
            message += str(prob_type) + " not supported."
            raise ValueError(message)
        outcomes = []
        curr_tau = []
        curr_ranking = []

        # optional output
        if verbose:
            print("Computing " + str(timehorizon) + " iterations")
            print("of DPR-elections with rule " + self.rule.longname)
            if prob_type == 'unif':
                print("with uniformly at random implemented candidates.")
            if prob_type == 'decr':
                print("with randomly implemented candidates (using harmonically decreasing probs).")
            if prob_type == 'gctr':
                print("with randomly implemented candidates (using Googles ctr).")
        # end of optional output

        for _ in range(timehorizon):
            curr_ranking = self.rule.compute(
                self.profile, curr_tau, verbose=verbose, resolute=resolute)
            outcomes += [(curr_tau, curr_ranking)]
            if prob_type == 'unif':
                next_impl = self.__random_uniform_implementation(curr_ranking, windowheight)
            if prob_type == 'decr':
                next_impl = self.__random_decreasing_implementation(curr_ranking, windowheight)
            if prob_type == 'gctr':
                next_impl = self.__random_ctr_implementation(curr_ranking, windowheight)

            # optional output
            if verbose:
                print("\nCurrent dynamic ranking consits of")
                print("tau: " + str(curr_tau))
                print("r: " + str(curr_ranking))
                print("The next implemented candidate is " + str(next_impl))
            # end of optional output

            curr_tau = curr_tau + [next_impl]
        self.outcomes = outcomes
        return outcomes


    def get_random_ranks(self, windowheight, timehorizon, prob_type='unif', verbose=0, resolute=True):
        """
        Output timehorizon-1 many ranks, where ranks get chosen according to prob_type 
        among the first windowheight many ranks. These ranks can then be used for run_by_rank.
        This is independent of the voting rule used.
        """
        if timehorizon > self.profile.num_cand:
            message = "Timehorizon is set too high for profile of "
            message += str(self.profile.num_cand) + " candidates."
            raise ValueError(message)
        if prob_type not in ['unif', 'decr', 'gctr']:
            message = "Probability type "
            message += str(prob_type) + " not supported."
            raise ValueError(message)
        ranks = []
        # use dummy ranking to get ranks
        curr_ranking = range(self.profile.num_cand)

        # optional output
        if verbose:
            print("Computing " + str(timehorizon) + " ranks")
            print(" for DPR-elections ")
            if prob_type == 'unif':
                print("with uniformly at random chosen ranks.")
            if prob_type == 'decr':
                print("with randomly chosen ranks (using harmonically decreasing probs).")
            if prob_type == 'gctr':
                print("with randomly chosen ranks (using Googles ctr).")
        # end of optional output

        for _ in range(timehorizon-1):
            if prob_type == 'unif':
                next_impl = self.__random_uniform_implementation(curr_ranking, windowheight)
            if prob_type == 'decr':
                next_impl = self.__random_decreasing_implementation(curr_ranking, windowheight)
            if prob_type == 'gctr':
                next_impl = self.__random_ctr_implementation(curr_ranking, windowheight)
            ranks.append(next_impl)
            curr_ranking = curr_ranking[:-1]
        return ranks


    def __random_uniform_implementation(self, curr_ranking, windowheight):
        min_range = min(len(curr_ranking), windowheight)
        ind = random.randrange(min_range)
        return curr_ranking[ind]


    def __random_decreasing_implementation(self, curr_ranking, windowheight):
        min_range = min(len(curr_ranking), windowheight)
        # use weights [1, 1/2, 1/3, ... , 1/min_range]
        weights_vector = [float(1/(i+1)) for i in range(min_range)]
        ind = random.choices(range(min_range), weights_vector)[0]
        return curr_ranking[ind]


    def __random_ctr_implementation(self, curr_ranking, windowheight):
        min_range = min(len(curr_ranking), windowheight)
        # use weights related to Googles ctr
        # source: http://info.chitika.com/uploads/4/9/2/1/49215843/chitikainsights-valueofgoogleresultspositioning.pdf
        ctr = [32.5, 17.6, 11.4, 8.1, 6.1, 4.4, 3.5, 3.1, 2.6, 2.4, 1.0, 0.8, 0.7, 0.6, 0.4]
        if min_range <= 15:
            weights_vector = ctr[:min_range]
        else:
            zeros = [0] * (min_range - 15)
            weights_vector = ctr + zeros
        ind = random.choices(range(min_range), weights_vector)[0]
        return curr_ranking[ind]


    def run_by_rank(self, rank_sequence, verbose=0, resolute=True):
        adapted_max_value = 0
        for ind, value in enumerate(rank_sequence):
            if ind + value > adapted_max_value:
                adapted_max_value = ind + value
        if adapted_max_value > self.profile.num_cand:
            message = "Rank sequence too long or ranks too high for profile of "
            message += str(self.profile.num_cand) + " candidates."
            raise ValueError(message)
        outcomes = []
        curr_tau = []
        curr_ranking = []

        # optional output
        if verbose:
            print("Computing " + str(len(rank_sequence)) + " iterations")
            print("of DPR-elections with rule " + self.rule.longname)
            print("given rank sequence of candidates to be implemented.")
        # end of optional output

        # Perform computation of rankings w.r.t. rank_sequence.
        # Add a dummy s.t. all ranks get used.
        for rank in rank_sequence + [-1]:
            curr_ranking = self.rule.compute(
                self.profile, curr_tau, verbose=verbose, resolute=resolute)
            outcomes += [(curr_tau, curr_ranking)]
            if rank >= 0:
                next_impl = curr_ranking[rank]
            
            # optional output
            if verbose:
                print("\nCurrent dynamic ranking consits of")
                print("tau: " + str(curr_tau))
                print("r: " + str(curr_ranking))
                if rank >= 0:
                    print("The next implemented candidate is " + str(next_impl)
                        + " with rank " + str(rank))
            # end of optional output

            curr_tau = curr_tau + [next_impl]
        self.outcomes = outcomes
        return outcomes


    def run_by_name(self, name_sequence, verbose=0, resolute=True):
        contains_duplicates = any([name_sequence.count(name) > 1 for name in name_sequence])
        if contains_duplicates:
            message = "Given name sequence contains duplicates."
            raise ValueError(message)
        outcomes = []
        curr_tau = []
        curr_ranking = []

        # optional output
        if verbose:
            print("Computing " + str(len(name_sequence) + 1) + " iterations")
            print("of DPR-elections with rule " + self.rule.longname)
            print("given name sequence of candidates to be implemented.")
        # end of optional output

        name_sequence += [-1] # add a dummy s.t. all names get used
        for name in name_sequence:
            curr_ranking = self.rule.compute(
                self.profile, curr_tau, verbose=verbose, resolute=resolute)
            outcomes += [(curr_tau, curr_ranking)]
            
            # optional output
            if verbose:
                print("\nCurrent dynamic ranking consits of")
                print("tau: " + str(curr_tau))
                print("r: " + str(curr_ranking))
                if name >= 0:
                    print("The next implemented candidate is " + str(name))
            # end of optional output

            curr_tau = curr_tau + [name]
        self.outcomes = outcomes
        return outcomes


    def run_adversarial(self, timehorizon, forbidden_cands, windowheight=None, verbose=0, resolute=True):
        """
        Let election run for timehorizon many iterations. In each step implement the highest 
        ranked candidate among the first windowheight many that is not in forbidden_cands. 
        If there are no more such candidates, implement the lowest ranked forbidden candidate.
        """
        if type(forbidden_cands) != list:
            message = "Given forbidden_cands has to be list."
            raise ValueError(message)
        if not windowheight:
            windowheight = self.profile.num_cand
        outcomes = []
        curr_tau = []
        curr_ranking = []

        # optional output
        if verbose:
            print("Computing " + str(timehorizon) + " iterations")
            print("of DPR-elections with rule " + self.rule.longname)
            print("with adversarila decision maker.")
        # end of optional output

        for _ in range(timehorizon):
            curr_ranking = self.rule.compute(
                self.profile, curr_tau, verbose=verbose, resolute=resolute)
            outcomes.append((curr_tau, curr_ranking))
            highest_cands = curr_ranking[:windowheight]
            allowed_cands = [x for x in highest_cands if x not in forbidden_cands]
            if len(allowed_cands) > 0:
                next_impl = allowed_cands[0]
            else:
                next_impl = highest_cands[-1]

            # optional output
            if verbose:
                print("\nCurrent dynamic ranking consits of")
                print("tau: " + str(curr_tau))
                print("r: " + str(curr_ranking))
                print("The next implemented candidate is " + str(next_impl))
            # end of optional output

            curr_tau = curr_tau + [next_impl]
        self.outcomes = outcomes
        return outcomes



    def get_avg_sat(self, voters, windowheight, rounds=None):
        """ Get average satisfaction of a group of voters."""

        if self.outcomes == None:
            message = "No election outcome computed yet."
            raise ValueError(message)
        if rounds == None:
            rounds = range(len(self.outcomes))
        if type(rounds) == int:
            rounds = [rounds]

        avg_sat = {}
        for rnd in rounds:
            ranking_window = self.outcomes[rnd][1][:windowheight]
            avg_sat[rnd] = self.__avg_sat(voters, ranking_window)
        return avg_sat


    def get_avg_sat_tau(self, voters, rounds=None):
        """ Get average satisfaction of a group of voters with top-part."""

        if self.outcomes == None:
            message = "No election outcome computed yet."
            raise ValueError(message)
        if rounds == None:
            rounds = range(len(self.outcomes))
        if type(rounds) == int:
            rounds = [rounds]

        avg_sat = {}
        for rnd in rounds:
            cand_set = self.outcomes[rnd][0]
            avg_sat[rnd] = self.__avg_sat(voters, cand_set)
        return avg_sat


    def __avg_sat(self, voters, cand_set):
        """ Compute average satisfaction of voters with cand_set."""
        num_voters = len(voters)
        sat = 0
        for i in voters:
            appr_set = self.profile[i].approved
            sat = sat + len(appr_set.intersection(cand_set))
        return sat/num_voters


    def get_dry_spells(self, voters, rounds=None):
        """ Get list of rounds that are dry spells of the voter group."""

        if self.outcomes == None:
            message = "No election outcome computed yet."
            raise ValueError(message)
        if rounds == None:
            rounds = range(len(self.outcomes))
        if type(rounds) == int:
            rounds = [rounds]

        # build approval set of all voters in voters
        appr_set = self.__build_union_of_approval_sets(voters)

        dryspells = []
        for rnd in rounds:
            # check whether a candidate approved by voters gets implemented
            if rnd == 0:
                continue
            newly_impl = self.outcomes[rnd][0][-1]
            if newly_impl not in appr_set:
                dryspells.append(rnd)
        return dryspells


    def __build_union_of_approval_sets(self, voters):
        """ Build union of approval sets of all voters in voters."""
        appr_set = set()
        for i in voters:
            appr_set.update(self.profile[i].approved)
        return appr_set

    
    def __build_intersection_of_approval_sets(self, voters):
        """ Build intersection of approval sets of all voters in voters."""
        appr_sets = []
        for i in voters:
            appr_sets.append(set(self.profile[i].approved))
        return set.intersection(*appr_sets)


    def get_mono_violations(self, voters, windowheight, rounds=None):
        """Get list of rounds with monotonicity violation for the voter group."""

        if self.outcomes == None:
            message = "No election outcome computed yet."
            raise ValueError(message)
        if rounds == None:
            rounds = range(len(self.outcomes))
        if type(rounds) == int or len(rounds) < 2:
            message = "At least two rounds are needed."
            raise ValueError(message)
        
        appr_set = self.__build_union_of_approval_sets(voters)
        bad_rounds = []
        avg_sat = self.get_avg_sat(voters, windowheight, rounds=rounds)
        for rnd in rounds[1:]:
            # find consecutive rounds with mono violation
            if avg_sat[rnd] < avg_sat[rnd -1]:
                if self.outcomes[rnd][0][-1] not in appr_set:
                    bad_rounds.append(rnd)
        return bad_rounds


    def get_group_represenation(self, voters, frac=1, use_tau=False, rounds=None):
        """
        Get group representation value, i.e. the k s.t. 
        $avg(r_{\leq k}) \geq \lambda$, where lambda is
        frac * (num of canidates approved by some i in voters).
        If use_tau is set to True, satisfaction from top part
        is factored in.
        Undefined behavior in the case that r=().
        """

        if self.outcomes == None:
            message = "No election outcome computed yet."
            raise ValueError(message)
        if rounds == None:
            rounds = range(len(self.outcomes))
        if type(rounds) == int:
            rounds = [rounds]

        appr_set = self.__build_intersection_of_approval_sets(voters)
        bound = math.floor(frac * len(appr_set))
        
        gr_values = {}
        for rnd in rounds:
            # compute group represenation w.r.t. bound
            gr_values[rnd] = float('inf')
            for k in range(len(self.outcomes[rnd][1])):
                ranking_window = self.outcomes[rnd][1][:k+1]
                if use_tau:
                    ranking_window += self.outcomes[rnd][0]
                avg_sat = self.__avg_sat(voters, ranking_window)
                if avg_sat >= bound:
                    gr_values[rnd] = k+1
                    break
        return gr_values
