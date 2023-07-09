import React, { memo, useCallback, useState, useMemo } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { AiOutlinePlus } from 'react-icons/ai';
import toDataURL from '~/handlers/toDataURL';

const AtomInput = (props) => {
  const {
    style = {}, // custom style cho wrapper
    labelStyle = {}, // custom style cho label
    uploadStyle = {},
    messageStyle = {}, // custom style cho message
    visileLabel = true, // Có hiện label hay không?
    visibleMessage = true, // Có hiện message hay không?
    label = '', // labelText
    message = '', // messageText
    type = '', // '' | 'warning' | 'error'
    onFocus, // onFocus
    onBlur, // onBlur
    onChange, // hàm bắt sự kiện onChange
    value,
    hiddenMode = 'hidden', // hidden || none Có 2 cách ẩn input: ẩn hoàn toàn với display = none, chỉ ẩn phần tử nhưng vẫn giữ nguyên vị trí với visibility = hidden
    ...restProps // Tất cả những props được truyền vào khác với các props bên trên sẽ được truyền cho thẻ Input của antd
    // Có thể sử dụng các thuộc tính của thẻ Input antd như bình thường.
  } = props;

  const [isFocused, setIsFocused] = useState(false);

  const id = useMemo(() => {
    return uuidv4();
  }, []);

  const handleFocus = useCallback(
    (...args) => {
      setIsFocused(true);
      onFocus && onFocus(...args);
    },
    [onFocus]
  );

  const handleBlur = useCallback(
    (...args) => {
      setIsFocused(false);
      onBlur && onBlur(...args);
    },
    [onBlur]
  );

  const handleChangeImage = useCallback(
    async (e) => {
      const file = e?.target?.files[0];
      console.log('file', file);
      if (file && onChange) {
        const dataBase64 = await toDataURL(URL.createObjectURL(file));
        onChange(dataBase64);
      }
    },
    [onChange]
  );

  return (
    <InputWrapper style={style}>
      <Label style={labelStyle} className={`${visileLabel ? 'visible' : hiddenMode} ${isFocused ? 'focused' : ''}`}>
        {label}
      </Label>
      <InputSubWrapper>
        <UploadWrapper htmlFor={id} style={uploadStyle} className={value ? 'preview' : 'input'}>
          <input
            id={id}
            type="file"
            accept="image/*"
            style={{
              display: 'none'
            }}
            onChange={handleChangeImage}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...restProps}
          />
          {!value && (
            <OverlayUpload>
              <AiOutlinePlus />
              <span>Upload</span>
            </OverlayUpload>
          )}
          {value && (
            <OverlayPreview>
              <AiOutlinePlus />
              <span>Upload</span>
              <Img src={value} alt="file" />
            </OverlayPreview>
          )}
        </UploadWrapper>
      </InputSubWrapper>
      <Message style={messageStyle} className={`${visibleMessage && type ? type : hiddenMode}`}>
        {message}
      </Message>
    </InputWrapper>
  );
};

export default memo(AtomInput);

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

const InputSubWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: fit-content;
  height: fit-content;
  position: relative;
`;

const Label = styled.label`
  position: relative;
  font-weight: 600;

  &.focused {
    color: #4096ff;
  }
`;

const Message = styled.span`
  position: relative;
  height: 12px;
  font-size: 12px;

  &.error {
    color: #ff4d4f;
  }

  &.warning {
    color: #faad14;
  }
`;

const UploadWrapper = styled.label`
  width: 100px;
  height: 100px;
  padding: 5px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid gray;
  cursor: pointer;

  &:hover {
    border: 1px solid #1677ff;

    Img {
      transition: 0.3s;
      opacity: 0;
    }
  }

  &.preview {
  }

  &.input {
    border-style: dashed;
  }
`;

const OverlayUpload = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const OverlayPreview = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Img = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  overflow: hidden;
  border-radius: 2px;
`;
