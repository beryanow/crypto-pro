import { _extractMeaningfulErrorMessage } from '../helpers/_extractMeaningfulErrorMessage';
import { _afterPluginsLoaded } from '../helpers/_afterPluginsLoaded';
import { __cadesAsyncToken__, __createCadesPluginObject__, _generateCadesFn } from '../helpers/_generateCadesFn';

export const CheckPluginLoaded = _afterPluginsLoaded((): string => {
  return eval(
    _generateCadesFn((): string => {
      let cadesAbout;

      try {
        cadesAbout = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.About');

        const pluginVersion = __cadesAsyncToken__ + cadesAbout.PluginVersion;

        const majorVersion = __cadesAsyncToken__ + pluginVersion.MajorVersion;
        const minorVersion = __cadesAsyncToken__ + pluginVersion.MinorVersion;
        const buildVersion = __cadesAsyncToken__ + pluginVersion.BuildVersion;

        return `${majorVersion}.${minorVersion}.${buildVersion}`;
      } catch (error) {
        console.error(error);

        throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при получении информации о системе');
      }
    }),
  );
});
