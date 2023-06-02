import { Modal } from '~/ui-component/molecules';

const AddUserModal = ({ open, setOpen }) => {
  return (
    <>
      <Modal open={open} onOpen={setOpen} title="Thêm người dùng mới">
        <div>Test Modal thêm người dùng mới</div>
      </Modal>
    </>
  );
};

export default AddUserModal;
