import numpy as np
import matplotlib.pyplot as plt
import csv
import json
import sys
from pathlib import Path

sys.path.insert(0, '..')
from abcvoting.preferences import Profile
from abcvoting import abcrules
from dynamicrankings import dprrules
from dynamicrankings import dprsequence
from dynamicrankings import pref_generator


def write_election_data_only(origin_file_path, destination_file_path):
    """ Clean up the data in origin_file_path by erasing data for measurements. """
    with open(origin_file_path) as origin:
        reader = csv.DictReader(origin)
        with open(destination_file_path, 'w', newline='') as destination:
            writer = csv.writer(destination, dialect='excel')
            writer.writerow(['rule', 'seed', 'tau', 'ranking', 'group_size'])
            for row in reader:
                writer.writerow([
                    row['rule'], row['seed'], row['tau'], row['ranking'], row['group_size']
                ])

def measurements_from_data(clean_data_file_path, setup_file_path, destination_file_path, num_cand, num_voters, num_rnds, num_exp, num_rules, measures):
    """ Write file with election data and measuremtns data. """
    # read setup from setup_file and build profiles
    # (maybe without giving setup-filepath explicitly)
    profiles = []
    with open(setup_file_path) as setup_file:
        setup_reader = csv.DictReader(setup_file)
        for _ in range(num_exp):
            prefs = []
            for _ in range(num_voters):
                row  = next(setup_reader)
                if type(row['voter_pref']) == str:
                    prefs.append(json.loads(row['voter_pref']))
                else:
                    prefs.append(row['voter_pref'])
            profile = Profile(num_cand)
            profile.add_preferences(prefs)
            profiles.append(profile)
    # read outcomes from file and set up election with these outcomes
    elections = []
    with open(clean_data_file_path) as data_file:
        data_reader = csv.DictReader(data_file)
        for exp in range(num_exp):
            for _ in range(num_rules):
                outcomes = []
                for rnd in range(num_rnds):
                    row = next(data_reader)
                    # if exp == 0 and _ == 0 and rnd == 0:
                    #     print(row)
                    outcome = []
                    if type(row['tau']) == str:
                        outcome.append(json.loads(row['tau']))
                    else:
                        outcome.append(row['tau'])
                    if type(row['ranking']) == str:
                        outcome.append(json.loads(row['ranking']))
                    else:
                        outcome.append(row['ranking'])
                    outcomes.append(outcome)
                election = dprsequence.DPRSequence(profiles[exp], row['rule'])
                # if exp == 0 and _ == 0:
                    # print(outcomes)
                election.set_outcomes(outcomes)
                election.set_info({'seed': row['seed'], 'alpha': row['group_size']})
                elections.append(election)
    # perform measurements on these elections and write them down into file
    # measurements should have the form of {'avg_sat_r': [voters, windowheight], ...}
    measures_list = list(measures.keys())
    with open(destination_file_path, 'w', newline='') as dest_file:
        writer = csv.writer(dest_file, dialect='excel')
        header = ['rule', 'seed', 'tau', 'ranking', 'group_size'] + measures_list
        writer.writerow(header)
    for election in elections:
        outcomes = election.outcomes
        # print(outcomes)
        data = {}
        if 'avg_sat_r' in measures.keys():
            args = measures['avg_sat_r']
            data['avg_sat_r'] = election.get_avg_sat(*args)
        if 'avg_sat_tau' in measures.keys():
            args = measures['avg_sat_tau']
            data['avg_sat_tau'] = election.get_avg_sat_tau(*args)
            if 'avg_sat_r' in measures.keys() and 'avg_sat_sum' in measures.keys():
                data['avg_sat_sum'] = {}
                for rnd in range(num_rnds):
                    data['avg_sat_sum'][rnd] = data['avg_sat_tau'][rnd] + data['avg_sat_r'][rnd]
                # data['avg_sat_sum'] = [sum(x) for x in zip(data['avg_sat_tau'], data['avg_sat_r'])]
        if 'dry_spells' in measures.keys():
            args = measures['dry_spells']
            dry_spell_rounds = election.get_dry_spells(*args)
            data['dry_spells'] = []
            for rnd in range(len(outcomes)):
                is_dry_round = 1 if rnd in dry_spell_rounds else 0
                data['dry_spells'].append(is_dry_round)
        if 'gr_values' in measures.keys():
            args = measures['gr_values']
            data['gr_values'] = election.get_group_represenation(args[0], frac=args[1])
        if 'gr_values_tau' in measures.keys():
            args = measures['gr_values_tau']
            data['gr_values_tau'] = election.get_group_represenation(args[0], frac=args[1], use_tau=True)
        if 'mono_viol' in measures.keys():
            args = measures['mono_viol']
            mono_viol_rounds = election.get_mono_violations(*args)
            data['mono_viol'] = []
            for rnd in range(len(outcomes)):
                is_mono_viol = 1 if rnd in mono_viol_rounds else 0
                data['mono_viol'].append(is_mono_viol)
        # append info to file
        with open(destination_file_path, 'a', newline='') as dest_file:
            writer = csv.writer(dest_file, dialect='excel')
            for rnd in range(len(outcomes)):
                row = [
                    election.rule.rule_id, election.info['seed'], outcomes[rnd][0],
                    outcomes[rnd][1], election.info['alpha']]
                for measure in measures_list:
                    row.append(data[measure][rnd])
                writer.writerow(row)
