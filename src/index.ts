import { calc, CalcType } from "./utils/calc";
import { parseExpression } from "./utils/parser";

const action: CalcType["action"] = {
  "+": { priority: 1, func: (a, b) => a + b },
  "-": { priority: 1, func: (a, b) => a - b },
  "*": { priority: 2, func: (a, b) => a * b },
  "/": { priority: 2, func: (a, b) => a / b },
  "(": { priority: 0 },
  ")": { priority: 0 },
};

const expression: string = "(54.6-2)*5/((9-2)-1)*2";
const allowedOperators: string[] = ["+", "-", "*", "/", "(", ")"];
const arExpression = parseExpression({ expression, allowedOperators });

console.log(calc({ expression: arExpression, action }));
