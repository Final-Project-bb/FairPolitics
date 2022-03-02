"""
Run elections and print the results into a file.
"""

from __future__ import print_function
from datetime import datetime, date
import sys
import random
import csv
import itertools
import math
from pathlib import Path
sys.path.insert(0, '..')
from abcvoting.preferences import Profile
from abcvoting import abcrules
from dynamicrankings import dprrules
from dynamicrankings import dprsequence
from dynamicrankings import pref_generator


# SETUP
FOLDER_NAME = 'spatial_3'
SEEDS = range(5)
RULES = [
    'av',
    'dseqpav',
    'lseqpav',
    'dseqphrag',
    'lseqphrag'
]
NUM_CANDS = 20
NUM_VOTERS = 60
# GROUP_SIZES = [5]
GROUP_SIZES = [5, 10, 12, 15, 17, 20]
# GROUP_SIZES = [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60]
GROUP_PREF = range(7)
# GROUP_PREF = [0,1,2,3,4]
OTHER_GEN = 'UR' # algorithm to generate other voters, choose from ['UR', 'SR']

TIMEHORIZON = 15
WINDOWHEIGHT = 5
RANKS_ALGO = 'gctr' # algorithm to generate ranks of implemented candidates
# RANKS_ALGO = 'adversarial'

GR_BOUND = 0.5 # satisfaction for input of group-representation calculation

VERBOSE = 1

SIGMAS = [0.35, 0.4, 0.45, 0.5]
# RADII = [0.3, 0.35]
NUM_GROUPS = [3]

for sigma in SIGMAS:
    # for radius in RADII:
        for num_groups in NUM_GROUPS:
# GROUP_PROBS = [0.95]
# OHTER_PROBS = [0.9]
# for group_prob in GROUP_PROBS:
#     for other_prob in OHTER_PROBS:
            base_path = Path(__file__).parent
            if len(FOLDER_NAME) > 0:
                folder_path = (base_path / ("./data/" + FOLDER_NAME + "/")).resolve()
                folder_path.mkdir(parents=True, exist_ok=True)
            else:
                folder_path = (base_path / "./data/").resolve()
            now = datetime.now()
            today = date.today()
            curr_time = now.strftime("%H_%M")
            curr_day = today.strftime("%Y_%m_%d")

            exp_path = (folder_path / (curr_day + '_' + curr_time + '_experiment' + '.csv')).resolve()
            setup_path = (folder_path / (curr_day + '_' + curr_time + '_setup' + '.csv')).resolve()
            # write headers
            with open(exp_path, 'w', newline='') as csvfile:
                writer = csv.writer(csvfile, dialect='excel')
                header = [
                    'rule', 'seed', 'tau', 'ranking', 'group_size', 'avg_sat(r_\leq k)', 'avg_sat(tau)',
                    'avg_sat(r and tau)', 'gr_values', 'gr_values_tau', 'mono_viol', 'dry_spells'
                    ]
                writer.writerow(header)
            with open(setup_path, 'w', newline='') as csvfile:
                writer = csv.writer(csvfile, dialect='excel')
                header = [
                    'seed', 'voter_pref', 'implementation rank sequence',
                    'other gen', 'ranks algo', 'windowheight', 'GR bound'
                    ]
                writer.writerow(header)

            print('sigma: ' + str(sigma))
            # print('radius: ' + str(radius))
            print('num_groups' + str(num_groups))
            # print('group_prob:' + str(group_prob))
            # print('other_prob:' + str(other_prob))
            print('time: ' + str(curr_time))

            for group_size in GROUP_SIZES:
                alpha = group_size / NUM_VOTERS
                if VERBOSE:
                    print('Working on group size ' + str(group_size))
                for seed in SEEDS:
                    random.seed(seed)
                    generator = pref_generator.PrefGenerator(NUM_VOTERS, NUM_CANDS)
                    # generator.generate_by_size(group_size, GROUP_PREF, OTHER_GEN)
                    # generator.generate_quasi_parties([group_size, 60-(2*group_size), group_size], [group_prob, other_prob, group_prob], [range(5), range(5,15), range(15,20)])
                    # generator.generate_quasi_parties([group_size, 60-group_size], [group_prob, other_prob], [GROUP_PREF, range(50,100)])
                    # generator.clean_profile()
                    if num_groups == 2:
                        # generator.generate_spatial([group_size, 60-group_size], [sigma, sigma], [radius, radius], group_cands=[10,10])
                        generator.clean_profile()
                    else:
                        generator.generate_spatial_3_fixed_centers([group_size, math.ceil((60-group_size)/2), math.floor((60-group_size)/2)], [sigma, sigma, sigma], group_cands=[7,7,6])
                        generator.clean_profile()
                    # generate dummy election to get access to get_random_ranks function
                    profile = generator.profile
                    # profile.add_preferences([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]])
                    election = dprsequence.DPRSequence(generator.profile, 'av')
                    if RANKS_ALGO != 'adversarial':
                        supported = set(itertools.chain.from_iterable(generator.profile.aslist()))
                        new_horizon = min(len(supported), TIMEHORIZON)
                        ranks = election.get_random_ranks(WINDOWHEIGHT, new_horizon, RANKS_ALGO)
                        # ranks = election.get_random_ranks(WINDOWHEIGHT, TIMEHORIZON, RANKS_ALGO)
                    else:
                        ranks = []
                    
                    # note down setup
                    with open(setup_path, 'a', newline='') as csvfile:
                        writer = csv.writer(csvfile, dialect='excel')
                        for ind, voter_pref in enumerate(generator.profile.aslist()):
                            if ind == 0:
                                writer.writerow([seed, voter_pref, ranks, OTHER_GEN, RANKS_ALGO, WINDOWHEIGHT, GR_BOUND])
                            else:
                                writer.writerow([seed, voter_pref])
                    
                    # perform experiments
                    for rule in RULES:
                        data = []
                        election, outcomes = None, None
                        avg_sat, max_dry_spell, gr_values, mono_violation = None, None, None, None
                        election = dprsequence.DPRSequence(generator.profile, rule)
                        if RANKS_ALGO != 'adversarial':
                            outcomes = election.run_by_rank(ranks)
                        else:
                            outcomes = election.run_adversarial(TIMEHORIZON, GROUP_PREF, WINDOWHEIGHT)
                        avg_sat_r = election.get_avg_sat(range(group_size), WINDOWHEIGHT)
                        avg_sat_tau = election.get_avg_sat_tau(range(group_size))
                        dry_spells = election.get_dry_spells(range(group_size))
                        gr_values = election.get_group_represenation(range(group_size), frac=GR_BOUND)
                        gr_values_tau = election.get_group_represenation(range(group_size), frac=GR_BOUND, use_tau=True)
                        mono_viol = election.get_mono_violations(range(group_size), WINDOWHEIGHT)
                        # append info to file
                        with open(exp_path, 'a', newline='') as csvfile:
                            writer = csv.writer(csvfile, dialect='excel')
                            for rnd in range(len(outcomes)):
                                is_mono_viol = 1 if rnd in mono_viol else 0
                                is_dry_round = 1 if rnd in dry_spells else 0
                                # write down in this order:
                                # rule, seed, tau, ranking, avg_sat(r), avg_sat(tau),
                                # avg_sat(tau and r), GR, is_mono_viol, is_dry_round
                                writer.writerow([
                                    rule, seed, outcomes[rnd][0], outcomes[rnd][1], alpha, avg_sat_r[rnd],
                                    avg_sat_tau[rnd], (avg_sat_r[rnd] + avg_sat_tau[rnd]),
                                    gr_values[rnd], gr_values_tau[rnd], is_mono_viol, is_dry_round
                                ])
