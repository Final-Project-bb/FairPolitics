export const algorithms = [
  {
    id: 0,
    title: "Lazy Sequential PAV",
    code:"lseqpav",
    description: `In this Myopic Dynamization of Sequential PAV, we compute the marginal contribution of each answer 'a'
    that has not been implemented, only with respect to the previously implemented answers`,
    example:"example Lazy Sequential PAV "
  },
  {
    id: 1,
    title:"Dynamic Sequential PAV",
    code: "dseqpav",
    description: `This rule ranks answers iteratively, in each iteration choosing an unranked answer maximizing the marginal contribution
    in terms of weighted voter satisfaction. For this straightforward dynamization of seqPAV, we modify the notion of marginal contribution
    to also take into account the satisfaction derived from previously implemented answers.`,
    example:"example Dynamic Sequential PAV"
  },
  {
    id: 2,
    title:"Lazy Sequential Phragmen",
    code: "lseqphrag",
    description: `In this Myopic Dynamization of Sequential Phragmen, we first run the first phase of Dynamic Phragmen to determine the debts
    of the voters. Then, for each answer 'a' that has not been implemented, we compute the voter debts that would result from adding
    answer 'a' to the implemented answers (and running the first phase for one more iteration). Myopic Phragmen ranks the answers that have not been
    implemented according to increasing the maximum of the debts of the voters induced by answer 'a',
    breaking ties according to the second highest debt and so on.`,
    example:"example Lazy Sequential Phragmen"
  },
  {
    id: 3,
    title: "Dynamic Sequential Phragmen",
    code:"dseqphrag",
    description: `This rule can be described in terms of voters buying answers. Every answer costs 1 credit. All voters start without any credits
    but earn them continuously over time (at a constant and identical rate). As soon as a group of voters who all approve the same answer 'a'
    together own 1 credit, they immediately buy that answer. At this point, their balance is reset to 0 and answer 'a' is added in the next
    position of the ranking. This is done until all answers are ranked.
    Our first Dynamization of Sequential Phragmen works in two phases. As before, voters buy answers and every answer has a cost of 1 credit.
    Voters do not start with 0 credits, however, they may have an initial debt due to previously implemented answers they approve.
    The debts of voters are determined in the first phase, which iterates through the sequence of implemented answers (starting with 'a1') and,
    for each implemented answer, divides the cost of 1 among the voters of this answer. More precisely, this assignment of debts is done in such
    a way that, in each iteration, the maximum total debt across all voters of this answer is as small as possible.
    In the second phase, we run Sequential Phragmen to obtain the desired ranking of answers that have not been implemented.
    At the beginning of this phase, each voter has a non-positive credit balance. As in Sequential Phragmen, voters continuously earn credits,
    and voters starting with debts can only participate in the purchase of a answer once they have a positive balance.`,
    example:"example Dynamic Sequential Phragmen"
  },
  {
    id: 4,
    title: "Approval Voting",
    code:"av",
    description: "AV ranks the answers according to how many votes they got. This rule is not proportional and we use it mainly as a benchmark",
    example:"example Approval Voting"
  },
];
