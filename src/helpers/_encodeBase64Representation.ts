export const _encodeBase64Representation = (signature: string): string =>
  btoa(
    encodeURIComponent(signature).replace(/%([0-9A-F]{2})/g, (_, p1) => String.fromCharCode(parseInt('0x' + p1, 16))),
  );
