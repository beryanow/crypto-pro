export const _convertHexToBase64 = (hex: string): string => {
  return btoa(
    hex
      .match(/\w{2}/g)
      .map(function (a) {
        return String.fromCharCode(parseInt(a, 16));
      })
      .join(''),
  );
};
