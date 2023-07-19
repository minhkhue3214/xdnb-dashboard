import { memo, useCallback, useEffect, useMemo, useState } from 'react';
// project imports
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import { Button, Popconfirm, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import { AiFillEdit, AiOutlineUserAdd } from 'react-icons/ai';
import { GrGallery } from 'react-icons/gr';
import { MdDelete } from 'react-icons/md';
import { TbTableExport } from 'react-icons/tb';
import styled from 'styled-components';
import { useCategoriesStore } from '~/hooks/categories';
import { useProductsStore } from '~/hooks/products';
import MainCard from '~/ui-component/cards/MainCard';
import { AntdTable } from '~/ui-component/molecules';
import AddProductModal from './AddProductModal';
import GalleryItem from './GalleryItem';
import UpdateProductModal from './UpdateProductModal';

const ProductsPage = () => {
  const { t } = useTranslation();
  const { productsState, dispatchGetAllProducts, dispatchDeleteProduct } = useProductsStore();
  const [page, setPage] = useState(1);
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

  const [openGalleryItemsModal, setOpenGalleryItemsModal] = useState({
    status: false,
    id: ''
  });

  useEffect(() => {
    dispatchGetAllProducts();
  }, [dispatchGetAllProducts]);

  useEffect(() => {
    setPage(productsState.pagination.currentPage);
  }, [productsState.pagination.currentPage]);

  const products = useMemo(() => {
    return productsState.products;
  }, [productsState.products]);

  const handleChangeGalleryItemsModal = useCallback((props) => {
    if (typeof props === 'boolean') {
      setOpenGalleryItemsModal({
        status: props,
        id: ''
      });
    } else if (typeof props !== 'object') {
      return undefined;
    }

    const { status, id } = props;

    if (!id) {
      setOpenGalleryItemsModal({
        status: false,
        id: ''
      });
    } else {
      setOpenGalleryItemsModal({
        status,
        id
      });
    }
  }, []);

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

  const handleGalleryItems = (params) => {
    handleChangeGalleryItemsModal({
      status: true,
      id: params?.id
    });
  };

  const handleDelete = (params) => {
    dispatchDeleteProduct({
      id: params?.id || ''
    });
    setPage(1);
  };

  // Ngoài những thuộc tính trong này, có thể xem thêm thuộc tính của columns table trong ~/ui-component/molecules/DataTable nha. Có giải thích rõ ràng ở đó
  // const columns = [
  //   { field: 'name', headerName: t('table.products.name'), flex: 1, align: 'center', headerAlign: 'center' },
  //   { field: 'original_price', headerName: t('table.products.original_price'), flex: 1, align: 'center', headerAlign: 'center' },
  //   { field: 'discounted_price', headerName: t('table.products.discounted_price'), flex: 1, align: 'center', headerAlign: 'center' },
  //   { field: 'priority', headerName: t('table.products.priority'), flex: 1, align: 'center', headerAlign: 'center' },
  //   { field: 'quantity', headerName: t('table.products.quantity'), flex: 1, align: 'center', headerAlign: 'center' },
  //   { field: 'hot', headerName: 'hot', flex: 1, align: 'center', headerAlign: 'center' },
  //   {
  //     field: 'gallery_items',
  //     headerName: t('table.products.gallery_items'),
  //     renderCell: (params) => (
  //       <IconButton aria-label="edit" color="primary" onClick={() => handleGalleryItems(params)}>
  //         <GrGallery size={22} />
  //       </IconButton>
  //     ),
  //     flex: 1,
  //     align: 'center',
  //     headerAlign: 'center'
  //   },
  //   {
  //     field: 'actions',
  //     headerName: t('table.user.actions'),
  //     renderCell: (params) => (
  //       <>
  //         <IconButton aria-label="edit" color="primary" onClick={() => handleEdit(params)}>
  //           <AiFillEdit size={22} />
  //         </IconButton>
  //         <Popconfirm title="Bạn có chắc chắn muốn xoá?" onConfirm={() => handleDelete(params)} okText="Đồng ý" cancelText="Hủy">
  //           <IconButton aria-label="delete">
  //             <MdDelete color="tomato" size={22} />
  //           </IconButton>
  //         </Popconfirm>
  //       </>
  //     ),
  //     flex: 1.5,
  //     align: 'center',
  //     headerAlign: 'center'
  //   }
  // ];

  const columns = [
    { dataIndex: 'name', title: t('table.products.name'), width: '8%' },
    { dataIndex: 'original_price', title: t('table.products.original_price'), width: '10%' },
    { dataIndex: 'discounted_price', title: t('table.products.discounted_price'), width: '10%' },
    { dataIndex: 'priority', title: t('table.products.priority'), width: '10%' },
    { dataIndex: 'quantity', title: t('table.products.quantity'), width: '10%' },
    {
      dataIndex: 'hot',
      title: 'hot',
      render: (_, record) => (
        // console.log("record",record)
        <>{record.hot ? <Tag color="red">True</Tag> : <Tag color="blue">False</Tag>}</>
      ),
      width: '10%'
    },
    {
      dataIndex: 'gallery_items',
      title: t('table.products.gallery_items'),
      render: (_, record) => (
        // console.log("record",record)
        <>
          <IconButton aria-label="edit" color="primary" onClick={() => handleGalleryItems(record)}>
            <GrGallery size={22} />
          </IconButton>
        </>
      ),
      width: '10%'
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
      width: '10%'
    }
  ];

  const handleChange = useCallback(
    (event, value) => {
      dispatchGetAllProducts({ params: { page: value } });
      setPage(value);
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
          {t('pages.users.addUser')}
        </Button>
        <Button type="primary" icon={<TbTableExport />}>
          {t('pages.users.exportUserData')}
        </Button>
      </ControlBar>
      <DataTableWrapper>
        {/* <DataTable columns={columns} rows={products} checkboxSelection={false} /> */}
        <AntdTable columns={columns} dataSource={products} checkboxSelection={false} />
      </DataTableWrapper>
      <PaginationWrapper>
        <Pagination count={productsState.pagination.totalPages} page={page} onChange={handleChange} color="primary" />
      </PaginationWrapper>
      <AddProductModal open={openAddProductModal} setOpen={setOpenAddProductModal} />
      <UpdateProductModal
        id={openEditProductModal.id}
        open={openEditProductModal.status}
        setOpen={handleChangeEditProductModal}
      />
      <GalleryItem id={1} open={openGalleryItemsModal.status} setOpen={handleChangeGalleryItemsModal} />
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
