"""
Some examples from my notes.
"""

from __future__ import print_function
try:
    from gmpy2 import mpq as Fraction
except ImportError:
    print("Warning: module gmpy2 not found, "
          + "resorting to Python's fractions.Fraction")
    from fractions import Fraction
import sys
sys.path.insert(0, '..')
from abcvoting.preferences import Profile
from abcvoting import abcrules
from dynamicrankings import dprrules
from dynamicrankings import dprsequence


VERBOSE = 0
EXAMPLES = [
    # 'lseqpav1',
    # 'lseqpav2',
    # 'lseqpav3',
    # 'lseqpav4',
    # 'dseqpav1',
    # 'dseqpav2',
    # 'dseqpav3',
    # 'dseqpav4',
    # 'dseqpav5',
    # 'dseqpav6',
    # 'lphragmen1',
    # 'lphragmen2',
    # 'lphragmen3',
    # 'dphragmen1',
    # 'dphragmen2',
    # 'dphragmen3',
    # 'dphragmen4',
    # 'dseqphrag5',
    # 'individual monotonicity',
    # 'JS violation',
    # 'enestroem-phragmen',
    # 'introductory_example',
    'non-sci_example'
]

#### lazy seqPAV ####

if 'lseqpav1' in EXAMPLES:
    print('----------------------------------------------------------------------')
    print("Ex. lseqpav1: lazy seqPAV does not fulfill k-impl.mono.")
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
    ranking = dprrules.compute_lazy_seqpav(profile, [], verbose=VERBOSE)
    print("r^1 = " + str(ranking))
    ranking = dprrules.compute_lazy_seqpav(profile, [1], verbose=VERBOSE)
    print("After implementing the second candidate, we have r^2 = " + str(ranking) + "\n")

if 'lseqpav2' in EXAMPLES:
    print('----------------------------------------------------------------------')
    print("Ex. lseqpav2: lazy seqPAV does not fulfill alpha-k-impl.mono. (k=3)")
    num_cand = 5
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
    for i in range(16):
        ballotts += [[4]]
    profile.add_preferences(ballotts)
    ranking = dprrules.compute_lazy_seqpav(profile, [], verbose=VERBOSE)
    print("r^1 = " + str(ranking))
    ranking = dprrules.compute_lazy_seqpav(profile, [1], verbose=VERBOSE)
    print("After implementing the second candidate, we have r^2 = " + str(ranking) + "\n")

if 'lseqpav3' in EXAMPLES:
    print('----------------------------------------------------------------------')
    print("Ex. lseqpav3: lazy seqPAV does not fulfill alpha-k-impl.mono., k=3, x=0,12,144")
    num_cand = 5
    values = [0,12,144]
    for x in values:
        profile = Profile(num_cand)
        ballotts = []
        for i in range(2): # a
            ballotts += [[0]]
        for i in range(15): # a,b
            ballotts += [[0,1]]
        for i in range(6 + x): # b
            ballotts += [[1]]
        for i in range(10): # c
            ballotts += [[2]]
        for i in range(10): # d
            ballotts += [[3]]
        for i in range(6 + x): # a,c,d
            ballotts += [[0,2,3]]
        for i in range(16 + x): # e
            ballotts += [[4]]
        profile.add_preferences(ballotts)
        ranking = dprrules.compute_lazy_seqpav(profile, [], verbose=VERBOSE)
        print("x = " + str(x))
        print("r^1 = " + str(ranking))
        ranking = dprrules.compute_lazy_seqpav(profile, [1], verbose=VERBOSE)
        print("After implementing the second candidate, we have r^2 = " + str(ranking) + "\n")

if 'lseqpav4' in EXAMPLES:
    print('----------------------------------------------------------------------')
    print("Ex. lseqpav4: lazy seqPAV does not fulfill alpha-k-impl.mono., k=4, x=0,12,144")
    num_cand = 6
    values = [0,12,144]
    for x in values:
        profile = Profile(num_cand)
        ballotts = []
        for i in range(2): # a
            ballotts += [[0]]
        for i in range(15): # a,b
            ballotts += [[0,1]]
        for i in range(6 + x): # b
            ballotts += [[1]]
        for i in range(10): # c
            ballotts += [[2]]
        for i in range(10): # d
            ballotts += [[3]]
        for i in range(6 + x): # a,c,d
            ballotts += [[0,2,3]]
        for i in range(16 + x): # e1
            ballotts += [[4]]
        for i in range(16 + x): # e2
            ballotts += [[5]]
        profile.add_preferences(ballotts)
        ranking = dprrules.compute_lazy_seqpav(profile, [], verbose=VERBOSE)
        print("x = " + str(x))
        print("r^1 = " + str(ranking))
        ranking = dprrules.compute_lazy_seqpav(profile, [1], verbose=VERBOSE)
        print("After implementing the second candidate, we have r^2 = " + str(ranking) + "\n")



## dynamic seqPAV

if 'dseqpav1' in EXAMPLES:
    print('----------------------------------------------------------------------')
    print("Ex.dseqpav1: dynamic seqPAV does not fulfill k-impl.mono.")
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
    ranking = dprrules.compute_dynamic_seqpav(profile, [], verbose=VERBOSE)
    print("r^1 = " + str(ranking))
    ranking = dprrules.compute_dynamic_seqpav(profile, [1], verbose=VERBOSE)
    print("After implementing the second candidate, we have r^2 = " + str(ranking) + "\n")

if 'dseqpav2' in EXAMPLES:
    print('----------------------------------------------------------------------')
    print("Ex. dseqpav2: dynamic seqPAV does not fulfill alpha-k-impl.mono., k=3")
    num_cand = 5
    profile = Profile(num_cand)
    ballotts = []
    for i in range(2): # a
        ballotts += [[0]]
    for i in range(15): # a,b
        ballotts += [[0,1]]
    for i in range(6): # b
        ballotts += [[1]]
    for i in range(10): # c
        ballotts += [[2]]
    for i in range(10): # d
        ballotts += [[3]]
    for i in range(6): # a,c,d
        ballotts += [[0,2,3]]
    for i in range(12): # e
        ballotts += [[4]]
    profile.add_preferences(ballotts)
    ranking = dprrules.compute_dynamic_seqpav(profile, [], verbose=VERBOSE)
    print("r^1 = " + str(ranking))
    ranking = dprrules.compute_dynamic_seqpav(profile, [1], verbose=VERBOSE)
    print("After implementing the second candidate, we have r^2 = " + str(ranking) + "\n")

if 'dseqpav3' in EXAMPLES:
    print('----------------------------------------------------------------------')
    print("Ex. dseqpav3: dynamic seqPAV does not fulfill alpha-k-impl.mono., k=4")
    num_cand = 6
    profile = Profile(num_cand)
    ballotts = []
    for i in range(2): # a
        ballotts += [[0]]
    for i in range(15): # a,b
        ballotts += [[0,1]]
    for i in range(6): # b
        ballotts += [[1]]
    for i in range(10): # c
        ballotts += [[2]]
    for i in range(10): # d
        ballotts += [[3]]
    for i in range(6): # a,c,d
        ballotts += [[0,2,3]]
    for i in range(12): # e1
        ballotts += [[4]]
    for i in range(12): # e2
        ballotts += [[5]]
    profile.add_preferences(ballotts)
    ranking = dprrules.compute_dynamic_seqpav(profile, [], verbose=VERBOSE)
    print("r^1 = " + str(ranking))
    ranking = dprrules.compute_dynamic_seqpav(profile, [1], verbose=VERBOSE)
    print("After implementing the second candidate, we have r^2 = " + str(ranking) + "\n")

if 'dseqpav4' in EXAMPLES:
    print('----------------------------------------------------------------------')
    print("Ex. dseqpav4: dynamic seqPAV does not fulfill alpha-k-impl.mono., k=3, x=12,144")
    num_cand = 5
    values = [12,144]
    for x in values:
        profile = Profile(num_cand)
        ballotts = []
        for i in range(2): # a
            ballotts += [[0]]
        for i in range(15): # a,b
            ballotts += [[0,1]]
        y = int(0.5*x)
        for i in range(6 + y): # b
            ballotts += [[1]]
        for i in range(10): # c
            ballotts += [[2]]
        for i in range(10): # d
            ballotts += [[3]]
        for i in range(6 + x): # a,c,d
            ballotts += [[0,2,3]]
        z = int(Fraction(1,3) * x)
        for i in range(12 + z): # e
            ballotts += [[4]]
        profile.add_preferences(ballotts)
        ranking = dprrules.compute_dynamic_seqpav(profile, [], verbose=VERBOSE)
        print("x = " + str(x))
        print("r^1 = " + str(ranking))
        ranking = dprrules.compute_dynamic_seqpav(profile, [1], verbose=VERBOSE)
        print("After implementing the second candidate, we have r^2 = " + str(ranking) + "\n")

if 'dseqpav5' in EXAMPLES:
    print('----------------------------------------------------------------------')
    print("Ex. dseqpav5: dynamic seqPAV does not fulfill alpha-k-impl.mono., k=4, x=12,144")
    num_cand = 6
    values = [12,144]
    for x in values:
        profile = Profile(num_cand)
        ballotts = []
        for i in range(2): # a
            ballotts += [[0]]
        for i in range(15): # a,b
            ballotts += [[0,1]]
        y = int(0.5*x)
        for i in range(6 + y): # b
            ballotts += [[1]]
        for i in range(10): # c
            ballotts += [[2]]
        for i in range(10): # d
            ballotts += [[3]]
        for i in range(6 + x): # a,c,d
            ballotts += [[0,2,3]]
        z = int(Fraction(1,3) * x)
        for i in range(12 + z): # e1
            ballotts += [[4]]
        for i in range(12 + z): # e2
            ballotts += [[5]]
        profile.add_preferences(ballotts)
        ranking = dprrules.compute_dynamic_seqpav(profile, [], verbose=VERBOSE)
        print("x = " + str(x))
        print("r^1 = " + str(ranking))
        ranking = dprrules.compute_dynamic_seqpav(profile, [1], verbose=VERBOSE)
        print("After implementing the second candidate, we have r^2 = " + str(ranking) + "\n")

if 'dseqpav6' in EXAMPLES:
    print('----------------------------------------------------------------------')
    print("Ex. dseqpav6: dynamic seqPAV does not fulfill impl.mono. with forbidden intersections")
    num_cand = 6
    values = [0,12,144]
    for x in values:
        print("x = " + str(x))
        profile = Profile(num_cand)
        ballotts = []
        for i in range(4): # a
            ballotts += [[0]]
        y = 2*x
        for i in range(27 + y): # a,b
            ballotts += [[0,1]]
        for i in range(27): # b
            ballotts += [[1]]
        for i in range(30): # c
            ballotts += [[2]]
        for i in range(9 + x): # c,d
            ballotts += [[2,3]]
        for i in range(9): # d
            ballotts += [[3]]
        for i in range(36): # a,d
            ballotts += [[0,3]]
        z = int(0.5 * x)
        for i in range(35 + z): # e1
            ballotts += [[4]]
        for i in range(35 + z): # e2
            ballotts += [[5]]
        profile.add_preferences(ballotts)
        ranking = dprrules.compute_dynamic_seqpav(profile, [], verbose=VERBOSE)
        print("r^1 = " + str(ranking))
        ranking = dprrules.compute_dynamic_seqpav(profile, [1], verbose=VERBOSE)
        print("After implementing the second candidate, we have r^2 = " + str(ranking) + "\n")

#### lazy seqPhragmen ####

if 'lphragmen1' in EXAMPLES:
    print('----------------------------------------------------------------------')
    print("Ex. lphragmen1: lazy seqPhragmen does not fulfill k-impl.mono.")
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
    ranking = dprrules.compute_lazy_seqphrag(profile, [], verbose=VERBOSE)
    print("r^1 = " + str(ranking))
    ranking = dprrules.compute_lazy_seqphrag(profile, [1], verbose=VERBOSE)
    print("After implementing the second candidate, we have r^2 = " + str(ranking) + "\n")

if 'lphragmen2' in EXAMPLES:
    print('----------------------------------------------------------------------')
    print("Ex. lphragmen2: lazy seqPhragmen does not fulfill alpha-k-impl.mono. k=3, x=0,12,144")
    num_cand = 5
    values = [0,12,144]
    for x in values:
        profile = Profile(num_cand)
        ballotts = []
        for i in range(2): # a
            ballotts += [[0]]
        for i in range(15): # a,b
            ballotts += [[0,1]]
        for i in range(6 + x): # b
            ballotts += [[1]]
        for i in range(10): # c
            ballotts += [[2]]
        for i in range(10): # d
            ballotts += [[3]]
        for i in range(6 + x): # a,c,d
            ballotts += [[0,2,3]]
        for i in range(16 + x): # e
            ballotts += [[4]]
        profile.add_preferences(ballotts)
        ranking = dprrules.compute_lazy_seqphrag(profile, [], verbose=VERBOSE)
        print("x = " + str(x))
        print("r^1 = " + str(ranking))
        ranking = dprrules.compute_lazy_seqphrag(profile, [1], verbose=VERBOSE)
        print("After implementing the second candidate, we have r^2 = " + str(ranking) + "\n")

if 'lphragmen3' in EXAMPLES:
    print('----------------------------------------------------------------------')
    print("Ex. lphragmen3: lazy seqPhragmen does not fulfill alpha-k-impl.mono., k=4, x=0,12,144")
    num_cand = 6
    values = [0,12,144]
    for x in values:
        profile = Profile(num_cand)
        ballotts = []
        for i in range(2): # a
            ballotts += [[0]]
        for i in range(15): # a,b
            ballotts += [[0,1]]
        for i in range(6 + x): # b
            ballotts += [[1]]
        for i in range(10): # c
            ballotts += [[2]]
        for i in range(10): # d
            ballotts += [[3]]
        for i in range(6 + x): # a,c,d
            ballotts += [[0,2,3]]
        for i in range(16 + x): # e1
            ballotts += [[4]]
        for i in range(16 + x): # e2
            ballotts += [[5]]
        profile.add_preferences(ballotts)
        ranking = dprrules.compute_lazy_seqphrag(profile, [], verbose=VERBOSE)
        print("x = " + str(x))
        print("r^1 = " + str(ranking))
        ranking = dprrules.compute_lazy_seqphrag(profile, [1], verbose=VERBOSE)
        print("After implementing the second candidate, we have r^2 = " + str(ranking) + "\n")

#### dynamic seqPhragmen ####

if 'dphragmen1' in EXAMPLES:
    print('----------------------------------------------------------------------')
    print("Ex. dphragmen1: dynamic seqPhragmen does not fulfill k-impl.mono.")
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
    ranking = dprrules.compute_dynamic_seqphrag(profile, [], verbose=VERBOSE)
    print("r^1 = " + str(ranking))
    ranking = dprrules.compute_dynamic_seqphrag(profile, [1], verbose=VERBOSE)
    print("After implementing the second candidate, we have r^2 = " + str(ranking) + "\n")

if 'dphragmen2' in EXAMPLES:
    print('----------------------------------------------------------------------')
    print("Ex. dphragmen2: dynamic seqPhragmen does not fulfill alpha-k-impl.mono. k=3, x=0,12,144")
    num_cand = 5
    values = [0,12,144]
    for x in values:
        profile = Profile(num_cand)
        ballotts = []
        for i in range(2): # a
            ballotts += [[0]]
        for i in range(15): # a,b
            ballotts += [[0,1]]
        y = int(0.5*x)
        for i in range(6 + y): # b
            ballotts += [[1]]
        for i in range(10): # c
            ballotts += [[2]]
        for i in range(10): # d
            ballotts += [[3]]
        for i in range(6 + x): # a,c,d
            ballotts += [[0,2,3]]
        z = int(Fraction(1,3) * x)
        for i in range(11 + z): # e
            ballotts += [[4]]
        profile.add_preferences(ballotts)
        ranking = dprrules.compute_dynamic_seqphrag(profile, [], verbose=VERBOSE)
        print("x = " + str(x))
        print("r^1 = " + str(ranking))
        ranking = dprrules.compute_dynamic_seqphrag(profile, [1], verbose=VERBOSE)
        print("After implementing the second candidate, we have r^2 = " + str(ranking) + "\n")


if 'dphragmen3' in EXAMPLES:
    print('----------------------------------------------------------------------')
    print("Ex. dphragmen3: dynamic seqPhragmen does not fulfill alpha-k-impl.mono., k=4, x=0,12,144")
    num_cand = 6
    values = [0,12,144]
    for x in values:
        profile = Profile(num_cand)
        ballotts = []
        for i in range(2): # a
            ballotts += [[0]]
        for i in range(15): # a,b
            ballotts += [[0,1]]
        y = int(0.5*x)
        for i in range(6 + y): # b
            ballotts += [[1]]
        for i in range(10): # c
            ballotts += [[2]]
        for i in range(10): # d
            ballotts += [[3]]
        for i in range(6 + x): # a,c,d
            ballotts += [[0,2,3]]
        z = int(Fraction(1,3) * x)
        for i in range(12 + z): # e1
            ballotts += [[4]]
        for i in range(12 + z): # e2
            ballotts += [[5]]
        profile.add_preferences(ballotts)
        ranking = dprrules.compute_dynamic_seqphrag(profile, [], verbose=VERBOSE)
        print("x = " + str(x))
        print("r^1 = " + str(ranking))
        ranking = dprrules.compute_dynamic_seqphrag(profile, [1], verbose=VERBOSE)
        print("After implementing the second candidate, we have r^2 = " + str(ranking) + "\n")

if 'dphragmen4' in EXAMPLES:
    print('----------------------------------------------------------------------')
    print("Ex. dphragmen4: dynamic seqPhragmen does not fulfill alpha-k-impl.mono. k=3, x=0,12,144")
    num_cand = 5
    values = [0,12,144]
    for x in values:
        profile = Profile(num_cand)
        ballotts = []
        for i in range(2): # a
            ballotts += [[0]]
        for i in range(15): # a,b
            ballotts += [[0,1]]
        y = int(0.5*x)
        for i in range(6 + y): # b
            ballotts += [[1]]
        for i in range(10): # c
            ballotts += [[2]]
        for i in range(10): # d
            ballotts += [[3]]
        for i in range(6 + x): # a,c,d
            ballotts += [[0,2,3]]
        z = int(Fraction(1,3) * x)
        for i in range(12 + z): # e
            ballotts += [[4]]
        # for i in range(12 + z): # e
        #     ballotts += [[4]]
        profile.add_preferences(ballotts)
        ranking = dprrules.compute_dynamic_seqphrag(profile, [], verbose=VERBOSE)
        print("x = " + str(x))
        print("r^1 = " + str(ranking))
        ranking = dprrules.compute_dynamic_seqphrag(profile, [1], verbose=VERBOSE)
        print("After implementing the second candidate, we have r^2 = " + str(ranking) + "\n")


if 'dseqphrag5' in EXAMPLES:
    print('----------------------------------------------------------------------')
    print("Ex. dseqphrag5: dynamic seqPhragmen does not fulfill impl.mono. with forbidden intersections")
    num_cand = 6
    values = [0,12,144]
    for x in values:
        print("x = " + str(x))
        profile = Profile(num_cand)
        ballotts = []
        for i in range(4): # a
            ballotts += [[0]]
        y = 2*x
        for i in range(27 + y): # a,b
            ballotts += [[0,1]]
        for i in range(27): # b
            ballotts += [[1]]
        for i in range(30): # c
            ballotts += [[2]]
        for i in range(9 + x): # c,d
            ballotts += [[2,3]]
        for i in range(9): # d
            ballotts += [[3]]
        for i in range(36): # a,d
            ballotts += [[0,3]]
        z = int(0.5 * x)
        for i in range(35 + z): # e1
            ballotts += [[4]]
        for i in range(35 + z): # e2
            ballotts += [[5]]
        profile.add_preferences(ballotts)
        ranking = dprrules.compute_dynamic_seqphrag(profile, [], verbose=VERBOSE)
        print("r^1 = " + str(ranking))
        ranking = dprrules.compute_dynamic_seqphrag(profile, [1], verbose=VERBOSE)
        print("After implementing the second candidate, we have r^2 = " + str(ranking) + "\n")


# other examples

if 'individual monotonicity' in EXAMPLES:
    print('----------------------------------------------------------------------')
    print("Ex. individual monotonicity: all rules fail IM except for AV")
    num_cand = 3
    profile = Profile(num_cand)
    ballotts = []
    for i in range(1): 
        ballotts += [[0]] # a
    for i in range(2): 
        ballotts += [[1]] # b
        ballotts += [[0,2]] # a,c
    profile.add_preferences(ballotts)
    ranking = dprrules.compute_dynamic_seqphrag(profile, [], verbose=VERBOSE)
    # print("x = " + str(x))
    print("r^1 = " + str(ranking))
    ranking = dprrules.compute_dynamic_seqphrag(profile, [2], verbose=VERBOSE)
    print("After implementing the second candidate, we have r^2 = " + str(ranking) + "\n")
    ranking = dprrules.compute_lazy_seqphrag(profile, [], verbose=VERBOSE)
    # print("x = " + str(x))
    print("r^1 = " + str(ranking))
    ranking = dprrules.compute_lazy_seqphrag(profile, [2], verbose=VERBOSE)
    print("After implementing the second candidate, we have r^2 = " + str(ranking) + "\n")
    num_cand = 3
    profile = Profile(num_cand)
    ballotts = []
    for i in range(1): 
        ballotts += [[0]] # a
    for i in range(3): 
        ballotts += [[1]] # b
        ballotts += [[0,2]] # a,c
    profile.add_preferences(ballotts)
    ranking = dprrules.compute_dynamic_seqpav(profile, [], verbose=VERBOSE)
    # print("x = " + str(x))
    print("r^1 = " + str(ranking))
    ranking = dprrules.compute_dynamic_seqpav(profile, [2], verbose=VERBOSE)
    print("After implementing the second candidate, we have r^2 = " + str(ranking) + "\n")
    ranking = dprrules.compute_lazy_seqpav(profile, [], verbose=VERBOSE)
    # print("x = " + str(x))
    print("r^1 = " + str(ranking))
    ranking = dprrules.compute_lazy_seqpav(profile, [2], verbose=VERBOSE)
    print("After implementing the second candidate, we have r^2 = " + str(ranking) + "\n")

# profile = Profile(2409)
# # c_1 to c_12 are 1 through 12, a and b are 13 and 14
# prefs = []
# for i in range(200):
#     prefs += [[1, 13, 14]]
# for i in range(209):
#     prefs += [[2, 13, 14]]
# pref = list(range(1, 13))
# for i in range(600):
#     prefs += [pref]
# pref = list(range(2, 13))
# for i in range(500):
#     prefs += [pref]
# pref = list(range(3, 13))
# for i in range(900):
#     prefs += [pref]
# profile.add_preferences(prefs)
# committeesize = 12
# for k in range(13)[6:8]:
#     print('------ k = ' + str(k) + ' ------')
#     print(abcrules.compute_rule_x(profile, k, verbose=2, skip_phragmen_phase=True))

if 'JS violation' in EXAMPLES:
    print('----------------------------------------------------------------------')
    print("Ex. JS violation: dynamic rules do not satisfy JS for T=2")
    num_cand = 8
    profile = Profile(num_cand)
    ballotts = []
    for i in range(10): 
        ballotts += [list(range(4))] # a_j
    for i in range(10): 
        ballotts += [list(range(4,8))] # b_j
    profile.add_preferences(ballotts)
    phragemn_election = dprsequence.DPRSequence(profile, 'dseqphrag')
    phragmen_outcomes = phragemn_election.run_by_rank([1,2])
    print(phragmen_outcomes[2][0] == [4,5])
    seqpav_election = dprsequence.DPRSequence(profile, 'dseqpav')
    seqpav_outcomes = phragemn_election.run_by_rank([1,2])
    print(seqpav_outcomes[2][0] == [4,5])

if 'enestroem-phragmen' in EXAMPLES:
    print('----------------------------------------------------------------------')
    print("Ex. enestroem-phragmen: dynamic rules have long dry-spell on example 36/37 in enestroem-phragmen paper")
    num_cand = 18
    profile = Profile(num_cand)
    ballotts = []
    for i in range(1): 
        ballotts += [[0,6,12]] # a
    for i in range(9): 
        ballotts += [[0,1,6,7,12,13]] # a,b
    for i in range(9): 
        ballotts += [[0,2,6,8,12,14]] # a,c
    for i in range(9): 
        ballotts += [[1,7,13]] # b
    for i in range(9): 
        ballotts += [[2,8,14]] # c
    for i in range(13): 
        ballotts += [[3,4,5,9,10,11,15,16,17]] # k,l,m
    # print(ballotts)
    profile.add_preferences(ballotts)
    phragemn_election = dprsequence.DPRSequence(profile, 'dseqphrag')
    phragmen_outcomes = phragemn_election.run_by_name([0,1,2,6,7,8,13,14])
    print(phragmen_outcomes)
    seqpav_election = dprsequence.DPRSequence(profile, 'dseqpav')
    seqpav_outcomes = seqpav_election.run_by_name([0,1,2,6,7,8,13,14], verbose=0)
    print(seqpav_outcomes)

    # new_profile = Profile(num_cand)
    # new_ballotts = []
    # for i in range(37): 
    #     new_ballotts += [[0,1,2,6,7,8]] # a,b,c
    # for i in range(13): 
    #     new_ballotts += [[3,4,5,9,10,11]] # k,l,m
    # # print(new_ballotts)
    # new_profile.add_preferences(new_ballotts)
    # phragmen_election = dprsequence.DPRSequence(new_profile, 'dseqphrag')
    # phragmen_outcomes = phragmen_election.run_by_rank([1,2])
    # # print(phragmen_outcomes)
    # seqpav_election = dprsequence.DPRSequence(new_profile, 'dseqpav')
    # seqpav_outcomes = seqpav_election.run_by_rank([1,2])
    # print(seqpav_outcomes)

if 'introductory_example' in EXAMPLES:
    print('----------------------------------------------------------------------')
    print("Ex. introductory_example: example used in our DPR paper as an introduction of the rules")
    num_cand = 5
    profile = Profile(num_cand)
    ballotts = []
    for i in range(3): 
        ballotts += [[0,1]] # a,b
    for i in range(3): 
        ballotts += [[2,3]] # c,d
    for i in range(1): 
        ballotts += [[4]] # e
    profile.add_preferences(ballotts)
    d_phrag_election = dprsequence.DPRSequence(profile, 'dseqphrag')
    d_phrag_outcomes = d_phrag_election.run_by_rank([0])
    print('d_phrag' + str(d_phrag_outcomes))
    d_seqpav_election = dprsequence.DPRSequence(profile, 'dseqpav')
    d_seqpav_outcomes = d_seqpav_election.run_by_rank([0])
    print('d_seqPAV' + str(d_seqpav_outcomes))
    l_phrag_election = dprsequence.DPRSequence(profile, 'lseqphrag')
    l_phrag_outcomes = l_phrag_election.run_by_rank([0])
    print('l_phrag' + str(l_phrag_outcomes))
    l_seqpav_election = dprsequence.DPRSequence(profile, 'lseqpav')
    l_seqpav_outcomes = l_seqpav_election.run_by_rank([0])
    print('l_seqpav' + str(l_seqpav_outcomes))

if 'non-sci_example' in EXAMPLES:
    print('----------------------------------------------------------------------')
    print("Ex. non-sci_example: example used in the non-scientific version of our DPR paper")
    num_cand = 12
    profile = Profile(num_cand)
    ballotts = []
    for i in range(5): 
        ballotts += [[0,1,2,3,4]] # m_1,...,m_5
    for i in range(3): 
        ballotts += [[5,6,7,8,9]] # d_1,...,d_5
    for i in range(1): 
        ballotts += [[10,11]] # h_1,h_2
    profile.add_preferences(ballotts)
    d_phrag_election = dprsequence.DPRSequence(profile, 'dseqphrag')
    d_phrag_outcomes = d_phrag_election.run_by_rank([1])
    print('d_phrag' + str(d_phrag_outcomes))
    d_seqpav_election = dprsequence.DPRSequence(profile, 'dseqpav')
    d_seqpav_outcomes = d_seqpav_election.run_by_rank([1], verbose=0)
    print('d_seqPAV' + str(d_seqpav_outcomes))
    print("In the non-sci version we use the output of d-seqPhrag here. The difference to d-seqPAV is only in tie-breaking.")
    l_phrag_election = dprsequence.DPRSequence(profile, 'lseqphrag')
    l_phrag_outcomes = l_phrag_election.run_by_rank([0,0,0])
    print('l_phrag' + str(l_phrag_outcomes))
    l_seqpav_election = dprsequence.DPRSequence(profile, 'lseqpav')
    l_seqpav_outcomes = l_seqpav_election.run_by_rank([0,0,0])
    print('l_seqpav' + str(l_seqpav_outcomes))
