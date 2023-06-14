import React, { memo, useCallback } from 'react';
import { Card, Space, Switch } from 'antd';
import { IpAddressInput, MacAddressInput } from '~/ui-component/atoms';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const Setting = ({ formik }) => {
  const { t } = useTranslation();

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
      <CustomCard title={t('modal.place.checkWifi')} size="small">
        <Switch
          name="wifi"
          checked={formik.values.wifi}
          checkedChildren={t('global.enable')}
          unCheckedChildren={t('global.disable')}
          onChange={handleChangeWifi}
        />
        <IpAddressInput
          id="ipAddress"
          name="ipAddress"
          value={formik.values.ipAddress}
          onChange={handleChangeIpAddress}
          style={{ margin: '8px 0' }}
          disabled={!formik.values.wifi}
        />
      </CustomCard>
      <CustomCard title={t('modal.place.checkMACWifi')} size="small">
        <Switch
          name="mac"
          checked={formik.values.mac}
          checkedChildren={t('global.enable')}
          unCheckedChildren={t('global.disable')}
          onChange={handleChangeMac}
        />
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

export default memo(Setting);

const CustomCard = styled(Card)`
  height: 100%;
`;

const CustomSpace = styled(Space)`
  & > * {
    height: 100%;
  }
`;
