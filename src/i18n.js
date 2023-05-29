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
          'welcome text': 'Total Earning',
          'Authentication': 'Authentication',
          'Social Profile': 'Social Profile',
          'Logout': 'Logout',
          'Login': 'Login',
          'Register': 'Register',
          "Users": "Users",
          "Security Teams": 'Security Teams',
          'Organization': 'Organization',
          'Leave Request': 'Leave Request',
          'Patrol Request': 'Patrol Request',
          'Late Patrol Request': 'Late Patrol Request',
          'Forgot Checkout Report': 'Forgot Checkout Report',
          'Request': 'requests',
          'Pages': 'Pages',
          'Dashboard': 'Dashboard',
        }
      },
      vi: {
        translation: {
          //Vietnamese translations here
          'welcome text': 'Tổng tiền',
          'Authentication': 'Xác thực tài khoản',
          'Social Profile': 'Thông tin cá nhân',
          'Logout': 'Đăng xuất',
          'Login': 'Đăng nhập',
          'Register': 'Đăng ký',
          "Users": "Danh sách người dùng",
          "Security Teams": 'Đội bảo vệ',
          'Organization': 'Tổ chức',
          'Leave Request': 'Yêu cầu rời đi',
          'Patrol Request': 'Yêu cầu canh gác',
          'Late Patrol Request': 'Yêu cầu canh gác muộn',
          'Forgot Checkout Report': 'Quên báo cáo thanh toán',
          'Request': 'Yêu cầu đơn từ',
          'Pages': 'Phân trang',
          'Dashboard': 'Bảng dữ liệu',
        }
      }
    },
    lng: 'vi',
    fallbackLng: 'vi'
  });

export default i18n;
