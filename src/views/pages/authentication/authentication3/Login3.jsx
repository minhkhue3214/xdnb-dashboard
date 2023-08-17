import { Button } from 'antd';
import { memo } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import * as yup from 'yup';
import { Input } from '~/ui-component/atoms';

// project imports
import { useAuthenticationStore } from '~/hooks/authentication';
import AuthWrapper1 from '../AuthWrapper1';

const Login = () => {
  const { dispatchLogin } = useAuthenticationStore();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      password: '',
      username: ''
    },
    validationSchema: yup.object({
      password: yup
        .string()
        .min(8, t('input.error.user.passwordMinLength'))
        .matches(/^(?=.*[a-z])(?=.*[0-9])/, t('input.error.user.passwordRequirements'))
        .required(t('input.error.user.pleaseEnterPassword')),
      username: yup
        .string()
        .matches(/^[a-zA-Z0-9_]+$/, t('input.error.user.usernameNoSpecialChars'))
        .required(t('input.error.user.pleaseEnterUsername'))
        .test('no-spaces', t('input.error.user.usernameNoSpaces'), (value) => !/\s/.test(value))
    }),
    onSubmit: (values) => {
      formik.validateForm().then(() => {
        if (formik.isValid) {
          console.log('AddUserModal', values);
          dispatchLogin({
            username: values.username,
            password: values.password
          });
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
          label={`* ${t('input.label.user.username')}`}
          name="username"
          message={formik.touched.username ? formik.errors.username : ''}
          type={formik.touched.username && formik.errors.username ? 'error' : ''}
          value={formik.values.username}
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
        <SupportSpace>
          <NavigationLink to="/RecoveryPassword1">Quên mật khẩu</NavigationLink>
        </SupportSpace>
        <Button onClick={formik.handleSubmit} type="primary">
          Đăng nhập
        </Button>
      </EditUserWrapper>
    </AuthWrapper1>
  );
};

export default memo(Login);

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
  padding-bottom: 3%;
`;
