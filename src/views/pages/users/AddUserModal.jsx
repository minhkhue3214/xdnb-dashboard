import { Modal } from '~/ui-component/molecules';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AddUserModal = ({ open, setOpen }) => {
  const formik = useFormik({
    initialValues: {},
    validationSchema: Yup.object({}),
    onSubmit: (values) => {
      console.log('submit', values);
    }
  });

  return (
    <>
      <Modal open={open} onOpen={setOpen} title="Thêm người dùng mới">
        <form noValidate onSubmit={formik.handleSubmit}>
          
        </form>
        <div>Test Modal thêm người dùng mới</div>
      </Modal>
    </>
  );
};

export default AddUserModal;
