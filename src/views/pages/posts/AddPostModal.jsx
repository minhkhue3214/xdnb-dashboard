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
import { Button } from 'antd';

const AddPostModal = ({ open, setOpen }) => {
  const { t } = useTranslation();
  const { authenticationState } = useAuthenticationStore();
  const [newRoles, setNewRoles] = useState([]);
  const { dispatchAddPost } = usePostsStore();

  useEffect(() => {
    const updateRoles = authenticationState.loginInfo.role == 'admin' ? roles : roles.slice(-2);
    // console.log('updateRoles', authenticationState.loginInfo.role, updateRoles);
    setNewRoles(updateRoles);
  }, [authenticationState.loginInfo.role, authenticationState.role]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
      postname: '',
      role: 'post'
    },
    validationSchema: yup.object({
      email: yup.string().email(t('input.error.post.invalidEmail')).required(t('input.error.post.pleaseEnterEmail')),
      password: yup
        .string()
        .min(8, t('input.error.post.passwordMinLength'))
        .matches(/^(?=.*[a-z])(?=.*[0-9])/, t('input.error.post.passwordRequirements'))
        .required(t('input.error.post.pleaseEnterPassword')),
      name: yup.string().max(100, t('input.error.post.nameTooLong')).required(t('input.error.post.pleaseEnterPostname')),
      postname: yup
        .string()
        .matches(/^[a-zA-Z0-9_]+$/, t('input.error.post.postnameNoSpecialChars'))
        .required(t('input.error.post.pleaseEnterPostname'))
        .test('no-spaces', t('input.error.post.postnameNoSpaces'), (value) => !/\s/.test(value)),
      role: yup.string().required(t('input.error.post.pleaseSelectPostRole'))
    }),
    onSubmit: (values) => {
      formik.validateForm().then(() => {
        if (formik.isValid) {
          dispatchAddPost({
            name: values.name,
            email: values.email,
            role: values.role,
            postname: values.postname,
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

  return (
    <>
      <Modal
        title={t('modal.post.addPost')}
        open={open}
        onOpen={setOpen}
        width="90%"
        footer={[
          <Button key="3" ghost type="primary">
            {t('modal.post.previewPost')}
          </Button>,
          <Button key="1" type="primary" onClick={formik.handleSubmit}>
            {t('modal.post.addPost')}
          </Button>,
          <Button key="2" danger onClick={handleCancel}>
            {t('modal.post.cancel')}
          </Button>
        ]}
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
            label={`* ${t('input.label.post.password')}`}
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
        </EditPostWrapper>
      </Modal>
    </>
  );
};

export default memo(AddPostModal);

const EditPostWrapper = styled.div`
  width: 100%;
  height: 80vh;
  padding: 16px 0;
`;
