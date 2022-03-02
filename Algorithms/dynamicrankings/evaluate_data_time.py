import numpy as np
import matplotlib.pyplot as plt
import csv
from pathlib import Path

import matplotlib
matplotlib.rcParams['pdf.fonttype'] = 42
matplotlib.rcParams['ps.fonttype'] = 42


FOLDER_NAME = 'final_2/'
FILE_NAME = '2021_01_19_19_42_experiment.csv'
# FOLDER_NAME = ''
# FILE_NAME = 'blurred_parties-vs_time2021_01_19_19_42_experiment.csv'
TIMEHORIZON = 11 # has to be <= minimum number of rounds of experiments
MAX_SAT = 5
RULES = [
    'av',
    'dseqpav',
    'lseqpav',
    'dseqphrag',
    'lseqphrag'
]
ATTRIBUTES = [
    'avg_sat(r_\leq k)',
    # 'avg_sat(tau)',
    # 'avg_sat(r and tau)',
    # 'gr_values',
    # 'gr_values_tau',
    # 'mono_viol',
    # 'dry_spells'
]
NUM_VOTERS = 60
GROUP_SIZES = [15]
# GROUP_SIZES = [5, 7, 10, 12, 15, 17, 20]


SEEDS = range(100)

base_path = Path(__file__).parent
file_path = (base_path / ('data/' + FOLDER_NAME + FILE_NAME)).resolve()

# initiate data structure
alphas = [x/NUM_VOTERS for x in GROUP_SIZES]
data = {}
num_of_rounds = {}
for rule in RULES:
    data[rule] = {}
    num_of_rounds[rule] = {}
    for alpha in alphas:
        data[rule][alpha] = {}
        num_of_rounds[rule][alpha] = {}
        for attr in ATTRIBUTES:
            data[rule][alpha][attr] = []
            num_of_rounds[rule][alpha][attr] = {}
            for seed in SEEDS:
                num_of_rounds[rule][alpha][attr][seed] = 0


# populate lists with interesting data
with open(file_path) as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        for attr in ATTRIBUTES:
            if row['rule'] in RULES:
                if float(row['group_size']) in alphas:
                    num_of_rounds[row['rule']][float(row['group_size'])][attr][int(row['seed'])] += 1
                    if num_of_rounds[row['rule']][float(row['group_size'])][attr][int(row['seed'])] <= TIMEHORIZON:
                        data[row['rule']][float(row['group_size'])][attr].append(float(row[attr]))


# turn long lists of values (concatenated over multiple seeds etc) into multi-dim np.array
for rule in RULES:
    for alpha in alphas:
        for attr in ATTRIBUTES:
            data[rule][alpha][attr] = np.array(data[rule][alpha][attr]).reshape((-1, TIMEHORIZON))


# get averages over all seeds
averages = {}
for rule in RULES:
    averages[rule] = {}
    for alpha in alphas:
        averages[rule][alpha] = {}
        for attr in ATTRIBUTES:
            averages[rule][alpha][attr] = np.ma.masked_invalid(data[rule][alpha][attr]).mean(axis=0)


styles = {
    'av' : 'r-',
    'dseqpav' : 'b-',
    'lseqpav' : 'b--',
    'dseqphrag': 'c-',
    'lseqphrag': 'c--'
}
time_attributes = ATTRIBUTES
# plot averages per attribute for all rules
x_axis = range(1, TIMEHORIZON + 1)
plt.figure(figsize=(3*len(time_attributes) + 3, 3*len(alphas) + 2))
count = 1
for alpha in alphas:
    for attr in time_attributes:
        args = []
        labels = []
        for rule in RULES:
            y_axis = averages[rule][alpha][attr]
            style = styles[rule]
            args.append(x_axis)
            args.append(y_axis)
            args.append(style)
            labels.append(rule)
        axes = plt.subplot(len(alphas), len(time_attributes), count)
        plt.plot(*args, linewidth=2.5)
        if count == 2:
            plt.legend(labels, fontsize='x-large')
        if attr == 'avg_sat(r_\leq k)':
            y_text = r'$avg_V(r^t_{<= 5})$'
        else:
            y_text = attr
        plt.ylabel(y_text, fontsize=18)
        plt.xlabel(r'$t$', fontsize='x-large')
        plt.xticks(range(1, TIMEHORIZON + 1, 1), fontsize='x-large')
        plt.yticks(fontsize='x-large')
        axes.yaxis.set_label_coords(-0.08,0.5)
        print(axes.get_position())
        axes.set_position([0.5,0, 1, 1])
        # plt.yticks(np.arange(0, 2.6, 0.5), fontsize='x-large')
        count = count + 1
# plt.rcParams.update({'font.size': 1})
plt.show()
# plt.savefig('eval_time_blurred.eps', format='eps')
