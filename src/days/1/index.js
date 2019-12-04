import input from "./input";
import { sum } from "../../helpers";

const data = input.split("\n").map(x => parseInt(x, 10));

const calc = x => Math.floor(x / 3) - 2;
const recursiveCalc = x =>
  x === 0 ? 0 : calc(x) <= 0 ? x : x + recursiveCalc(calc(x));

const mapped = data.map(calc),
  part1 = mapped.reduce(sum, 0),
  part2 = mapped.map(recursiveCalc).reduce(sum, 0);

console.log("Part 1.1", part1); // 3291760
console.log("Part 1.2", part2); // 4934767
