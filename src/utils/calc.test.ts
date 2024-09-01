import { describe, expect } from "@jest/globals";
import { calc, CalcType } from "./calc";
import { parseExpression } from "./parser";

describe("calc", () => {
  const action: CalcType["action"] = {
    "+": { priority: 1, func: (a, b) => a + b },
    "-": { priority: 1, func: (a, b) => a - b },
    "*": { priority: 2, func: (a, b) => a * b },
    "/": { priority: 2, func: (a, b) => a / b },
    "(": { priority: 0 },
    ")": { priority: 0 },
  };

  test("expression is not correct, return error", () => {
    expect(() => {
      calc({ expression: [2, "+", 3, "("], action });
    }).toThrowError("Error calulate");
  });

  test("", () => {
    const arExp = parseExpression({
      expression: "2+2",
      allowedOperators: ["+"],
    });

    const result = calc({ expression: arExp, action });

    expect(result).toBe(4);
  });
});
