import { useFormik } from 'formik';
import { useCallback, useState } from 'react';
import styled from 'styled-components';
import * as yup from 'yup';
import { useUsersStore } from '~/hooks/users';
import { Input } from '~/ui-component/atoms';
import { Modal } from '~/ui-component/molecules';

const ChangePasswordModal = ({ id, open, setOpen }) => {

  const [errMess, setErrMess] = useState(false);

  const { dispatchUpdatePassword } = useUsersStore();

  const formik = useFormik({
    initialValues: {
      password: '',
      repassword: ''
    },
    validationSchema: yup.object({
      password: yup
        .string()
        .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
        .matches(/^(?=.*[a-z])(?=.*[0-9])/, 'Mật khẩu phải chứa ít nhất 1 chữ cái và 1 số')
        .required('Vui lòng nhập mật khẩu'),
      repassword: yup
        .string()
        .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
        .matches(/^(?=.*[a-z])(?=.*[0-9])/, 'Mật khẩu phải chứa ít nhất 1 chữ cái và 1 số')
        .required('Vui lòng nhập mật khẩu')
    }),
    onSubmit: (values) => {
      console.log('compare password', values);
      if (values.password !== values.repassword) {
        setErrMess(true);
        return;
      }
      formik.validateForm().then(() => {
        if (formik.isValid) {
          dispatchUpdatePassword({
            id,
            password: values.password
          });
          setErrMess(false);
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
        title="Thêm người dùng"
        onOk={formik.handleSubmit}
        onCancel={handleCancel}
        width="350px"
        okText="Xác nhận"
        cancelText="Hủy bỏ"
      >
        <EditUserWrapper>
          <Input
            label="* Nhập mật khẩu mới"
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
            label="* Nhập lại mật khẩu mới"
            name="repassword"
            message={formik.touched.repassword ? formik.errors.repassword : ''}
            type={formik.touched.repassword && formik.errors.repassword ? 'error' : ''}
            value={formik.values.repassword}
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
          {errMess && <EditLinkPassword>Mật khẩu không khớp</EditLinkPassword>}
        </EditUserWrapper>
      </Modal>
    </>
  );
};

export default ChangePasswordModal;

const EditUserWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px 0;
`;

const EditLinkPassword = styled.h4`
  padding-top: 15px;
  color: #f0432c;
`;
