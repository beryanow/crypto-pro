/**
 * Создает XADES-BES подпись для документа в формате XML
 *
 * @param thumbprint - отпечаток сертификата
 * @param unencryptedMessage - подписываемое сообщение в формате XML
 * @returns подпись
 */
export declare const createXadesTemplateSignature: (thumbprint: string, unencryptedMessage: string) => Promise<string>;
