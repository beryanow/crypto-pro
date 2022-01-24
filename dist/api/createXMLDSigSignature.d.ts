/**
 * Создает XML-DSig подпись для документа в формате XML
 *
 * @param thumbprint - отпечаток сертификата
 * @param unencryptedMessage - подписываемое сообщение в формате XML
 * @returns подпись
 */
export declare const createXMLDSigSignature: (thumbprint: string, unencryptedMessage: string) => Promise<string>;
