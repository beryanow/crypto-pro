import { _afterPluginsLoaded } from '../helpers/_afterPluginsLoaded';
import { _extractMeaningfulErrorMessage } from '../helpers/_extractMeaningfulErrorMessage';
import { __cadesAsyncToken__, __createCadesPluginObject__, _generateCadesFn } from '../helpers/_generateCadesFn';
import { _generateUUID } from '../helpers/_generateUUID';
import { _encodeBase64Representation } from '../helpers/_encodeBase64Representation';
import { _decodeBase64Representation } from '../helpers/_decodeBase64Representation';
import { getCertificate } from './getCertificate';

const createSignatureTemplate = (contentBase64: string): string =>
  `<?xml version="1.0" encoding="UTF-8"?>
<Content>
    ${contentBase64}
    <ds:Signature xmlns:ds="http://www.w3.org/2000/09/xmldsig#" Id="${_generateUUID()}">
        <ds:SignedInfo>
            <ds:CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>
            <ds:SignatureMethod Algorithm="urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34102012-gostr34112012-256"/>
            <ds:Reference URI="">
                <ds:Transforms>
                    <ds:Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/>
                </ds:Transforms>
                <ds:DigestMethod Algorithm="urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34112012-256"/>
                <ds:DigestValue/>
            </ds:Reference>
        </ds:SignedInfo>
        <ds:SignatureValue/>
        <ds:KeyInfo/>
    </ds:Signature>
</Content>`;

export const createXMLSignature = _afterPluginsLoaded(
  async (thumbprint: string, unencryptedMessage: string, advanced: boolean, xml: boolean): Promise<string> => {
    const { cadesplugin } = window;
    const certificate = await getCertificate(thumbprint);
    const cadesCertificate = certificate._cadesCertificate;

    let CADESCOM_SIGNATURE_TYPE = cadesplugin.CADESCOM_XML_SIGNATURE_TYPE_TEMPLATE;

    if (xml) {
      CADESCOM_SIGNATURE_TYPE = cadesplugin.CADESCOM_XML_SIGNATURE_TYPE_ENVELOPED;
    } else {
      unencryptedMessage = createSignatureTemplate(unencryptedMessage);
    }

    if (advanced) {
      CADESCOM_SIGNATURE_TYPE |= cadesplugin.CADESCOM_XADES_BES;
    }

    const algorithm = await certificate.getAlgorithm();

    let signatureMethod;
    let digestMethod;

    switch (algorithm.oid) {
      case '1.2.643.7.1.1.1.1':
        signatureMethod = 'urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34102012-gostr34112012-256';
        digestMethod = 'urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34112012-256';
        break;
      case '1.2.643.7.1.1.1.2':
        signatureMethod = 'urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34102012-gostr34112012-512';
        digestMethod = 'urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34112012-512';
        break;
      default:
        throw new Error('Передан сертификат с неподдерживаемым алгоритмом открытого ключа');
    }

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
          void (__cadesAsyncToken__ + cadesSignedXML.propset_Content(_encodeBase64Representation(unencryptedMessage)));
          void (
            __cadesAsyncToken__ + cadesSigner.propset_Options(cadesplugin.CAPICOM_CERTIFICATE_INCLUDE_END_ENTITY_ONLY)
          );
          void (__cadesAsyncToken__ + cadesSignedXML.propset_SignatureType(CADESCOM_SIGNATURE_TYPE));
          void (__cadesAsyncToken__ + cadesSignedXML.propset_SignatureMethod(signatureMethod));
          void (__cadesAsyncToken__ + cadesSignedXML.propset_DigestMethod(digestMethod));
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

        try {
          __cadesAsyncToken__ + cadesSignedXML.Verify(signature);
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при проверке подписанных данных');
        }

        return _decodeBase64Representation(signature);
      }),
    );
  },
);
