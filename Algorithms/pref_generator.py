"""
Generator for different kinds of approval preferences.
"""

import random
import math
import itertools
from abcvoting.preferences import Profile

class PrefGenerator(object):
    def __init__(self, num_voter, num_cand):
        self.num_voter = num_voter
        self.num_cand = num_cand
        self.profile = None

    def set_voter_cand(self, num_voter=None, num_cand=None):
        if num_voter:
            self.num_voter = num_voter
        if num_cand:
            self.num_cand = num_cand

    def clean_profile(self):
        """
        Delete all candidates that have no supporter and adapt num_cands.
        """
        voters = range(self.num_voter)
        candidates = range(self.num_cand)
        ballots = self.profile.aslist()
        # find all candidates without supporters
        supported = set(itertools.chain.from_iterable(ballots))
        unsupported = list(set(candidates).difference(supported))
        unsupported.sort(reverse=True)
        if len(unsupported) > 0:
            # lower the count (the name) of the supported candidates that have higher count
            # than the unsupported canidates to close gaps in the list of supported candidates
            for cand in unsupported:
                for voter in voters:
                    ballots[voter][:] = [x if x < cand else x-1 for x in ballots[voter]]
            self.num_cand = self.num_cand - len(unsupported)
            self.profile = None
            self.profile = Profile(self.num_cand)
            self.profile.add_preferences(ballots)


    def generate_uniform_random(self):
        """
        For each candidate, independently decide whether to take it.
        """
        ballot = self.__generate_UR(self.num_voter, range(self.num_cand))
        self.profile = None
        self.profile = Profile(self.num_cand)
        self.profile.add_preferences(ballot)

    def generate_size_random(self):
        """
        Uniformly at random decide on size of approval set and then fill it.
        """
        ballot = self.__generate_SR(self.num_voter, range(self.num_cand))
        self.profile = None
        self.profile = Profile(self.num_cand)
        self.profile.add_preferences(ballot)


    def generate_by_alpha(self, alpha, fixed_pref, algo):
        """
        Generate an alpha-fraction (rounded up) of the voters with
        fixed preference. The others are randomly drawn by algo.
        """
        if alpha < 0 or alpha > 1:
            raise ValueError("alpha has to be in [0,1].")
        if algo not in ['UR', 'SR']:
            algo = 'UR'
        ballot = []
        group_size = math.ceil(self.num_voter * alpha)
        for _ in range(group_size):
            ballot.append(fixed_pref)
        
        remaining_cands = [cand for cand in range(self.num_cand)
                            if cand not in fixed_pref]
        remaining_size = self.num_voter - group_size
        if algo == 'UR':
            ballot += self.__generate_UR(remaining_size, remaining_cands)
        if algo == 'SR':
            ballot += self.__generate_SR(remaining_size, remaining_cands)
        self.profile = None
        self.profile = Profile(self.num_cand)
        self.profile.add_preferences(ballot)


    def generate_by_size(self, group_size, fixed_pref, algo):
        """
        Generate group_size-many voters with
        fixed preference. The others are randomly drawn by algo.
        """
        if group_size not in range(self.num_voter):
            raise ValueError("size has to be in [num_voter].")
        if algo not in ['UR', 'SR']:
            algo = 'UR'
        ballot = []
        for _ in range(group_size):
            ballot.append(fixed_pref)
        
        remaining_cands = [cand for cand in range(self.num_cand)
                            if cand not in fixed_pref]
        remaining_size = self.num_voter - group_size
        if algo == 'UR':
            ballot += self.__generate_UR(remaining_size, remaining_cands)
        if algo == 'SR':
            ballot += self.__generate_SR(remaining_size, remaining_cands)
        self.profile = None
        self.profile = Profile(self.num_cand)
        self.profile.add_preferences(ballot)


    def generate_quasi_parties(self, party_sizes, party_probs, party_prefs):
        """
        Generate sum(party_sizes) many voters of len(party_sizes) parties
        where each party p in len(party_sizes) has voters that approve of each
        cand in party_prefs[p] with probability party_prob[p] and 1-party_prob[p]
        of all other candidates.
        This function overrides self.num_voter!
        """
        if len(party_sizes) != len(party_probs) or len(party_sizes) != len(party_prefs):
            message = 'party_sizes, party_probs and party_prefs must be of same lengths.'
            raise ValueError(message)
        if len(party_sizes) <= 1:
            message = 'At least two parties needed.'
            raise ValueError(message)
        parties = range(len(party_sizes))
        ballot = []
        num_voter = 0

        for p in parties:
            party_cands = party_prefs[p]
            # generate list of (unique) candidates not approved by party
            # other_prefs = [party_list for index, party_list in enumerate(party_prefs) if index != p]
            # other_cands = [cand for party_list in other_prefs for cand in party_list]
            other_cands = list(set(range(self.num_cand)).difference(set(party_cands)))
            for _ in range(party_sizes[p]):
                pref = []
                num_voter = num_voter + 1
                for cand in party_cands:
                    # weighted coin-flip
                    if random.random() < party_probs[p]:
                        pref.append(cand)
                for cand in other_cands:
                    # weighted coin-flip
                    if random.random() < (1-party_probs[p]):
                        pref.append(cand)
                ballot.append(pref)
        self.num_voter = num_voter
        self.profile = None
        self.profile = Profile(self.num_cand)
        self.profile.add_preferences(ballot)


    def generate_spatial(self, group_sizes, group_deviations, group_radius, group_cands=None):
        """
        Generate sum(group_sizes) many voters of len(group_sizes) parties from a
        spatial model where each group V in len(group_sizes) has center point chosen
        uniform at random in [0,1]x[0,1]. All voters in V are points around that
        center drawn according to a 2-dim Gaussian with standard deviation as given
        in group_deviations. Candidates are drawn undifomrly at random similar to
        center points. Each voter approves of all candidates with euclidean distance
        less or equal to group_radius.
        If group_cands is given as a list of integers with sum <= self.num_cand, each
        group g draws group_cands[g] many candidates from their prop. distribution.
        This function overrides self.num_voter!
        """
        if len(group_sizes) != len(group_deviations) or len(group_sizes) != len(group_radius):
            message = 'Lists in the input must be of same lengths.'
            raise ValueError(message)
        if len(group_sizes) <= 1:
            message = 'At least two groups needed.'
            raise ValueError(message)
        if group_cands:
            if len(group_sizes) != len(group_cands) or sum(group_cands) > self.num_cand:
                group_cands = None
        groups = range(len(group_sizes))
        num_voter = 0
        group_centers = []

        # generate group centers
        for p in groups:
            group_centers.append((random.random(), random.random()))

        # generate points of candidates
        cand_points = []
        num_group_cands = 0
        if group_cands:
            num_group_cands = sum(group_cands)
            for p in groups:
                for cand in range(group_cands[p]):
                    cand_points.append(self.__draw_2dim_gauss_restricted(group_centers[p], group_deviations[p]))
        for cand in range(self.num_cand - num_group_cands):
            cand_points.append((random.random(), random.random()))

        # generate voter points and their approval ballots
        ballot = []
        for p in groups:
            group_center = group_centers[p]
            for _ in range(group_sizes[p]):
                voter_point = self.__draw_2dim_gauss_restricted(group_center, group_deviations[p])
                pref  = []
                num_voter = num_voter + 1
                for cand in range(self.num_cand):
                    if self.__euclidean_distance(voter_point, cand_points[cand]) <= group_radius[p]:
                        pref.append(cand)
                ballot.append(pref)
        self.num_voter = num_voter
        self.profile = None
        self.profile = Profile(self.num_cand)
        self.profile.add_preferences(ballot)


    def generate_spatial_3_fixed_centers(self, group_sizes, group_deviations, group_cands=None):
        """
        Same as generate_spatial but specifically for 3 groups and with fixed centres.
        Generate sum(group_sizes) many voters of len(group_sizes) parties from a
        spatial model where each group V in len(group_sizes) has a fixed center 
        point. All voters in V are points around that
        center drawn according to a 2-dim Gaussian with standard deviation as given
        in group_deviations. Candidates are drawn undifomrly at random similar to
        center points. Each voter approves of all candidates with euclidean distance
        less or equal to group_deviations (This is to simplify things).
        If group_cands is given as a list of integers with sum <= self.num_cand, each
        group g draws group_cands[g] many candidates from their prop. distribution.
        This function overrides self.num_voter!
        """
        if len(group_sizes) != 3 or len(group_deviations) != 3:
            message = 'Lists in the input must be of length 3'
            raise ValueError(message)
        if len(group_sizes) <= 1:
            message = 'At least two groups needed.'
            raise ValueError(message)
        if group_cands:
            if len(group_sizes) != 3 or sum(group_cands) > self.num_cand:
                group_cands = None
        groups = range(len(group_sizes))
        num_voter = 0
        y_value = math.sin(math.radians(120))
        group_centers = [(1,0), (-0.5, y_value), (-0.5,-y_value)]

        # generate points of candidates
        cand_points = []
        num_group_cands = 0
        if group_cands:
            num_group_cands = sum(group_cands)
            for p in groups:
                for cand in range(group_cands[p]):
                    cand_points.append(self.__draw_2dim_gauss(group_centers[p], group_deviations[p]))
        for cand in range(self.num_cand - num_group_cands):
            cand_points.append((random.random(), random.random()))

        # generate voter points and their approval ballots
        ballot = []
        for p in groups:
            group_center = group_centers[p]
            for _ in range(group_sizes[p]):
                voter_point = self.__draw_2dim_gauss(group_center, group_deviations[p])
                pref  = []
                num_voter = num_voter + 1
                for cand in range(self.num_cand):
                    if self.__euclidean_distance(voter_point, cand_points[cand]) <= 2*group_deviations[p]:
                        pref.append(cand)
                ballot.append(pref)
        self.num_voter = num_voter
        self.profile = None
        self.profile = Profile(self.num_cand)
        self.profile.add_preferences(ballot)


    def __draw_2dim_gauss(self, center, deviation):
        """
        Helper function for 2-dim Gaussian distribution.
        """
        x = random.gauss(center[0], deviation)
        y = random.gauss(center[1], deviation)
        return (x, y)


    def __draw_2dim_gauss_restricted(self, center, deviation):
        """
        Helper function for 2-dim Gaussian distribution.
        Only uses a point if it is inside of [0,1]x[0,1].
        """
        x, y = -1, -1
        while x < 0:
            x = random.gauss(center[0], deviation)
        while y < 0:
            y = random.gauss(center[1], deviation)
        return (x, y)


    def __euclidean_distance(self, a, b):
        """
        Helper function for 2-dim Euclidean distance.
        """
        sum_of_squares = sum(((a[0]-b[0])**2, (a[1]-b[1])**2))
        return sum_of_squares ** 0.5


    def __generate_UR(self, remaining_size, remaining_cands):
        """
        Helper-function for generate_uniform_random.
        """
        ballot = []
        for _ in range(remaining_size):
            pref = []
            for cand in remaining_cands:
                if random.randint(0, 1) == 0:
                    pref.append(cand)
            ballot.append(pref)
        return ballot


    def __generate_SR(self, remaining_size, remaining_cands):
        """
        Helper-function for generate_size_random.
        """
        num_rem_cand = len(remaining_cands)
        ballot = []
        for _ in range(remaining_size):
            length = random.randint(1, num_rem_cand)
            pref = random.sample(remaining_cands, length)
            ballot.append(pref)
        return ballot

