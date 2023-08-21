import React, { useRef } from 'react';

import { Table } from 'antd';
import styled from 'styled-components';

const defaultConfigs = {
  bordered: true,
  loading: false,
  size: 'medium',
  title: false,
  showHeader: true,
  footer: false,
  rowSelection: null,
  tableLayout: 'fixed',
  top: 'none',
  bottom: 'none',
  ellipsis: false,
  width: '100%',
  height: '100%',
  scroll: {
    y: '378px'
  },
  scrollToFirstRowOnChange: true,
  pagination: {
    position: ['none', 'none']
  },
  dataSource: []
};

const AntdTable = ({ style, ...restProps }) => {
  console.log('restProps', restProps);
  const tableRef = useRef();

  return (
    <DataTableWrapper style={style}>
      <CustomTable ref={tableRef} {...defaultConfigs} {...restProps} />
    </DataTableWrapper>
  );
};

export default AntdTable;

const DataTableWrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  height: 100%;
  width: 100%;
`;

const CustomTable = styled(Table)`
  width: 100%;
  height: 100%;
  max-height: 100%;
  min-height: 100%;
  /* overflow: hidden; */

  .ant-table-body {
    overflow-y: overlay !important;
  }
`;
