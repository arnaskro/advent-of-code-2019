const intcode = (memory, address, num1, num2) => {
  if (typeof num1 !== "undefined") memory[1] = num1;
  if (typeof num2 !== "undefined") memory[2] = num2;

  const opcode = memory[address],
    first = memory[memory[address + 1]],
    second = memory[memory[address + 2]];

  switch (opcode) {
    case 1:
    case 2:
      const value = opcode === 1 ? first + second : first * second;
      memory[memory[address + 3]] = value;
      return intcode(memory, address + 4);
    case 99:
      return memory[0];
    default:
      console.log("something is wrong", opcode, memory);
      break;
  }
};

export default intcode;
