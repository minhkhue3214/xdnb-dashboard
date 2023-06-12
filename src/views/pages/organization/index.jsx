import { memo, useCallback, useEffect, useMemo, useState } from 'react';
// project imports
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import { Button, Popconfirm } from 'antd';
import { AiFillEdit, AiOutlineUserAdd } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { TbTableExport } from 'react-icons/tb';
import styled from 'styled-components';
import { useOrganizationsStore } from '~/hooks/organizations';
import MainCard from '~/ui-component/cards/MainCard';
import { DataTable } from '~/ui-component/molecules';
import UpdateOrganization from './UpdateOrganization';

const OrganizationPage = () => {
  const { organizationsState, dispatchGetAllOrganizations, dispatchDeleteOrganization } = useOrganizationsStore();
  const [page, setPage] = useState(1);
  const [openEditOrganizationModal, setOpenEditOrganizationModal] = useState({
    status: false,
    id: ''
  });

  useEffect(() => {
    dispatchGetAllOrganizations();
  }, [dispatchGetAllOrganizations]);

  const Organizations = useMemo(() => {
    return organizationsState.organizations;
  }, [organizationsState.organizations]);

  const handleDelete = (params) => {
    dispatchDeleteOrganization(params.id);
  };
  const handleChangeEditOrganizationModal = useCallback((props) => {
    if (typeof props === 'boolean') {
      setOpenEditOrganizationModal({
        status: props,
        id: ''
      });
    } else if (typeof props !== 'object') {
      return undefined;
    }

    const { status, id } = props;

    if (!id) {
      setOpenEditOrganizationModal({
        status: false,
        id: ''
      });
    } else {
      setOpenEditOrganizationModal({
        status,
        id
      });
    }
  }, []);

  const handleEditOrganization = (params) => {
    handleChangeEditOrganizationModal({
      status: true,
      id: params?.row?.id
    });
  };

  const columns = [
    { field: 'id', headerName: 'ID', flex: 2 },
    {
      field: 'leader',
      headerName: 'Leader',
      flex: 2,
      valueGetter: (params) => params?.row?.leader?.name
    },
    { field: 'fullname', headerName: 'Full name', flex: 2 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'code', headerName: 'Code', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params) => (
        <>
          <IconButton aria-label="edit" color="primary" onClick={() => handleEditOrganization(params)}>
            <AiFillEdit size={22} />
          </IconButton>
          <Popconfirm title="Bạn có chắc chắn muốn xoá?" onConfirm={() => handleDelete(params)} okText="Đồng ý" cancelText="Hủy">
            <Button type="text" danger>
              <MdDelete color="tomato" size={22} />
            </Button>
          </Popconfirm>
        </>
      ),
      flex: 2
    }
  ];

  const handleChange = useCallback(
    (event, value) => {
      console.log('setPage', value);
      setPage(value);
      dispatchGetAllOrganizations({ params: { page: value } });
    },
    [dispatchGetAllOrganizations]
  );

  return (
    <MainCard>
      <ControlBar>
        <Button variant="contained" startIcon={<AiOutlineUserAdd />} onClick={() => {}}>
          Thêm tổ chức
        </Button>
        <Button variant="outlined" startIcon={<TbTableExport />}>
          Xuất dữ liệu
        </Button>
      </ControlBar>
      <DataTableWrapper>
        <DataTable columns={columns} rows={Organizations} checkboxSelection={false} />
      </DataTableWrapper>
      <PaginationWrapper>
        <Pagination count={organizationsState.pagination.totalPages} page={page} onChange={handleChange} color="primary" />
      </PaginationWrapper>
      <UpdateOrganization
        id={openEditOrganizationModal.id}
        open={openEditOrganizationModal.status}
        setOpen={handleChangeEditOrganizationModal}
      />
    </MainCard>
  );
};

export default memo(OrganizationPage);

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
