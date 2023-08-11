import { Button } from 'antd';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '~/ui-component/molecules';

dayjs.extend(utc);
dayjs.extend(timezone);

const PreviewModal = ({ open, setOpen, previewValue }) => {
  const { t } = useTranslation();

  useEffect(() => {
    console.log('previewValue', previewValue);
  }, [previewValue]);

  //   const { postsState, dispatchUpdatePost, dispatchGetPost } = usePostsStore();

  //   const [loading, setLoading] = useState(false);
  //   const [imageUrl, setImageUrl] = useState('');

  //   const formik = useFormik({
  //     initialValues: {
  //       title: '',
  //       type: 'blog',
  //       description: '',
  //       author: '',
  //       publicationDate: '',
  //       slug: '',
  //       imageAlt: '',
  //       content: '',
  //       priority: 1,
  //       tags: []
  //     },
  //     validationSchema: yup.object({
  //       title: yup.string().required(t('input.error.post.pleaseEnterTitle')),
  //       type: yup.string().required(t('input.error.post.pleaseEnterType')),
  //       author: yup.string().required(t('input.error.post.pleaseEnterAuthor')),
  //       description: yup.string().required(t('input.error.post.pleaseEnterDescription')),
  //       publicationDate: yup.date().required(t('input.error.post.pleaseEnterPublicationDate')),
  //       slug: yup
  //         .string()
  //         .matches(/^[a-z0-9-]+$/, t('input.error.post.slugNotValid'))
  //         .required(t('input.error.post.pleaseEnterSlug')),
  //       // content: yup.string().required(t('input.error.post.pleaseEnterContent')),
  //       priority: yup.string().required(t('input.error.post.pleaseEnterPriority'))
  //     }),
  //     onSubmit: (values) => {
  //       formik.validateForm().then(() => {
  //         const { title, type, description, author, publicationDate, slug, imageAlt, content, priority, tags } = values;

  //         if (formik.isValid) {
  //           // logic submit
  //           dispatchUpdatePost({
  //             id,
  //             title,
  //             type,
  //             description,
  //             author,
  //             publication_date: dayjs(publicationDate).toISOString(),
  //             slug,
  //             image: {
  //               path: imageUrl,
  //               alt: imageAlt
  //             },
  //             content,
  //             priority,
  //             tags
  //           });
  //           handleCancel();
  //         }
  //       });
  //     },
  //     validateOnChange: true
  //   });

  const handleCancel = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  //   const handleChangePublicationDate = useCallback(
  //     (value) => {
  //       formik.setFieldValue('publicationDate', value);
  //     },
  //     [formik]
  //   );

  //   const handleChangeTags = useCallback(
  //     (value) => {
  //       formik.setFieldValue('tags', value);
  //     },
  //     [formik]
  //   );

  //   const handleChangeContent = useCallback(
  //     (value) => {
  //       formik.setFieldValue('content', value);
  //     },
  //     [formik]
  //   );

  //   const handleChangeType = useCallback(
  //     (value) => {
  //       formik.setFieldValue('type', value);
  //     },
  //     [formik]
  //   );

  //   useEffect(() => {
  //     if (id) {
  //       dispatchGetPost({ id });
  //     }
  //   }, [dispatchGetPost, id]);

  //   useEffect(() => {
  //     const data = postsState.detail;
  //     console.log('postsStateDetail', data);
  //     if (data) {
  //       formik.setFieldValue('title', data.title || '');
  //       formik.setFieldValue('type', data.type || 'blog');
  //       formik.setFieldValue('description', data.description || '');
  //       formik.setFieldValue('author', data.author || '');
  //       formik.setFieldValue('publicationDate', dayjs(data.publicationDate).utcOffset(7) || '');
  //       formik.setFieldValue('slug', data.slug || '');
  //       formik.setFieldValue('imageUrl', data.image?.url || '');
  //       formik.setFieldValue('imageAlt', data.image?.alt || '');
  //       formik.setFieldValue('content', data.content || '');
  //       formik.setFieldValue('priority', data.priority || 1);
  //       formik.setFieldValue('tags', data.tags || []);
  //       setImageUrl(data.image?.url || '');
  //     }
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [postsState.detail]);

  //   const uploadImage = async (options) => {
  //     setLoading(true);
  //     const { onSuccess, onError, file } = options;

  //     const fmData = new FormData();
  //     // const config = {
  //     //   headers: { 'content-type': 'multipart/form-data' },
  //     //   onUploadProgress: (event) => {
  //     //     const percent = Math.floor((event.loaded / event.total) * 100);
  //     //     setProgress(percent);
  //     //     if (percent === 100) {
  //     //       setTimeout(() => setProgress(0), 1000);
  //     //     }
  //     //     onProgress({ percent: (event.loaded / event.total) * 100 });
  //     //   }
  //     // };
  //     fmData.append('image', file);
  //     try {
  //       const res = await axios.post('https://tenmienmienphi.online/api/upload-image', fmData);

  //       onSuccess('Ok');
  //       console.log('server res: ', res);
  //       setLoading(false);
  //       setImageUrl(res.data.data.image_url);
  //     } catch (err) {
  //       console.log('Eroor: ', err);
  //       // const error = new Error('Some error');
  //       onError({ err });
  //     }
  //   };

  return (
    <>
      <Modal
        title={t('modal.post.previewModal')}
        open={open}
        onOpen={setOpen}
        width="95%"
        footer={[
          <Button key="2" danger onClick={handleCancel}>
            {t('modal.post.cancel')}
          </Button>
        ]}
      >
        <div>
          <div dangerouslySetInnerHTML={{ __html: previewValue.content }} />
        </div>
      </Modal>
    </>
  );
};

export default memo(PreviewModal);

// const Wrapper = styled.div`
//   position: relative;
//   width: 100%;
//   height: 80vh;
//   display: grid;
//   grid-template-rows: 1fr; /* 2 hàng bằng nhau */
//   grid-template-columns: 2fr 1fr; /* 2 cột bằng nhau */
//   gap: 10px; /* Khoảng cách giữa các vùng */
// `;

// const Cell = styled.div`
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

// const WrapperImage1 = styled.div`
//   position: relative;
//   width: 100%;
//   display: grid;
//   grid-template-rows: 1fr; /* 2 hàng bằng nhau */
//   grid-template-columns: 1.8fr 1fr; /* 2 cột bằng nhau */
//   flex-direction: row;
//   gap: 10px; /* Khoảng cách giữa các vùng */
// `;

// const WrapperImage2 = styled.div`
//   position: relative;
//   width: 100%;
//   display: grid;
//   grid-template-rows: 1fr; /* 2 hàng bằng nhau */
//   grid-template-columns: 1fr 1.4fr; /* 2 cột bằng nhau */
//   flex-direction: row;
//   gap: 10px; /* Khoảng cách giữa các vùng */
// `;
