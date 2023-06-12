import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Popconfirm, Button } from 'antd';
import { MdDelete } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai';
import { BiShowAlt } from 'react-icons/bi';
import { FaMapMarkerAlt } from 'react-icons/fa';
import styled from 'styled-components';
import toast from '~/handlers/toast';
import { EditInput } from '~/ui-component/atoms';
import { DataTable, Modal, Map } from '~/ui-component/molecules';
import IconButton from '@mui/material/IconButton';
const AddOrganization = ({ open, setOpen }) => {
  const [focusMarker, setFocusMarker] = useState({
    zoom: 8
  });

  const handleFocusMarker = useCallback((params) => {
    const focus = Object.assign({}, params?.row, { zoom: 16 });
    setFocusMarker(focus);
  }, []);

  const handleDelete = useCallback((params) => {
    toast('success', `Delete: ${JSON.stringify(params.id)}`);
  }, []);

  const handleEdit = (params) => {
    console.log(params?.row?.id);
  };

  const columnsUser = [
    { field: 'username', headerName: 'User name', flex: 4, align: 'center', headerAlign: 'center' },
    { field: 'name', headerName: 'Full name', flex: 4, align: 'center', headerAlign: 'center' },
    { field: 'role', headerName: 'Role', flex: 2, align: 'center', headerAlign: 'center' },
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params) => (
        <Popconfirm title="Bạn có chắc chắn muốn xoá?" onConfirm={() => handleDelete(params)} okText="Đồng ý" cancelText="Hủy">
          <IconButton aria-label="delete" color="primary">
            <MdDelete color="tomato" size={22} />
          </IconButton>
        </Popconfirm>
      ),
      flex: 2,
      align: 'center',
      headerAlign: 'center'
    }
  ];

  const columnsPlace = [
    { field: 'name', headerName: 'Place name', flex: 2, align: 'center', headerAlign: 'center' },
    { field: 'address', headerName: 'Address', flex: 2, align: 'center', headerAlign: 'center' },
    { field: 'r', headerName: 'Radius', flex: 1.5, align: 'center', headerAlign: 'center' },
    { field: 'lat', headerName: 'Lat', flex: 2, align: 'center', headerAlign: 'center' },
    { field: 'long', headerName: 'Long', flex: 2, align: 'center', headerAlign: 'center' },
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params) => (
        <>
          <IconButton aria-label="edit" color="primary" onClick={() => handleFocusMarker(params)}>
            <BiShowAlt size={22} />
          </IconButton>
          <IconButton aria-label="edit" color="primary" onClick={() => handleEdit(params)}>
            <AiFillEdit size={22} />
          </IconButton>
          <Popconfirm title="Bạn có chắc chắn muốn xoá?" onConfirm={() => handleDelete(params)} okText="Đồng ý" cancelText="Hủy">
            <IconButton aria-label="delete" color="primary">
              <MdDelete color="tomato" size={22} />
            </IconButton>
          </Popconfirm>
        </>
      ),
      flex: 2.5,
      align: 'center',
      headerAlign: 'center'
    }
  ];

  const users = useMemo(
    () => [
      {
        org_ids: ['647cac259b4c9310b0ac62d5'],
        role: 'admin',
        name: 'user1',
        username: 'admin',
        email: 'fake@eamsaple1.com',
        phone: '',
        id: '647ca81bf9d63a0d0d5eac8f'
      },
      {
        org_ids: ['647cac259b4c9310b0ac62d5'],
        role: 'admin',
        name: 'user1',
        username: 'superadmin',
        email: 'fake@eamsaple1.com',
        phone: '',
        id: '647caa20f9d63a0d0d5eacc6'
      },
      {
        org_ids: ['647cac259b4c9310b0ac62d5'],
        role: 'admin',
        name: 'Sang Dap Chai 02',
        username: 'superadmin1',
        email: 'sanghh@gmail.com',
        phone: '',
        id: '647cac159b4c9310b0ac62c6'
      },
      {
        org_ids: ['647cac259b4c9310b0ac62d5'],
        role: 'leader',
        name: 'admin7',
        email: 'sanghh123456@gmail.com',
        username: 'sanghh1234',
        id: '647cad6d9b4c9310b0ac62f7'
      },
      {
        org_ids: [],
        role: 'admin',
        name: 'Hà Hữu Sáng',
        email: 'sanghh123456@gmail.com',
        username: 'admin1',
        id: '647cadbc3b2c8a43d0b25c69'
      },
      {
        org_ids: ['647cac259b4c9310b0ac62d5'],
        role: 'admin',
        name: 'user1',
        username: 'sanghh01',
        email: 'fake@eamsaple1.com',
        phone: '',
        id: '647cadd73b2c8a43d0b25c6f'
      },
      {
        org_ids: ['647cac259b4c9310b0ac62d5'],
        role: 'admin',
        name: 'Nguyen Quang Huy',
        email: 'nguyenquanghuy1998yb@gmail.com',
        username: 'abcd',
        id: '647cb23e9b4c9310b0ac632d'
      },
      {
        org_ids: ['647cac259b4c9310b0ac62d5'],
        role: 'manager',
        name: 'Eat',
        email: 'nguyenquanghuy1998yb@gmail.com',
        username: 'nguyenquanghuy1998yb',
        id: '647cb2ec9b4c9310b0ac6356'
      },
      {
        org_ids: ['647cac259b4c9310b0ac62d5'],
        role: 'manager',
        name: 'Huy Nguyễn',
        email: 'huynq@sohatv.vn',
        username: 'nguyenquanghuy1998',
        id: '647cb3679b4c9310b0ac635f'
      },
      {
        org_ids: ['647cac259b4c9310b0ac62d5'],
        role: 'user',
        name: 'Eat',
        email: 'nguyenquanghuy1998yb@gmail.com',
        username: 'huydeptrai',
        id: '647de4b89b4c9310b0ac6b47'
      }
    ],
    []
  );

  const places = useMemo(
    () => [
      {
        minimumTime: '1',
        status: 'out',
        lat: '21.055870673551922',
        long: '105.77806234359741',
        org_ids: '64782265d877a51085a3ef08',
        r: '300',
        address: 'Cng ty ABCd',
        name: 'Coong ty ABdC',
        time: 'aaaada',
        id: '647cad09e5da724fd814ca99'
      },
      {
        minimumTime: '1',
        status: 'out',
        lat: '21.055870673551922',
        long: '105.77806234359741',
        org_ids: '647cac259b4c9310b0ac62d5',
        r: '300',
        address: 'Cng ty ABCd',
        name: 'Coong ty ABdC',
        time: 'aaaada',
        id: '6481fde0629eab721d6542eb'
      },
      {
        minimumTime: '1',
        status: 'out',
        lat: '21.055870673551922',
        long: '105.77806234359741',
        org_ids: '647cac259b4c9310b0ac62d5',
        r: '300',
        address: 'Cng ty ABCd',
        name: 'Coong ty ABdC',
        time: 'aaaada',
        id: '6482055a53b37d96b9df1115'
      },
      {
        minimumTime: '1',
        status: 'out',
        lat: '21.055870673551922',
        long: '105.77806234359741',
        org_ids: '647cac259b4c9310b0ac62d5',
        r: '300',
        address: 'Cng ty ABCd',
        name: 'Coong ty ABdC',
        time: 'aaaada',
        id: '648205b25e90c30feb689bd9'
      },
      {
        minimumTime: '1',
        status: 'out',
        lat: '21.055870673551922',
        long: '105.77806234359741',
        org_ids: '647cac259b4c9310b0ac62d5',
        r: '300',
        address: 'Cng ty ABCd',
        name: 'Coong ty ABdC',
        time: 'aaaada',
        id: '64820baad6602314d4847f82'
      },
      {
        minimumTime: '1',
        status: 'out',
        lat: '21.055870673551922',
        long: '105.77806234359741',
        org_ids: '647cac259b4c9310b0ac62d5',
        r: '300',
        address: 'Cng ty ABCd',
        name: 'Coong ty ABdC',
        time: 'aaaada',
        id: '64820bd4d6602314d4847f8b'
      }
    ],
    []
  );

  useEffect(() => {
    setFocusMarker(Object.assign({}, places[0], { zoom: 8 }));
  }, [places]);

  return (
    <Modal
      open={open}
      onOpen={setOpen}
      title="Thêm tổ chức"
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
          <InformationWrapper>
            <EditInput
              value="Đội tuần tra thứ 3"
              initValue="hi"
              style={{
                fontSize: '20px',
                fontWeight: '600'
              }}
            />
            <EditInput
              value="Nguyễn Quang Huy"
              initValue="hi"
              label="Đội trưởng: "
              labelStyle={{
                width: '170px',
                fontWeight: '600'
              }}
            />
            <EditInput
              value="tt2211"
              initValue="hi"
              label="Tên rút gọn: "
              labelStyle={{
                width: '170px',
                fontWeight: '600'
              }}
            />
            <EditInput
              value="fw02"
              initValue="hi"
              label="Mã tổ chức: "
              labelStyle={{
                width: '170px',
                fontWeight: '600'
              }}
            />
          </InformationWrapper>
        </Cell>
        <Cell>
          <Map markers={places} focus={focusMarker} initialViewState={places[0]} />
        </Cell>
        <Cell>
          <DataTableWrapper>
            <DataTable columns={columnsUser} rows={users} checkboxSelection={false} density="compact" />
          </DataTableWrapper>
        </Cell>
        <Cell>
          <DataTableWrapper>
            <DataTable columns={columnsPlace} rows={places} checkboxSelection={false} density="compact" />
          </DataTableWrapper>
        </Cell>
      </Wrapper>
    </Modal>
  );
};

export default AddOrganization;

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

const InformationWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const DataTableWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;
