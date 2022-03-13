export const _convertBinToBase64 = (binData: string): string => {
  return btoa(unescape(encodeURIComponent(binData)));
};
