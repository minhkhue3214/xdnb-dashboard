import { useFormik } from 'formik';
import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// import styled from 'styled-components';
import * as yup from 'yup';
import { useProductsStore } from '~/hooks/products';

const UpdateProductModal = ({ id, setOpen }) => {
  const { t } = useTranslation();
  const { productsState, dispatchGetProductById } = useProductsStore();

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
    console.log('UpdateProductModal id', id);
  }, []);

  const handleCancel = useCallback(() => {
    formik.handleReset();
    setOpen(false);
  }, [formik, setOpen]);

  useEffect(() => {
    if (id) {
      dispatchGetProductById({ id });
    }
  }, [dispatchGetProductById, id]);

  useEffect(() => {
    const data = productsState.detail;
    if (data) {
      // formik.setFieldValue('username', data.username || '');
      // formik.setFieldValue('fullname', data.fullname || '');
      // formik.setFieldValue('avatar', data.avatar || '');
      // formik.setFieldValue('phone', data.phone || '');
      // formik.setFieldValue('email', data.email || '');
      // formik.setFieldValue('address', data.address || '');
      // formik.setFieldValue('password', data.password || '');
      // formik.setFieldValue('role', data.role || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsState.detail]);

  return <></>;
};

export default memo(UpdateProductModal);

// const EditUserWrapper = styled.div`
//   position: relative;
//   width: 100%;
//   height: 55vh;
//   display: grid;
//   grid-template-rows: 1fr; /* 2 hàng bằng nhau */
//   grid-template-columns: 1.6fr 1fr; /* 2 cột bằng nhau */
//   gap: 10px; /* Khoảng cách giữa các vùng */
// `;

// const Cell = styled.div`
//   position: relative;
//   width: 100%;
//   height: 100%;
//   background-color: #f1f6f9;
//   border-radius: 8px;
//   padding: 8px;
//   overflow-x: hidden;
//   overflow-y: scroll;
//   display: flex;
//   flex-direction: column;
// `;

// const EditLinkPassword = styled.h4`
//   cursor: pointer;

//   &:hover {
//     color: #f0432c;
//   }
// `;
