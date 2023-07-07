import { message, Upload } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
// const { Option } = Select;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

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

const UploadImage = (props) => {
  const {
    style = {}, // custom style cho wrapper
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
    // onChange, // hàm bắt sự kiện onChange
    hiddenMode = 'hidden' // hidden || none Có 2 cách ẩn input: ẩn hoàn toàn với display = none, chỉ ẩn phần tử nhưng vẫn giữ nguyên vị trí với visibility = hidden
    // ...restProps // Tất cả những props được truyền vào khác với các props bên trên sẽ được truyền cho thẻ Input của antd
    // Có thể sử dụng các thuộc tính của thẻ Input antd như bình thường.
  } = props;
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

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

  return (
    <InputWrapper style={style}>
      <Label htmlFor={id} style={labelStyle} className={`${visileLabel ? 'visible' : hiddenMode} ${isFocused ? 'focused' : ''}`}>
        {label}
      </Label>
      <Upload
        // style={inputStyle}
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
      <Message style={messageStyle} className={`${visibleMessage && type ? type : hiddenMode}`}>
        {message}
      </Message>
    </InputWrapper>
  );
};

export default UploadImage;

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
