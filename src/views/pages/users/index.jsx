import { memo, useCallback, useState } from 'react';
// project imports
import Button from '@mui/material/Button';
import { AiOutlineUserAdd, AiFillEdit } from 'react-icons/ai';
import { TbTableExport } from 'react-icons/tb';
import { MdDelete } from 'react-icons/md';
import styled from 'styled-components';
import toast from '~/handlers/toast';
import MainCard from '~/ui-component/cards/MainCard';
import { DataTable } from '~/ui-component/molecules';
import Pagination from '@mui/material/Pagination';
import IconButton from '@mui/material/IconButton';

const rowsTest = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 14, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 15, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 16, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 17, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 18, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 19, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 24, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 25, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 26, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 27, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 28, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 29, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 34, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 35, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 36, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 37, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 38, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 39, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 44, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 45, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 46, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 47, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 48, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 49, lastName: 'Roxie', firstName: 'Harvey', age: 65 }
];

const UsersPage = () => {
  const [page, setPage] = useState(1);

  const handleEdit = (params) => {
    toast('success', `Edit: ${JSON.stringify(params.row)}`);
  };

  const handleDelete = (params) => {
    toast('success', `elete: ${JSON.stringify(params.row)}`);
  };

  // Ngoài những thuộc tính trong này, có thể xem thêm thuộc tính của columns table trong ~/ui-component/molecules/DataTable nha. Có giải thích rõ ràng ở đó
  const columnsTest = [
    { field: 'id', headerName: 'ID', flex: 2 },
    { field: 'firstName', headerName: 'First name', flex: 2 },
    { field: 'lastName', headerName: 'Last name', flex: 2 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      flex: 2,
      filterable: true
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
      flex: 2
    },
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params) => (
        <>
          <IconButton aria-label="edit" color="primary" onClick={() => handleEdit(params)}>
            <AiFillEdit size={22} />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => handleDelete(params)}>
            <MdDelete color="tomato" size={22} />
          </IconButton>
        </>
      ),
      flex: 2
    }
  ];

  const handleChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  return (
    <MainCard>
      <ControlBar>
        <Button variant="contained" startIcon={<AiOutlineUserAdd />}>
          Thêm người dùng
        </Button>
        <Button variant="outlined" startIcon={<TbTableExport />}>
          Xuất dữ liệu
        </Button>
      </ControlBar>
      <DataTableWrapper>
        <DataTable columns={columnsTest} rows={rowsTest} checkboxSelection={false} />
      </DataTableWrapper>
      <PaginationWrapper>
        <Pagination count={10} page={page} onChange={handleChange} color="primary" />
      </PaginationWrapper>
    </MainCard>
  );
};

export default memo(UsersPage);

const ControlBar = styled.div`
  width: 100%;
  height: fit-content;
  padding-bottom: 16px;
  position: relative;
  justify-content: flex-end;
  display: flex;
  flex-direction: row;

  & > Button {
    margin: 0 8px;
  }
`;

const DataTableWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const PaginationWrapper = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 0 0 0;
`;
