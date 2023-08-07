import { Button } from 'antd';
import axios from 'axios';
import { useFormik } from 'formik';
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import * as yup from 'yup';
import { DatePicker, Input, InputPermalink, Tag, InputNumber, UploadImage, Editor, Selector } from '~/ui-component/atoms';
import { Modal } from '~/ui-component/molecules';
import { usePostsStore } from '~/hooks/posts';
import dayjs from 'dayjs';

const AddPostModal = ({ open, setOpen }) => {
  const { t } = useTranslation();
  const { dispatchAddPost } = usePostsStore();

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const formik = useFormik({
    initialValues: {
      title: '',
      type: 'blog',
      description: '',
      author: '',
      publicationDate: '',
      slug: '',
      imageAlt: '',
      content: '',
      priority: 1,
      tags: []
    },
    validationSchema: yup.object({
      title: yup.string().required(t('input.error.post.pleaseEnterTitle')),
      type: yup.string().required(t('input.error.post.pleaseEnterType')),
      author: yup.string().required(t('input.error.post.pleaseEnterAuthor')),
      description: yup.string().required(t('input.error.post.pleaseEnterDescription')),
      publicationDate: yup.date().required(t('input.error.post.pleaseEnterPublicationDate')),
      slug: yup
        .string()
        .matches(/^[a-z0-9-]+$/, t('input.error.post.slugNotValid'))
        .required(t('input.error.post.pleaseEnterSlug')),
      // content: yup.string().required(t('input.error.post.pleaseEnterContent')),
      priority: yup.string().required(t('input.error.post.pleaseEnterPriority'))
    }),
    onSubmit: (values) => {
      formik.validateForm().then(() => {
        const { title, type, description, author, publicationDate, slug, imageAlt, content, priority, tags } = values;

        console.log('values', values);
        if (formik.isValid) {
          // logic submit
          dispatchAddPost({
            title,
            type,
            description,
            author,
            publication_date: dayjs(publicationDate).toISOString(),
            slug,
            image: {
              path: imageUrl,
              alt: imageAlt
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

  // const handleChangeImageUrl = useCallback(
  //   (value) => {
  //     formik.setFieldValue('imageUrl', value);
  //   },
  //   [formik]
  // );

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

  const uploadImage = async (options) => {
    setLoading(true);
    const { onSuccess, onError, file } = options;

    const fmData = new FormData();
    // const config = {
    //   headers: { 'content-type': 'multipart/form-data' },
    //   onUploadProgress: (event) => {
    //     const percent = Math.floor((event.loaded / event.total) * 100);
    //     setProgress(percent);
    //     if (percent === 100) {
    //       setTimeout(() => setProgress(0), 1000);
    //     }
    //     onProgress({ percent: (event.loaded / event.total) * 100 });
    //   }
    // };
    fmData.append('image', file);
    try {
      const res = await axios.post('https://tenmienmienphi.online/api/upload-image', fmData);

      onSuccess('Ok');
      console.log('server res: ', res);
      setLoading(false);
      setImageUrl(res.data.data.image_url);
    } catch (err) {
      console.log('Eroor: ', err);
      // const error = new Error('Some error');
      onError({ err });
    }
  };

  return (
    <>
      <Modal
        title={t('modal.post.addPost')}
        open={open}
        onOpen={setOpen}
        width="95%"
        footer={[
          <Button key="3" ghost type="primary">
            {t('modal.post.previewPost')}
          </Button>,
          <Button key="1" type="primary" onClick={formik.handleSubmit}>
            {t('modal.post.submitAddPost')}
          </Button>,
          <Button key="2" danger onClick={handleCancel}>
            {t('modal.post.cancel')}
          </Button>
        ]}
      >
        <Wrapper>
          <Cell>
            <WrapperImage1>
              <InputPermalink
                label={`* ${t('input.label.post.slug')}`}
                name="slug"
                addonBefore="https://xuongdaninhbinh.com/post/"
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
                label={`* ${t('input.label.post.type')}`}
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
            <Editor onChange={handleChangeContent} />
          </Cell>
          <Cell>
            <WrapperImage2>
              <UploadImage
                label={`* ${t('input.label.post.imageUrl')}`}
                name="avatar"
                message={formik.touched.avatar ? formik.errors.avatar : ''}
                type={formik.touched.avatar && formik.errors.avatar ? 'error' : ''}
                value={formik.values.avatar}
                onBlur={formik.handleBlur}
                onChange={uploadImage}
                loading={loading}
                imageUrl={imageUrl}
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
            </WrapperImage2>
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
              addTagText={t('input.label.post.addTagText')}
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

export default memo(AddPostModal);

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
