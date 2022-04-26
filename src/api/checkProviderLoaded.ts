import { _afterPluginsLoaded } from '../helpers/_afterPluginsLoaded';
import { __cadesAsyncToken__, __createCadesPluginObject__, _generateCadesFn } from '../helpers/_generateCadesFn';
import { _extractMeaningfulErrorMessage } from '../helpers/_extractMeaningfulErrorMessage';

export const CheckProviderLoaded = _afterPluginsLoaded((): string => {
  return eval(
    _generateCadesFn(function getSystemInfo(): string {
      let cadesAbout;

      try {
        cadesAbout = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.About');

        const providerVersion = __cadesAsyncToken__ + cadesAbout.CSPVersion('', 80);

        const majorVersion = __cadesAsyncToken__ + providerVersion.MajorVersion;
        const minorVersion = __cadesAsyncToken__ + providerVersion.MinorVersion;
        const buildVersion = __cadesAsyncToken__ + providerVersion.BuildVersion;

        return `${majorVersion}.${minorVersion}.${buildVersion}`;
      } catch (error) {
        console.error(error);

        throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при получении информации о системе');
      }
    }),
  );
});
