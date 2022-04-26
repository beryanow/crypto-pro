import { _extractMeaningfulErrorMessage } from '../helpers/_extractMeaningfulErrorMessage';

export const CheckExtensionLoaded = async (): Promise<boolean> => {
  try {
    require('../vendor/cadesplugin_api');
  } catch (error) {
    console.error(error);

    throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при подключении модуля для работы с Cades plugin');
  }

  const { cadesplugin } = window;

  window.cadesplugin_extension_loaded_callback = () => {
    window.onload = () => {
      window.cadesplugin_extension_loaded = true;
    };
    window.cadesplugin_extension_loaded = true;
  };

  if (!cadesplugin) {
    throw new Error('Не подключен модуль для работы с Cades plugin');
  }

  try {
    await cadesplugin;

    return window.cadesplugin_extension_loaded;
  } catch (error) {
    console.error(error);

    window.cadesplugin = undefined;

    throw new Error(
      _extractMeaningfulErrorMessage(error) || 'Ошибка при инициализации модуля для работы с Cades plugin',
    );
  }
};
