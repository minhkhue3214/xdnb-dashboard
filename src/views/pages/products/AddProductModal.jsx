import { Button } from 'antd';id
import { useFormik } from 'formik';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { useCategoriesStore } from '~/hooks/categories';
import { useProductsStore } from '~/hooks/products';
import { Input, InputNumber, Selector, Switch, UploadProductImage, Editor, InputPermalink } from '~/ui-component/atoms';
import { Modal } from '~/ui-component/molecules';

const AddProductModal = ({ open, setOpen }) => {
  const { t } = useTranslation();
  const { dispatchAddProduct } = useProductsStore();
  const { categoriesState } = useCategoriesStore();
  // const [newCategoryId, setNewCategoryId] = useState(null);

  // const categoryOptions = useMemo(() => {
  //   const data = categoriesState.categories;

  //   const flattenCategories = (categories) => {
  //     return categories.flatMap((category) => {
  //       const children = category.children.map((child) => ({
  //         label: child.name,
  //         value: child.id
  //       }));

  //       return [{ label: category.name, value: category.id }, ...children];
  //     });
  //   };

  //   return flattenCategories(data);
  // }, [categoriesState.categories]);

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

  // const getNameById = (id, data) => {
  //   const item = data.find((item) => item.id === id);
  //   return item ? item.name : null;
  // };

  const categoryOptions = useMemo(() => {
    const data = categoriesState.categories;

    const flattenedData = flattenChildren(data);
    console.log('flattenedData', flattenedData);

    return flattenedData?.map((one) => ({
      label: one.name,
      value: one.id
    }));
  }, [categoriesState]);

  const [imageProduct, setImageProduct] = useState([]);
  // const avatarDefault = 'https://ionicframework.com/docs/img/demos/avatar.svg';

  const formik = useFormik({
    initialValues: {
      category_id: '',
      name: '',
      slug: '',
      hot: true,
      short_description: '',
      long_description: '',
      original_price: '',
      discounted_price: '',
      quantity: 0,
      priority: 1,
      gallery_items: imageProduct
    },
    onSubmit: (values) => {
      formik.validateForm().then(() => {
        if (formik.isValid) {
          console.log('AddProductModal', values);
          // for (var i = 0; i < arr.length; i++) {
          //   delete arr[i].id;
          // }
          dispatchAddProduct({
            category_id: values.category_id,
            name: values.name,
            slug: values.slug,
            hot: values.hot,
            short_description: values.short_description,
            long_description: values.long_description,
            original_price: values.original_price,
            discounted_price: values.discounted_price,
            quantity: values.quantity,
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
    setImageProduct([]);
    setOpen(false);
  }, [formik, setOpen]);

  // const id = React.useMemo(() => {
  //   return uuidv4();
  // }, []);

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
        path: '',
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

  const handleChangeCategoryId = useCallback(
    (value) => {
      // setNewCategoryId(value);
      // const flattenedData = flattenChildren(categoriesState.categories);
      // const name = getNameById(value, flattenedData);
      formik.setFieldValue('category_id', value);
    },
    [formik]
  );

  const handleChangeHot = useCallback(
    (value) => {
      formik.setFieldValue('hot', value);
    },
    [formik]
  );

  const handleChangeLongDescription = useCallback(
    (value) => {
      formik.setFieldValue('long_description', value);
    },
    [formik]
  );

  const slugOfCategory = useMemo(() => {
    let value = '';
    const data = categoriesState.categories;
    const flattenedData = flattenChildren(data);
    if (categoriesState.categories?.length > 0 && formik.values.category_id) {
      value = flattenedData.find((one) => one.id === formik.values.category_id)?.slug || '';
      // console.log('slugOfCategory', categoriesState.categories);
    }

    if (value) {
      value += '/';
    }

    return value;
  }, [formik.values.category_id, categoriesState]);

  return (
    <>
      <Modal
        open={open}
        onOpen={setOpen}
        title={t('modal.product.addProduct')}
        onOk={formik.handleSubmit}
        onCancel={handleCancel}
        width="100%"
        okText={t('modal.user.submitAddUser')}
        cancelText={t('modal.user.cancel')}
      >
        <EditUserWrapper>
          <CellLeft>
            <InputPermalink
              label={`* ${t('input.label.category.slug')}`}
              name="slug"
              addonBefore={`https://xuongdaninhbinh.com/${slugOfCategory}`}
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
            <WrapperImage3>
              <InputNumber
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
              <InputNumber
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
            </WrapperImage3>

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
                width: '30%'
              }}
            />
            <Switch
              label={`* ${t('input.label.product.hot')}`}
              name="hot"
              message={formik.touched.hot ? formik.errors.hot : ''}
              type={formik.touched.hot && formik.errors.hot ? 'error' : ''}
              value={formik.values.hot}
              onBlur={formik.handleBlur}
              onChange={handleChangeHot}
              labelStyle={{
                padding: '2px',
                width: '40%'
              }}
              style={{
                width: '100%',
                marginTop: '8px',
                height: '70px'
              }}
              inputStyle={{
                width: '10%'
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
                width: '30%'
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
              rows={6}
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
              maxLength={200}
              showCount
            />
            <Editor onChange={handleChangeLongDescription} />
          </CellLeft>
          {/* <CellBetween>
            <Editor onChange={handleChangeLongDescription} />
          </CellBetween> */}
          <CellRight>
            <Button
              type="primary"
              style={{
                width: '200px'
              }}
              onClick={handleAddModal}
            >
              Thêm ảnh sản phẩm
            </Button>
            {imageProduct.map((ProductInfo) => (
              <UploadProductImage
                key={ProductInfo.id}
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

export default memo(AddProductModal);

const EditUserWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 80vh;
  display: grid;
  grid-template-rows: 1fr; /* 1 hàng */
  grid-template-columns: 1.5fr 1fr; /* 3 cột bằng nhau */
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

// const CellBetween = styled.div`
//   position: relative;
//   width: 100%;
//   height: 100%;
//   background-color: #f1f6f9;
//   border-radius: 8px;
//   padding: 8px;
//   overflow-x: hidden;
//   overflow-y: scroll;
//   display: flex;
//   flex-direction: column;
// `;

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

const WrapperImage3 = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  gap: 30px; /* Khoảng cách giữa các vùng */
  justify-content: space-around;
`;
