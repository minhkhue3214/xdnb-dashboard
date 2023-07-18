import { useFormik } from 'formik';
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useProductsStore } from '~/hooks/products';
import { Input, InputNumber, Selector, Switch, UploadMultipleImage } from '~/ui-component/atoms';
import { Modal } from '~/ui-component/molecules';
// import { v4 as uuidv4 } from 'uuid';

const AddUserModal = ({ open, setOpen }) => {
  const { t } = useTranslation();
  // const { dispatchAddUser } = useUsersStore();
  const { dispatchAddProduct } = useProductsStore();
  const [imageName, setImageName] = useState('');
  const [altImage, setAltImage] = useState('');
  const [imagePriority, setImagePriority] = useState(1);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  const [gallery, setGallery] = useState([]);

  const formik = useFormik({
    initialValues: {
      category_id: 'category123',
      name: '',
      slug: '',
      hot: false,
      short_description: '',
      long_description: '',
      priority: 1,
      gallery_items: gallery
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
            gallery_items: values.gallery_items,
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

  const handleNameChange = (e) => setImageName(e.target.value);
  const handleAltChange = (e) => setAltImage(e.target.value);
  const handlePriorityChange = (e) => setImagePriority(e.target.value);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleCancelPreview = () => setPreviewOpen(false);

  const handleImageBase64 = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    return file.url || file.preview;
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    console.log('handlePreview', file);
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleChange = ({ fileList: newFileList }) => {
    let imageFile = newFileList[newFileList.length - 1];
    if (imageName == '' || altImage == '') {
      return;
    }
    console.log('imageFile', imageFile);
    setFileList(newFileList);
    if (imageFile.status === 'done') {
      console.log('imageFile status done', imageFile);
      let sourceImage = handleImageBase64(imageFile);
      let newImage = { imageName, altImage, imagePriority, source: sourceImage };
      console.log('newImage', newImage);
      gallery.push(newImage);

      setGallery([...gallery, newImage]);
      console.log('gallery', gallery);
      setImageName('');
      setAltImage('');
    }
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
            <Input
              label={`* ${t('input.label.product.image_name')}`}
              name="image_name"
              message={formik.touched.image_name ? formik.errors.image_name : ''}
              type={formik.touched.image_name && formik.errors.image_name ? 'error' : ''}
              value={imageName}
              onBlur={formik.handleBlur}
              onChange={(e) => {
                handleNameChange(e);
              }}
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
              label="alt"
              name="alt"
              message={formik.touched.alt ? formik.errors.alt : ''}
              type={formik.touched.alt && formik.errors.alt ? 'error' : ''}
              value={altImage}
              onBlur={formik.handleBlur}
              onChange={(e) => {
                handleAltChange(e);
              }}
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
              label={`* ${t('input.label.product.image_priority')}`}
              name="image_priority"
              message={formik.touched.image_priority ? formik.errors.image_priority : ''}
              type={formik.touched.image_priority && formik.errors.image_priority ? 'error' : ''}
              value={imagePriority}
              onBlur={formik.handleBlur}
              onChange={(e) => {
                handlePriorityChange(e);
              }}
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
            <UploadMultipleImage
              label={`* ${t('input.label.product.gallery_items')}`}
              name="image_priority"
              message={formik.touched.image_priority ? formik.errors.image_priority : ''}
              type={formik.touched.image_priority && formik.errors.image_priority ? 'error' : ''}
              value={formik.values.image_priority}
              onBlur={formik.handleBlur}
              onChange={handleChange}
              previewOpen={previewOpen}
              previewImage={previewImage}
              previewTitle={previewTitle}
              fileList={fileList}
              handleCancelPreview={handleCancelPreview}
              handlePreview={handlePreview}
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
