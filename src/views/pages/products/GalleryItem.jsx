import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Modal } from '~/ui-component/molecules';

const galleryItemsModal = ({ open, setOpen }) => {
    const { t } = useTranslation();

  return (
    <>
      <Modal open={open} onOpen={setOpen} title={t('table.products.gallery_items')} width="850px" footer={null}>
        <EditUserWrapper>
          <h1>Testing</h1>
        </EditUserWrapper>
      </Modal>
    </>
  );
};

export default memo(galleryItemsModal);

const EditUserWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 55vh;
  display: grid;
  grid-template-rows: 1fr; /* 2 hàng bằng nhau */
  grid-template-columns: 1.6fr 1fr; /* 2 cột bằng nhau */
  gap: 10px; /* Khoảng cách giữa các vùng */
`;
