import IconButton from '@mui/material/IconButton';
import { Popconfirm } from 'antd';
import React, { useCallback, useState } from 'react';
import { AiFillEdit, AiOutlineQrcode } from 'react-icons/ai';
import { BiShowAlt } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import styled from 'styled-components';
import { usePlacesStore } from '~/hooks/places';
import { DataTable, QrCode } from '~/ui-component/molecules';

const TablePlace = ({ id: orgId, places, onFocusMarker, onChangeEditPlaceModal }) => {
  const { dispatchDeletePlace } = usePlacesStore();
  const [openQRModal, setOpenQRModal] = useState({
    status: false,
    id: ''
  });

  const handleDelete = useCallback(
    (params) => {
      dispatchDeletePlace({
        id: params.id,
        params: {
          org_id: orgId
        }
      });
    },
    [dispatchDeletePlace, orgId]
  );

  const handleEdit = useCallback(
    (params) => {
      onChangeEditPlaceModal &&
        onChangeEditPlaceModal({
          status: true,
          id: params?.row?.id
        });
    },
    [onChangeEditPlaceModal]
  );

  const handleFocusMarker = useCallback(
    (params) => {
      const focus = Object.assign({}, params?.row, { zoom: 16 });
      onFocusMarker && onFocusMarker(focus);
    },
    [onFocusMarker]
  );

  const handleChangeQrCodeModal = useCallback((props) => {
    if (typeof props === 'boolean') {
      setOpenQRModal({
        status: props,
        id: ''
      });
    } else if (typeof props !== 'object') {
      return undefined;
    }

    const { status, id } = props;

    if (!id) {
      setOpenQRModal({
        status: false,
        id: ''
      });
    } else {
      setOpenQRModal({
        status,
        id
      });
    }
  }, []);

  const handleShowQrCode = (params) => {
    handleChangeQrCodeModal({
      status: true,
      id: params?.row?.id
    });
  };

  const columnsPlace = [
    { field: 'name', headerName: 'Place name', flex: 2, align: 'center', headerAlign: 'center' },
    { field: 'address', headerName: 'Address', flex: 2, align: 'center', headerAlign: 'center' },
    { field: 'r', headerName: 'Radius', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'lat', headerName: 'Lat', flex: 2, align: 'center', headerAlign: 'center' },
    { field: 'long', headerName: 'Long', flex: 2, align: 'center', headerAlign: 'center' },
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params) => (
        <>
          <IconButton aria-label="qrcode" color="primary" onClick={() => handleShowQrCode(params)}>
            <AiOutlineQrcode size={22} />
          </IconButton>
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
      flex: 3,
      align: 'center',
      headerAlign: 'center'
    }
  ];

  return (
    <DataTableWrapper>
      <DataTable columns={columnsPlace} rows={places} checkboxSelection={false} density="compact" />
      <QrCode id={openQRModal.id} open={openQRModal.status} setOpen={setOpenQRModal} />
    </DataTableWrapper>
  );
};

export default TablePlace;

const DataTableWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;
