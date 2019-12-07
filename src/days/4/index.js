import _ from "lodash";
const input = "382345-843167".split("-");

const hasAdjacentDigits = x => _.uniq(_.split(x, "")).length !== 6;
const hasTwoAdjacentDigits = x =>
  _.filter(`${x}`.match(/([0-9])\1*/g), el => el.length === 2).length;
const hasIncreasingDigits = x =>
  _.reduce(
    _.split(x, ""),
    (res, curr) => (!res || +curr < res.prev ? false : { prev: +curr }),
    { prev: 0 }
  );

let part1counter = 0,
  part2counter = 0,
  start = +input[0],
  end = +input[1];

_.times(end - start, i => {
  let curr = start + i;
  if (hasIncreasingDigits(curr)) {
    if (hasAdjacentDigits(curr)) part1counter++;
    if (hasTwoAdjacentDigits(curr)) part2counter++;
  }
});

console.log("Part 4.1", part1counter); // 460
console.log("Part 4.2", part2counter); // 290
