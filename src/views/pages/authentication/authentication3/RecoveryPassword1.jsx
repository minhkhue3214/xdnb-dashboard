import { Button } from 'antd';
import { memo } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as yup from 'yup';
import { Input } from '~/ui-component/atoms';

// project imports
import { useAuthenticationStore } from '~/hooks/authentication';
import AuthWrapper1 from '../AuthWrapper1';

const RecoveryPassword1 = () => {
  const { authenticationState, dispatchRecoveryPassword1 } = useAuthenticationStore();
  const { t } = useTranslation();
  const navigateTo = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: yup.object({
      email: yup.string().email(t('input.error.user.invalidEmail')).required(t('input.error.user.pleaseEnterEmail'))
    }),
    onSubmit: (values) => {
      formik.validateForm().then(() => {
        if (formik.isValid) {
          dispatchRecoveryPassword1({
            email: values.email
          });
          console.log('authenticationState navigate', authenticationState.recoveryPassword1Status);

          if (authenticationState.recoveryPassword1Status) {
            navigateTo('/recoverypassword2');
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
        <SupportSpace>
          <NavigationLink to="/login">Quay lại đăng nhập</NavigationLink>
        </SupportSpace>
        <Button onClick={formik.handleSubmit} type="primary">
          Tạo mật khẩu mới
        </Button>
      </EditUserWrapper>
    </AuthWrapper1>
  );
};

export default memo(RecoveryPassword1);

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
