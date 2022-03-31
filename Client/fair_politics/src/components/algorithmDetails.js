export const algorithms = [
  {
    id: 0,
    title: "Lazy Sequential PAV",
    code:"lseqpav",
    description: "",
    example:"example Lazy Sequential PAV "
  },
  {
    id: 1,
    title:"Dynamic Sequential PAV",
    code: "dseqpav",
    description: "Sequential PAV This rule ranks answers iteratively, in each iteration choosing an unranked answer maximizing the marginal contribution in terms of weighted voter satisfaction. For this straightforward dynamization of seqPAV, we modify the notion of marginal contribution to also take into account the satisfaction derived from previously implemented answers.",
    example:"example Dynamic Sequential PAV"
  },
  {
    id: 2,
    title:"Lazy Sequential Phragmen",
    code: "lseqphrag",
    description: "",
    example:"example Lazy Sequential Phragmen"
  },
  {
    id: 3,
    title: "Dynamic Sequential Phragmen",
    code:"dseqphrag",
    description: "",
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
