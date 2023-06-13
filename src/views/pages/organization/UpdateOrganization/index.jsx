import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import styled from 'styled-components';
import { usePlacesStore } from '~/hooks/places';
import { useUsersStore } from '~/hooks/users';
import { Modal } from '~/ui-component/molecules';
import Information from './Information';
import MapOrganization from './MapOrganization';
import TablePlaces from './TablePlaces';
import TableUsers from './TableUsers';

const UpdateOrganization = ({ id, open, setOpen }) => {
  const { placesState, dispatchGetAllPlaces } = usePlacesStore();
  const { usersState, dispatchGetAllUsers } = useUsersStore();

  const [focusMarker, setFocusMarker] = useState({
    zoom: 8
  });

  useEffect(() => {
    if (id) {
      dispatchGetAllPlaces({
        org_ids: id
      });
    }
  }, [dispatchGetAllPlaces, id]);

  useEffect(() => {
    if (id) {
      dispatchGetAllUsers({
        params: {
          org_ids: id
        }
      });
    }
  }, [dispatchGetAllUsers, id]);

  useEffect(() => {
    setFocusMarker(Object.assign({}, placesState.places[0], { zoom: 8 }));
  }, [placesState.places]);

  return (
    <Modal
      open={open}
      onOpen={setOpen}
      title="Cập nhật thông tin tổ chức"
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width="95%"
      okText="Xác nhận"
      cancelText="Hủy bỏ"
      footer={null}
    >
      <Controller>
        <Button type="primary" icon={<FaMapMarkerAlt />}>
          Thêm điểm tuần tra
        </Button>
      </Controller>
      <Wrapper>
        <Cell>
          <Information id={id} users={usersState.users} />
        </Cell>
        <Cell>
          <MapOrganization focusMarker={focusMarker} places={placesState.places} />
        </Cell>
        <Cell>
          <TableUsers users={usersState.users} />
        </Cell>
        <Cell>
          <TablePlaces places={placesState.places} onFocusMarker={setFocusMarker} id={id} />
        </Cell>
      </Wrapper>
    </Modal>
  );
};

export default UpdateOrganization;

const Controller = styled.div`
  width: 100%;
  height: fit-content;
  position: relative;
  padding-bottom: 8px;
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 80vh;
  display: grid;
  grid-template-rows: 1fr 1fr; /* 2 hàng bằng nhau */
  grid-template-columns: 1fr 1fr; /* 2 cột bằng nhau */
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
