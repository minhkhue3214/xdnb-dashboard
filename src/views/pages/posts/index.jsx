import { memo, useCallback, useEffect, useMemo, useState } from 'react';
// project imports
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import { Button, Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';
import { AiFillEdit, AiOutlineUserAdd } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { TbTableExport } from 'react-icons/tb';
import styled from 'styled-components';
import { usePostsStore } from '~/hooks/posts';
import MainCard from '~/ui-component/cards/MainCard';
import { DataTable } from '~/ui-component/molecules';
import AddPostModal from './AddPostModal';
import UpdatePostModal from './UpdatePostModal';
import dayjs from 'dayjs';

const PagePost = () => {
  const { t } = useTranslation();
  const { postsState, dispatchGetPosts, dispatchDeletePost } = usePostsStore();
  const [openAddPostModal, setOpenAddPostModal] = useState(false);

  const [openEditPostModal, setOpenEditPostModal] = useState({
    status: false,
    id: ''
  });

  useEffect(() => {
    dispatchGetPosts();
  }, [dispatchGetPosts]);

  const posts = useMemo(() => {
    return postsState.posts;
  }, [postsState.posts]);

  const handleChangeEditPostModal = useCallback((props) => {
    if (typeof props === 'boolean') {
      setOpenEditPostModal({
        status: props,
        id: ''
      });
    } else if (typeof props !== 'object') {
      return undefined;
    }

    const { status, id } = props;

    if (!id) {
      setOpenEditPostModal({
        status: false,
        id: ''
      });
    } else {
      setOpenEditPostModal({
        status,
        id
      });
    }
  }, []);

  const handleEdit = (params) => {
    handleChangeEditPostModal({
      status: true,
      id: params?.row?.id
    });
  };

  const handleDelete = (params) => {
    dispatchDeletePost({
      id: params?.id || ''
    });
  };

  // Ngoài những thuộc tính trong này, có thể xem thêm thuộc tính của columns table trong ~/ui-component/molecules/DataTable nha. Có giải thích rõ ràng ở đó
  const columns = [
    { field: 'title', headerName: t('table.post.title'), flex: 2, align: 'center', headerAlign: 'center' },
    { field: 'description', headerName: t('table.post.description'), flex: 3, align: 'center', headerAlign: 'center' },
    { field: 'author', headerName: t('table.post.author'), flex: 3, align: 'center', headerAlign: 'center' },
    { field: 'priority', headerName: t('table.post.priority'), flex: 2, align: 'center', headerAlign: 'center' },
    {
      field: 'publication_date',
      headerName: t('table.post.publication_date'),
      flex: 2,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params) => dayjs(params.row.publication_date).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      field: 'actions',
      headerName: t('table.post.actions'),
      renderCell: (params) => (
        <>
          <IconButton aria-label="edit" color="primary" onClick={() => handleEdit(params)}>
            <AiFillEdit size={22} />
          </IconButton>
          <Popconfirm title="Bạn có chắc chắn muốn xoá?" onConfirm={() => handleDelete(params)} okText="Đồng ý" cancelText="Hủy">
            <IconButton aria-label="delete">
              <MdDelete color="tomato" size={22} />
            </IconButton>
          </Popconfirm>
        </>
      ),
      flex: 2,
      align: 'center',
      headerAlign: 'center'
    }
  ];

  const handleChangePage = useCallback(
    (event, value) => {
      dispatchGetPosts({ params: { page: value } });
    },
    [dispatchGetPosts]
  );

  return (
    <MainCard>
      <ControlBar>
        <Button
          type="primary"
          icon={<AiOutlineUserAdd />}
          onClick={() => {
            setOpenAddPostModal(true);
          }}
        >
          {t('pages.posts.addPost')}
        </Button>
        <Button type="primary" icon={<TbTableExport />}>
          {t('pages.posts.exportPostData')}
        </Button>
      </ControlBar>
      <DataTableWrapper>
        <DataTable columns={columns} rows={posts} checkboxSelection={false} />
      </DataTableWrapper>
      <PaginationWrapper>
        <Pagination
          count={postsState.pagination.totalPages}
          page={postsState.pagination.currentPage}
          onChange={handleChangePage}
          color="primary"
        />
      </PaginationWrapper>
      <AddPostModal open={openAddPostModal} setOpen={setOpenAddPostModal} />
      <UpdatePostModal
        id={openEditPostModal.id}
        open={openEditPostModal.status}
        setOpen={handleChangeEditPostModal}
        handleChangeEditPasswordModal={() => {}}
      />
    </MainCard>
  );
};

export default memo(PagePost);

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
