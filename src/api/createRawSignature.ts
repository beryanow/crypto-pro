import { _afterPluginsLoaded } from '../helpers/_afterPluginsLoaded';
import { _extractMeaningfulErrorMessage } from '../helpers/_extractMeaningfulErrorMessage';
import { __cadesAsyncToken__, __createCadesPluginObject__, _generateCadesFn } from '../helpers/_generateCadesFn';
import { _getCadesCert } from '../helpers/_getCadesCert';
import { _reverseStr } from '../helpers/_reverseString';
import { _convertHexToBase64 } from '../helpers/_convertHexToBase64';

export const createRawSignature = _afterPluginsLoaded(
  async (thumbprint: string, signedInfo: string): Promise<string> => {
    const { cadesplugin } = window;
    const cadesCertificate = await _getCadesCert(thumbprint);

    return eval(
      _generateCadesFn(function createAttachedSignature(): string {
        let oRawSignature;
        let hashedData;

        try {
          oRawSignature = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.RawSignature');
          hashedData = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.HashedData');
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при инициализации хеширования');
        }

        try {
          void (
            __cadesAsyncToken__ +
            hashedData.propset_Algorithm(cadesplugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_256)
          );
          void (__cadesAsyncToken__ + hashedData.propset_DataEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY));
          void (__cadesAsyncToken__ + hashedData.Hash(signedInfo));
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при указании данных для хеширования');
        }

        let sRawSignature: string;

        try {
          sRawSignature = __cadesAsyncToken__ + oRawSignature.SignHash(hashedData, cadesCertificate);
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при подписании данных');
        }

        return _convertHexToBase64(_reverseStr(sRawSignature));
      }),
    );
  },
);
