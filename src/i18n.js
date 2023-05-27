import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

export const locales = {
  en: 'English',
  vi: 'Tiếng việt'
};
//locales[i18n.language]

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    resources: {
      en: {
        translation: {
          'welcome text': 'Total Earning'
        }
      },
      vi: {
        translation: {
          //Vietnamese translations here
          'welcome text': 'Tổng tiền'
        }
      }
    },
    lng: 'vi',
    fallbackLng: 'vi'
  });

export default i18n;
