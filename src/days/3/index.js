import _ from "lodash";
import input from "./input";

// initial input parsing
const getWires = input => {
  return input
    .split("\n")
    .map(wire =>
      wire
        .split(",")
        .map(step =>
          (([, direction, steps]) => ({ direction, steps: +steps }))(
            step.match(/([A-z]+)(\d+)/)
          )
        )
    );
};

const getPoints = wire => {
  // starting points
  let x = 0,
    y = 0,
    n = 0,
    points = [];

  //  process each instruction
  wire.forEach(({ direction, steps }) => {
    switch (direction) {
      case "D":
        _.times(steps, () => points.push({ x: x, y: --y, steps: ++n }));
        break;
      case "U":
        _.times(steps, () => points.push({ x: x, y: ++y, steps: ++n }));
        break;
      case "L":
        _.times(steps, () => points.push({ x: --x, y: y, steps: ++n }));
        break;
      case "R":
        _.times(steps, () => points.push({ x: ++x, y: y, steps: ++n }));
        break;
      default:
        break;
    }
  });

  return points;
};

const getIntersections = (wire1, wire2) => {
  let intersections = [];
  wire1.forEach(point1 => {
    wire2.forEach(point2 => {
      if (point1.x === point2.x && point1.y === point2.y) {
        point1.steps += point2.steps;
        intersections.push(point1);
      }
    });
  });
  return intersections;
};

const getDistance = intersection => {
  let distanceX = intersection.x < 0 ? intersection.x * -1 : intersection.x;
  let distanceY = intersection.y < 0 ? intersection.y * -1 : intersection.y;
  return distanceX + distanceY;
};

const getClosestDistance = intersections => {
  let distance = getDistance(intersections[0]);
  intersections.forEach(point => {
    distance = Math.min(distance, getDistance(point));
  });
  return distance;
};

const getShortestStepCount = intersections => {
  let steps = intersections[0].steps;
  intersections.forEach(point => {
    steps = Math.min(steps, point.steps);
  });
  return steps;
};

console.time("execution_time");
const wires = getWires(input),
  points = wires.map(getPoints),
  intersections = getIntersections(points[0], points[1]),
  part1 = getClosestDistance(intersections),
  part2 = getShortestStepCount(intersections);

console.log("Part 3.1", part1); // part 1 - 709
console.log("Part 3.2", part2); // part 2 - 13836
console.timeEnd("execution_time");
