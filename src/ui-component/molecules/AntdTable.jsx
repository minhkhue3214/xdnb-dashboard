import React, { useRef, useEffect, useState } from 'react';

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
    y: '450px'
  },
  scrollToFirstRowOnChange: true,
  pagination: {
    position: ['none', 'none']
  },
  dataSource: []
};

const AntdTable = ({ style, ...restProps }) => {
  const [scroll, setScroll] = useState({
    y: '450px'
  });
  const tableRef = useRef();

  useEffect(() => {
    if (!tableRef.current) return;
    const observerCallback = () => {
      window.requestAnimationFrame(() => {
        const tableHeight = tableRef.current.clientHeight;

        setScroll({
          y: tableHeight - 50
        });
      });
    };

    const resizeObserver = new ResizeObserver(observerCallback);
    resizeObserver.observe(tableRef.current);
    return () => resizeObserver.disconnect(); // clean up
  }, []);

  return (
    <DataTableWrapper style={style} ref={tableRef}>
      <CustomTable {...defaultConfigs} {...restProps} scroll={scroll} size={'small'} />
    </DataTableWrapper>
  );
};

export default AntdTable;

const DataTableWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
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
