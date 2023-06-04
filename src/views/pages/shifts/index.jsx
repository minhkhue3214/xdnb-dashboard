import { memo, useCallback, useEffect, useState, useMemo } from 'react';
// project imports
// import Button from '@mui/material/Button';
import { AiOutlineUserAdd, AiFillEdit } from 'react-icons/ai';
import { TbTableExport } from 'react-icons/tb';
import { MdDelete } from 'react-icons/md';
import styled from 'styled-components';
import toast from '~/handlers/toast';
import MainCard from '~/ui-component/cards/MainCard';
import { DataTable } from '~/ui-component/molecules';
import Pagination from '@mui/material/Pagination';
import IconButton from '@mui/material/IconButton';
import { Button, Popconfirm } from 'antd';
import { useShiftsStore } from '~/hooks/shifts';
import dayjs from 'dayjs';

const Shifts = () => {
  const { shiftsState, dispatchGetAllShifts, dispatchDeleteShift } = useShiftsStore();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatchGetAllShifts();
  }, [dispatchGetAllShifts]);

  const shifts = useMemo(() => {
    return shiftsState.shifts;
  }, [shiftsState.shifts]);

  const handleEdit = (params) => {
    toast('success', `Edit: ${JSON.stringify(params.row)}`);
  };

  const handleDelete = (params) => {
    dispatchDeleteShift(params.id);
    // toast('success', `elete: ${JSON.stringify(params.row)}`);
  };

  // Ngoài những thuộc tính trong này, có thể xem thêm thuộc tính của columns table trong ~/ui-component/molecules/DataTable nha. Có giải thích rõ ràng ở đó
  const columns = [
    { field: 'id', headerName: 'ID', flex: 3, align: 'center', headerAlign: 'start' },
    { field: 'name', headerName: 'Name', flex: 1, align: 'center', headerAlign: 'center' },
    {
      field: 'time_start',
      headerName: 'Time start',
      valueGetter: (params) => dayjs(params.row.time_start).format('hh:mm'),
      flex: 1,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'time_end',
      headerName: 'Time end',
      valueGetter: (params) => dayjs(params.row.time_end).format('hh:mm'),
      flex: 1,
      align: 'center',
      headerAlign: 'center'
    },
    { field: 'code', headerName: 'Code', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'max_time_late', headerName: 'Max time late', flex: 2, align: 'center', headerAlign: 'center' },
    { field: 'description', headerName: 'Description', flex: 2, align: 'center', headerAlign: 'center' },
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params) => (
        <>
          <IconButton aria-label="edit" color="primary" onClick={() => handleEdit(params)}>
            <AiFillEdit size={22} />
          </IconButton>
          <Popconfirm title="Bạn có chắc chắn muốn xoá?" onConfirm={() => handleDelete(params)} okText="Đồng ý" cancelText="Hủy">
            <Button type="text" danger>
              <MdDelete color="tomato" size={22} />
            </Button>
          </Popconfirm>
        </>
      ),
      flex: 1,
      align: 'center',
      headerAlign: 'center'
    }
  ];

  const handleChange = useCallback(
    (event, value) => {
      dispatchGetAllShifts({ params: { page: value } });
      setPage(value);
    },
    [dispatchGetAllShifts]
  );

  return (
    <MainCard>
      <ControlBar>
        <Button variant="contained" startIcon={<AiOutlineUserAdd />} onClick={() => {}}>
          Thêm ca trực
        </Button>
        <Button variant="outlined" startIcon={<TbTableExport />}>
          Xuất dữ liệu
        </Button>
      </ControlBar>
      <DataTableWrapper>
        <DataTable columns={columns} rows={shifts} checkboxSelection={false} />
      </DataTableWrapper>
      <PaginationWrapper>
        <Pagination count={shiftsState.pagination.totalPages} page={page} onChange={handleChange} color="primary" />
      </PaginationWrapper>
    </MainCard>
  );
};

export default memo(Shifts);

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
