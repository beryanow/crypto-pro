import { _afterPluginsLoaded } from '../helpers/_afterPluginsLoaded';
import { _extractMeaningfulErrorMessage } from '../helpers/_extractMeaningfulErrorMessage';
import { __cadesAsyncToken__, __createCadesPluginObject__, _generateCadesFn } from '../helpers/_generateCadesFn';
import { getCertificate } from './getCertificate';

export const createCMSSignature = _afterPluginsLoaded(
  async (thumbprint: string, unencryptedMessage: string | ArrayBuffer, detached: boolean): Promise<string> => {
    const { cadesplugin } = window;
    const certificate = await getCertificate(thumbprint);
    const cadesCertificate = certificate._cadesCertificate;

    const algorithm = await certificate.getAlgorithm();

    if (algorithm.oid !== '1.2.643.7.1.1.1.1' && algorithm.oid !== '1.2.643.7.1.1.1.2') {
      throw new Error('Передан сертификат с неподдерживаемым алгоритмом открытого ключа');
    }

    return eval(
      _generateCadesFn(function createAttachedSignature(): string {
        let cadesSigner;
        let cadesSignedData;

        try {
          cadesSigner = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.CPSigner');
          cadesSignedData = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.CadesSignedData');
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
          void (__cadesAsyncToken__ + cadesSignedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY));
          void (__cadesAsyncToken__ + cadesSignedData.propset_Content(unencryptedMessage));
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при указании данных для подписи');
        }

        let signature: string;

        try {
          signature =
            __cadesAsyncToken__ + cadesSignedData.SignCades(cadesSigner, cadesplugin.CADESCOM_CADES_BES, detached);
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при подписании данных');
        }

        try {
          __cadesAsyncToken__ + cadesSignedData.VerifyCades(signature, cadesplugin.CADESCOM_CADES_BES, detached);
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при проверке подписанных данных');
        }

        return signature;
      }),
    );
  },
);
