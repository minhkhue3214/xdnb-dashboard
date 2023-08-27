import axios from 'axios';
import { useFormik } from 'formik';
import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import * as yup from 'yup';
import { useAuthenticationStore } from '~/hooks/authentication';
import { useUsersStore } from '~/hooks/users';
import { roles } from '~/store/constant';
import { Input, Selector, UploadImage } from '~/ui-component/atoms';
import { Modal } from '~/ui-component/molecules';

const AddUserModal = ({ open, setOpen }) => {
  const { t } = useTranslation();
  const { authenticationState, dispatchForceLogout } = useAuthenticationStore();
  const [newRoles, setNewRoles] = useState([]);
  const { dispatchAddUser } = useUsersStore();

  const [loading, setLoading] = useState(false);
  const [imagePath, setImagePath] = useState('');

  useEffect(() => {
    console.log('authenticationState', authenticationState);

    const updateRoles = authenticationState.loginInfo.role == 'admin' ? roles : roles.slice(-1);
    // console.log('updateRoles', updateRoles);
    console.log('updateRoles', authenticationState.loginInfo.role, updateRoles);
    setNewRoles(updateRoles);
  }, [authenticationState.loginInfo.role, authenticationState.role]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      fullname: '',
      username: '',
      phone: null,
      address: '',
      role: ''
    },
    validationSchema: yup.object({
      email: yup.string().email(t('input.error.user.invalidEmail')).required(t('input.error.user.pleaseEnterEmail')),
      password: yup
        .string()
        .min(8, t('input.error.user.passwordMinLength'))
        .matches(/^(?=.*[a-z])(?=.*[0-9])/, t('input.error.user.passwordRequirements'))
        .required(t('input.error.user.pleaseEnterPassword')),
      fullname: yup.string().max(50, t('input.error.user.nameTooLong')).required(t('input.error.user.pleaseEnterUsername')),
      phone: yup.number().max(10, t('input.error.user.phoneTooLong')).required(t('input.error.user.pleaseEnterPhone')),
      username: yup
        .string()
        .matches(/^[a-zA-Z0-9_]+$/, t('input.error.user.usernameNoSpecialChars'))
        .required(t('input.error.user.pleaseEnterUsername'))
        .test('no-spaces', t('input.error.user.usernameNoSpaces'), (value) => !/\s/.test(value)),
      // avatar: yup.string().max(9000000, t('input.error.user.nameTooLong')),
      address: yup.string().max(50, t('input.error.user.addressTooLong')),
      role: yup.string().required(t('input.error.user.pleaseSelectUserRole'))
    }),
    onSubmit: (values) => {
      formik.validateForm().then(() => {
        if (formik.isValid) {
          console.log('AddUserModal', values);
          dispatchAddUser({
            full_name: values.fullname,
            username: values.username,
            avatar: imagePath,
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
    setImagePath('');
  }, [formik, setOpen]);

  const handleChangeRole = useCallback(
    (value) => {
      formik.setFieldValue('role', value);
    },
    [formik]
  );

  const uploadImage = async (options) => {
    setLoading(true);
    const { onSuccess, onError, file } = options;

    const fmData = new FormData();
    fmData.append('image', file);
    const config = {
      headers: {
        Authorization: `Bearer ${authenticationState.token}`
      }
    };
    try {
      const res = await axios.post('https://tenmienmienphi.online/api/upload-image', fmData, config);

      onSuccess('Ok');
      console.log('server res: ', res);
      setLoading(false);
      // setImageUrl(res.data.data.image_url);
      setImagePath(res.data.data.image_path);
    } catch (err) {
      console.log('Eroor: ', err);
      if (err.response.status == 401) {
        dispatchForceLogout();
      }
      // const error = new Error('Some error');
      onError({ err });
    }
  };

  // const handleChange = (info) => {
  //   const apiUrl = 'https://tenmienmienphi.online/api/upload-image';

  //   new Promise((resolve, reject) => {
  //     axios
  //       .post(apiUrl, info)
  //       .then((response) => {
  //         // Trả về dữ liệu thành công khi gọi API thành công
  //         resolve(response.data);
  //       })
  //       .catch((error) => {
  //         // Trả về lỗi nếu có lỗi xảy ra trong quá trình gọi API
  //         reject(error);
  //       });
  //   });
  // };

  return (
    <>
      <Modal
        open={open}
        onOpen={setOpen}
        title={t('modal.user.addUser')}
        onOk={formik.handleSubmit}
        onCancel={handleCancel}
        width="850px"
        okText={t('modal.user.submitAddUser')}
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
              imageUrl={imagePath}
              setImagePath={setImagePath}
              labelStyle={{
                padding: '2px'
              }}
              // style={{
              //   width: '100%',
              //   marginTop: '8px'
              // }}
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
          </Cell>
        </EditUserWrapper>
      </Modal>
    </>
  );
};

export default memo(AddUserModal);

const EditUserWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 58vh;
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
