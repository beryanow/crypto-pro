export const _convertHexToBin = (hex: string): string => {
  const bytes = [];

  for (let i = 0; i < hex.length - 1; i += 2) {
    bytes.push(parseInt(hex.substr(i, 2), 16));
  }

  return String.fromCharCode(...bytes);
};
