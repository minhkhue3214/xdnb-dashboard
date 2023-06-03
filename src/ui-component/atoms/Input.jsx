import React from 'react';
import { Input } from 'antd';
import styled from 'styled-components';

const InputAtom = (props) => {
  const { status = '' } = props;

  return (
    <InputWrapper>
      <Label>tên input</Label>
      <Input placeholder="Đây là placeholder" status={status} />
    </InputWrapper>
  );
};

export default InputAtom;

const InputWrapper = styled.div``;

const Label = styled.label``;

// const Message = styled.div``;
