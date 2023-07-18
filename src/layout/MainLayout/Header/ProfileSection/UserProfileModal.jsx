import { Image, Button } from 'antd';
import { useFormik } from 'formik';
import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import * as yup from 'yup';
import { useProfileStore } from '~/hooks/profile';
import { Input } from '~/ui-component/atoms';
import { Modal } from '~/ui-component/molecules';

const UserProfileModal = ({ open, setOpen, handleChangeEditPasswordModal }) => {
  const { t } = useTranslation();
  const { profileState, dispatchGetProfile, dispatchUpdateProfile } = useProfileStore();
  const avatarDefault = 'https://ionicframework.com/docs/img/demos/avatar.svg';
  const [id, setId] = useState('');

  useEffect(() => {
    console.log('dispatchGetProfile');
    dispatchGetProfile();
  }, [dispatchGetProfile]);

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
          console.log('UpdateInfoModal', values);
          dispatchUpdateProfile({
            id,
            fullname: values.fullname,
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

  useEffect(() => {
    const data = profileState.profile;
    if (data) {
      console.log('profileState', data);
      setId(data.id);
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

  const handleCancel = useCallback(() => {
    formik.handleReset();
    setOpen(false);
  }, [formik, setOpen]);

  const handleChange = (event) => {
    // Xử lý sự kiện thay đổi giá trị
    formik.handleChange(event);
    // Các hành động khác bạn muốn thực hiện khi có sự thay đổi giá trị
    console.log(event.target.value);
  };

  return (
    <>
      <Modal
        open={open}
        onOpen={setOpen}
        // title={t('profile.socialProfile')}
        // onOk={() => {
        //   handleChangeEditPasswordModal(true);
        // }}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Huỷ bỏ
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              handleChangeEditPasswordModal(true);
            }}
          >
            {t('modal.user.updatePasswordBtn')}
          </Button>,
          <Button key="update" type="primary" onClick={formik.handleSubmit}>
            Thay đổi thông tin
          </Button>
        ]}
        width="500px"
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
              left: 180,
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
            onChange={handleChange}
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
            value={formik.values.email}
            onChange={handleChange}
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
            name="fullname"
            value={formik.values.fullname}
            onChange={handleChange}
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
            value={formik.values.phone}
            onChange={handleChange}
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
            value={formik.values.address}
            onChange={handleChange}
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
            name="role"
            disabled="true"
            value={formik.values.role}
            onChange={handleChange}
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
