import { Button } from 'antd';
import { useFormik } from 'formik';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import * as yup from 'yup';
import { DatePicker, Input, InputPermalink, Tag, InputNumber, InputImage } from '~/ui-component/atoms';
import { Modal } from '~/ui-component/molecules';
const AddPostModal = ({ open, setOpen }) => {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      title: '',
      type: 'blog',
      description: '',
      author: '',
      publication_date: '',
      slug: '',
      imageUrl: '',
      imageAlt: '',
      content: '',
      priority: 1,
      tags: []
    },
    validationSchema: yup.object({}),
    onSubmit: (values) => {
      formik.validateForm().then(() => {
        if (formik.isValid) {
          // logic submit
          console.log('values', values);
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

  const handleChangePublicationDate = useCallback(
    (value) => {
      formik.setFieldValue('publication_date', value);
    },
    [formik]
  );

  const handleChangeTags = useCallback(
    (value) => {
      formik.setFieldValue('tags', value);
    },
    [formik]
  );

  const handleChangeImageUrl = useCallback(
    (value) => {
      formik.setFieldValue('imageUrl', value);
    },
    [formik]
  );

  return (
    <>
      <Modal
        title={t('modal.post.addPost')}
        open={open}
        onOpen={setOpen}
        width="90%"
        footer={[
          <Button key="3" ghost type="primary">
            {t('modal.post.previewPost')}
          </Button>,
          <Button key="1" type="primary" onClick={formik.handleSubmit}>
            {t('modal.post.addPost')}
          </Button>,
          <Button key="2" danger onClick={handleCancel}>
            {t('modal.post.cancel')}
          </Button>
        ]}
      >
        <Wrapper>
          <Cell>
            <InputPermalink
              label={`* ${t('input.label.post.slug')}`}
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
            <Tag
              label={`* ${t('input.label.post.tags')}`}
              name="tags"
              initValue={formik.values.tags}
              onChange={handleChangeTags}
              addTagText={t('input.label.post.addTagText')}
            />
            <Input
              label={`* ${t('input.label.post.title')}`}
              name="title"
              message={formik.touched.title ? formik.errors.title : ''}
              type={formik.touched.title && formik.errors.title ? 'error' : ''}
              value={formik.values.title}
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
          </Cell>
          <Cell>
            <WrapperImage>
              <InputImage
                label={`* ${t('input.label.post.imageUrl')}`}
                name="imageUrl"
                message={formik.touched.imageUrl ? formik.errors.imageUrl : ''}
                type={formik.touched.imageUrl && formik.errors.imageUrl ? 'error' : ''}
                value={formik.values.imageUrl}
                onBlur={formik.handleBlur}
                onChange={handleChangeImageUrl}
                labelStyle={{
                  padding: '2px'
                }}
                style={{
                  width: '100%',
                  marginTop: '8px'
                }}
                inputStyle={{
                  width: '100%'
                }}
              />
              <Input
                label={`* ${t('input.label.post.imageAlt')}`}
                name="imageAlt"
                message={formik.touched.imageAlt ? formik.errors.imageAlt : ''}
                type={formik.touched.imageAlt && formik.errors.imageAlt ? 'error' : ''}
                value={formik.values.imageAlt}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                labelStyle={{
                  padding: '2px'
                }}
                style={{
                  width: '100%',
                  marginTop: '8px'
                }}
                inputStyle={{
                  width: '100%'
                }}
              />
            </WrapperImage>
            <Input
              label={`* ${t('input.label.post.author')}`}
              name="author"
              message={formik.touched.author ? formik.errors.author : ''}
              type={formik.touched.author && formik.errors.author ? 'error' : ''}
              value={formik.values.author}
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
            <DatePicker
              label={`* ${t('input.label.post.publicationDate')}`}
              id="publication_date"
              name="publication_date"
              message={formik.touched.publication_date ? formik.errors.publication_date : ''}
              type={formik.touched.publication_date && formik.errors.publication_date ? 'error' : ''}
              value={formik.values.publication_date}
              onBlur={formik.handleBlur}
              onChange={handleChangePublicationDate}
              size="middle"
              isTextArea={true}
              rows={4}
              showTime
              labelStyle={{
                padding: '2px'
              }}
              style={{
                width: '100%',
                marginTop: '8px'
              }}
              inputStyle={{
                width: '100%'
              }}
            />
            <InputNumber
              label={`* ${t('input.label.post.priority')}`}
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
                width: '100%'
              }}
            />
            <Input
              label={`* ${t('input.label.post.description')}`}
              name="description"
              message={formik.touched.description ? formik.errors.description : ''}
              type={formik.touched.description && formik.errors.description ? 'error' : ''}
              value={formik.values.description}
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
              maxLength={300}
              showCount
            />
          </Cell>
        </Wrapper>
      </Modal>
    </>
  );
};

export default memo(AddPostModal);

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 80vh;
  display: grid;
  grid-template-rows: 1fr; /* 2 hàng bằng nhau */
  grid-template-columns: 1.6fr 1fr; /* 2 cột bằng nhau */
  gap: 10px; /* Khoảng cách giữa các vùng */
`;

const Cell = styled.div`
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

const WrapperImage = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: row;
`;
