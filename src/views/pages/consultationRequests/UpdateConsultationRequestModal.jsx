import { useFormik } from 'formik';
import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import * as yup from 'yup';
import { useConsultationRequestsStore } from '~/hooks/consultationRequests';
import { Input, Switch } from '~/ui-component/atoms';
import { Modal } from '~/ui-component/molecules';

const UpdateConsultationRequestModal = ({ id, open, setOpen }) => {
  const { t } = useTranslation();
  const { consultationRequestsState, dispatchUpdateConsultationRequest, dispatchGetConsultationRequest } = useConsultationRequestsStore();

  const formik = useFormik({
    initialValues: {
      status: false,
      result: ''
    },
    validationSchema: yup.object({}),
    onSubmit: (values) => {
      formik.validateForm().then(() => {
        const { status, result } = values;

        if (formik.isValid) {
          // logic submit
          dispatchUpdateConsultationRequest({
            id,
            status,
            result
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

  const handleChangeStatus = useCallback(
    (value) => {
      formik.setFieldValue('status', value);
    },
    [formik]
  );

  useEffect(() => {
    if (id) {
      dispatchGetConsultationRequest({ id });
    }
  }, [dispatchGetConsultationRequest, id]);

  useEffect(() => {
    const data = consultationRequestsState.detail;
    if (data) {
      formik.setFieldValue('status', data.status || false);
      formik.setFieldValue('result', data.result || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consultationRequestsState.detail]);

  return (
    <>
      <Modal
        title={t('modal.consultationRequest.editConsultationRequest')}
        open={open}
        onOpen={setOpen}
        width="400px"
        onOk={formik.handleSubmit}
        onCancel={handleCancel}
        okText={t('modal.consultationRequest.submitEditConsultationRequest')}
        cancelText={t('modal.consultationRequest.cancel')}
      >
        <Wrapper>
          <Switch
            label={`* ${t('input.label.consultationRequest.status')}`}
            name="status"
            message={formik.touched.status ? formik.errors.status : ''}
            type={formik.touched.status && formik.errors.status ? 'error' : ''}
            value={formik.values.status}
            onBlur={formik.handleBlur}
            onChange={handleChangeStatus}
            labelStyle={{
              padding: '2px',
              paddingRight: '10px'
            }}
            style={{
              width: '100%',
              marginTop: '8px',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              height: '40px'
            }}
            switchStyle={{
              marginLeft: '2px'
            }}
            size="small"
          />
          <Input
            label={`* ${t('input.label.consultationRequest.result')}`}
            name="result"
            message={formik.touched.result ? formik.errors.result : ''}
            type={formik.touched.result && formik.errors.result ? 'error' : ''}
            value={formik.values.result}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            size="middle"
            isTextArea={true}
            rows={7}
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
        </Wrapper>
      </Modal>
    </>
  );
};

export default memo(UpdateConsultationRequestModal);

const Wrapper = styled.div`
  width: 100%;
  height: 300px;
  padding: 16px 0;
  position: relative;
  overflow: hidden;
`;
