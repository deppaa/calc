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
    if (!isNaN(Number(char)) || [".", ","].includes(char)) {
      currentNumber += char;
    } else {
      if (!allowedOperators.includes(char))
        throw new Error("This symbol is not supported");
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
