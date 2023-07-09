import { useFormik } from 'formik';
import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import * as yup from 'yup';
import { useAuthenticationStore } from '~/hooks/authentication';
import { usePostsStore } from '~/hooks/posts';
import { roles } from '~/store/constant';
import { Input, Selector } from '~/ui-component/atoms';
import { Modal } from '~/ui-component/molecules';

const UpdatePostModal = ({ id, open, setOpen, handleChangeEditPasswordModal }) => {
  const { t } = useTranslation();
  const { authenticationState } = useAuthenticationStore();
  const [newRoles, setNewRoles] = useState([]);
  const { postsState, dispatchUpdatePost, dispatchGetPost } = usePostsStore();

  useEffect(() => {
    const updateRoles = authenticationState.loginInfo.role == 'admin' ? roles : roles.slice(-2);
    setNewRoles(updateRoles);
  }, [authenticationState.loginInfo.role, authenticationState.role]);

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      postname: '',
      role: 'post'
    },
    validationSchema: yup.object({
      email: yup.string().email(t('input.error.post.invalidEmail')).required(t('input.error.post.pleaseEnterEmail')),
      name: yup.string().max(100, t('input.error.post.nameTooLong')).required(t('input.error.post.pleaseEnterPostname')),
      role: yup.string().required(t('input.error.post.pleaseSelectPostRole'))
    }),
    onSubmit: (values) => {
      formik.validateForm().then(() => {
        if (formik.isValid) {
          dispatchUpdatePost({
            id,
            name: values.name,
            email: values.email,
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
      dispatchGetPost({ id });
    }
  }, [dispatchGetPost, id]);

  useEffect(() => {
    const data = postsState.detail;
    if (data) {
      formik.setFieldValue('email', data.email || '');
      formik.setFieldValue('password', data.password || '');
      formik.setFieldValue('name', data.name || '');
      formik.setFieldValue('postname', data.postname || '');
      formik.setFieldValue('role', data.role || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postsState.detail]);

  const handleOpenChangePassword = useCallback(() => {
    handleCancel();
    handleChangeEditPasswordModal({
      status: true,
      id: id
    });
  }, [handleCancel, handleChangeEditPasswordModal, id]);

  return (
    <>
      <Modal
        open={open}
        onOpen={setOpen}
        title={t('modal.post.editPost')}
        onOk={formik.handleSubmit}
        onCancel={handleCancel}
        width="90%"
        okText={t('modal.post.submitEditPost')}
        cancelText={t('modal.post.cancel')}
      >
        <EditPostWrapper>
          <Input
            label={`* ${t('input.label.post.postname')}`}
            name="postname"
            message={formik.touched.postname ? formik.errors.postname : ''}
            type={formik.touched.postname && formik.errors.postname ? 'error' : ''}
            value={formik.values.postname}
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
            label={`* ${t('input.label.post.email')}`}
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
            label={`* ${t('input.label.post.name')}`}
            name="name"
            message={formik.touched.name ? formik.errors.name : ''}
            type={formik.touched.name && formik.errors.name ? 'error' : ''}
            value={formik.values.name}
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
            label={`* ${t('input.label.post.role')}`}
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
          <EditLinkPassword onClick={handleOpenChangePassword}>{t('modal.post.updatePasswordBtn')}</EditLinkPassword>
        </EditPostWrapper>
      </Modal>
    </>
  );
};

export default memo(UpdatePostModal);

const EditPostWrapper = styled.div`
  width: 100%;
  height: 80vh;
  padding: 16px 0;
  overflow: scroll;
`;

const EditLinkPassword = styled.h4`
  cursor: pointer;

  &:hover {
    color: #f0432c;
  }
`;
