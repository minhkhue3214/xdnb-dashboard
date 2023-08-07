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
import { useCategoriesStore } from '~/hooks/categories';
import MainCard from '~/ui-component/cards/MainCard';
import { AntdTable } from '~/ui-component/molecules';
import AddCategoryModal from './AddCategoryModal';
import UpdateCategoryModal from './UpdateCategoryModal';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { Tag } from 'antd';

dayjs.extend(utc);
dayjs.extend(timezone);

const PageCategory = () => {
  const { t } = useTranslation();
  const { categoriesState, dispatchGetCategories, dispatchDeleteCategory } = useCategoriesStore();
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);

  const [openEditCategoryModal, setOpenEditCategoryModal] = useState({
    status: false,
    id: ''
  });

  useEffect(() => {
    dispatchGetCategories();
  }, [dispatchGetCategories]);

  const categories = useMemo(() => {
    const data = JSON.parse(JSON.stringify(categoriesState.categories));

    console.log('data categories', data);

    return data?.map((one) => {
      one.key = one.id;
      if (one.children) {
        if (one.children.length === 0) {
          one.children = null;
        } else {
          one.children = one.children.map((two) => {
            two.key = two.id;
            if (two.children.length === 0) {
              two.children = null;
            } else {
              two.children = two.children.map((three) => {
                three.key = three.id;
                if (three.children.length === 0) {
                  three.children = null;
                }

                return three;
              });
            }

            return two;
          });
        }
      }

      return one;
    });
  }, [categoriesState]);

  const handleChangeEditCategoryModal = useCallback((props) => {
    if (typeof props === 'boolean') {
      setOpenEditCategoryModal({
        status: props,
        id: ''
      });
    } else if (typeof props !== 'object') {
      return undefined;
    }

    const { status, id } = props;

    if (!id) {
      setOpenEditCategoryModal({
        status: false,
        id: ''
      });
    } else {
      setOpenEditCategoryModal({
        status,
        id
      });
    }
  }, []);

  const handleEdit = (params) => {
    console.log('params', params);
    handleChangeEditCategoryModal({
      status: true,
      id: params?.id
    });
  };

  const handleDelete = (params) => {
    dispatchDeleteCategory({
      id: params?.id || ''
    });
  };

  // Ngoài những thuộc tính trong này, có thể xem thêm thuộc tính của columns table trong ~/ui-component/molecules/DataTable nha. Có giải thích rõ ràng ở đó
  const columns = [
    {
      title: t('table.category.name'),
      dataIndex: 'name',
      width: '30%'
    },
    {
      title: t('table.category.slug'),
      dataIndex: 'slug',
      width: '35%'
    },
    {
      dataIndex: t('table.category.visible'),
      title: 'visible',
      render: (_, record) => (
        // console.log("record",record)
        <>{record.visible ? <Tag color="red">True</Tag> : <Tag color="blue">False</Tag>}</>
      ),
      width: '10%'
    },
    {
      title: t('table.category.priority'),
      dataIndex: 'priority',
      width: '10%'
    },
    {
      title: t('table.category.actions'),
      dataIndex: 'action',
      width: '15%',
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
      )
    }
  ];

  const handleChangePage = useCallback(
    (event, value) => {
      dispatchGetCategories({ params: { page: value } });
    },
    [dispatchGetCategories]
  );

  return (
    <MainCard>
      <ControlBar>
        <Button
          type="primary"
          icon={<AiOutlineUserAdd />}
          onClick={() => {
            setOpenAddCategoryModal(true);
          }}
        >
          {t('pages.categories.addCategory')}
        </Button>
        <Button type="primary" icon={<TbTableExport />}>
          {t('pages.categories.exportCategoryData')}
        </Button>
      </ControlBar>
      <DataTableWrapper>
        {/* <DataTable columns={columns} rows={categories} checkboxSelection={false} treeData getTreeDataPath={getTreeDataPath} /> */}
        <AntdTable columns={columns} dataSource={categories} rowkey={(record) => record.key} sticky={true} />
      </DataTableWrapper>
      <PaginationWrapper>
        <Pagination
          count={categoriesState.pagination.totalPages}
          page={categoriesState.pagination.currentPage}
          onChange={handleChangePage}
          color="primary"
        />
      </PaginationWrapper>
      <AddCategoryModal open={openAddCategoryModal} setOpen={setOpenAddCategoryModal} />
      <UpdateCategoryModal id={openEditCategoryModal.id} open={openEditCategoryModal.status} setOpen={handleChangeEditCategoryModal} />
    </MainCard>
  );
};

export default memo(PageCategory);

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
