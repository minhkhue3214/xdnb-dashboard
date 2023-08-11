import { Button } from 'antd';
import { useFormik } from 'formik';
import { memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useAuthenticationStore } from '~/hooks/authentication';
import * as yup from 'yup';
import { useCategoriesStore } from '~/hooks/categories';
import { Editor, Input, InputNumber, InputPermalink, Selector, Switch, Tag, UploadImage } from '~/ui-component/atoms';
import { Modal } from '~/ui-component/molecules';
import axios from 'axios';

const AddCategoryModal = ({ open, setOpen }) => {
  const { authenticationState } = useAuthenticationStore();
  const [loading, setLoading] = useState(false);
  const [loadingIcon, setLoadingIcon] = useState(false);
  const [imagePath, setImagePath] = useState('');
  const [iconPath, setIconPath] = useState('');
  const { t } = useTranslation();
  const { categoriesState, dispatchAddCategory } = useCategoriesStore();

  const categoryOptions = useMemo(() => {
    const data = JSON.parse(JSON.stringify(categoriesState.categories));

    return data?.map((one) => ({
      label: one.name,
      value: one.id
    }));
  }, [categoriesState]);

  const formik = useFormik({
    initialValues: {
      name: '',
      content: '',
      slug: '',
      parentId: '',
      priority: 1,
      visible: true,
      visibleChildren: true,
      tags: []
    },
    validationSchema: yup.object({
      name: yup.string().required(t('input.error.category.pleaseEnterName')),
      slug: yup
        .string()
        .matches(/^[a-z0-9-]+$/, t('input.error.category.slugNotValid'))
        .required(t('input.error.category.pleaseEnterSlug')),
      priority: yup.string().required(t('input.error.category.pleaseEnterPriority'))
    }),
    onSubmit: (values) => {
      formik.validateForm().then(() => {
        const { name, slug, parentId, content, priority, tags, visible, visibleChildren } = values;

        console.log('values', values);
        if (formik.isValid) {
          // logic submit
          dispatchAddCategory({
            name,
            parent_id: parentId,
            slug,
            visible,
            visible_children: visibleChildren,
            content,
            image: imagePath,
            icon: iconPath,
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
    setImagePath('');
    setIconPath('');
  }, [formik, setOpen]);

  const handleChangeTags = useCallback(
    (value) => {
      formik.setFieldValue('tags', value);
    },
    [formik]
  );
  const handleChangeContent = useCallback(
    (value) => {
      formik.setFieldValue('content', value);
    },
    [formik]
  );

  const handleChangeVisible = useCallback(
    (value) => {
      formik.setFieldValue('visible', value);
    },
    [formik]
  );

  const handleChangeVisibleChildren = useCallback(
    (value) => {
      formik.setFieldValue('visibleChildren', value);
    },
    [formik]
  );

  const handleChangeParentId = useCallback(
    (value) => {
      formik.setFieldValue('parentId', value);
    },
    [formik]
  );

  const slugOfParent = useMemo(() => {
    let value = '';
    if (categoriesState.categories?.length > 0 && formik.values.parentId) {
      value = categoriesState.categories.find((one) => one.id === formik.values.parentId)?.slug || '';
    }

    if (value) {
      value += '/';
    }

    return value;
  }, [formik.values.parentId, categoriesState]);

  const uploadImage = async (options) => {
    setLoading(true);
    const { onSuccess, onError, file } = options;

    const fmData = new FormData();
    fmData.append('image', file);
    const config = {
      headers: {
        Authorization: `Bearer ${authenticationState.token}`
      }
    };
    try {
      const res = await axios.post('https://tenmienmienphi.online/api/upload-image', fmData, config);

      onSuccess('Ok');
      console.log('server res: ', res);
      setLoading(false);
      setImagePath(res.data.data.image_path);
    } catch (err) {
      console.log('Eroor: ', err);
      // const error = new Error('Some error');
      onError({ err });
    }
  };

  const uploadIcon = async (options) => {
    setLoading(true);
    const { onSuccess, onError, file } = options;

    const fmData = new FormData();
    fmData.append('image', file);
    const config = {
      headers: {
        Authorization: `Bearer ${authenticationState.token}`
      }
    };
    try {
      const res = await axios.post('https://tenmienmienphi.online/api/upload-image', fmData, config);

      onSuccess('Ok');
      console.log('server res: ', res);
      setLoadingIcon(false);
      setIconPath(res.data.data.image_path);
    } catch (err) {
      console.log('Eroor: ', err);
      // const error = new Error('Some error');
      onError({ err });
    }
  };

  return (
    <>
      <Modal
        title={t('modal.category.addCategory')}
        open={open}
        onOpen={setOpen}
        width="95%"
        footer={[
          <Button key="1" type="primary" onClick={formik.handleSubmit}>
            {t('modal.category.submitAddCategory')}
          </Button>,
          <Button key="2" danger onClick={handleCancel}>
            {t('modal.category.cancel')}
          </Button>
        ]}
      >
        <Wrapper>
          <Cell>
            <InputPermalink
              label={`* ${t('input.label.category.slug')}`}
              name="slug"
              addonBefore={`https://xuongdaninhbinh.com/${slugOfParent}`}
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
            <Input
              label={`* ${t('input.label.category.name')}`}
              name="name"
              message={formik.touched.name ? formik.errors.name : ''}
              type={formik.touched.name && formik.errors.name ? 'error' : ''}
              value={formik.values.name}
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
            <WrapperImage3>
              <UploadImage
                label={`* ${t('input.label.category.imageUrl')}`}
                name="avatar"
                message={formik.touched.avatar ? formik.errors.avatar : ''}
                type={formik.touched.avatar && formik.errors.avatar ? 'error' : ''}
                value={formik.values.avatar}
                onBlur={formik.handleBlur}
                onChange={uploadImage}
                loading={loading}
                imageUrl={imagePath}
                setImagePath={setImagePath}
                labelStyle={{
                  padding: '2px'
                }}
                // style={{
                //   width: '100%',
                //   marginTop: '8px'
                // }}
                inputStyle={{
                  width: '100%'
                }}
              />
              <UploadImage
                label={`* ${t('input.label.category.iconUrl')}`}
                name="avatar"
                message={formik.touched.avatar ? formik.errors.avatar : ''}
                type={formik.touched.avatar && formik.errors.avatar ? 'error' : ''}
                value={formik.values.avatar}
                onBlur={formik.handleBlur}
                onChange={uploadIcon}
                loading={loadingIcon}
                imageUrl={iconPath}
                setImagePath={setIconPath}
                labelStyle={{
                  padding: '2px'
                }}
                // style={{
                //   width: '100%',
                //   marginTop: '8px'
                // }}
                inputStyle={{
                  width: '100%'
                }}
              />
            </WrapperImage3>
            <Selector
              label={`* ${t('input.label.category.parentId')}`}
              name="parentId"
              mode=""
              labelStyle={{
                width: '170px',
                minWidth: '120px',
                fontWeight: '600',
                whiteSpace: 'nowrap',
                height: '100%',
                display: 'flex',
                alignItems: 'flex-end'
              }}
              style={{
                width: '200px',
                display: 'flex',
                flexDirection: 'row',
                height: '30px'
              }}
              selectStyle={{
                width: '200px'
              }}
              options={categoryOptions}
              value={formik.values.parentId}
              onChange={handleChangeParentId}
            />
            <WrapperImage2>
              <Switch
                label={`* ${t('input.label.category.visible')}`}
                name="visible"
                message={formik.touched.visible ? formik.errors.visible : ''}
                type={formik.touched.visible && formik.errors.visible ? 'error' : ''}
                value={formik.values.visible}
                onBlur={formik.handleBlur}
                onChange={handleChangeVisible}
                labelStyle={{
                  padding: '2px'
                }}
                style={{
                  width: '100%',
                  marginTop: '8px',
                  display: 'flex',
                  flexDirection: 'row',
                  height: '40px'
                }}
                switchStyle={{
                  marginLeft: '2px'
                }}
              />
              <Switch
                label={`* ${t('input.label.category.visibleChildren')}`}
                name="visibleChildren"
                message={formik.touched.visibleChildren ? formik.errors.visibleChildren : ''}
                type={formik.touched.visibleChildren && formik.errors.visibleChildren ? 'error' : ''}
                value={formik.values.visibleChildren}
                onBlur={formik.handleBlur}
                onChange={handleChangeVisibleChildren}
                labelStyle={{
                  padding: '2px'
                }}
                style={{
                  width: '100%',
                  marginTop: '8px',
                  display: 'flex',
                  flexDirection: 'row',
                  height: '40px'
                }}
                switchStyle={{
                  marginLeft: '2px'
                }}
              />
            </WrapperImage2>

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

const WrapperImage2 = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  margin-top: 15px;
  grid-template-rows: 1fr; /* 2 hàng bằng nhau */
  grid-template-columns: 1fr 1fr; /* 2 cột bằng nhau */
  flex-direction: row;
  gap: 10px; /* Khoảng cách giữa các vùng */
`;

const WrapperImage3 = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-around;
`;
