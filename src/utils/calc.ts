export type CalcType = {
  expression: (string | number)[];
  action: Record<string, ActionItemType>;
};

type ActionItemType = {
  priority: number;
  func?: (a: number, b: number) => number;
};

export const calc = ({ expression, action }: CalcType): number => {
  let numbers: number[] = [];
  let operators: string[] = [];

  for (const item of expression) {
    if (typeof item === "number") {
      numbers.push(item);
    } else if (item === "(") {
      operators.push(item);
    } else if (item === ")") {
      while (operators.length && operators[operators.length - 1] !== "(") {
        const operator: string | undefined = operators.pop();
        const b: number | undefined = numbers.pop();
        const a: number | undefined = numbers.pop();
        if (operator && a && b && action[operator] && action[operator]?.func) {
          const result: number = action[operator].func(a, b);
          numbers.push(result);
        } else {
          throw new Error("Error calulate");
        }
      }
      operators.pop();
    } else if (action[item]) {
      while (
        operators.length &&
        action[operators[operators.length - 1]].priority >=
          action[item].priority
      ) {
        const operator: string | undefined = operators.pop();
        const b: number | undefined = numbers.pop();
        const a: number | undefined = numbers.pop();
        if (operator && a && b && action[operator] && action[operator]?.func) {
          const result: number = action[operator].func(a, b);
          numbers.push(result);
        } else {
          throw new Error("Error calulate");
        }
      }
      operators.push(item);
    }
  }

  while (operators.length) {
    const operator: string | undefined = operators.pop();
    const b: number | undefined = numbers.pop();
    const a: number | undefined = numbers.pop();
    if (operator && a && b && action[operator] && action[operator]?.func) {
      const result: number = action[operator].func(a, b);
      numbers.push(result);
    } else {
      throw new Error("Error calulate");
    }
  }

  return numbers[0];
};
