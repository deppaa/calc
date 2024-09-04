type ParseExpressionType = {
  expression: string;
  allowedOperators: string[];
};

export const parseExpression = ({
  expression,
  allowedOperators,
}: ParseExpressionType): (string | number)[] => {
  let arrExpression: (string | number)[] = [];
  let currentNumber: string = "";

  for (const char of expression) {
    if (
      !isNaN(Number(char)) ||
      [".", ","].includes(char) ||
      (["+", "-"].includes(char) &&
        arrExpression.length === 0 &&
        !currentNumber) ||
      (["+", "-"].includes(char) &&
        !currentNumber &&
        allowedOperators.includes(
          String(arrExpression[arrExpression.length - 1])
        ))
    ) {
      currentNumber += char;
    } else {
      if (!allowedOperators.includes(char)) {
        throw new Error("This symbol is not supported");
      }

      if (currentNumber) {
        arrExpression.push(Number(currentNumber));
        currentNumber = "";
      }

      arrExpression.push(char);
    }
  }

  if (currentNumber) {
    arrExpression.push(Number(currentNumber));
  }

  return arrExpression;
};
