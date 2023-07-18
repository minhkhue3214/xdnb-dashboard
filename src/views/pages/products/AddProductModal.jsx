import { Button } from 'antd';
import { useFormik } from 'formik';
import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { useProductsStore } from '~/hooks/products';
import { Input, InputNumber, Selector, Switch, UploadProductImage } from '~/ui-component/atoms';
import { Modal } from '~/ui-component/molecules';

const AddUserModal = ({ open, setOpen }) => {
  const { t } = useTranslation();
  const { dispatchAddProduct } = useProductsStore();
  const [imageProduct, setImageProduct] = useState([]);
  const avatarDefault = 'https://ionicframework.com/docs/img/demos/avatar.svg';

  const formik = useFormik({
    initialValues: {
      category_id: 'category123',
      name: '',
      slug: '',
      hot: false,
      short_description: '',
      long_description: '',
      priority: 1,
      gallery_items: imageProduct
    },
    onSubmit: (values) => {
      formik.validateForm().then(() => {
        if (formik.isValid) {
          console.log('AddUserModal', values);
          dispatchAddProduct({
            category_id: values.category_id,
            name: values.name,
            slug: values.slug,
            hot: values.hot,
            short_description: values.short_description,
            long_description: values.long_description,
            priority: values.priority,
            gallery_items: imageProduct
          });

          handleCancel();
          setImageProduct([]);
        }
      });
    },
    validateOnChange: true
  });

  const handleCancel = useCallback(() => {
    formik.handleReset();
    setOpen(false);
  }, [formik, setOpen]);

  const id = React.useMemo(() => {
    return uuidv4();
  }, []);

  const handleProductName = (id, e) => {
    // console.log('handleProductName', id, e.target.value);
    setImageProduct((prevImageProduct) => {
      return prevImageProduct.map((image) => {
        if (image.id === id) {
          return { ...image, name: e.target.value };
        }
        return image;
      });
    });
  };

  const handleProductAlt = (id, e) => {
    // console.log('handleProductName', id, e.target.value);
    setImageProduct((prevImageProduct) => {
      return prevImageProduct.map((image) => {
        if (image.id === id) {
          return { ...image, alt: e.target.value };
        }
        return image;
      });
    });
  };

  const handleProductPriority = (id, e) => {
    // console.log('handleProductName', id, e.target.value);
    setImageProduct((prevImageProduct) => {
      return prevImageProduct.map((image) => {
        if (image.id === id) {
          return { ...image, priority: e.target.value };
        }
        return image;
      });
    });
  };

  const handleProductSource = (id, url) => {
    setImageProduct((prevImageProduct) => {
      return prevImageProduct.map((image) => {
        if (image.id === id) {
          return { ...image, source: url };
        }
        return image;
      });
    });
  };

  const handleAddModal = () => {
    console.log('handleAddModal');
    setImageProduct((prevImageProduct) => {
      const newImage = {
        id: uuidv4(),
        name: 'Gallery Item 1',
        alt: 'Alt text for Gallery Item 1',
        source: avatarDefault,
        priority: 1
      };
      return [...prevImageProduct, newImage];
    });
  };

  const handleDeleteModal = (id) => {
    console.log('handleDeleteModal', id);
    const newListImage = imageProduct.filter((image) => image.id !== id);
    setImageProduct(newListImage);
  };

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
            <Selector
              label={`* ${t('input.label.product.category_id')}`}
              name="category_id"
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
              // options={categories}
              value={formik.values.category_id}
              onChange={formik.handleChange}
              message={formik.touched.category_id ? formik.errors.category_id : ''}
              type={formik.touched.category_id && formik.errors.category_id ? 'error' : ''}
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
            <Button
              type="primary"
              style={{
                width: '30%'
              }}
              onClick={handleAddModal}
            >
              Add Modal
            </Button>
            {imageProduct.map((ProductInfo) => (
              <UploadProductImage
                key={id}
                handleProductName={handleProductName}
                handleDeleteModal={handleDeleteModal}
                handleProductAlt={handleProductAlt}
                handleProductPriority={handleProductPriority}
                handleProductSource={handleProductSource}
                ProductInfo={ProductInfo}
              />
            ))}
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
