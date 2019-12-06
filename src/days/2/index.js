import input from "./input";
import intcode from "../../intcode";

const initialMemory = input.split(",").map(x => parseInt(x, 10));

// part 1 - 3790645
console.log("Part 2.1", intcode([...initialMemory], 0, 12, 2));

// part 2 - 6577
const goal = 19690720;
for (let noun = 0; noun < 100; noun++) {
  for (let verb = 0; verb < 100; verb++) {
    const result = intcode([...initialMemory], 0, noun, verb);
    if (result === goal) {
      console.log("Part 2.2", 100 * noun + verb, `(100 * ${noun} + ${verb})`);
    }
  }
}
