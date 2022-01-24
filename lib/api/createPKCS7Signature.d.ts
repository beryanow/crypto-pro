/**
 * Создает присоединенную подпись сообщения по отпечатку сертификата
 *
 * @param thumbprint - отпечаток сертификата
 * @param message - подписываемое сообщение
 * @returns подпись в формате PKCS#7
 */
export declare const createPKCS7Signature: (thumbprint: string, unencryptedMessage: string | ArrayBuffer, detached: boolean) => Promise<string>;
