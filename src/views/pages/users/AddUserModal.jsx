import { Modal } from '~/ui-component/molecules';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Input, Selector } from '~/ui-component/atoms';
import styled from 'styled-components';
import { useCallback } from 'react';
const AddUserModal = ({ open, setOpen }) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
      username: '',
      role: 'user',
      orgIds: []
    },
    validationSchema: yup.object({
      email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
      password: yup.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự').required('Vui lòng nhập mật khẩu'),
      name: yup.string().max(100, 'Tên của bạn quá dài').required('Vui lòng nhập tên người dùng'),
      username: yup
        .string()
        .required('Vui lòng nhập tên người dùng')
        .test('no-spaces', 'Tên người dùng không được chứa dấu cách', (value) => !/\s/.test(value))
    }),
    onSubmit: (values) => {
      console.log('submit', values);
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

  const handleChangeOrgIds = useCallback(
    (value) => {
      formik.setFieldValue('orgIds', value);
    },
    [formik]
  );

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
            label="* Tên đăng nhập"
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
            label="* Email"
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
            label="* Mật khẩu"
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
            label="* Tên đầy đủ"
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
            label="* Quyền người dùng"
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
            options={[
              {
                label: 'Giám đốc',
                value: 'admin'
              },
              {
                label: 'Quản lý tổ chức',
                value: 'manager'
              },
              {
                label: 'Tổ trưởng bảo vệ',
                value: 'leader'
              },
              {
                label: 'Nhân viên bảo vệ',
                value: 'user'
              }
            ]}
            value={formik.values.role}
            onChange={handleChangeRole}
          />
          <Selector
            label="* Tổ chức"
            name="org"
            mode="multiple"
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
            options={[
              {
                label: 'tổ chức 1',
                value: 'org1'
              },
              {
                label: 'tổ chức 2',
                value: 'org2'
              }
            ]}
            value={formik.values.orgIds}
            onChange={handleChangeOrgIds}
          />
        </EditUserWrapper>
      </Modal>
    </>
  );
};

export default AddUserModal;

const EditUserWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px 0;
`;
