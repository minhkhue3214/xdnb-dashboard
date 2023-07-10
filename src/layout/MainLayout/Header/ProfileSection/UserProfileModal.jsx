import { useFormik } from 'formik';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import * as yup from 'yup';
import { useUsersStore } from '~/hooks/users';
import { Input, InputImage } from '~/ui-component/atoms';
import { Modal } from '~/ui-component/molecules';

const AddUserModal = ({ open, setOpen }) => {
  const { t } = useTranslation();
  const { dispatchAddUser } = useUsersStore();

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
        onOk={formik.handleSubmit}
        onCancel={handleCancel}
        width="400px"
        okText={t('modal.user.submitAddUser')}
        cancelText={t('modal.user.cancel')}
      >
        <EditUserWrapper>
          <InputImage
            label={`* ${t('input.label.post.imageUrl')}`}
            name="avatar"
            value={formik.values.avatar}
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
            label={`* ${t('input.label.user.username')}`}
            name="username"
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

export default memo(AddUserModal);

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

