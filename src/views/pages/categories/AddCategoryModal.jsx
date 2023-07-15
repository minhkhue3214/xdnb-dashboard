import { Button } from 'antd';
import { useFormik } from 'formik';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import * as yup from 'yup';
import { DatePicker, Input, InputPermalink, Tag, InputNumber, InputImage, Editor, Selector } from '~/ui-component/atoms';
import { Modal } from '~/ui-component/molecules';
import { useCategoriesStore } from '~/hooks/categories';
import dayjs from 'dayjs';

const AddCategoryModal = ({ open, setOpen }) => {
  const { t } = useTranslation();
  const { dispatchAddCategory } = useCategoriesStore();

  const formik = useFormik({
    initialValues: {
      title: '',
      type: 'blog',
      description: '',
      author: '',
      publicationDate: '',
      slug: '',
      imageUrl: '',
      imageAlt: '',
      content: '',
      priority: 1,
      tags: []
    },
    validationSchema: yup.object({
      title: yup.string().required(t('input.error.category.pleaseEnterTitle')),
      type: yup.string().required(t('input.error.category.pleaseEnterType')),
      author: yup.string().required(t('input.error.category.pleaseEnterAuthor')),
      description: yup.string().required(t('input.error.category.pleaseEnterDescription')),
      publicationDate: yup.date().required(t('input.error.category.pleaseEnterPublicationDate')),
      slug: yup
        .string()
        .matches(/^[a-z0-9-]+$/, t('input.error.category.slugNotValid'))
        .required(t('input.error.category.pleaseEnterSlug')),
      // content: yup.string().required(t('input.error.category.pleaseEnterContent')),
      priority: yup.string().required(t('input.error.category.pleaseEnterPriority'))
    }),
    onSubmit: (values) => {
      formik.validateForm().then(() => {
        const { title, type, description, author, publicationDate, slug, imageUrl, imageAlt, content, priority, tags } = values;

        console.log('values', values);
        if (formik.isValid) {
          // logic submit
          dispatchAddCategory({
            title,
            type,
            description,
            author,
            publication_date: dayjs(publicationDate).toISOString(),
            slug,
            image: {
              alt: imageAlt,
              url: imageUrl
            },
            content,
            priority,
            tags
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

  const handleChangePublicationDate = useCallback(
    (value) => {
      formik.setFieldValue('publicationDate', value);
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

  const handleChangeContent = useCallback(
    (value) => {
      formik.setFieldValue('content', value);
    },
    [formik]
  );

  const handleChangeType = useCallback(
    (value) => {
      console.log('type', value);
      formik.setFieldValue('type', value);
    },
    [formik]
  );

  return (
    <>
      <Modal
        title={t('modal.category.addCategory')}
        open={open}
        onOpen={setOpen}
        width="95%"
        footer={[
          <Button key="3" ghost type="primary">
            {t('modal.category.previewCategory')}
          </Button>,
          <Button key="1" type="primary" onClick={formik.handleSubmit}>
            {t('modal.category.addCategory')}
          </Button>,
          <Button key="2" danger onClick={handleCancel}>
            {t('modal.category.cancel')}
          </Button>
        ]}
      >
        <Wrapper>
          <Cell>
            <WrapperImage1>
              <InputPermalink
                label={`* ${t('input.label.category.slug')}`}
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
              <Selector
                label={`* ${t('input.label.category.type')}`}
                name="type"
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
                options={[
                  { key: 'blog', value: 'blog' },
                  { key: 'project', value: 'project' }
                ]}
                value={formik.values.type}
                onChange={handleChangeType}
              />
            </WrapperImage1>
            <Input
              label={`* ${t('input.label.category.title')}`}
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
            <Editor onChange={handleChangeContent} />
          </Cell>
          <Cell>
            <WrapperImage2>
              <InputImage
                label={`* ${t('input.label.category.imageUrl')}`}
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
                uploadStyle={{
                  width: '133px',
                  height: '100px'
                }}
              />
              <Input
                label={`* ${t('input.label.category.imageAlt')}`}
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
            </WrapperImage2>
            <Input
              label={`* ${t('input.label.category.author')}`}
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
              label={`* ${t('input.label.category.publicationDate')}`}
              id="publicationDate"
              name="publicationDate"
              message={formik.touched.publicationDate ? formik.errors.publicationDate : ''}
              type={formik.touched.publicationDate && formik.errors.publicationDate ? 'error' : ''}
              value={formik.values.publicationDate}
              onBlur={formik.handleBlur}
              onChange={handleChangePublicationDate}
              size="middle"
              isTextArea={true}
              rows={3}
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
              label={`* ${t('input.label.category.priority')}`}
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
              label={`* ${t('input.label.category.description')}`}
              name="description"
              message={formik.touched.description ? formik.errors.description : ''}
              type={formik.touched.description && formik.errors.description ? 'error' : ''}
              value={formik.values.description}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              size="middle"
              isTextArea={true}
              rows={3}
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
              maxLength={150}
              showCount
            />
            <Tag
              name="tags"
              initValue={formik.values.tags}
              onChange={handleChangeTags}
              addTagText={t('input.label.category.addTagText')}
              style={{
                marginTop: '10px'
              }}
            />
          </Cell>
        </Wrapper>
      </Modal>
    </>
  );
};

export default memo(AddCategoryModal);

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 80vh;
  display: grid;
  grid-template-rows: 1fr; /* 2 hàng bằng nhau */
  grid-template-columns: 2fr 1fr; /* 2 cột bằng nhau */
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

const WrapperImage1 = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-rows: 1fr; /* 2 hàng bằng nhau */
  grid-template-columns: 1.8fr 1fr; /* 2 cột bằng nhau */
  flex-direction: row;
  gap: 10px; /* Khoảng cách giữa các vùng */
`;

const WrapperImage2 = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-rows: 1fr; /* 2 hàng bằng nhau */
  grid-template-columns: 1fr 1.4fr; /* 2 cột bằng nhau */
  flex-direction: row;
  gap: 10px; /* Khoảng cách giữa các vùng */
`;
