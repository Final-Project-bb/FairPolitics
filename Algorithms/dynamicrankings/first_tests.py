"""
Some first tests for setting up the DPR-stuff.
"""

from __future__ import print_function
import sys
import random
from pathlib import Path
sys.path.insert(0, '..')
from abcvoting.preferences import Profile
from abcvoting import abcrules
from dynamicrankings import dprrules
from dynamicrankings import dprsequence
from dynamicrankings import pref_generator
from dynamicrankings import helper_functions

print('---------------Dynamic seqPAV------------------------')
# Ex.dseqpav1: dynamic seqPAV does not fulfill k-impl.mono.
num_cand = 4
profile = Profile(num_cand)
ballotts = []
for i in range(2):
    ballotts += [[0]]
for i in range(15):
    ballotts += [[0,1]]
for i in range(6):
    ballotts += [[1]]
for i in range(10):
    ballotts += [[2]]
for i in range(10):
    ballotts += [[3]]
for i in range(6):
    ballotts += [[0,2,3]]
profile.add_preferences(ballotts)
election = dprsequence.DPRSequence(profile, "dseqpav")
outcomes = election.run_by_name([1])
print(outcomes == [([], [0, 1, 2, 3]), ([1], [2, 3, 0])])



print('-----------------------lazy seqPAV------------------------')
# Ex. lseqpav1: lazy seqPAV does not fulfill k-impl.mono.
num_cand = 4
profile = Profile(num_cand)
ballotts = []
for i in range(2):
    ballotts += [[0]]
for i in range(15):
    ballotts += [[0,1]]
for i in range(6):
    ballotts += [[1]]
for i in range(10):
    ballotts += [[2]]
for i in range(10):
    ballotts += [[3]]
for i in range(6):
    ballotts += [[0,2,3]]
profile.add_preferences(ballotts)
election = dprsequence.DPRSequence(profile, "lseqpav")
outcomes = election.run_by_name([1])
print(outcomes == [([], [0, 1, 2, 3]), ([1], [2, 3, 0])])


print('-------------__phragmen_loads_from_sequence--------------')

# overloading example
num_cand01 = 3
profile01 = Profile(num_cand01)
ballotts = []
for i in range(1):
    ballotts += [[0]]
for i in range(1):
    ballotts += [[0,1]]
for i in range(1):
    ballotts += [[1,2]]
profile01.add_preferences(ballotts)
loads = dprrules.__phragmen_loads_from_sequence(profile01, [0,1,2])
print(list(loads.values()) == [1/2, 3/4, 7/4])

# normal example
num_cand02 = 4
profile02 = Profile(num_cand02)
ballotts = []
for i in range(2):
    ballotts += [[0]]
for i in range(1):
    ballotts += [[0,1]]
for i in range(1):
    ballotts += [[1,2,3]]
profile02.add_preferences(ballotts)
loads = dprrules.__phragmen_loads_from_sequence(profile02, [3,2,1])
print(list(loads.values()) == [0,0,1,2])


print('-------------lazy Phragmen--------------')

# simple test
num_cand03 = 4
profile03 = Profile(num_cand03)
ballotts = []
for i in range(1):
    ballotts += [[0]]
for i in range(2):
    ballotts += [[0,1]]
for i in range(1):
    ballotts += [[2]]
for i in range(2):
    ballotts += [[2,3]]
profile03.add_preferences(ballotts)
election = dprsequence.DPRSequence(profile03, "lseqphrag")
name_seq = [1]
outcomes = election.run_by_name(name_seq, verbose=0, resolute=True)
print(outcomes == [([], [0, 2, 1, 3]), ([1], [2, 3, 0])])


print('-------------dynamic Phragmen--------------')

# simple test
num_cand04 = 4
profile04 = Profile(num_cand04)
ballotts = []
for i in range(1):
    ballotts += [[0]]
for i in range(2):
    ballotts += [[0,1]]
for i in range(1):
    ballotts += [[2]]
for i in range(2):
    ballotts += [[2,3]]
profile04.add_preferences(ballotts)
election = dprsequence.DPRSequence(profile04, "dseqphrag")
name_seq = [1]
outcomes = election.run_by_name(name_seq, verbose=0, resolute=True)
print(outcomes == [([], [0, 2, 1, 3]), ([1], [2, 0, 3])])

# "BFJL16a", "Ex. 5 (seqPhrag not EJR)"
profile05 = Profile(14)
# c_1 to c_12 are 0 through 11, a and b are 12 and 13
prefs = []
for i in range(2):
    prefs += [[0, 12, 13]]
for i in range(2):
    prefs += [[1, 12, 13]]
pref = list(range(0, 12))
for i in range(6):
    prefs += [pref]
pref = list(range(1, 12))
for i in range(5):
    prefs += [pref]
pref = list(range(2, 12))
for i in range(9):
    prefs += [pref]
profile05.add_preferences(prefs)
election = dprsequence.DPRSequence(profile05, "dseqphrag")
name_seq = []
outcomes = election.run_by_name(name_seq, verbose=0, resolute=True)
print(outcomes == [([], [2, 3, 4, 5, 1, 6, 7, 0, 8, 9, 10, 11, 12, 13])])


print('------------- AV --------------')

# simpe test
num_cand04 = 4
profile04 = Profile(num_cand04)
ballotts = []
for i in range(1):
    ballotts += [[0]]
for i in range(2):
    ballotts += [[0,1]]
for i in range(1):
    ballotts += [[2]]
for i in range(2):
    ballotts += [[2,3]]
profile04.add_preferences(ballotts)
election = dprsequence.DPRSequence(profile04, "av")
name_seq = [1,0]
outcomes = election.run_by_name(name_seq, verbose=0, resolute=True)
print(outcomes == [([], [0, 2, 1, 3]), ([1], [0, 2, 3]), ([1, 0], [2, 3])])


print('--------------PrefGenerator-----------')

random.seed(42)
gen = pref_generator.PrefGenerator(4, 5)
gen.generate_uniform_random()
print(gen.profile.aslist() == [[0, 1, 3, 4], [0, 1, 2, 4], [0, 1, 2, 3, 4], [0, 2]])
gen.generate_size_random()
print(gen.profile.aslist() == [[1], [0, 2, 3, 4], [0, 1, 4], [2]])
gen.generate_by_alpha(0.4, [0,1,4], 'UR')
print(gen.profile.aslist() == [[0, 1, 4], [0, 1, 4], [], [2]])
gen.generate_by_size(2, [0,1,4], 'UR')
print(gen.profile.aslist() == [[0, 1, 4], [0, 1, 4], [2], [2]])
# quasi-parties
random.seed(42)
gen = pref_generator.PrefGenerator(20,10)
gen.generate_quasi_parties([10, 10], [0.9, 0.6], [[0,1,2,3], [9,8,7,6]])
print(gen.profile.aslist() == [[0, 1, 2, 3, 7, 9], [0, 1, 2, 3, 9], [0, 1, 2, 3, 6, 7], [0, 1, 2], [0, 1, 2, 3, 4], [0, 1, 2], [1, 2, 3, 7], [0, 2, 3], [0, 1, 2, 3, 8, 9], [0, 1, 2, 3, 4], [0, 9, 2, 6], [2, 5, 6, 7, 8], [0, 1, 2, 6, 8], [0, 2, 5, 8, 9], [1, 4, 5, 7, 8, 9], [0, 1, 2, 4, 5, 6, 7], [1, 2, 4, 5, 7, 9], [8, 1, 2, 7], [1, 3, 4, 6], [8, 9, 3, 7]])
random.seed(42)
gen = pref_generator.PrefGenerator(20,10)
gen.generate_quasi_parties([5, 5, 10], [1, 0.6, 0.85], [[0,1,2,3], [9,8,7,6], [0,2,4,6,8]])
print(gen.profile.aslist() == [[0, 1, 2, 3], [0, 1, 2, 3], [0, 1, 2, 3], [0, 1, 2, 3], [0, 1, 2, 3], [2, 4, 5, 7, 8, 9], [2, 3, 4, 5, 7], [1, 4, 5, 6, 9], [0, 1, 4, 5, 7, 8, 9], [0, 9, 6, 1], [0, 2, 3, 4, 6, 8], [2, 4, 6], [0, 2, 3, 4, 6, 8], [0, 2, 3, 8, 9], [0, 8, 2, 4], [8, 2, 4, 6], [0, 1, 2, 4, 9], [2, 3, 4, 6, 8], [0, 8, 2, 6], [0, 2, 4, 5, 8]])
random.seed(42)
gen = pref_generator.PrefGenerator(20,10)
gen.generate_spatial([10,10], [0.2,0.1], [0.4,0.4], group_cands=[5,5])
print(gen.profile.aslist() == [[0, 1, 2, 3, 4, 5, 8], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 1, 2, 4, 5, 6, 7, 8, 9], [0, 1, 2, 3, 4, 5], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 1, 2, 3, 4, 5, 6, 8, 9], [0, 1, 2, 3, 4], [0, 1, 2, 3, 4, 5], [0, 1, 2, 3, 4, 5], [8, 2, 5, 6], [1, 4, 5, 6, 7, 8, 9], [0, 1, 2, 4, 5, 6, 7, 8, 9], [0, 1, 2, 4, 5, 6, 7, 8, 9], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [4, 5, 6, 7, 8, 9], [0, 1, 2, 4, 5, 6, 7, 8, 9], [0, 1, 4, 5, 6, 7, 8, 9], [4, 5, 6, 7, 8, 9], [5, 6, 7, 8, 9], [0, 1, 2, 4, 5, 6, 7, 8, 9]])
num_cand = 7
profile = Profile(num_cand)
ballotts = []
for i in range(1):
    ballotts += [[0]]
for i in range(1):
    ballotts += [[2]]
for i in range(2):
    ballotts += [[2,6]]
for i in range(1):
    ballotts += [[5]]
for i in range(2):
    ballotts += [[2,5,6,0]]
profile.add_preferences(ballotts)
gen = pref_generator.PrefGenerator(7,7)
gen.profile = profile
gen.clean_profile()
print(gen.profile.aslist() == [[0], [1], [1, 3], [1, 3], [2], [0, 1, 2, 3], [0, 1, 2, 3]])



print('-------------random implementations-------------')

random.seed(42)
gen = pref_generator.PrefGenerator(4, 5)
gen.generate_size_random()
election = dprsequence.DPRSequence(gen.profile, "av")
random.seed(42)
outcomes = election.run_random(3, 3, 'unif')
random.seed(42)
ranks = election.get_random_ranks(3, 3, 'unif')
outcomes_ranks = election.run_by_rank(ranks)
print(outcomes == [([], [4, 0, 1, 2, 3]), ([1], [4, 0, 2, 3]), ([1, 4], [0, 2, 3])])
print(ranks == [2,0])
print(outcomes == outcomes_ranks)
random.seed(42)
outcomes = election.run_random(3, 3, 'decr')
random.seed(42)
ranks = election.get_random_ranks(3, 3, 'decr')
outcomes_ranks = election.run_by_rank(ranks)
print(outcomes == [([], [4, 0, 1, 2, 3]), ([0], [4, 1, 2, 3]), ([0, 4], [1, 2, 3])])
print(ranks == [1,0])
print(outcomes == outcomes_ranks)
random.seed(42)
outcomes = election.run_random(3, 3, 'gctr')
random.seed(42)
ranks = election.get_random_ranks(3, 3, 'gctr')
outcomes_ranks = election.run_by_rank(ranks)
print(outcomes == [([], [4, 0, 1, 2, 3]), ([0], [4, 1, 2, 3]), ([0, 4], [1, 2, 3])])
print(ranks == [1,0])
print(outcomes == outcomes_ranks)


print('-------------adversarial implementations-------------')

random.seed(42)
gen = pref_generator.PrefGenerator(4, 5)
gen.generate_by_size(2, [0,1], 'UR')
election = dprsequence.DPRSequence(gen.profile, "dseqpav")
outcomes = election.run_adversarial(4, [0,1], 2)
print(outcomes == [([], [0, 2, 1, 3]), ([2], [0, 1, 3, 4]), ([2, 1], [0, 3, 4]), ([2, 1, 3], [0, 4])])


print('-----------avg_sat, dry spells, mono_violations and group representation--------')

#  Ex. dseqpav2: dynamic seqPAV does not fulfill alpha-k-impl.mono., k=3
num_cand = 5
profile = Profile(num_cand)
ballotts = []
for i in range(2): # a
    ballotts += [[0]]
for i in range(6): # a,c,d
    ballotts += [[0,2,3]]
for i in range(15): # a,b
    ballotts += [[0,1]]
for i in range(6): # b
    ballotts += [[1]]
for i in range(10): # c
    ballotts += [[2]]
for i in range(10): # d
    ballotts += [[3]]
for i in range(12): # e
    ballotts += [[4]]
profile.add_preferences(ballotts)
election = dprsequence.DPRSequence(profile, 'dseqpav')
election.run_by_name([1,4,2,3,0])
avg_sat = election.get_avg_sat(range(8), 3, rounds=[0,1])
print(avg_sat == {0: 1.75, 1: 1.5})
avg_sat_tau = election.get_avg_sat_tau(range(8))
print(avg_sat_tau == {0: 0.0, 1: 0.0, 2: 0.0, 3: 0.75, 4: 1.5, 5: 2.5})
dry_spells = election.get_dry_spells(range(2))
print(dry_spells == [1,2,3,4])
dry_spells = election.get_dry_spells(range(8), rounds=[5])
print(len(dry_spells) == 0)
mono_viol = election.get_mono_violations(range(8), 3, rounds=[0,1])
print(mono_viol == [1])
mono_viol = election.get_mono_violations(range(9), 3, rounds=[0,1])
print(mono_viol == [])
mono_viol = election.get_mono_violations(range(2), 3)
print(mono_viol == [1])
gr_values = election.get_group_represenation(range(8)[2:], frac = 0.7)
print(gr_values == {0: 3, 1: 2, 2: 2, 3: 2, 4: float('inf'), 5: float('inf')})
gr_values_with_tau = election.get_group_represenation(range(8)[2:], frac=0.7, use_tau=True)
print(gr_values_with_tau == {0: 3, 1: 2, 2: 2, 3: 1, 4: 1, 5: float('inf')})
# outcomes: [([], [0, 1, 2, 3, 4]), ([1], [2, 3, 4, 0]), ([1, 4], [2, 3, 0]), ([1, 4, 2], [3, 0]), ([1, 4, 2, 3], [0]), ([1, 4, 2, 3, 0], [])]


print('-------------set-methods for DPRSeequence-----------')

num_cand = 5
profile = Profile(num_cand)
ballotts = []
for i in range(2): # a
    ballotts += [[0]]
for i in range(6): # a,c,d
    ballotts += [[0,2,3]]
for i in range(15): # a,b
    ballotts += [[0,1]]
for i in range(6): # b
    ballotts += [[1]]
for i in range(10): # c
    ballotts += [[2]]
for i in range(10): # d
    ballotts += [[3]]
for i in range(12): # e
    ballotts += [[4]]
profile.add_preferences(ballotts)
initial_election = dprsequence.DPRSequence(profile, 'dseqpav')
initial_outcomes = initial_election.run_by_name([1,4,2,3,0])
election = dprsequence.DPRSequence(profile, 'dseqpav')
election.set_outcomes(initial_outcomes)
avg_sat = election.get_avg_sat(range(8), 3, rounds=[0,1])
print(avg_sat == {0: 1.75, 1: 1.5})
avg_sat_tau = election.get_avg_sat_tau(range(8))
print(avg_sat_tau == {0: 0.0, 1: 0.0, 2: 0.0, 3: 0.75, 4: 1.5, 5: 2.5})
dry_spells = election.get_dry_spells(range(2))
print(dry_spells == [1,2,3,4])
dry_spells = election.get_dry_spells(range(8), rounds=[5])
print(len(dry_spells) == 0)
mono_viol = election.get_mono_violations(range(8), 3, rounds=[0,1])
print(mono_viol == [1])
mono_viol = election.get_mono_violations(range(9), 3, rounds=[0,1])
print(mono_viol == [])
mono_viol = election.get_mono_violations(range(2), 3)
print(mono_viol == [1])
gr_values = election.get_group_represenation(range(8)[2:], frac=0.7)
print(gr_values == {0: 3, 1: 2, 2: 2, 3: 2, 4: float('inf'), 5: float('inf')})




# print('---------------helper functions---------------')

# base_path = Path(__file__).parent
# setup_file_path = (base_path / ("./data/5_rules_first_sets/2020_12_08_14_09_setup.csv")).resolve()
# clean_data_path = (base_path / ("./data/5_rules_first_sets/2020_12_08_14_09_cleaned.csv")).resolve()
# dest_path = (base_path / ("./data/5_rules_first_sets/2020_12_08_14_09_new_exp.csv")).resolve()
# # helper_functions.write_election_data_only(orig_path, dest_path)
# measures = {'avg_sat_r': [range(5), 5], 'mono_viol': [range(5), 5]}
# helper_functions.measurements_from_data(
#     clean_data_path, setup_file_path, dest_path,
#     20, 60, 20, 60, 5, measures  
# )

if __name__ == '__main__':
    profile
