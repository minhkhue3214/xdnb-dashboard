import { memo, useCallback, useEffect, useMemo, useState } from 'react';
// project imports
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import { Button, Image, Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';
import { AiFillEdit, AiOutlineUserAdd } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { TbTableExport } from 'react-icons/tb';
import styled from 'styled-components';
import { useUsersStore } from '~/hooks/users';
import MainCard from '~/ui-component/cards/MainCard';
import { AntdTable } from '~/ui-component/molecules';
import AddUserModal from './AddUserModal';
import ChangePasswordModal from './ChangePasswordModal';
import UpdateUserModal from './UpdateUserModal';

const UsersPage = () => {
  const { t } = useTranslation();
  const { usersState, dispatchGetAllUsers, dispatchDeleteUser } = useUsersStore();
  const [page, setPage] = useState(1);
  const [openAddUserModal, setOpenAddUserModal] = useState(false);

  const avatarDefault = 'https://ionicframework.com/docs/img/demos/avatar.svg';

  const [openEditUserModal, setOpenEditUserModal] = useState({
    status: false,
    id: ''
  });

  const [openEditPasswordModal, setOpenEditPasswordModal] = useState({
    status: false,
    id: ''
  });

  useEffect(() => {
    dispatchGetAllUsers();
  }, [dispatchGetAllUsers]);

  useEffect(() => {
    setPage(usersState.pagination.currentPage);
  }, [usersState.pagination.currentPage]);

  function convertTimestampToHour(timestamp) {
    const date = new Date(timestamp);
    const hour = date.getHours();
    const minute = date.getMinutes();

    const formattedHour = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    return formattedHour;
  }

  const users = useMemo(() => {
    console.log('shiftsState.users', usersState.users);
    const convertedusers = usersState.users.map((user) => {
      const formattedHour = convertTimestampToHour(user.created_at);
      const formattedHour1 = convertTimestampToHour(user.updated_at);

      return {
        ...user,
        created_at: formattedHour,
        updated_at: formattedHour1
      };
    });
    return convertedusers;
  }, [usersState.users]);

  // const users = useMemo(() => {
  //   return usersState.users;
  // }, [usersState.users]);

  const handleChangeEditUserModal = useCallback((props) => {
    if (typeof props === 'boolean') {
      setOpenEditUserModal({
        status: props,
        id: ''
      });
    } else if (typeof props !== 'object') {
      return undefined;
    }

    const { status, id } = props;

    if (!id) {
      setOpenEditUserModal({
        status: false,
        id: ''
      });
    } else {
      setOpenEditUserModal({
        status,
        id
      });
    }
  }, []);

  const handleChangeEditPasswordModal = useCallback((props) => {
    if (typeof props === 'boolean') {
      setOpenEditPasswordModal({
        status: props,
        id: ''
      });
    } else if (typeof props !== 'object') {
      return undefined;
    }

    const { status, id } = props;

    if (!id) {
      setOpenEditPasswordModal({
        status: false,
        id: ''
      });
    } else {
      setOpenEditPasswordModal({
        status,
        id
      });
    }
  }, []);

  const handleEdit = (params) => {
    handleChangeEditUserModal({
      status: true,
      id: params?.id
    });
  };

  const handleDelete = (params) => {
    dispatchDeleteUser({
      id: params?.id || ''
    });
    // setPage(1)
  };

  const columns = [
    { dataIndex: 'username', title: t('table.user.username'), width: '8%' },
    { dataIndex: 'full_name', title: t('table.user.fullname'), width: '10%' },
    {
      dataIndex: 'avatar',
      title: t('table.user.avatar'),
      render: (_, record) => (
        // console.log("record",record)
        <>
          <Image
            width={55}
            style={{
              cursor: 'pointer'
            }}
            preview={{
              mask: false
            }}
            src={record.avatar || avatarDefault}
          />
          {/* <h4>Tesing</h4> */}
        </>
      ),
      width: '10%'
    },
    { dataIndex: 'email', title: t('table.user.email'), width: '10%' },
    { dataIndex: 'phone', title: t('table.user.phone'), width: '10%' },
    { dataIndex: 'address', title: t('table.user.address'), width: '10%' },
    { dataIndex: 'role', title: t('table.user.role'), width: '10%' },
    { dataIndex: 'created_at', title: t('table.user.create_at'), width: '10%' },
    { dataIndex: 'updated_at', title: t('table.user.update_at'), width: '10%' },
    {
      dataIndex: 'actions',
      title: t('table.post.actions'),
      render: (_, record) => (
        <>
          <IconButton aria-label="edit" color="primary" onClick={() => handleEdit(record)}>
            <AiFillEdit size={22} />
          </IconButton>
          <Popconfirm title="Bạn có chắc chắn muốn xoá?" onConfirm={() => handleDelete(record)} okText="Đồng ý" cancelText="Hủy">
            <IconButton aria-label="delete">
              <MdDelete color="tomato" size={22} />
            </IconButton>
          </Popconfirm>
        </>
      ),
      width: '10%'
    }
  ];

  const handleChange = useCallback(
    (event, value) => {
      dispatchGetAllUsers({ params: { page: value } });
      setPage(value);
    },
    [dispatchGetAllUsers]
  );

  return (
    <MainCard>
      <ControlBar>
        <Button
          type="primary"
          icon={<AiOutlineUserAdd />}
          onClick={() => {
            setOpenAddUserModal(true);
          }}
        >
          {t('pages.users.addUser')}
        </Button>
        <Button type="primary" icon={<TbTableExport />}>
          {t('pages.users.exportUserData')}
        </Button>
      </ControlBar>
      <DataTableWrapper>
        {/* <DataTable columns={columns} rows={users} checkboxSelection={false} /> */}
        <AntdTable columns={columns} dataSource={users} checkboxSelection={false} />
      </DataTableWrapper>
      <PaginationWrapper>
        <Pagination count={usersState.pagination.totalPages} page={page} onChange={handleChange} color="primary" />
      </PaginationWrapper>
      <AddUserModal open={openAddUserModal} setOpen={setOpenAddUserModal} />
      <UpdateUserModal
        id={openEditUserModal.id}
        open={openEditUserModal.status}
        setOpen={handleChangeEditUserModal}
        handleChangeEditPasswordModal={handleChangeEditPasswordModal}
      />
      <ChangePasswordModal id={openEditPasswordModal.id} open={openEditPasswordModal.status} setOpen={handleChangeEditPasswordModal} />
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
