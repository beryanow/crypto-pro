import { _afterPluginsLoaded } from '../helpers/_afterPluginsLoaded';
import { _extractMeaningfulErrorMessage } from '../helpers/_extractMeaningfulErrorMessage';
import { __cadesAsyncToken__, __createCadesPluginObject__, _generateCadesFn } from '../helpers/_generateCadesFn';
import { _getCadesCert } from '../helpers/_getCadesCert';

/**
 * Создает XADES-BES подпись для документа в формате XML
 *
 * @param thumbprint - отпечаток сертификата
 * @param unencryptedMessage - подписываемое сообщение в формате XML
 * @returns подпись
 */

export const createXadesXsltSignature = _afterPluginsLoaded(
  async (thumbprint: string, unencryptedMessage: string, xsltSchemaMessage: string): Promise<string> => {
    const { cadesplugin } = window;
    const cadesCertificate = await _getCadesCert(thumbprint);

    unencryptedMessage = decodeURIComponent(
      atob(unencryptedMessage)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );

    xsltSchemaMessage = decodeURIComponent(
      atob(xsltSchemaMessage)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );

    const signatureTemplate = `<ds:Signature xmlns:ds="http://www.w3.org/2000/09/xmldsig#" Id="xslt-transformed-xml-signature">
        <ds:SignedInfo>
            <ds:CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>
            <ds:SignatureMethod Algorithm="urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34102012-gostr34112012-256"/>
                <ds:Reference URI="">
                <ds:Transforms>
                    <ds:Transform Algorithm="http://www.w3.org/TR/1999/REC-xslt-19991116">
                        ${xsltSchemaMessage}
                    </ds:Transform>
                    <ds:Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/>
                </ds:Transforms>
                <ds:DigestMethod Algorithm="urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34112012-256"/>
                <ds:DigestValue/>
                </ds:Reference>
        </ds:SignedInfo>
        <ds:SignatureValue/>
        <ds:KeyInfo/>
    </ds:Signature>`;

    const parsedXml = new DOMParser().parseFromString(unencryptedMessage, 'text/xml');
    parsedXml.documentElement.append(signatureTemplate);

    const rootClosingElementIndex = unencryptedMessage.lastIndexOf(`</${parsedXml.documentElement.nodeName}>`);

    console.log(unencryptedMessage);
    console.log(parsedXml.documentElement.nodeName);
    console.log(rootClosingElementIndex);

    const templateXml = new XMLSerializer().serializeToString(parsedXml)
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');

    console.log(templateXml);

    return eval(
      _generateCadesFn(function createXMLSignature(): string {
        let cadesSigner;
        let cadesSignedXML;

        try {
          cadesSigner = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.CPSigner');
          cadesSignedXML = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.SignedXML');
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при инициализации подписи');
        }

        try {
          void (__cadesAsyncToken__ + cadesSigner.propset_Certificate(cadesCertificate));
          void (__cadesAsyncToken__ + cadesSigner.propset_CheckCertificate(false));
          void (
            __cadesAsyncToken__ + cadesSigner.propset_Options(cadesplugin.CAPICOM_CERTIFICATE_INCLUDE_END_ENTITY_ONLY)
          );
          void (__cadesAsyncToken__ + cadesSignedXML.propset_Content(templateXml));
          void (
            __cadesAsyncToken__ +
            cadesSignedXML.propset_SignatureType(
              cadesplugin.CADESCOM_XML_SIGNATURE_TYPE_TEMPLATE | cadesplugin.CADESCOM_XADES_BES,
            )
          );
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при указании данных для подписи');
        }

        let signature: string;

        try {
          signature = __cadesAsyncToken__ + cadesSignedXML.Sign(cadesSigner);
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при подписании данных');
        }

        return btoa(
          encodeURIComponent(signature).replace(/%([0-9A-F]{2})/g, (_, p1) =>
            String.fromCharCode(parseInt('0x' + p1, 16)),
          ),
        );
      }),
    );
  },
);
