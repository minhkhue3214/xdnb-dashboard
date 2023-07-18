import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import React, { memo } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

const AtomUploadMultiple = (props) => {
  const {
    style = {}, // custom style cho wrapper
    labelStyle = {}, // custom style cho label
    messageStyle = {}, // custom style cho message
    visileLabel = true, // Có hiện label hay không?
    visibleMessage = true, // Có hiện message hay không?
    label = '', // labelText
    message = '', // messageText
    type = '', // '' | 'warning' | 'error'
    hiddenMode = 'hidden', // hidden || none Có 2 cách ẩn input: ẩn hoàn toàn với display = none, chỉ ẩn phần tử nhưng vẫn giữ nguyên vị trí với visibility = hidden
    // Có thể sử dụng các thuộc tính của thẻ Input antd như bình thường.
    onChange,
    previewOpen,
    previewImage,
    previewTitle,
    fileList,
    handleCancelPreview,
    handlePreview
  } = props;

  const id = React.useMemo(() => {
    return uuidv4();
  }, []);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <InputWrapper style={style}>
      <Label htmlFor={id} style={labelStyle} className={`${visileLabel ? 'visible' : hiddenMode}`}>
        {label}
      </Label>
      <Upload
        action={'http://localhost:3000/upload'}
        // disabled={true}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={onChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal id={id} open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancelPreview}>
        <img
          alt="example"
          style={{
            width: '100%'
          }}
          src={previewImage}
        />
      </Modal>
      <Message style={messageStyle} className={`${visibleMessage && type ? type : hiddenMode}`}>
        {message}
      </Message>
    </InputWrapper>
  );
};

export default memo(AtomUploadMultiple);

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
