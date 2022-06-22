export const _decodeBase64Representation = (signature: string): string =>
  decodeURIComponent(
    atob(signature)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join(''),
  );
