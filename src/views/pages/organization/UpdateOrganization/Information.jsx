import React, { useEffect, useState, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { useOrganizationsStore } from '~/hooks/organizations';
import { EditInput, Selector } from '~/ui-component/atoms';

const Information = ({ id, users }) => {
  const { organizationsState, dispatchGetOrganization, dispatchUpdateOrganization } = useOrganizationsStore();
  const [fullname, setFullname] = useState('');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [leader, setLeader] = useState('');

  const handleChange = useCallback(
    (type, value) => {
      if (id) {
        switch (type) {
          case 'fullname':
            setFullname(value);
            break;
          case 'name':
            setName(value);
            break;
          case 'code':
            setCode(value);
            break;
          case 'leader':
            setLeader(value);
            break;
        }

        dispatchUpdateOrganization({
          id,
          [type]: value
        });
      }
    },
    [dispatchUpdateOrganization, id]
  );

  const leaderOptions = useMemo(() => {
    return (
      users.map((one) => ({
        label: one?.name || '',
        value: one?.id || ''
      })) || []
    );
  }, [users]);

  useEffect(() => {
    if (id) {
      dispatchGetOrganization(id);
    }
  }, [dispatchGetOrganization, id]);

  useEffect(() => {
    if (organizationsState?.detail) {
      const data = organizationsState.detail;
      setFullname(data.fullname || '');
      setName(data.name || '');
      setCode(data.code || '');
      setLeader(data.leader?.id || '');
    }
  }, [organizationsState?.detail]);

  return (
    <InformationWrapper>
      <EditInput
        value={fullname}
        onSave={(value) => handleChange('fullname', value)}
        style={{
          fontSize: '20px',
          fontWeight: '600',
          minWidth: '120px'
        }}
      />
      <Selector
        label="Tổ trưởng: "
        name="role"
        mode=""
        labelStyle={{
          width: '170px',
          minWidth: '120px',
          fontWeight: '600',
          whiteSpace: 'nowrap',
          height: '100%',
          padding: '4px 11px',
          display: 'flex',
          alignItems: 'flex-end'
        }}
        style={{
          width: '200px',
          display: 'flex',
          flexDirection: 'row'
        }}
        selectStyle={{
          width: '200px'
        }}
        options={leaderOptions}
        value={leader}
        onChange={(value) => handleChange('leader', value)}
      />
      <EditInput
        value={name}
        onSave={(value) => handleChange('name', value)}
        label="Tên rút gọn: "
        labelStyle={{
          width: '170px',
          fontWeight: '600',
          minWidth: '120px'
        }}
      />
      <EditInput
        value={code}
        onSave={(value) => handleChange('code', value)}
        label="Mã tổ chức: "
        labelStyle={{
          width: '170px',
          fontWeight: '600',
          minWidth: '120px'
        }}
      />
    </InformationWrapper>
  );
};

export default Information;

const InformationWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  & > * {
    margin-bottom: 8px;
  }
`;
