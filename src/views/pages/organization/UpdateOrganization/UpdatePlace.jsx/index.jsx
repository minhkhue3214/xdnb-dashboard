import React, { useCallback, useEffect } from 'react';
import { Modal } from '~/ui-component/molecules';
import styled from 'styled-components';
import SelectPosition from './SelectPosition';
import Information from './Information';
import Setting from './Setting';
import Time from './Time';
import { useFormik } from 'formik';
import * as yup from 'yup';
import toast from '~/handlers/toast';
import checkValidIp from '~/handlers/checkValidIp';
import checkValidMac from '~/handlers/checkValidMac';
import { usePlacesStore } from '~/hooks/places';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Import các plugin cần thiết
dayjs.extend(utc);
dayjs.extend(timezone);

const Update = ({ id, open, setOpen }) => {
  const { placesState, dispatchUpdatePlace, dispatchGetPlaceById } = usePlacesStore();

  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      lat: '',
      long: '',
      r: 300,
      timeStart: '',
      timeEnd: '',
      wifi: false,
      ipAddress: '',
      mac: false,
      macAddress: ''
    },
    validationSchema: yup.object({
      name: yup.string().max(200, 'Tên điểm tuần tra quá dài').required('Vui lòng nhập tên điểm tuần tra'),
      address: yup.string().max(300, 'Địa chỉ quá dài').required('Vui lòng nhập địa chỉ'),
      lat: yup.string(),
      long: yup.string(),
      r: yup.number().required('Vui lòng điền bán kính sai số'),
      timeStart: yup.date().required('Vui lòng chọn thời gian bắt đầu ca trực'),
      timeEnd: yup.date().required('Vui lòng chọn thời gian kết thúc ca trực'),
      wifi: yup.boolean(),
      mac: yup.boolean(),
      ipAddress: yup.string(),
      macAddress: yup.string()
    }),
    onSubmit: (values) => {
      formik.validateForm().then(() => {
        if (formik.isValid) {
          console.log('values', values);
          // additional validation
          if (!values.lat) {
            toast('warning', 'Vui lòng nhập vĩ độ!');
            throw new Error('validate failed!');
          }

          if (!values.long) {
            toast('warning', 'Vui lòng nhập kinh độ!');
            throw new Error('validate failed!');
          }

          if (values.wifi && !checkValidIp(values.ipAddress)) {
            toast('warning', 'Địa chỉ ip không hợp lệ!');
            throw new Error('validate failed!');
          }

          if (values.mac && !checkValidMac(values.macAddress)) {
            toast('warning', 'Địa chỉ MAC không hợp lệ!');
            throw new Error('validate failed!');
          }

          dispatchUpdatePlace({
            id,
            lat: values.lat,
            long: values.long,
            org_id: id,
            r: values.r,
            address: values.address,
            name: values.name,
            time_start: dayjs(values.timeStart).unix(),
            time_end: dayjs(values.timeEnd).unix(),
            wifi: values.wifi,
            ip_address: values.ipAddress !== '...' ? values.ipAddress : '',
            mac: values.mac,
            mac_address: values.macAddress !== '-----' ? values.macAddress : '',
            params: {
              org_id: id
            }
          });

          handleCancel();
        } else {
          console.log(formik.errors);
        }
      });
    },
    validateOnChange: true
  });

  const handleCancel = useCallback(() => {
    formik.handleReset();
    setOpen(false);
  }, [formik, setOpen]);

  useEffect(() => {
    if (id) {
      dispatchGetPlaceById({ id });
    }
  }, [dispatchGetPlaceById, id]);

  useEffect(() => {
    const data = placesState.detail;
    if (data) {
      formik.setFieldValue('lat', data.lat || '');
      formik.setFieldValue('long', data.long || '');
      formik.setFieldValue('orgId', data.orgId || '');
      formik.setFieldValue('r', data.r || 300);
      formik.setFieldValue('address', data.address || '');
      formik.setFieldValue('name', data.name || '');
      formik.setFieldValue('timeStart', dayjs.unix(data.timeStart).utc().utcOffset('+07:00') || '');
      formik.setFieldValue('timeEnd', dayjs.unix(data.timeEnd).utc().utcOffset('+07:00') || '');
      formik.setFieldValue('wifi', data.wifi);
      formik.setFieldValue('ipAddress', data.ipAddress || '');
      formik.setFieldValue('mac', data.mac);
      formik.setFieldValue('macAddress', data.macAddress || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placesState.detail]);

  return (
    <Modal
      open={open}
      onOpen={setOpen}
      title="Cập nhật điểm tuần tra"
      onOk={formik.handleSubmit}
      onCancel={handleCancel}
      width="95%"
      okText="Xác nhận"
      cancelText="Hủy bỏ"
    >
      <Wrapper>
        <Cell>
          <TitleCell>Thông tin điểm tuần tra</TitleCell>
          <Information formik={formik} />
        </Cell>
        <Cell>
          <TitleCell>Chọn vị trí điểm tuần tra</TitleCell>
          <SelectPosition formik={formik} />
        </Cell>
        <Cell>
          <TitleCell>Cấu hình thời gian tuần tra</TitleCell>
          <Time formik={formik} />
        </Cell>
        <Cell>
          <TitleCell>Cài đặt điểm tuần tra</TitleCell>
          <Setting formik={formik} />
        </Cell>
      </Wrapper>
    </Modal>
  );
};

export default Update;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 80vh;
  display: grid;
  grid-template-rows: 1.1fr 1fr; /* 2 hàng bằng nhau */
  grid-template-columns: 1fr 1.8fr; /* 2 cột bằng nhau */
  gap: 10px; /* Khoảng cách giữa các vùng */
`;

const Cell = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f1f6f9;
  border-radius: 8px;
  padding: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const TitleCell = styled.div`
  font-weight: 600;
`;
