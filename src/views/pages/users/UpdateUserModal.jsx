import { useFormik } from 'formik';
import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import * as yup from 'yup';
import axios from 'axios';
import { useAuthenticationStore } from '~/hooks/authentication';
import { useUsersStore } from '~/hooks/users';
import { roles } from '~/store/constant';
import { Input, Selector, UploadImage } from '~/ui-component/atoms';
import { Modal } from '~/ui-component/molecules';

const UpdateUserModal = ({ id, open, setOpen, handleChangeEditPasswordModal }) => {
  const { t } = useTranslation();
  const { authenticationState } = useAuthenticationStore();
  const [newRoles, setNewRoles] = useState([]);
  const { usersState, dispatchUpdateUser, dispatchGetUserById } = useUsersStore();

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const updateRoles = authenticationState.loginInfo.role == 'admin' ? roles : roles.slice(-2);
    setNewRoles(updateRoles);
  }, [authenticationState.loginInfo.role, authenticationState.role]);

  const formik = useFormik({
    initialValues: {
      email: '',
      fullname: '',
      username: '',
      avatar: '',
      phone: null,
      address: '',
      role: 'ADMIN'
    },
    validationSchema: yup.object({
      email: yup.string().email(t('input.error.user.invalidEmail')).required(t('input.error.user.pleaseEnterEmail')),
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
          dispatchUpdateUser({
            id,
            full_name: values.fullname,
            username: values.username,
            avatar: values.avatar,
            phone: values.phone,
            email: values.email,
            address: values.address,
            role: values.role
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

  useEffect(() => {
    if (id) {
      dispatchGetUserById({ id });
    }
  }, [dispatchGetUserById, id]);

  useEffect(() => {
    const data = usersState.detail;
    console.log('data', data);
    if (data) {
      formik.setFieldValue('username', data.username || '');
      formik.setFieldValue('fullname', data.full_name || '');
      formik.setFieldValue('avatar', data.avatar || '');
      formik.setFieldValue('phone', data.phone || '');
      formik.setFieldValue('email', data.email || '');
      formik.setFieldValue('address', data.address || '');
      formik.setFieldValue('password', data.password || '');
      formik.setFieldValue('role', data.role || '');
      setImageUrl(data.avatar);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersState.detail]);

  const handleOpenChangePassword = useCallback(() => {
    handleCancel();
    handleChangeEditPasswordModal({
      status: true,
      id: id
    });
  }, [handleCancel, handleChangeEditPasswordModal, id]);

  // const handleChangeImageUrl = useCallback(
  //   (value) => {
  //     formik.setFieldValue('avatar', value);
  //   },
  //   [formik]
  // );

  const uploadImage = async (options) => {
    setLoading(true);
    const { onSuccess, onError, file } = options;

    const fmData = new FormData();
    // const config = {
    //   headers: { 'content-type': 'multipart/form-data' },
    //   onUploadProgress: (event) => {
    //     const percent = Math.floor((event.loaded / event.total) * 100);
    //     setProgress(percent);
    //     if (percent === 100) {
    //       setTimeout(() => setProgress(0), 1000);
    //     }
    //     onProgress({ percent: (event.loaded / event.total) * 100 });
    //   }
    // };
    fmData.append('image', file);
    try {
      const res = await axios.post('https://tenmienmienphi.online/api/upload-image', fmData);

      onSuccess('Ok');
      console.log('server res: ', res);
      setLoading(false);
      setImageUrl(res.data.data.image_url);
    } catch (err) {
      console.log('Eroor: ', err);
      // const error = new Error('Some error');
      onError({ err });
    }
  };

  return (
    <>
      <Modal
        open={open}
        onOpen={setOpen}
        title={t('modal.user.editUser')}
        onOk={formik.handleSubmit}
        onCancel={handleCancel}
        width="850px"
        okText={t('modal.user.submitEditUser')}
        cancelText={t('modal.user.cancel')}
      >
        <EditUserWrapper>
          <Cell>
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
            <UploadImage
              label={`* ${t('input.label.post.imageUrl')}`}
              name="avatar"
              message={formik.touched.avatar ? formik.errors.avatar : ''}
              type={formik.touched.avatar && formik.errors.avatar ? 'error' : ''}
              value={formik.values.avatar}
              onBlur={formik.handleBlur}
              onChange={uploadImage}
              loading={loading}
              imageUrl={imageUrl}
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
          </Cell>
          <Cell>
            <Input
              label={`* ${t('input.label.user.username')}`}
              name="username"
              message={formik.touched.username ? formik.errors.username : ''}
              type={formik.touched.username && formik.errors.username ? 'error' : ''}
              value={formik.values.username}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              disabled
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
            <EditLinkPassword onClick={handleOpenChangePassword}>{t('modal.user.updatePasswordBtn')}</EditLinkPassword>
          </Cell>
        </EditUserWrapper>
      </Modal>
    </>
  );
};

export default memo(UpdateUserModal);

const EditUserWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 55vh;
  display: grid;
  grid-template-rows: 1fr; /* 2 hàng bằng nhau */
  grid-template-columns: 1.6fr 1fr; /* 2 cột bằng nhau */
  gap: 10px; /* Khoảng cách giữa các vùng */
`;

const Cell = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f1f6f9;
  border-radius: 8px;
  padding: 8px;
  overflow-x: hidden;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
`;

const EditLinkPassword = styled.h4`
  cursor: pointer;

  &:hover {
    color: #f0432c;
  }
`;
