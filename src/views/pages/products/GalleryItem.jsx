import { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Modal } from '~/ui-component/molecules';
import { useProductsStore } from '~/hooks/products';
import { Image } from 'antd';

const GalleryItemsModal = ({ open, setOpen, id }) => {
  const { productsState, dispatchGetProductById } = useProductsStore();
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    if (id) {
      dispatchGetProductById({ id });
    }
  }, [dispatchGetProductById, id]);

  useEffect(() => {
    const data = productsState.detail;
    if (data) {
      console.log('galleryItemsModal', data.gallery_items);
      setGallery(data.gallery_items);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsState.detail]);

  return (
    <>
      <Modal open={open} onOpen={setOpen} title="Gallery" width="300px" footer={null}>
        <EditUserWrapper>
          {gallery?.map((item, index) => {
            return (
              <>
                <h3>{item.name}</h3>
                <Image
                  key={index}
                  preview={{
                    mask: false
                  }}
                  width={200}
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
              </>
            );
          })}
        </EditUserWrapper>
      </Modal>
    </>
  );
};

export default memo(GalleryItemsModal);

const EditUserWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 55vh;
  display: flex;
  flex-direction: column;
`;
