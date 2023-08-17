import { useFormik } from 'formik';
import { Button } from 'antd';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
// import * as yup from 'yup';
import { useCategoriesStore } from '~/hooks/categories';
import { useProductsStore } from '~/hooks/products';
import { Input, InputNumber, Selector, Switch, UploadProductImage } from '~/ui-component/atoms';
import { Modal } from '~/ui-component/molecules';
import { v4 as uuidv4 } from 'uuid';
const UpdateProductModal = ({ id, setOpen, open }) => {
  const { t } = useTranslation();
  const { productsState, dispatchGetProductById, dispatchUpdateProduct } = useProductsStore();
  const { categoriesState } = useCategoriesStore();
  const [newCategoryId, setNewCategoryId] = useState(null);

  const flattenChildren = (items) => {
    const flattened = [];

    const processItem = (item) => {
      flattened.push(item);

      if (item.children && item.children.length > 0) {
        item.children.forEach((child) => {
          processItem(child);
        });
      }
    };

    items.forEach((item) => {
      processItem(item);
    });

    return flattened;
  };

  const categoryOptions = useMemo(() => {
    const data = JSON.parse(JSON.stringify(categoriesState.categories));

    const flattenedData = flattenChildren(data);
    console.log('flattenedData', flattenedData);

    return flattenedData?.map((one) => ({
      label: one.name,
      value: one.id
    }));
  }, [categoriesState]);

  const [imageProduct, setImageProduct] = useState([]);
  const [deleteProduct, setDeleteProduct] = useState([]);
  const avatarDefault = 'https://ionicframework.com/docs/img/demos/avatar.svg';

  const formik = useFormik({
    initialValues: {
      category_id: 'category123',
      name: '',
      slug: '',
      hot: true,
      short_description: '',
      long_description: '',
      original_price: '',
      discounted_price: '',
      quantity: 0,
      priority: 1
    },
    onSubmit: (values) => {
      formik.validateForm().then(() => {
        if (formik.isValid) {
          dispatchUpdateProduct({
            id,
            category_id: newCategoryId,
            name: values.name,
            slug: values.slug,
            hot: values.hot,
            short_description: values.short_description,
            long_description: values.long_description,
            original_price: values.original_price,
            discounted_price: values.discounted_price,
            quantity: values.quantity,
            priority: values.priority,
            gallery_deletes: deleteProduct,
            gallery_items: imageProduct
          });
          setDeleteProduct([]);
          handleCancel();
        }
      });
    },
    validateOnChange: true
  });

  const handleCancel = useCallback(() => {
    formik.handleReset();
    setOpen(false);
    setNewCategoryId('');
  }, [formik, setOpen]);

  useEffect(() => {
    console.log('UpdateProductModal id', id);
    if (id) {
      dispatchGetProductById({ id });
    }
  }, [dispatchGetProductById, id]);

  useEffect(() => {
    const getNameById = (id, data) => {
      const item = data.find((item) => item.id === id);
      return item ? item.name : null;
    };

    const data = productsState.detail;
    if (data) {
      console.log('productsState', data);

      console.log('Productmodal', JSON.parse(JSON.stringify(categoriesState.categories)));
      const flattenedData = flattenChildren(JSON.parse(JSON.stringify(categoriesState.categories)));

      const name = getNameById(data.category_id, flattenedData);
      formik.setFieldValue('category_id', name);
      setNewCategoryId(data.category_id);

      // formik.setFieldValue('category_id', data.category_id || '');
      formik.setFieldValue('name', data.name || '');
      formik.setFieldValue('slug', data.slug || '');
      if (data.hot == 1) {
        formik.setFieldValue('hot', true);
      } else {
        formik.setFieldValue('hot', false);
      }
      formik.setFieldValue('short_description', data.short_description || '');
      formik.setFieldValue('long_description', data.long_description || '');
      formik.setFieldValue('original_price', data.original_price || '');
      formik.setFieldValue('discounted_price', data.discounted_price || '');
      formik.setFieldValue('quantity', data.quantity || '');
      formik.setFieldValue('priority', data.priority || '');
      formik.setFieldValue('gallery_items', data.gallery_items || '');

      console.log('data.gallery_items', data.gallery_items);
      // var galleryWithId = data.gallery_items?.map((obj) => {
      //   return { ...obj, id: uuidv4() };
      // });
      setImageProduct(data.gallery_items);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsState.detail]);

  const handleDeleteModal = (id) => {
    const newListImage = imageProduct.filter((image) => image.id !== id);
    console.log('handleDeleteModal', newListImage);
    setImageProduct(newListImage);

    if (!Array.isArray(deleteProduct)) {
      console.error('deleteProduct is not an array.');
      return;
    }

    const newDeleteProduct = [...deleteProduct, id];
    setDeleteProduct(newDeleteProduct);
  };

  const handleProductName = (id, e) => {
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
    console.log('handleProductSource', id, url);
    setImageProduct((prevImageProduct) => {
      return prevImageProduct.map((image) => {
        if (image.id === id) {
          return { ...image, path: url };
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
        path: avatarDefault,
        priority: 1
      };
      return [...prevImageProduct, newImage];
    });
  };

  const handleChangeHot = useCallback(
    (value) => {
      formik.setFieldValue('hot', value);
    },
    [formik]
  );

  const handleChangeCategoryId = useCallback(
    (value) => {
      console.log('handleChangeCategoryId', value);
      setNewCategoryId(value);
      formik.setFieldValue('category_id', value);
    },
    [formik]
  );

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
              options={categoryOptions}
              value={formik.values.category_id}
              onChange={handleChangeCategoryId}
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
              label={`* ${t('input.label.product.original_price')}`}
              name="original_price"
              message={formik.touched.original_price ? formik.errors.original_price : ''}
              type={formik.touched.original_price && formik.errors.original_price ? 'error' : ''}
              value={formik.values.original_price}
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
              label={`* ${t('input.label.product.discounted_price')}`}
              name="discounted_price"
              message={formik.touched.discounted_price ? formik.errors.discounted_price : ''}
              type={formik.touched.discounted_price && formik.errors.discounted_price ? 'error' : ''}
              value={formik.values.discounted_price}
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
            <InputNumber
              label={`* ${t('input.label.product.quantity')}`}
              name="quantity"
              message={formik.touched.quantity ? formik.errors.quantity : ''}
              type={formik.touched.quantity && formik.errors.quantity ? 'error' : ''}
              value={formik.values.quantity}
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
              name="hot"
              message={formik.touched.hot ? formik.errors.hot : ''}
              type={formik.touched.hot && formik.errors.hot ? 'error' : ''}
              value={formik.values.hot}
              onBlur={formik.handleBlur}
              onChange={handleChangeHot}
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
            {imageProduct?.map((ProductInfo) => (
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

export default memo(UpdateProductModal);

const EditUserWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 55vh;
  display: grid;
  grid-template-rows: 1fr; /* 2 hàng bằng nhau */
  grid-template-columns: 1.6fr 1fr; /* 2 cột bằng nhau */
  gap: 10px; /* Khoảng cách giữa các vùng */
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
