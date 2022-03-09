// Sequence of consecutive DPR elections with implementations.
const { DPRRule, compute, compute_lazy_seqpav, compute_dynamic_seqpav, __phragmen_loads_from_sequence,
    compute_lazy_seqphrag, compute_av, get_rulesinfo } = require('./dprrules');

module.exports = class DPRSequence {
    // Sequence of consecutive DPR elections with implementations.
    constructor(profile, rule_name, info=null) {
        this.profile = profile;
        this.rule_name = get_rulesinfo(rule_name);
        this.outcomes = null;
        this.info = info;
    }
    
    set_profile(profile) {
        this.profile = profile;
    }
    
    set_rule(rule_name) {
        this.rule = rule_name;
    }
    
    set_outcomes(outcomes) {
        // Behavior is undefined if outcomes does not match profile!
        this.outcomes = outcomes;
    }
    
    set_info(info) {
        this.info = info;
    }

    toString() {
        return `
    {
        profile: {
            names: ${JSON.stringify(this.profile[0])},
            num_cand: ${JSON.stringify(this.profile[1])},
            preferences: ${JSON.stringify(this.profile[2])},
        rule: {
            rule_id: ${JSON.stringify(this.rule_name[0])},
            shortname: ${JSON.stringify(this.rule_name[1])},
            longname: ${JSON.stringify(this.rule_name[2])},
            function: ${JSON.stringify(this.rule_name[3])},
            algorithm: ${JSON.stringify(this.rule_name[4])},
            resolute: ${JSON.stringify(this.rule_name[5])},
        outcomes: ${JSON.stringify(this.outcomes)},
        info: ${JSON.stringify(this.info)}
    }`
    }

    run_random(windowheight, timehorizon, prob_type='unif', verbose=0, resolute=true) {
        // Let election run for timehorizon many steps, where candidates get implemented
        // according to prob_type among the first windowheight many canidates in each round.
        // This depends on the voting rule used!
        if (timehorizon > this.profile[1]) {
            var message = `Timehorizon is set too high for profile of ${JSON.stringify(this.profile[1])} candidates`;
            throw message
        }
        if ((prob_type !== 'unif') && (prob_type !== 'decr') && (prob_type !== 'gctr')) {
            var message = `Probability type ${JSON.stringify(prob_type)} not supported.`;
            throw message
        }
        var outcomes = [];
        var curr_tau = [];
        var curr_ranking = [];
        var next_impl;

        // optional output
        if (verbose > 0) {
            console.log(`Computing ${JSON.stringify(timehorizon)} iterations`);
            console.log(" of DPR-elections with rule " + this.rule.longname);
            if (prob_type === 'unif') {
                console.log("with uniformly at random implemented candidates.");
            }
            if (prob_type === 'decr') {
                console.log("with randomly implemented candidates (using harmonically decreasing probs).");
            }
            if (prob_type === 'gctr') {
                console.log("with randomly implemented candidates (using Googles ctr).");
            }
        }
        // end of optional output

        for (let i = 0; i < timehorizon; i++) {
            curr_ranking = this.rule.compute(this.profile, curr_tau, verbose=verbose, resolute=resolute);
            outcomes.concat(curr_tau).concat(curr_ranking);
            if (prob_type === 'unif') {
                next_impl = this.__random_uniform_implementation(curr_ranking, windowheight);
            }
            if (prob_type === 'decr') {
                next_impl = this.__random_decreasing_implementation(curr_ranking, windowheight);
            }
            if (prob_type === 'gctr') {
                next_impl = this.__random_ctr_implementation(curr_ranking, windowheight);
            }

            // optional output
            if (verbose > 0) {
                console.log(`\nCurrent dynamic ranking consits of tau: ${JSON.stringify(curr_tau)}, r: ${JSON.stringify(curr_ranking)}.
                            The next implemented candidate is ${JSON.stringify(next_impl)}`);
            }
            // end of optional output

            curr_tau = curr_tau + [next_impl];
        }

        this.outcomes = outcomes;
        return outcomes;
    }

    get_random_ranks(windowheight, timehorizon, prob_type='unif', verbose=0, resolute=true) {
        // Output timehorizon-1 many ranks, where ranks get chosen according to prob_type 
        // among the first windowheight many ranks. These ranks can then be used for run_by_rank.
        // This is independent of the voting rule used.
        if (timehorizon > this.profile[1]) {
            var message = `Timehorizon is set too high for profile of ${JSON.stringify(this.profile[1])} candidates`;
            throw message
        }
        if ((prob_type !== 'unif') && (prob_type !== 'decr') && (prob_type !== 'gctr')) {
            var message = `Probability type ${JSON.stringify(prob_type)} not supported.`;
            throw message
        }
        var ranks = [];
        var curr_ranking = [];
        var next_impl;
        // use dummy ranking to get ranks
        for (let i of range(his.profile[1])) {
            curr_ranking[i] = i;
        }

        // optional output
        if (verbose > 0) {
            console.log(`Computing ${JSON.stringify(timehorizon)} ranks`);
            console.log(" for DPR-elections ");
            if (prob_type === 'unif') {
                console.log("with uniformly at random chosen ranks.");
            }
            if (prob_type === 'decr') {
                console.log("with randomly chosen ranks (using harmonically decreasing probs).");
            }
            if (prob_type === 'gctr') {
                console.log("with randomly chosen ranks (using Googles ctr).");
            }
        }
        // end of optional output

        for (let i = 0; i < timehorizon-1; i++) {
            if (prob_type === 'unif') {
                next_impl = this.__random_uniform_implementation(curr_ranking, windowheight);
            }
            if (prob_type === 'decr') {
                next_impl = this.__random_decreasing_implementation(curr_ranking, windowheight);
            }
            if (prob_type === 'gctr') {
                next_impl = this.__random_ctr_implementation(curr_ranking, windowheight);
            }
            ranks.push(next_impl);
            curr_ranking.pop(); 
        }
        return ranks;
    }

    __random_uniform_implementation(curr_ranking, windowheight) {
        var min_range = Math.min(curr_ranking.length, windowheight);
        var ind = Math.floor(Math.random() * min_range);
        return curr_ranking[ind];
    }

    __random_decreasing_implementation(curr_ranking, windowheight) {
        var min_range = Math.min(curr_ranking.length, windowheight);
        // use weights [1, 1/2, 1/3, ... , 1/min_range]
        var weights_vector = [];
        for (let i = 0; i < min_range; i++) {            
            weights_vector[i] = 1/(i+1);
        }
        var ind = weights_vector[Math.floor(Math.random() * weights_vector.length)];
        return curr_ranking[ind];
    }
    
    __random_ctr_implementation(curr_ranking, windowheight) {
        var min_range = Math.min(curr_ranking.length, windowheight);
        var weights_vector = [];
        var zeros = [];
        // use weights related to Googles ctr
        // source: http://info.chitika.com/uploads/4/9/2/1/49215843/chitikainsights-valueofgoogleresultspositioning.pdf
        var ctr = [32.5, 17.6, 11.4, 8.1, 6.1, 4.4, 3.5, 3.1, 2.6, 2.4, 1.0, 0.8, 0.7, 0.6, 0.4];
        if (min_range <= 15) {
            for (let i = 0; i < min_range; i++) {            
                weights_vector[i] = ctr[i];
            }
        }
        else {
            for (let i = 0; i < min_range-15; i++) {            
                zeros[i] = 0;
            }
            ctr.concat(zeros);
            weights_vector = [...ctr];
        }
        var ind = weights_vector[Math.floor(Math.random() * weights_vector.length)];
        return curr_ranking[ind];
    }

    run_by_rank(rank_sequence, verbose=0, resolute=true) {
        var adapted_max_value = 0; 
        for (const [ind, value] of rank_sequence.entries()) {
            if (ind+value > adapted_max_value) {
                adapted_max_value = ind+value;
            }
        }
        if (adapted_max_value > this.profile[1]) {
            var message = `Rank sequence too long or ranks too high for profile of ${JSON.stringify(this.profile[1])} candidates.`;
            throw message
        }
        var outcomes = [];
        var curr_tau = [];
        var curr_ranking = [];
        var next_impl;

        // optional output
        if (verbose > 0) {
            console.log(`Computing ${JSON.stringify(rank_sequence.length)} iterations`);
            console.log(" of DPR-elections with rule " + this.rule_name[2]);
            console.log(" given rank sequence of candidates to be implemented.");
        }
        // end of optional output

        // Perform computation of rankings w.r.t. rank_sequence.
        // Add a dummy s.t. all ranks get used.
        for (let i = 0; i < rank_sequence.length; i++) { // line 183 [-1]
            curr_ranking = this.rule.compute(this.profile, curr_tau, verbose=verbose, resolute=resolute);
            outcomes.concat(curr_tau).concat(curr_ranking);
            if (i >= 0) {
                next_impl = curr_ranking[i];
            }

            // optional output
            if (verbose > 0) {
                console.log(`\nCurrent dynamic ranking consits of tau: ${JSON.stringify(curr_tau)}, r: ${JSON.stringify(curr_ranking)}.`);
                if (i >= 0) {
                    console.log(`The next implemented candidate is ${JSON.stringify(next_impl)} with rank ${JSON.stringify(i)}`);
                }
            }
            // end of optional output

            curr_tau.push(next_impl);
        }
        this.outcomes = outcomes;
        return outcomes;
    }

    run_by_name(name_sequence, verbose=0, resolute=true) {
        var contains_duplicates = new Set(name_sequence);
        if (contains_duplicates.size !== name_sequence.length) {
            var message = "Given name sequence contains duplicates.";
            throw message;
        }
        var outcomes = [];
        var curr_tau = [];
        var curr_ranking = [];
        var tuple = [];

        // optional output
        if (verbose > 0) {
            console.log(`Computing ${JSON.stringify(name_sequence.length+1)} iterations 
            of DPR-elections with rule ${JSON.stringify(this.rule_name[2])} 
            given name sequence of candidates to be implemented.`);
        }
        // end of optional output

        name_sequence.push(-1);
        for (let i = 0; i < name_sequence.length; i++) {
            tuple = [];
            curr_ranking = compute(this.profile, this.rule_name, curr_tau, verbose=verbose, resolute=resolute);
            tuple.push(curr_tau);
            tuple.push(curr_ranking);
            outcomes.push(tuple);
            
            // optional output
            if (verbose > 0) {
                console.log(`\nCurrent dynamic ranking consits of tau: ${curr_tau}, r: ${curr_ranking}.`);
                if (i >= 0) {
                    console.log(`The next implemented candidate is ${JSON.stringify(i)}`);
                }
            }
            // end of optional output
            
            curr_tau = curr_tau.concat(Number(name_sequence[i]));
        }
        this.outcomes = outcomes;
        return outcomes;
    }

    run_adversarial(timehorizon, forbidden_cands, windowheight=None, verbose=0, resolute=true) {
        // Let election run for timehorizon many iterations. In each step implement the highest 
        // ranked candidate among the first windowheight many that is not in forbidden_cands. 
        // If there are no more such candidates, implement the lowest ranked forbidden candidate.
        if (typeof(forbidden_cands) !== object) {
            var message = "Given forbidden_cands has to be array.";
            throw message;
        }
        if (!windowheight) {
            windowheight = this.profile[1];
        }
        var outcomes = [];
        var curr_tau = [];
        var curr_ranking = [];
        var highest_cands = [];
        var allowed_cands = [];
        var next_impl;

        // optional output
        if (verbose > 0) {
            console.log(`Computing ${JSON.stringify(timehorizon)} iterations
            of DPR-elections with rule ${JSON.stringify(this.rule.longname)} 
            with adversarila decision maker.`);
        }
        // end of optional output

        for (let i = 0; i < timehorizon; i++) {
            curr_ranking = this.rule.compute(this.profile, curr_tau, verbose=verbose, resolute=resolute);
            outcomes.concat(curr_tau).concat(curr_ranking);
            for (let i = 0; i < windowheight; i++) {
                highest_cands[i] = curr_ranking[i];                
            }
            for (let i = 0; i < highest_cands.length; i++) {
                if (!forbidden_cands.includes(highest_cands[i])) {
                    allowed_cands.push(highest_cands[i]);
                }                
            }
            if (allowed_cands.length > 0) {
                next_impl = allowed_cands[0];
            }
            else {
                next_impl = lastIndexOf(highest_cands);
            }

            // optional output
            if (verbose > 0) {
                console.log(`\nCurrent dynamic ranking consits of tau: ${JSON.stringify(curr_tau)}, r: ${JSON.stringify(curr_ranking)}.`);
                console.log(`The next implemented candidate is ${JSON.stringify(next_impl)}`);
            }
            // end of optional output

            curr_tau = curr_tau + [next_impl];
        }
        this.outcomes = outcomes;
        return outcomes;
    }

    get_avg_sat(voters, windowheight, rounds=null) {
        // Get average satisfaction of a group of voters.
        if (this.outcomes == null) {
            var message = "No election outcome computed yet.";
            throw message;
        }
        if (rounds == null) {
            for (let i of range(his.profile[1])) {
                rounds[i] = i;
            }
        }
        if (typeof(rounds) == Number) {
            rounds = [rounds];
        }
        var avg_sat = {};
        var ranking_window = [];
        for (let i = 0; i < rounds.length; i++) {
            //ranking_window = this.outcomes
            avg_sat[i] = this.__avg_sat(voters, ranking_window);
        }
        return avg_sat;
    }

    get_avg_sat_tau(voters, rounds=null) {
        // Get average satisfaction of a group of voters with top-part.
        if (this.outcomes == null) {
            var message = "No election outcome computed yet.";
            throw message;
        }
        if (rounds == null) {
            for (let i of range(his.profile[1])) {
                rounds[i] = i;
            }
        }
        if (typeof(rounds) == Number) {
            rounds = [rounds];
        }
        var avg_sat = {};
        var cand_set = [];
        for (let i = 0; i < rounds.length; i++) {
            //cand_set = this.outcomes
            avg_sat[i] = this.__avg_sat(voters, cand_set);
        }
        return avg_sat;
    }

    __avg_sat(voters, cand_set) {
        // Compute average satisfaction of voters with cand_set.
        var num_voters = voters.length;
        var sat = 0;
        var appr_set = [];
        var intersection = [];
        for (let i = 0; i < num_voters; i++) {
            appr_set = this.profile[i].approved;
            for (const x in appr_set) {
                if (cand_set.has(x)) {
                    intersection.push(x);
                }
            }
            sat = sat + intersection.length;
        }
        return sat/num_voters;
    }

    get_dry_spells(voters, rounds=null) {
        // Get list of rounds that are dry spells of the voter group.
        if (this.outcomes == null) {
            var message = "No election outcome computed yet.";
            throw message;
        }
        if (rounds == null) {
            for (let i of range(his.profile[1])) {
                rounds[i] = i;
            }
        }
        if (typeof(rounds) == Number) {
            rounds = [rounds];
        }
        
        // build approval set of all voters in voters
        var appr_set = this.__build_union_of_approval_sets(voters);
        var dryspells = [];
        var newly_impl;
        for (let i = 0; i < rounds.length; i++) {
            // check whether a candidate approved by voters gets implemented
            if (i == 0) {
                continue;
            }
            // newly_impl = this.outcomes
            if (!appr_set.has(newly_impl)) {
                dryspells.push(i);
            }
        }
        return dryspells;
    }

    __build_union_of_approval_sets(voters) {
        var appr_set = new Set();
        for (let i = 0; i < voters.length; i++) {
            appr_set.add(this.profile[i].approved);
        }
        return appr_set;
    }

    __build_intersection_of_approval_sets(voters) {
        // Build intersection of approval sets of all voters in voters.
        var appr_sets = [];
        var intersection = [];
        for (let i = 0; i < voters.length; i++) {
            appr_sets.push(new Set(this.profile[i].approved));
            for (const x in appr_sets) {
                if (appr_sets.has(x)) {
                    intersection.push(x);
                }
            }
        }
        return intersection;
    }

    get_mono_violations(voters, windowheight, rounds=null) {
        // Get list of rounds with monotonicity violation for the voter group.
        if (this.outcomes == null) {
            var message = "No election outcome computed yet.";
            throw message;
        }
        if (rounds == null) {
            for (let i of range(his.profile[1])) {
                rounds[i] = i;
            }
        }
        if (typeof(rounds) == Number || rounds.length < 2) {
            var message = "At least two rounds are needed.";
            throw message;
        }
        var appr_set = this.__build_union_of_approval_sets(voters);
        var bad_rounds = [];
        var avg_sat = this.get_avg_sat(voters, windowheight, rounds=rounds);
        for (let i = 1; i < rounds.length; i++) {
            // find consecutive rounds with mono violation
            if (avg_sat[i] < avg_sat[i-1]) {
                if (!appr_set.has(lastIndexOf(this.outcomes[i][0]))) {
                    bad_rounds.push(i);
                }
            }            
        }
        return bad_rounds;
    }

    get_group_represenation(voters, frac=1, use_tau=false, rounds=null) {
        // Get group representation value, i.e. the k s.t. 
        // $avg(r_{\leq k}) \geq \lambda$, where lambda is
        // frac * (num of canidates approved by some i in voters).
        // If use_tau is set to True, satisfaction from top part
        // is factored in.
        // Undefined behavior in the case that r=().
        if (this.outcomes == null) {
            var message = "No election outcome computed yet.";
            throw message;
        }
        if (rounds == null) {
            for (let i of range(his.profile[1])) {
                rounds[i] = i;
            }
        }
        if (typeof(rounds) == Number) {
            rounds = [rounds];
        }
        var appr_set = this.__build_intersection_of_approval_sets(voters);
        var bound = Math.floor(frac*appr_set.length);
        var gr_values = {};
        var ranking_window = [];
        // for (let i = 0; i < rounds.length; i++) {
        //     // compute group represenation w.r.t. bound
        //     gr_values[i] = Infinity;
        //     var len = this.outcomes[i][1];
        //     for (let j = 0; j < len.length; j++) {
        //         for (let k = 0; k < array.length; k++) {
        //             const element = array[k];
                    
        //         }
        //     }
        // }
    }
}