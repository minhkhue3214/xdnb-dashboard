import { useEffect, useMemo } from 'react';
import { Modal } from '~/ui-component/molecules';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Input, Selector } from '~/ui-component/atoms';
import styled from 'styled-components';
import { useCallback } from 'react';
import { roles } from '~/store/constant';
import { useOrganizationsStore } from '~/hooks/organizations';
import { useUsersStore } from '~/hooks/users';

const UpdateUserModal = ({ id, open, setOpen }) => {
  const { organizationsState, dispatchGetAllOrganizations } = useOrganizationsStore();

  const { usersState, dispatchUpdateUser, dispatchGetUserById } = useUsersStore();

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
      role: yup.string().required('Vui lòng chọn role người dùng'),
      orgIds: yup
        .array()
        .required('Vui lòng chọn tổ chức')
        .test('not-empty', 'Vui lòng chọn ít nhất một tổ chức', (value) => value && value.length > 0)
    }),
    onSubmit: (values) => {
      formik.validateForm().then(() => {
        if (formik.isValid) {
          dispatchUpdateUser({
            id,
            name: values.name,
            email: values.email,
            role: values.role,
            org_ids: values.orgIds,
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

  const handleChangeOrgIds = useCallback(
    (value) => {
      if (!Array.isArray(value)) value = [value];
      formik.setFieldValue('orgIds', value);
    },
    [formik]
  );

  const organizations = useMemo(() => {
    return (
      organizationsState.organizations.map((one) => ({
        label: one.fullname,
        value: one.id
      })) || []
    );
  }, [organizationsState.organizations]);

  useEffect(() => {
    dispatchGetAllOrganizations();
  }, [dispatchGetAllOrganizations]);

  useEffect(() => {
    if (id) {
      dispatchGetUserById(id);
    }
  }, [dispatchGetUserById, id]);

  useEffect(() => {
    const data = usersState.detail;
    if (data) {
      formik.setFieldValue('email', data.email || '');
      formik.setFieldValue('password', data.password || '');
      formik.setFieldValue('name', data.name || '');
      formik.setFieldValue('username', data.username || '');
      formik.setFieldValue('role', data.role || '');
      formik.setFieldValue('orgIds', data.orgIds || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersState.detail]);

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
            options={roles}
            value={formik.values.role}
            onChange={handleChangeRole}
            message={formik.touched.role ? formik.errors.role : ''}
            type={formik.touched.role && formik.errors.role ? 'error' : ''}
          />
          <Selector
            label="* Tổ chức"
            name="orgIds"
            mode={formik.values.role === 'manager' ? 'multiple' : ''}
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
            options={organizations}
            value={formik.values.orgIds}
            onChange={handleChangeOrgIds}
            message={formik.touched.orgIds ? formik.errors.orgIds : ''}
            type={formik.touched.orgIds && formik.errors.orgIds ? 'error' : ''}
          />
        </EditUserWrapper>
      </Modal>
    </>
  );
};

export default UpdateUserModal;

const EditUserWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px 0;
`;
