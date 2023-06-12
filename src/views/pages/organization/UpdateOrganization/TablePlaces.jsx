import IconButton from '@mui/material/IconButton';
import { Popconfirm } from 'antd';
import React, { useCallback } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { BiShowAlt } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import styled from 'styled-components';
import { usePlacesStore } from '~/hooks/places';
import { DataTable } from '~/ui-component/molecules';

const TablePlace = ({ places, onFocusMarker }) => {
  const { dispatchDeletePlace } = usePlacesStore();

  const handleDelete = useCallback(
    (params) => {
      dispatchDeletePlace(params.id);
    },
    [dispatchDeletePlace]
  );

  const handleEdit = (params) => {
    console.log(params?.row?.id);
  };

  const handleFocusMarker = useCallback(
    (params) => {
      const focus = Object.assign({}, params?.row, { zoom: 16 });
      onFocusMarker && onFocusMarker(focus);
    },
    [onFocusMarker]
  );

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

  return (
    <DataTableWrapper>
      <DataTable columns={columnsPlace} rows={places} checkboxSelection={false} density="compact" />
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
