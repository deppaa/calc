import { describe, test, expect } from "@jest/globals";
import { parseExpression } from "./parser";

describe("parseExpression", () => {
  test("expression is not correct, return error", () => {
    expect(() => {
      parseExpression({
        expression: "2+3/5",
        allowedOperators: ["+", "-", "*"],
      });
    }).toThrowError("This symbol is not supported");
  });

  test("expression is correct, return arExpression", () => {
    const result = parseExpression({
      expression: "2+3*5",
      allowedOperators: ["+", "-", "*"],
    });

    expect(result).toEqual([2, "+", 3, "*", 5]);
  });

  test("expression use unary +/- is correct, return arExpression", () => {
    const result = parseExpression({
      expression: "-5+2+-2*(-4/-6)",
      allowedOperators: ["+", "-", "*", "/", "(", ")"],
    });

    expect(result).toEqual([-5, "+", 2, "+", -2, "*", "(", -4, "/", -6, ")"]);
  });
});
