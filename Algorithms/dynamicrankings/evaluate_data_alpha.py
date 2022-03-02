import numpy as np
import matplotlib
import matplotlib.pyplot as plt
import csv
from pathlib import Path


import matplotlib
matplotlib.rcParams['pdf.fonttype'] = 42
matplotlib.rcParams['ps.fonttype'] = 42

FOLDER_NAME = 'final_new/'
FILE_NAME = '2021_03_23_10_47_experiment.csv'
TIMEHORIZON = 11
MAX_SAT = 5
RULES = [
    'av',
    'dseqpav',
    'lseqpav',
    'dseqphrag',
    'lseqphrag'
]
LONGNAMES = {
    'av' : 'AV',
    'dseqpav' : 'dyn. seqPAV',
    'lseqpav' : 'myop. seqPAV',
    'dseqphrag': 'dyn. Phragmén',
    'lseqphrag': 'myop. Phragmén'
}
ATTRIBUTES = [
    'avg_sat(tau)',
    # 'avg_sat(r and tau)',
]
NUM_VOTERS = 60
GROUP_SIZES = [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60]

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


x_axis = [round(alpha, 4) for alpha in alphas]
plt.figure(figsize=(3*len(ATTRIBUTES) + 3, 5))
count = 1
for attr in ATTRIBUTES:
    args = []
    labels = []
    for rule in RULES:
        y_axis = []
        for alpha in alphas:
            y_axis.append(averages[rule][alpha][attr][TIMEHORIZON - 1])
        style = styles[rule]
        args.append(x_axis)
        args.append(y_axis)
        args.append(style)
        labels.append(LONGNAMES[rule])
    plt.subplot(1, len(ATTRIBUTES), count)
    plt.plot(*args, linewidth=2.5)
    # if count == 1:
    #     plt.legend(labels, fontsize='x-large')
    if attr == 'avg_sat(tau)':
        y_text = r'$avg_V(X^{' + str(TIMEHORIZON+1) + r'})$'
    else:
        y_text = attr
    plt.ylabel(y_text, fontsize='x-large')
    plt.xlabel(r'alpha',  fontsize='x-large')
    plt.yticks(fontsize='x-large')
    plt.xticks(fontsize='x-large')
    count = count + 1
# plt.show()
plt.savefig('eval_alpha_blurry.eps', format='eps')
