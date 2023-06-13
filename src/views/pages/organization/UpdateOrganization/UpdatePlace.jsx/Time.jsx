import { useCallback } from 'react';
import styled from 'styled-components';
import { TimePicker } from '~/ui-component/atoms';

const Time = ({ formik }) => {
  const handleChangeTimeStart = useCallback(
    (value) => {
      formik.setFieldValue('timeStart', value);
    },
    [formik]
  );
 
  const handleChangeTimeEnd = useCallback(
    (value) => {
      formik.setFieldValue('timeEnd', value);
    },
    [formik]
  );

  return (
    <TimeWrapper>
      <TimePicker
        label="* Thời gian bắt đầu tuần tra"
        id="timeStart"
        name="timeStart"
        message={formik.touched.timeStart ? formik.errors.timeStart : ''}
        type={formik.touched.timeStart && formik.errors.timeStart ? 'error' : ''}
        value={formik.values.timeStart}
        onBlur={formik.handleBlur}
        onChange={handleChangeTimeStart}
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
      <TimePicker
        label="* Thời gian kết thúc ca trực"
        id="timeEnd"
        name="timeEnd"
        message={formik.touched.timeEnd ? formik.errors.timeEnd : ''}
        type={formik.touched.timeEnd && formik.errors.timeEnd ? 'error' : ''}
        value={formik.values.timeEnd}
        onBlur={formik.handleBlur}
        onChange={handleChangeTimeEnd}
        size="middle"
        isTextArea={true}
        rows={4}
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
    </TimeWrapper>
  );
};

export default Time;

const TimeWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px 0;
`;
