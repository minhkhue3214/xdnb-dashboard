import React, { memo } from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Switch } from 'antd';
import styled from 'styled-components';

const AtomSwitch = (props) => {
  const {
    style = {}, // custom style cho wrapper
    labelStyle = {}, // custom style cho label
    visileLabel = true, // Có hiện label hay không?
    label = '', // labelText
    value = true,
    switchStyle = {},
    hiddenMode = 'hidden', // hidden || none Có 2 cách ẩn input: ẩn hoàn toàn với display = none, chỉ ẩn phần tử nhưng vẫn giữ nguyên vị trí với visibility = hidden
    ...restProps // Tất cả những props được truyền vào khác với các props bên trên sẽ được truyền cho thẻ Input của antd
    // Có thể sử dụng các thuộc tính của thẻ Input antd như bình thường.
  } = props;

  return (
    <InputWrapper style={style}>
      <Label style={labelStyle} className={`${visileLabel ? 'visible' : hiddenMode}`}>
        {label}
      </Label>
      <Switch
        style={switchStyle}
        checkedChildren={<CheckOutlined />}
        unCheckedChildren={<CloseOutlined />}
        checked={value}
        {...restProps}
      />
    </InputWrapper>
  );
};

export default memo(AtomSwitch);

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: fit-content;
  height: fit-content;
  position: relative;

  &.hidden {
    visibility: hidden;
  }

  &.none {
    display: none;
  }
`;

const Label = styled.label`
  position: relative;
  font-weight: 600;

  &.focused {
    color: #4096ff;
  }
`;
