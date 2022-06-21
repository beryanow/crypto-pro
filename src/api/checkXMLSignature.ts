import { _afterPluginsLoaded } from '../helpers/_afterPluginsLoaded';
import { __cadesAsyncToken__, __createCadesPluginObject__, _generateCadesFn } from '../helpers/_generateCadesFn';
import { _extractMeaningfulErrorMessage } from '../helpers/_extractMeaningfulErrorMessage';

export const checkXMLSignature = _afterPluginsLoaded(
  async (signature: string): Promise<void> => {
    return eval(
      _generateCadesFn(function checkXMLSignature(): void {
        let cadesSignedXML;

        try {
          cadesSignedXML = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.SignedXML');
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при инициализации подписи');
        }

        try {
          __cadesAsyncToken__ + cadesSignedXML.Verify(signature);
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при проверке подписанных данных');
        }
      }),
    );
  },
);
