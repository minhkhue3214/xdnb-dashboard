// import { useFormik } from 'formik';
// import { useCallback, useState, memo } from 'react';
// import styled from 'styled-components';
// import * as yup from 'yup';
// import { useUsersStore } from '~/hooks/users';
// import { Input } from '~/ui-component/atoms';
// import { Modal } from '~/ui-component/molecules';
// import { useTranslation } from 'react-i18next';

// const PreviewModal = (props) => {
//   return (
//     <>
//       <Modal
//         open={open}
//         onOpen={setOpen}
//         title={t('modal.user.updatePassword')}
//         onOk={formik.handleSubmit}
//         onCancel={handleCancel}
//         width="350px"
//         okText={t('modal.user.submitUpdatePassword')}
//         cancelText={t('modal.user.cancel')}
//       >
//         <EditUserWrapper>
//             <h1>Testing modal</h1>
//         </EditUserWrapper>
//       </Modal>
//     </>
//   );
// };

// export default memo(PreviewModal);

// const EditUserWrapper = styled.div`
//   width: 100%;
//   height: 100%;
//   padding: 16px 0;
// `;

// const EditLinkPassword = styled.h4`
//   padding-top: 15px;
//   color: #f0432c;
// `;
