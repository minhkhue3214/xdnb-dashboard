import { useFormik } from 'formik';
import { useCallback } from 'react';
import styled from 'styled-components';
import * as yup from 'yup';
import { useOrganizationsStore } from '~/hooks/organizations';
import { Input } from '~/ui-component/atoms';
import { Modal } from '~/ui-component/molecules';

const AddOrganizationModal = ({ open, setOpen }) => {
  const { dispatchAddOrganization } = useOrganizationsStore();

  const formik = useFormik({
    initialValues: {
      fullname: '',
      name: '',
      code: ''
    },
    validationSchema: yup.object({
      fullname: yup.string().max(100, 'Tên tổ chức quá dài').required('Vui lòng nhập tên tổ chức'),
      name: yup.string().max(50, 'Tên tổ chức rút gọn quá dài').required('Vui lòng nhập tên tổ chức rút gọn'),
      code: yup
        .string()
        .matches(/^[a-zA-Z0-9_]+$/, 'Mã tổ chức không được chứa ký tự đặc biệt')
        .required('Vui lòng nhập mã tổ chức')
        .test('no-spaces', 'Mã tổ chức không được chứa dấu cách', (value) => !/\s/.test(value))
    }),
    onSubmit: (values) => {
      formik.validateForm().then(() => {
        if (formik.isValid) {
          console.log('values', values);

          dispatchAddOrganization({
            fullname: values.fullname,
            name: values.name,
            code: values.code
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
        title="Thêm tổ chức"
        onOk={formik.handleSubmit}
        onCancel={handleCancel}
        width="350px"
        okText="Xác nhận"
        cancelText="Hủy bỏ"
      >
        <AddOrganizationWrapper>
          <Input
            label="* Tên đầy đủ"
            name="fullname"
            message={formik.touched.fullname ? formik.errors.fullname : ''}
            type={formik.touched.fullname && formik.errors.fullname ? 'error' : ''}
            value={formik.values.fullname}
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
            label="* Tên rút gọn"
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
            label="* Mã tổ chức"
            name="code"
            message={formik.touched.code ? formik.errors.code : ''}
            type={formik.touched.code && formik.errors.code ? 'error' : ''}
            value={formik.values.code}
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
        </AddOrganizationWrapper>
      </Modal>
    </>
  );
};

export default AddOrganizationModal;

const AddOrganizationWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px 0;
`;
