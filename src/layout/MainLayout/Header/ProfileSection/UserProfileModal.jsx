import { Image } from 'antd';
import { useFormik } from 'formik';
import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import * as yup from 'yup';
import { useProfileStore } from '~/hooks/profile';
import { useUsersStore } from '~/hooks/users';
import { Input } from '~/ui-component/atoms';
import { Modal } from '~/ui-component/molecules';

const UserProfileModal = ({ open, setOpen, handleChangeEditPasswordModal }) => {
  const { t } = useTranslation();
  const { dispatchAddUser } = useUsersStore();
  const { profileState, dispatchGetProfile } = useProfileStore();
  const avatarDefault = 'https://ionicframework.com/docs/img/demos/avatar.svg';

  useEffect(() => {
    console.log('dispatchGetProfile');
    dispatchGetProfile();
  }, [dispatchGetProfile]);

  useEffect(() => {
    const data = profileState.profile;
    if (data) {
      console.log('profileState', data);
      formik.setFieldValue('username', data.username || '');
      formik.setFieldValue('fullname', data.fullname || '');
      formik.setFieldValue('avatar', data.avatar || avatarDefault);
      formik.setFieldValue('phone', data.phone || '');
      formik.setFieldValue('email', data.email || '');
      formik.setFieldValue('address', data.address || '');
      formik.setFieldValue('role', data.role || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileState.profile]);

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
    validationSchema: yup.object({}),
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

  return (
    <>
      <Modal
        open={open}
        onOpen={setOpen}
        title={t('profile.socialProfile')}
        onOk={() => {
          handleChangeEditPasswordModal(true);
        }}
        onCancel={handleCancel}
        width="400px"
        okText={t('modal.user.updatePasswordBtn')}
        cancelText={t('modal.user.cancel')}
      >
        <EditUserWrapper>
          <Image
            width={90}
            style={{
              width: '100%',
              marginTop: '8px',
              position: 'relative',
              left: 130,
              border: '2px solid #c1c3c7c5',
              borderRadius: '50px'
            }}
            preview={{
              mask: false
            }}
            src={formik.values.avatar}
          />
          <Input
            label={`* ${t('input.label.user.username')}`}
            name="username"
            disabled="true"
            value={formik.values.username}
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
            disabled="true"
            name="email"
            value={formik.values.email}
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
            label={`* ${t('input.label.user.fullname')}`}
            disabled="true"
            name="fullname"
            value={formik.values.fullname}
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
            disabled="true"
            name="phone"
            value={formik.values.phone}
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
            disabled="true"
            name="address"
            value={formik.values.address}
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
            label={`* ${t('input.label.user.role')}`}
            disabled="true"
            name="role"
            value={formik.values.role}
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
        </EditUserWrapper>
      </Modal>
    </>
  );
};

export default memo(UserProfileModal);

const EditUserWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  overflow: scroll;

  ::-webkit-scrollbar {
    width: 0px; /* Chiều rộng thanh cuộn ngang */
  }
`;
