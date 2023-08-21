import { memo, useCallback, useEffect, useMemo, useState } from 'react';
// project imports
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import { Button, Popconfirm, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import { AiFillEdit, AiOutlineUserAdd } from 'react-icons/ai';
// import { GrGallery } from 'react-icons/gr';
import { MdDelete } from 'react-icons/md';
import { TbTableExport } from 'react-icons/tb';
import styled from 'styled-components';
import { useCategoriesStore } from '~/hooks/categories';
import { useProductsStore } from '~/hooks/products';
import MainCard from '~/ui-component/cards/MainCard';
import { AntdTable } from '~/ui-component/molecules';
import AddProductModal from './AddProductModal';
// import GalleryItem from './GalleryItem';
import UpdateProductModal from './UpdateProductModal';

const ProductsPage = () => {
  const { t } = useTranslation();
  const { productsState, dispatchGetAllProducts, dispatchDeleteProduct } = useProductsStore();
  // const [page, setPage] = useState(1);
  const [openAddProductModal, setOpenAddProductModal] = useState(false);

  const { dispatchGetCategories } = useCategoriesStore();

  useEffect(() => {
    dispatchGetCategories();
  }, []);

  // const avatarDefault = 'https://ionicframework.com/docs/img/demos/avatar.svg';

  const [openEditProductModal, setOpenEditProductModal] = useState({
    status: false,
    id: ''
  });

  // const [openGalleryItemsModal, setOpenGalleryItemsModal] = useState({
  //   status: false,
  //   id: ''
  // });

  useEffect(() => {
    dispatchGetAllProducts();
  }, [dispatchGetAllProducts]);

  // useEffect(() => {
  //   setPage(productsState.pagination.currentPage);
  // }, [productsState.pagination.currentPage]);

  const products = useMemo(() => {
    return productsState.products;
  }, [productsState.products]);

  // const handleChangeGalleryItemsModal = useCallback((props) => {
  //   if (typeof props === 'boolean') {
  //     setOpenGalleryItemsModal({
  //       status: props,
  //       id: ''
  //     });
  //   } else if (typeof props !== 'object') {
  //     return undefined;
  //   }

  //   const { status, id } = props;

  //   if (!id) {
  //     setOpenGalleryItemsModal({
  //       status: false,
  //       id: ''
  //     });
  //   } else {
  //     // setOpenGalleryItemsModal({
  //     //   status,
  //     //   id
  //     // });
  //   }
  // }, []);

  const handleChangeEditProductModal = useCallback((props) => {
    if (typeof props === 'boolean') {
      setOpenEditProductModal({
        status: props,
        id: ''
      });
    } else if (typeof props !== 'object') {
      return undefined;
    }

    const { status, id } = props;

    if (!id) {
      setOpenEditProductModal({
        status: false,
        id: ''
      });
    } else {
      setOpenEditProductModal({
        status,
        id
      });
    }
  }, []);

  const handleEdit = (params) => {
    handleChangeEditProductModal({
      status: true,
      id: params?.id
    });
  };

  // const handleGalleryItems = (params) => {
  //   handleChangeGalleryItemsModal({
  //     status: true,
  //     id: params?.id
  //   });
  // };

  const handleDelete = (params) => {
    dispatchDeleteProduct({
      id: params?.id || ''
    });
    // setPage(1);
  };

  const columns = [
    { dataIndex: 'name', title: t('table.products.name'), width: '12%' },
    { dataIndex: 'original_price', title: t('table.products.original_price'), width: '10%' },
    { dataIndex: 'discounted_price', title: t('table.products.discounted_price'), width: '10%' },
    { dataIndex: 'priority', title: t('table.products.priority'), width: '6%' },
    { dataIndex: 'quantity', title: t('table.products.quantity'), width: '6%' },
    {
      dataIndex: 'hot',
      title: 'Hot',
      render: (_, record) => (
        // console.log("record",record)
        <>{record.hot ? <Tag color="red">Hiển thị</Tag> : <Tag color="blue">Không hiển thị</Tag>}</>
      ),
      width: '5%'
    },
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
      width: '6%'
    }
  ];

  const handleChange = useCallback(
    (event, value) => {
      dispatchGetAllProducts({ params: { page: value } });
      // setPage(value);
    },
    [dispatchGetAllProducts]
  );

  return (
    <MainCard>
      <ControlBar>
        <Button
          type="primary"
          icon={<AiOutlineUserAdd />}
          onClick={() => {
            setOpenAddProductModal(true);
          }}
        >
          {t('pages.products.addProduct')}
        </Button>
        <Button type="primary" disabled="true" icon={<TbTableExport />}>
          {t('pages.users.exportUserData')}
        </Button>
      </ControlBar>
      <DataTableWrapper>
        {/* <DataTable columns={columns} rows={products} checkboxSelection={false} /> */}
        <AntdTable columns={columns} dataSource={products} checkboxSelection={false} />
      </DataTableWrapper>
      <PaginationWrapper>
        <Pagination count={productsState.pagination.lastPage} page={productsState.pagination.currentPage} onChange={handleChange} color="primary" />
      </PaginationWrapper>
      <AddProductModal open={openAddProductModal} setOpen={setOpenAddProductModal} />
      <UpdateProductModal id={openEditProductModal.id} open={openEditProductModal.status} setOpen={handleChangeEditProductModal} />
      {/* <GalleryItem id={1} open={openGalleryItemsModal.status} setOpen={handleChangeGalleryItemsModal} /> */}
    </MainCard>
  );
};

export default memo(ProductsPage);

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
