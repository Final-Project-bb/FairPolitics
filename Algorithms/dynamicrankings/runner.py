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


base_path = Path(__file__).parent
old_folder = 'quasi_parties_2'
new_folder = 'quasi_parties_2_5'
timestamp = '2021_01_11_15_48'
setup_file_path = (base_path / ("./data/" + old_folder + "/" + timestamp + "_setup.csv")).resolve()
original_exp_path = (base_path / ("./data/" + old_folder + "/" + timestamp + "_experiment.csv")).resolve()
clean_data_path = (base_path / ("./data/" + new_folder + "/" + timestamp + "_cleaned.csv")).resolve()
new_exp_path = (base_path / ("./data/" + new_folder + "/" + timestamp + "_experiment.csv")).resolve()
helper_functions.write_election_data_only(original_exp_path, clean_data_path)
measures = {
    'avg_sat_r': [range(5), 5],
    'avg_sat_tau': [range(5)],
    'avg_sat_sum': [],
    'gr_values': [range(5), 0.5],
    'gr_values_tau': [range(5), 0.5],
    'mono_viol': [range(5), 5],
    'dry_spells': [range(5)],
}
helper_functions.measurements_from_data(
    clean_data_path, setup_file_path, new_exp_path,
    20, 60, 20, 50, 5, measures  
)

# check whether everything worked out nicely
with open(original_exp_path, 'r') as old_file, open(new_exp_path, 'r') as new_file:
    fileone = old_file.readlines()
    filetwo = new_file.readlines()

err = 0
for line in fileone[1:]:
    if line not in filetwo:
        err = err + 1
for line in filetwo[1:]:
    if line not in fileone:
        err = err + 1
if err:
    print(str(err) + ' mismatching lines.')
else:
    print('Success!')

