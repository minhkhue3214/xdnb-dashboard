import React, { useCallback } from 'react';
import { Card, Space, Switch } from 'antd';
import { IpAddressInput, MacAddressInput } from '~/ui-component/atoms';
import styled from 'styled-components';

const Setting = ({ formik }) => {
  const handleChangeWifi = useCallback(
    (status) => {
      formik.setFieldValue('wifi', status);
    },
    [formik]
  );

  const handleChangeMac = useCallback(
    (status) => {
      formik.setFieldValue('mac', status);
    },
    [formik]
  );

  const handleChangeIpAddress = useCallback(
    (value) => {
      formik.setFieldValue('ipAddress', value);
    },
    [formik]
  );

  const handleChangeMacAddress = useCallback(
    (value) => {
      formik.setFieldValue('macAddress', value);
    },
    [formik]
  );

  return (
    <CustomSpace direction="vertical" style={{ display: 'flex', width: '100%', height: '100%', overflow: 'hidden', flexDirection: 'row' }}>
      <CustomCard title="Kiểm tra IP Wifi" size="small">
        <Switch name="wifi" checked={formik.values.wifi} checkedChildren="Bật" unCheckedChildren="Tắt" onChange={handleChangeWifi} />
        <IpAddressInput
          id="ipAddress"
          name="ipAddress"
          value={formik.values.ipAddress}
          onChange={handleChangeIpAddress}
          style={{ margin: '8px 0' }}
          disabled={!formik.values.wifi}
        />
      </CustomCard>
      <CustomCard title="Kiểm tra MAC Wifi" size="small">
        <Switch name="mac" checked={formik.values.mac} checkedChildren="Bật" unCheckedChildren="Tắt" onChange={handleChangeMac} />
        <MacAddressInput
          id="macAddress"
          name="macAddress"
          value={formik.values.macAddress}
          onChange={handleChangeMacAddress}
          style={{ marginTop: '8px' }}
          disabled={!formik.values.mac}
        />
      </CustomCard>
    </CustomSpace>
  );
};

export default Setting;

const CustomCard = styled(Card)`
  height: 100%;
`;

const CustomSpace = styled(Space)`
  & > * {
    height: 100%;
  }
`;
