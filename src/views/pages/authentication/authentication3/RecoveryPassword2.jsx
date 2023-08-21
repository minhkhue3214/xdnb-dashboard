import { Button } from 'antd';
import { memo } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import * as yup from 'yup';
import dispatchToast from '~/handlers/toast';
import { Input, InputPassword } from '~/ui-component/atoms';

// project imports
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthWrapper1 from '../AuthWrapper1';

const RecoveryPassword2 = () => {
  const { t } = useTranslation();
  const navigateTo = useNavigate();

  // const formik = useFormik({
  //   initialValues: {
  //     email: '',
  //     token: '',
  //     password: '',
  //     password_confirmation: ''
  //   },
  //   validationSchema: yup.object({
  //     password: yup
  //       .string()
  //       .min(8, t('input.error.user.passwordMinLength'))
  //       .matches(/^(?=.*[a-z])(?=.*[0-9])/, t('input.error.user.passwordRequirements'))
  //       .required(t('input.error.user.pleaseEnterPassword'))
  //   }),
  //   onSubmit: (values) => {
  //     if (values.password !== values.password_confirmation) {
  //       setErrMess(true);
  //       // setTimeout(setErrMess(false), 3000);
  //       return;
  //     }
  //     formik.validateForm().then(() => {
  //       if (formik.isValid) {
  //         dispatchRecoveryPassword2({
  //           email: values.email,
  //           token: values.token,
  //           password: values.password,
  //           password_confirmation: values.password_confirmation
  //         });
  //         setTimeout(() => {
  //           console.log('check recoveryPassword2Status', authenticationState.recoveryPassword2Status);
  //           if (authenticationState.recoveryPassword2Status) {
  //             navigateTo('/login');
  //           }
  //         }, 5000);
  //       }
  //     });
  //   },
  //   validateOnChange: true
  // });

  const formik = useFormik({
    initialValues: {
      email: '',
      token: '',
      password: '',
      password_confirmation: ''
    },
    validationSchema: yup.object({
      email: yup.string().email(t('input.error.user.invalidEmail')).required(t('input.error.user.pleaseEnterEmail')),
      token: yup.string().required(t('input.error.user.pleaseEnterToken')),
      password: yup.string().required(t('input.error.user.pleaseEnterPassword')),
      password_confirmation: yup.string().required(t('input.error.user.pleaseEnterRePassword'))
    }),
    onSubmit: async (values) => {
      await formik.validateForm();

      if (formik.isValid) {

        if (values.password !== values.password_confirmation) {
          dispatchToast('error', 'Mật khẩu không khớp');
          return;
        }

        try {
          const response = await axios.put(
            'https://tenmienmienphi.online/api/auth/recovery-password-step2',
            { email: values.email, token: values.token, password: values.password, password_confirmation: values.password_confirmation },
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );
          // console.log('Response:', response.data.message);
          dispatchToast('success', response.data.message);
          navigateTo('/login');

          // Do something with the response if needed
        } catch (error) {
          // console.log('error', error);
          dispatchToast('error', error.response.data.message);
        }
      }
    },
    validateOnChange: true
  });

  return (
    <AuthWrapper1>
      <EditUserWrapper>
        <HeaderModal>QUẢN LÝ XƯỞNG ĐÁ</HeaderModal>
        <Input
          label={`* ${t('input.label.user.email')}`}
          name="email"
          message={formik.touched.email ? formik.errors.email : ''}
          type={formik.touched.email && formik.errors.email ? 'error' : ''}
          value={formik.values.email}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          labelStyle={{
            padding: '2px'
          }}
          style={{
            width: '100%',
            marginTop: '8px',
            height: '70px'
          }}
          inputStyle={{
            width: '100%'
          }}
        />
        <Input
          label="Token"
          name="token"
          message={formik.touched.token ? formik.errors.token : ''}
          type={formik.touched.token && formik.errors.token ? 'error' : ''}
          value={formik.values.token}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          labelStyle={{
            padding: '2px'
          }}
          style={{
            width: '100%',
            marginTop: '8px',
            height: '70px'
          }}
          inputStyle={{
            width: '100%'
          }}
        />
        <InputPassword
          label={`* ${t('input.label.user.password')}`}
          name="password"
          message={formik.touched.password ? formik.errors.password : ''}
          type={formik.touched.password && formik.errors.password ? 'error' : ''}
          value={formik.values.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          labelStyle={{
            padding: '2px'
          }}
          style={{
            width: '100%',
            marginTop: '8px',
            height: '70px'
          }}
          inputStyle={{
            width: '100%'
          }}
        />
        <InputPassword
          label="Nhập lại mật khẩu"
          name="password_confirmation"
          message={formik.touched.password_confirmation ? formik.errors.password_confirmation : ''}
          type={formik.touched.password_confirmation && formik.errors.password_confirmation ? 'error' : ''}
          value={formik.values.password_confirmation}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          labelStyle={{
            padding: '2px'
          }}
          style={{
            width: '100%',
            marginTop: '8px',
            height: '70px'
          }}
          inputStyle={{
            width: '100%'
          }}
        />
        <SupportSpace>
          <NavigationLink to="/login">Quay lại đăng nhập</NavigationLink>
          <NavigationLink to="/recoveryPassword1">Gửi lại token</NavigationLink>
        </SupportSpace>
        <Button onClick={formik.handleSubmit} type="primary">
          Đặt lại mật khẩu
        </Button>
      </EditUserWrapper>
    </AuthWrapper1>
  );
};

export default memo(RecoveryPassword2);

const EditUserWrapper = styled.div`
  position: relative;
  width: 30%;
  height: auto;
  padding: 2%;
  border-radius: 2%;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
`;

const HeaderModal = styled.h1`
  margin: auto;
`;

const NavigationLink = styled(Link)`
  color: #1677ff;

  &:hover {
    color: red;
  }
`;

const SupportSpace = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding-bottom: 3%;
`;

// const EditLinkPassword = styled.h4`
//   padding-top: 15px;
//   color: #f0432c;
// `;
