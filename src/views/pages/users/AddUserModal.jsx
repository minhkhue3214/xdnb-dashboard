import { useFormik } from 'formik';
import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import * as yup from 'yup';
import { useAuthenticationStore } from '~/hooks/authentication';
import { useUsersStore } from '~/hooks/users';
import { roles } from '~/store/constant';
import { Input, InputImage, Selector } from '~/ui-component/atoms';
import { Modal } from '~/ui-component/molecules';

const AddUserModal = ({ open, setOpen }) => {
  const { t } = useTranslation();
  const { authenticationState } = useAuthenticationStore();
  const [newRoles, setNewRoles] = useState([]);
  const { dispatchAddUser } = useUsersStore();

  useEffect(() => {
    const updateRoles = authenticationState.loginInfo.role == 'admin' ? roles : roles.slice(-2);
    console.log('updateRoles', updateRoles);
    // console.log('updateRoles', authenticationState.loginInfo.role, updateRoles);
    setNewRoles(updateRoles);
  }, [authenticationState.loginInfo.role, authenticationState.role]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      fullname: '',
      username: '',
      avatar: '',
      phone: null,
      address: '',
      role: 'ADMIN'
    },
    validationSchema: yup.object({
      email: yup.string().email(t('input.error.user.invalidEmail')).required(t('input.error.user.pleaseEnterEmail')),
      password: yup
        .string()
        .min(8, t('input.error.user.passwordMinLength'))
        .matches(/^(?=.*[a-z])(?=.*[0-9])/, t('input.error.user.passwordRequirements'))
        .required(t('input.error.user.pleaseEnterPassword')),
      fullname: yup.string().max(100, t('input.error.user.nameTooLong')).required(t('input.error.user.pleaseEnterUsername')),
      phone: yup.number(),
      username: yup
        .string()
        .matches(/^[a-zA-Z0-9_]+$/, t('input.error.user.usernameNoSpecialChars'))
        .required(t('input.error.user.pleaseEnterUsername'))
        .test('no-spaces', t('input.error.user.usernameNoSpaces'), (value) => !/\s/.test(value)),
      avatar: yup.string().max(9000000, t('input.error.user.nameTooLong')),
      address: yup.string().max(50, t('input.error.user.nameTooLong')),
      role: yup.string().required(t('input.error.user.pleaseSelectUserRole'))
    }),
    onSubmit: (values) => {
      formik.validateForm().then(() => {
        if (formik.isValid) {
          console.log('AddUserModal', values);
          dispatchAddUser({
            fullname: values.fullname,
            username: values.username,
            avatar: values.avatar,
            phone: values.phone,
            email: values.email,
            address: values.address,
            role: values.role,
            password: values.password
          });

          handleCancel();
        }
      });
    },
    validateOnChange: true
  });

  const handleCancel = useCallback(() => {
    formik.handleReset();
    setOpen(false);
  }, [formik, setOpen]);

  const handleChangeRole = useCallback(
    (value) => {
      formik.setFieldValue('role', value);
    },
    [formik]
  );

  // const getBase64 = (img, callback) => {
  //   const reader = new FileReader();
  //   reader.addEventListener('load', () => callback(reader.result));
  //   reader.readAsDataURL(img);
  // };

  // const handleUploadImage = (info) => {
  //   console.log('handleChange', info);
  //   if (info.file.status === 'uploading') {
  //     setLoading(true);
  //     return;
  //   }
  //   // Get this url from response in real world.
  //   getBase64(info.file.originFileObj, (url) => {
  //     setLoading(false);
  //     console.log('setImageUrl', url);
  //     setImageUrl(url);
  //   });
  // };

  const handleChangeImageUrl = useCallback(
    (value) => {
      formik.setFieldValue('avatar', value);
    },
    [formik]
  );

  return (
    <>
      <Modal
        open={open}
        onOpen={setOpen}
        title={t('modal.user.addUser')}
        onOk={formik.handleSubmit}
        onCancel={handleCancel}
        width="350px"
        okText={t('modal.user.submitAddUser')}
        cancelText={t('modal.user.cancel')}
      >
        <EditUserWrapper>
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
            label={`* ${t('input.label.user.fullname')}`}
            name="fullname"
            message={formik.touched.fullname ? formik.errors.fullname : ''}
            type={formik.touched.fullname && formik.errors.fullname ? 'error' : ''}
            value={formik.values.fullname}
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
          <InputImage
            label={`* ${t('input.label.post.imageUrl')}`}
            name="avatar"
            message={formik.touched.avatar ? formik.errors.avatar : ''}
            type={formik.touched.avatar && formik.errors.avatar ? 'error' : ''}
            value={formik.values.avatar}
            onBlur={formik.handleBlur}
            onChange={handleChangeImageUrl}
            labelStyle={{
              padding: '2px'
            }}
            style={{
              width: '100%',
              marginTop: '8px'
            }}
            inputStyle={{
              width: '100%'
            }}
          />
          <Input
            label={`* ${t('input.label.user.email')}`}
            name="email"
            message={formik.touched.email ? formik.errors.email : ''}
            type={formik.touched.email && formik.errors.email ? 'error' : ''}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            size="middle"
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
            label={`* ${t('input.label.user.phone')}`}
            name="phone"
            message={formik.touched.phone ? formik.errors.phone : ''}
            type={formik.touched.phone && formik.errors.phone ? 'error' : ''}
            value={formik.values.phone}
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
            label={`* ${t('input.label.user.address')}`}
            name="address"
            message={formik.touched.address ? formik.errors.address : ''}
            type={formik.touched.address && formik.errors.address ? 'error' : ''}
            value={formik.values.address}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            size="middle"
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
          <Selector
            label={`* ${t('input.label.user.role')}`}
            name="role"
            mode=""
            labelStyle={{
              padding: '2px'
            }}
            style={{
              width: '100%',
              marginTop: '8px',
              height: '70px'
            }}
            selectStyle={{
              width: '100%'
            }}
            options={newRoles}
            value={formik.values.role}
            onChange={handleChangeRole}
            message={formik.touched.role ? formik.errors.role : ''}
            type={formik.touched.role && formik.errors.role ? 'error' : ''}
          />
        </EditUserWrapper>
      </Modal>
    </>
  );
};

export default memo(AddUserModal);

const EditUserWrapper = styled.div`
  width: 100%;
  height: 80vh;
  padding: 16px 0;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0.3rem; /* Độ rộng của thanh cuộn */
  }
`;
