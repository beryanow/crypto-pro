export const _reverseStr = (str: string): string => {
  let newStr = '';

  for (let i = str.length - 1; i >= 1; i -= 2) {
    newStr += str.charAt(i - 1);
    newStr += str.charAt(i);
  }

  return newStr;
};
