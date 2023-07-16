import { useFormik } from 'formik';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import * as yup from 'yup';
import { useUsersStore } from '~/hooks/users';
import { Input, InputNumber, Switch, UploadMultipleImage } from '~/ui-component/atoms';
import { Modal } from '~/ui-component/molecules';

const AddUserModal = ({ open, setOpen }) => {
  const { t } = useTranslation();
  const { dispatchAddUser } = useUsersStore();

  const formik = useFormik({
    initialValues: {
      category_id: 'category123',
      name: '',
      slug: '',
      hot: false,
      short_description: '',
      long_description: '',
      priority: 1,
      gallery_items: []
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

  return (
    <>
      <Modal
        open={open}
        onOpen={setOpen}
        title={t('modal.product.addProduct')}
        onOk={formik.handleSubmit}
        onCancel={handleCancel}
        width="85%"
        okText={t('modal.user.submitAddUser')}
        cancelText={t('modal.user.cancel')}
      >
        <EditUserWrapper>
          <CellLeft>
            <Input
              label={`* ${t('input.label.product.category_id')}`}
              name="category_id"
              message={formik.touched.category_id ? formik.errors.category_id : ''}
              type={formik.touched.category_id && formik.errors.category_id ? 'error' : ''}
              value={formik.values.category_id}
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
              label={`* ${t('input.label.product.name')}`}
              name="name"
              message={formik.touched.name ? formik.errors.name : ''}
              type={formik.touched.name && formik.errors.name ? 'error' : ''}
              value={formik.values.name}
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
              label={`* ${t('input.label.product.slug')}`}
              name="slug"
              message={formik.touched.slug ? formik.errors.slug : ''}
              type={formik.touched.slug && formik.errors.slug ? 'error' : ''}
              value={formik.values.slug}
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
            <InputNumber
              label={`* ${t('input.label.product.priority')}`}
              name="priority"
              message={formik.touched.priority ? formik.errors.priority : ''}
              type={formik.touched.priority && formik.errors.priority ? 'error' : ''}
              value={formik.values.priority}
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
                width: '20%'
              }}
            />
            <Switch
              label="* True"
              name="priority"
              message={formik.touched.priority ? formik.errors.priority : ''}
              type={formik.touched.priority && formik.errors.priority ? 'error' : ''}
              value={formik.values.priority}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              labelStyle={{
                padding: '2px',
                width: '20%'
              }}
              style={{
                width: '100%',
                marginTop: '8px',
                height: '70px'
              }}
              inputStyle={{
                width: '6%'
              }}
            />
            <Input
              label={`* ${t('input.label.product.short_description')}`}
              name="short_description"
              message={formik.touched.short_description ? formik.errors.short_description : ''}
              type={formik.touched.short_description && formik.errors.short_description ? 'error' : ''}
              value={formik.values.short_description}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              size="middle"
              isTextArea={true}
              rows={2}
              labelStyle={{
                padding: '2px'
              }}
              style={{
                width: '100%'
              }}
              inputStyle={{
                width: '100%',
                resize: 'none'
              }}
              maxLength={20}
              showCount
            />
            <Input
              label={`* ${t('input.label.product.long_description')}`}
              name="long_description"
              message={formik.touched.long_description ? formik.errors.long_description : ''}
              type={formik.touched.long_description && formik.errors.long_description ? 'error' : ''}
              value={formik.values.long_description}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              size="middle"
              isTextArea={true}
              rows={5}
              labelStyle={{
                padding: '2px'
              }}
              style={{
                width: '100%'
              }}
              inputStyle={{
                width: '100%',
                resize: 'none'
              }}
              maxLength={2000}
              showCount
            />
          </CellLeft>
          <CellRight>
            <Input
              label={`* ${t('input.label.product.image_name')}`}
              name="image_name"
              message={formik.touched.image_name ? formik.errors.image_name : ''}
              type={formik.touched.image_name && formik.errors.image_name ? 'error' : ''}
              value={formik.values.image_name}
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
              label="alt"
              name="alt"
              message={formik.touched.alt ? formik.errors.alt : ''}
              type={formik.touched.alt && formik.errors.alt ? 'error' : ''}
              value={formik.values.alt}
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
            <InputNumber
              label={`* ${t('input.label.product.image_priority')}`}
              name="image_priority"
              message={formik.touched.image_priority ? formik.errors.image_priority : ''}
              type={formik.touched.image_priority && formik.errors.image_priority ? 'error' : ''}
              value={formik.values.image_priority}
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
                width: '20%'
              }}
            />
            <UploadMultipleImage
              label={`* ${t('input.label.product.image_priority')}`}
              name="image_priority"
              message={formik.touched.image_priority ? formik.errors.image_priority : ''}
              type={formik.touched.image_priority && formik.errors.image_priority ? 'error' : ''}
              value={formik.values.image_priority}
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
                width: '20%'
              }}
            />
          </CellRight>
        </EditUserWrapper>
      </Modal>
    </>
  );
};

export default memo(AddUserModal);

const EditUserWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 72vh;
  display: grid;
  grid-template-rows: 1fr; /* 2 hàng bằng nhau */
  grid-template-columns: 1.5fr 1fr; /* 2 cột bằng nhau */
  gap: 12px; /* Khoảng cách giữa các vùng */
`;

const CellLeft = styled.div`
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
const CellRight = styled.div`
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
