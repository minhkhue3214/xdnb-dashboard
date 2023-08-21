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
import AuthWrapper1 from '../AuthWrapper1';
import axios from 'axios';
import dispatchToast from '~/handlers/toast';

const RecoveryPassword1 = () => {
  const { t } = useTranslation();
  const navigateTo = useNavigate();

  // const formik = useFormik({
  //   initialValues: {
  //     email: ''
  //   },
  //   validationSchema: yup.object({
  //     email: yup.string().email(t('input.error.user.invalidEmail')).required(t('input.error.user.pleaseEnterEmail'))
  //   }),
  //   onSubmit: (values) => {
  //     formik.validateForm().then(() => {
  //       if (formik.isValid) {
  //         dispatchRecoveryPassword1({
  //           email: values.email
  //         });

  //         console.log('check recoveryPassword1Status', authenticationState.recoveryPassword1Status);
  //         if (authenticationState.recoveryPassword1Status) {
  //           navigateTo('/recoverypassword2');
  //         }
  //         // navigateTo('/recoverypassword2');
  //         // setTimeout(() => {

  //         // }, 5000);
  //       }
  //     });
  //   },
  //   validateOnChange: true
  // });

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: yup.object({
      email: yup.string().email(t('input.error.user.invalidEmail')).required(t('input.error.user.pleaseEnterEmail'))
    }),
    onSubmit: async (values) => {
      await formik.validateForm();

      if (formik.isValid) {
        try {
          const response = await axios.post(
            'https://tenmienmienphi.online/api/auth/recovery-password-step1',
            { email: values.email },
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );
          // console.log('Response:', response.data.message);
          dispatchToast('success', response.data.message);
          navigateTo('/recoverypassword2');

          // Do something with the response if needed
        } catch (error) {
          // console.error('Error:', error.response.data.message);
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
