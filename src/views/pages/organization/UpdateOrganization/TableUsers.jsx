import IconButton from '@mui/material/IconButton';
import { Popconfirm } from 'antd';
import React, { useCallback } from 'react';
import { MdDelete } from 'react-icons/md';
import styled from 'styled-components';
import { useUsersStore } from '~/hooks/users';
import { DataTable } from '~/ui-component/molecules';

const TableUsers = ({ id: orgId, users }) => {
  const { dispatchDeleteUser } = useUsersStore();

  const handleDelete = useCallback(
    (params) => {
      dispatchDeleteUser({
        id: params.id,
        params: {
          org_ids: orgId
        }
      });
    },
    [dispatchDeleteUser, orgId]
  );

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

  return (
    <DataTableWrapper>
      <DataTable columns={columnsUser} rows={users} checkboxSelection={false} density="compact" />
    </DataTableWrapper>
  );
};

export default TableUsers;

const DataTableWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;
