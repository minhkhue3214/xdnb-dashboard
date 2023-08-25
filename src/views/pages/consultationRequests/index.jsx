import { memo, useCallback, useEffect, useMemo, useState } from 'react';
// project imports
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import { Badge, Button, Popconfirm } from 'antd';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useTranslation } from 'react-i18next';
import { MdDelete } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai';
import { TbTableExport } from 'react-icons/tb';
import styled from 'styled-components';
import { useConsultationRequestsStore } from '~/hooks/consultationRequests';
import MainCard from '~/ui-component/cards/MainCard';
import { AntdTable } from '~/ui-component/molecules';
import UpdateConsultationRequestModal from './UpdateConsultationRequestModal';
import { InputSearch } from '~/ui-component/atoms';

dayjs.extend(utc);
dayjs.extend(timezone);

const PageConsultationRequest = () => {
  const { t } = useTranslation();
  const { consultationRequestsState, dispatchGetConsultationRequests, dispatchDeleteConsultationRequest } = useConsultationRequestsStore();

  const [openEditConsultationRequestModal, setOpenEditConsultationRequestModal] = useState({
    status: false,
    id: ''
  });

  useEffect(() => {
    dispatchGetConsultationRequests();
  }, [dispatchGetConsultationRequests]);

  const consultationRequests = useMemo(() => {
    return consultationRequestsState.consultationRequests;
  }, [consultationRequestsState.consultationRequests]);

  const handleChangeEditConsultationRequestModal = useCallback((props) => {
    if (typeof props === 'boolean') {
      setOpenEditConsultationRequestModal({
        status: props,
        id: ''
      });
    } else if (typeof props !== 'object') {
      return undefined;
    }

    const { status, id } = props;

    if (!id) {
      setOpenEditConsultationRequestModal({
        status: false,
        id: ''
      });
    } else {
      setOpenEditConsultationRequestModal({
        status,
        id
      });
    }
  }, []);

  const handleEdit = useCallback(
    (params) => {
      handleChangeEditConsultationRequestModal({
        status: true,
        id: params?.id
      });
    },
    [handleChangeEditConsultationRequestModal]
  );

  const handleDelete = useCallback(
    (params) => {
      dispatchDeleteConsultationRequest({
        id: params?.id || ''
      });
    },
    [dispatchDeleteConsultationRequest]
  );

  // Ngoài những thuộc tính trong này, có thể xem thêm thuộc tính của columns table trong ~/ui-component/molecules/DataTable nha. Có giải thích rõ ràng ở đó
  const columns = [
    { dataIndex: 'name', title: t('table.consultationRequest.name'), width: '13%' },
    { dataIndex: 'phone', title: t('table.consultationRequest.phone'), width: '14%' },
    { dataIndex: 'email', title: t('table.consultationRequest.email'), width: '15%' },
    { dataIndex: 'note', title: t('table.consultationRequest.note'), width: '20%' },
    {
      dataIndex: 'status',
      title: t('table.consultationRequest.status'),
      width: '12%',
      render: (_, record) => (
        <Badge
          status={record.status ? 'success' : 'default'}
          text={record.status ? t('table.consultationRequest.statusSuccess') : t('table.consultationRequest.statusNone')}
        />
      )
    },
    {
      dataIndex: 'result',
      title: t('table.consultationRequest.result'),
      width: '20%'
    },
    {
      dataIndex: 'actions',
      title: t('table.consultationRequest.actions'),
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
      dispatchGetConsultationRequests({ params: { page: value } });
    },
    [dispatchGetConsultationRequests]
  );

  const onSearch = (value) => {
    dispatchGetConsultationRequests({ params: { search: value } });
  };

  return (
    <MainCard>
      <ControlBar>
      <InputSearch
          onSearch={onSearch}
          placeholder={t('table.consultationRequest.searching')}
          style={{
            width: '40%'
            // marginTop: '8px',
            // height: '70px'
          }}
        />
        <Button disabled={true} type="primary" icon={<TbTableExport />}>
          {t('pages.consultationRequests.exportConsultationRequestData')}
        </Button>
      </ControlBar>
      <DataTableWrapper>
        <AntdTable columns={columns} dataSource={consultationRequests} checkboxSelection={false} />
      </DataTableWrapper>
      <PaginationWrapper>
        <Pagination
          count={consultationRequestsState.pagination.lastPage}
          page={consultationRequestsState.pagination.currentPage}
          onChange={handleChangePage}
          color="primary"
        />
      </PaginationWrapper>
      <UpdateConsultationRequestModal
        id={openEditConsultationRequestModal.id}
        open={openEditConsultationRequestModal.status}
        setOpen={handleChangeEditConsultationRequestModal}
      />
    </MainCard>
  );
};

export default memo(PageConsultationRequest);

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
