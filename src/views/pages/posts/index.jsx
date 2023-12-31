import { memo, useCallback, useEffect, useMemo, useState } from 'react';
// project imports
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import { Button, Popconfirm, Image } from 'antd';
import { useTranslation } from 'react-i18next';
import { AiFillEdit, AiOutlineUserAdd } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { TbTableExport } from 'react-icons/tb';
import styled from 'styled-components';
import { usePostsStore } from '~/hooks/posts';
import MainCard from '~/ui-component/cards/MainCard';
import { AntdTable } from '~/ui-component/molecules';
import AddPostModal from './AddPostModal';
import UpdatePostModal from './UpdatePostModal';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { InputSearch } from '~/ui-component/atoms';
// import PreviewModal from './PreviewModal';

dayjs.extend(utc);
dayjs.extend(timezone);

const PagePost = () => {
  const { t } = useTranslation();
  const { postsState, dispatchGetPosts, dispatchDeletePost } = usePostsStore();
  const [openAddPostModal, setOpenAddPostModal] = useState(false);

  // const [isPreViewModal, setIsPreViewModal] = useState(false);

  const [openEditPostModal, setOpenEditPostModal] = useState({
    status: false,
    id: ''
  });

  useEffect(() => {
    dispatchGetPosts();
  }, [dispatchGetPosts]);

  const posts = useMemo(() => {
    const updatedDataSource = postsState.posts.map((item) => {
      const { id, ...rest } = item;
      return { key: id, ...rest };
    });

    return updatedDataSource;
  }, [postsState.posts]);

  // const handleChangeOpenPreviewModal = (status) => {
  //   setOpenPreviewModal(status);
  // };

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
      id: params?.key
    });
  };

  const handleDelete = (params) => {
    dispatchDeletePost({
      id: params?.key || ''
    });
  };

  // Ngoài những thuộc tính trong này, có thể xem thêm thuộc tính của columns table trong ~/ui-component/molecules/DataTable nha. Có giải thích rõ ràng ở đó
  const columns = [
    {
      dataIndex: 'avatar',
      title: t('table.post.avatar'),
      align: 'center',
      render: (_, record) => (
        // console.log("record",record)
        <>
          <Image
            width={55}
            style={{
              cursor: 'pointer',
              width: '60px',
              height: '60px'
            }}
            preview={{
              mask: false
            }}
            // src={record.avatar || avatarDefault}
            src={`https://tenmienmienphi.online/storage/${record.image.path}` || avatarDefault}
          />
          {/* <h4>Tesing</h4> */}
        </>
      ),
      width: '7%'
    },
    { dataIndex: 'title', title: t('table.post.title'), width: '20%' },
    { dataIndex: 'description', title: t('table.post.description'), width: '30%' },
    { dataIndex: 'author', title: t('table.post.author'), width: '13%' },
    { dataIndex: 'priority', title: t('table.post.priority'), width: '5%', align: 'center' },
    {
      dataIndex: 'publication_date',
      title: t('table.post.publication_date'),
      width: '15%',
      align: 'center',
      render: (_, record) => dayjs(record.publication_date).utcOffset(7).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      dataIndex: 'actions',
      title: t('table.post.actions'),
      align: 'center',
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

  const handleChangePage = useCallback(
    (event, value) => {
      dispatchGetPosts({ params: { page: value } });
    },
    [dispatchGetPosts]
  );

  const onSearch = (value) => {
    dispatchGetPosts({ params: { search: value } });
  };

  return (
    <MainCard>
      <ControlBar>
        <InputSearch
          onSearch={onSearch}
          placeholder={t('table.post.searching')}
          style={{
            width: '40%'
            // marginTop: '8px',
            // height: '70px'
          }}
        />
        <ButtonWrapper>
          <Button
            type="primary"
            icon={<AiOutlineUserAdd />}
            onClick={() => {
              setOpenAddPostModal(true);
            }}
          >
            {t('pages.posts.addPost')}
          </Button>
          <Button type="primary" disabled={true} icon={<TbTableExport />}>
            {t('pages.posts.exportPostData')}
          </Button>
        </ButtonWrapper>
      </ControlBar>
      <DataTableWrapper>
        <AntdTable columns={columns} dataSource={posts} checkboxSelection={false} />
      </DataTableWrapper>
      <PaginationWrapper>
        <Pagination
          count={postsState.pagination.lastPage}
          page={postsState.pagination.currentPage}
          onChange={handleChangePage}
          color="primary"
        />
      </PaginationWrapper>
      <AddPostModal open={openAddPostModal} setOpen={setOpenAddPostModal} />
      {/* <PreviewModal open={openPreviewModal} setOpen={handleChangeOpenPreviewModal} /> */}
      <UpdatePostModal
        id={openEditPostModal.id}
        open={openEditPostModal.status}
        setOpen={handleChangeEditPostModal}
        // handleChangeOpenPreviewModal={handleChangeOpenPreviewModal}
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
  justify-content: space-between;
  align-items: center;
  display: flex;
  flex-direction: row;

  & > Button {
    margin: 0 8px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
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
