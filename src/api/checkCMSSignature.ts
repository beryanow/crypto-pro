import { _afterPluginsLoaded } from '../helpers/_afterPluginsLoaded';
import { __cadesAsyncToken__, __createCadesPluginObject__, _generateCadesFn } from '../helpers/_generateCadesFn';
import { _extractMeaningfulErrorMessage } from '../helpers/_extractMeaningfulErrorMessage';

export const checkCMSSignature = _afterPluginsLoaded(
  async (signature: string, unencryptedMessage: string, detached: boolean): Promise<void> => {
    return eval(
      _generateCadesFn(function checkXMLSignature(): void {
        let cadesSignedData;

        try {
          cadesSignedData = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.CadesSignedData');
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при инициализации подписи');
        }

        void (__cadesAsyncToken__ + cadesSignedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY));
        void (__cadesAsyncToken__ + cadesSignedData.propset_Content(unencryptedMessage));

        try {
          __cadesAsyncToken__ + cadesSignedData.VerifyCades(signature, cadesplugin.CADESCOM_CADES_BES, detached);
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при проверке подписанных данных');
        }
      }),
    );
  },
);
