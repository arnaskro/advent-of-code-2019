import input from "./input";

const parsedInput = input.split(",").map(x => parseInt(x, 10));

const step = (data, i) => {
  const opcode = data[i],
    noun = data[data[i + 1]],
    verb = data[data[i + 2]];

  switch (opcode) {
    case 1:
    case 2:
      const value = opcode === 1 ? noun + verb : noun * verb;
      data[data[i + 3]] = value;
      step(data, i + 4);
      break;
    case 99:
      console.log(data);
      break;
    default:
      console.log("something is wrong", opcode, data);
      break;
  }
};

step([...parsedInput], 0);

// part 1 = 3790645
