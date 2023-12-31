import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import React, { memo } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { FiTrash } from 'react-icons/fi';
// const { Option } = Select;

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};
const AtomUploadImage = (props) => {
  const {
    // style = {}, // custom style cho wrapper
    labelStyle = {}, // custom style cho label
    // inputStyle = {}, // custom style cho input
    messageStyle = {}, // custom style cho message
    visileLabel = true, // Có hiện label hay không?
    visibleMessage = true, // Có hiện message hay không?
    label = '', // labelText
    message = '', // messageText
    type = '', // '' | 'warning' | 'error'
    // onFocus, // onFocus
    // onBlur, // onBlur
    loading,
    imageUrl,
    setImagePath,
    onChange, // hàm bắt sự kiện onChange
    hiddenMode = 'hidden' // hidden || none Có 2 cách ẩn input: ẩn hoàn toàn với display = none, chỉ ẩn phần tử nhưng vẫn giữ nguyên vị trí với visibility = hidden
    // ...restProps // Tất cả những props được truyền vào khác với các props bên trên sẽ được truyền cho thẻ Input của antd
    // Có thể sử dụng các thuộc tính của thẻ Input antd như bình thường.
  } = props;

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8
        }}
      >
        Upload
      </div>
    </div>
  );

  const id = React.useMemo(() => {
    return uuidv4();
  }, []);

  const handleDeleteImage = () => {
    setImagePath('');
  };

  return (
    <div>
      <Label htmlFor={id} style={labelStyle} className={`${visileLabel ? 'visible' : hiddenMode} `}>
        {label}
      </Label>
      <Upload
        multiple
        style={{ overflow: 'hidden' }}
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        maxCount={1}
        beforeUpload={beforeUpload}
        customRequest={onChange}
        // onChange={onChange}
        disabled={imageUrl ? true : false}
      >
        {imageUrl ? (
          <GroupIcon>
            <img
              src={`https://tenmienmienphi.online/storage/${imageUrl}`}
              alt="avatar"
              style={{ width: '100%', height: '90px', cursor: 'pointer' }}
            />
            <StyledTrashIcon onClick={handleDeleteImage} />
          </GroupIcon>
        ) : (
          uploadButton
        )}
      </Upload>
      <Message style={messageStyle} className={`${visibleMessage && type ? type : hiddenMode}`}>
        {message}
      </Message>
    </div>
  );
};

export default memo(AtomUploadImage);

// const InputWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   align-items: flex-start;
//   width: fit-content;
//   height: fit-content;
//   position: relative;

//   &.hidden {
//     visibility: hidden;
//   }

//   &.none {
//     display: none;
//   }
// `;

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

const StyledTrashIcon = styled(FiTrash)`
  position: absolute;
  cursor: pointer;
  font-size: 30px;
  z-index: 100;
  color: #ffff;

  &:hover {
    color: black;

    Img {
      transition: 0.3s;
      opacity: 0;
    }
  }
`;

const GroupIcon = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
