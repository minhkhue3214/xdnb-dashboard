import { Input } from 'antd';
import React, { memo } from 'react';
import styled from 'styled-components';

const { Search } = Input;

const AtomInputSearch = (props) => {
  const {
    style = {}, // custom style cho wrapper
    inputStyle = {}, // custom style cho input
    // messageStyle = {}, // custom style cho message
    // visileLabel = true, // Có hiện label hay không?
    // visibleMessage = true, // Có hiện message hay không?
    // label = '', // labelText
    // message = '', // messageText
    type = '', // '' | 'warning' | 'error'
    // onFocus, // onFocus
    // onBlur, // onBlur
    onChange, // hàm bắt sự kiện onChange
    // hiddenMode = 'hidden', // hidden || none Có 2 cách ẩn input: ẩn hoàn toàn với display = none, chỉ ẩn phần tử nhưng vẫn giữ nguyên vị trí với visibility = hidden
    ...restProps // Tất cả những props được truyền vào khác với các props bên trên sẽ được truyền cho thẻ Input của antd
    // Có thể sử dụng các thuộc tính của thẻ Input antd như bình thường.
  } = props;


  // const id = React.useMemo(() => {
  //   return uuidv4();
  // }, []);

  return (
    <InputWrapper style={style}>
      <Search status={type} style={inputStyle} size="large" onChange={onChange}{...restProps} />
    </InputWrapper>
  );
};

export default memo(AtomInputSearch);

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

// const Label = styled.label`
//   position: relative;
//   font-weight: 600;

//   &.focused {
//     color: #4096ff;
//   }
// `;

// const Message = styled.span`
//   position: relative;
//   height: 12px;
//   font-size: 12px;

//   &.error {
//     color: #ff4d4f;
//   }

//   &.warning {
//     color: #faad14;
//   }
// `;
