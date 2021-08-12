import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import locales from './constants/Translations'
// Set the key-value pairs for the different languages you want to support.
i18n.translations = locales;
// Set the locale once at the beginning of your app.
i18n.defaultLocale = 'en';

i18n.locale = Localization.locale;
i18n.fallbacks = true;
export default i18n