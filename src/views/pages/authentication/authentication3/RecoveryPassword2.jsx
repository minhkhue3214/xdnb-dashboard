import { Button } from 'antd';
import { memo, useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import * as yup from 'yup';
import { InputPassword, Input } from '~/ui-component/atoms';

// project imports
import { useAuthenticationStore } from '~/hooks/authentication';
import AuthWrapper1 from '../AuthWrapper1';

const RecoveryPassword2 = () => {
  const { dispatchRecoveryPassword2, authenticationState } = useAuthenticationStore();
  const { t } = useTranslation();
  const [errMess, setErrMess] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      token: '',
      password: '',
      password_confirmation: ''
    },
    validationSchema: yup.object({
      password: yup
        .string()
        .min(8, t('input.error.user.passwordMinLength'))
        .matches(/^(?=.*[a-z])(?=.*[0-9])/, t('input.error.user.passwordRequirements'))
        .required(t('input.error.user.pleaseEnterPassword'))
    }),
    onSubmit: (values) => {
      if (values.password !== values.password_confirmation) {
        setErrMess(true);
        // setTimeout(setErrMess(false), 3000);
        return;
      }
      formik.validateForm().then(() => {
        if (formik.isValid) {
          dispatchRecoveryPassword2({
            email: values.email,
            token: values.token,
            password: values.password,
            password_confirmation: values.password_confirmation
          });
          if (authenticationState.recoveryPassword2Status) {
            navigateTo('/login');
          }
        }
      });
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
        {errMess && <EditLinkPassword>{t('input.error.user.passwordsDoNotMatch')}</EditLinkPassword>}
        <SupportSpace>
          <NavigationLink to="/login">Quay lại đăng nhập</NavigationLink>
          <NavigationLink to="/recoveryPassword1">Gửi lại token</NavigationLink>
        </SupportSpace>
        <Button onClick={formik.handleSubmit} type="primary">
          Đăng nhập
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

const EditLinkPassword = styled.h4`
  padding-top: 15px;
  color: #f0432c;
`;
