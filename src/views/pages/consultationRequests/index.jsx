import { memo, useCallback, useEffect, useMemo } from 'react';
// project imports
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import { Badge, Button, Popconfirm } from 'antd';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useTranslation } from 'react-i18next';
import { MdDelete } from 'react-icons/md';
import { TbTableExport } from 'react-icons/tb';
import styled from 'styled-components';
import { useConsultationRequestsStore } from '~/hooks/consultationRequests';
import MainCard from '~/ui-component/cards/MainCard';
import { AntdTable } from '~/ui-component/molecules';

dayjs.extend(utc);
dayjs.extend(timezone);

const PageConsultationRequest = () => {
  const { t } = useTranslation();
  const { consultationRequestsState, dispatchGetConsultationRequests, dispatchDeleteConsultationRequest } = useConsultationRequestsStore();

  useEffect(() => {
    dispatchGetConsultationRequests();
  }, [dispatchGetConsultationRequests]);

  const consultationRequests = useMemo(() => {
    return consultationRequestsState.consultationRequests;
  }, [consultationRequestsState.consultationRequests]);

  const handleDelete = (params) => {
    dispatchDeleteConsultationRequest({
      id: params?.id || ''
    });
  };

  // Ngoài những thuộc tính trong này, có thể xem thêm thuộc tính của columns table trong ~/ui-component/molecules/DataTable nha. Có giải thích rõ ràng ở đó
  const columns = [
    { dataIndex: 'name', title: t('table.consultationRequest.name'), width: '15%' },
    { dataIndex: 'phone', title: t('table.consultationRequest.phone'), width: '15%' },
    { dataIndex: 'email', title: t('table.consultationRequest.email'), width: '20%' },
    { dataIndex: 'note', title: t('table.consultationRequest.note'), width: '25%' },
    {
      dataIndex: 'status',
      title: t('table.consultationRequest.status'),
      width: '15%',
      render: (_, record) => (
        <Badge
          status={record.status ? 'success' : 'default'}
          text={record.status ? t('table.consultationRequest.statusSuccess') : t('table.consultationRequest.statusNone')}
        />
      )
    },
    {
      dataIndex: 'actions',
      title: t('table.consultationRequest.actions'),
      render: (_, record) => (
        <Popconfirm title="Bạn có chắc chắn muốn xoá?" onConfirm={() => handleDelete(record)} okText="Đồng ý" cancelText="Hủy">
          <IconButton aria-label="delete">
            <MdDelete color="tomato" size={22} />
          </IconButton>
        </Popconfirm>
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

  return (
    <MainCard>
      <ControlBar>
        <Button type="primary" icon={<TbTableExport />}>
          {t('pages.consultationRequests.exportConsultationRequestData')}
        </Button>
      </ControlBar>
      <DataTableWrapper>
        <AntdTable columns={columns} dataSource={consultationRequests} checkboxSelection={false} />
      </DataTableWrapper>
      <PaginationWrapper>
        <Pagination
          count={consultationRequestsState.pagination.totalPages}
          page={consultationRequestsState.pagination.currentPage}
          onChange={handleChangePage}
          color="primary"
        />
      </PaginationWrapper>
    </MainCard>
  );
};

export default memo(PageConsultationRequest);

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
