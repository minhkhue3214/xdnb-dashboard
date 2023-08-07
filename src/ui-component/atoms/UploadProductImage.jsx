import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Input, Upload } from 'antd';
import axios from 'axios';
import React, { memo, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';
import styled from 'styled-components';
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

const AtomUploadProductImage = ({
  ProductInfo,
  handleProductSource,
  handleProductPriority,
  handleProductName,
  handleProductAlt,
  handleDeleteModal
}) => {
  // useEffect(() => {
  //   console.log('ProductInfo', ProductInfo);
  // }, []);

  const [loading, setLoading] = useState(false);
  // const [imageUrl, setImageUrl] = useState();

  // const handleChange = (info) => {
  //   if (info.file.status === 'uploading') {
  //     setLoading(true);
  //     return;
  //   }
  //   // Get this url from response in real world.
  //   getBase64(info.file.originFileObj, (url) => {
  //     setLoading(false);
  //     // setImageUrl(url);
  //     handleProductSource(ProductInfo.id, url);
  //   });
  // };

  const handleChange = async (options) => {
    setLoading(true);
    const { onSuccess, onError, file } = options;

    const fmData = new FormData();
    fmData.append('image', file);
    try {
      const res = await axios.post('https://tenmienmienphi.online/api/upload-image', fmData);

      onSuccess('Ok');
      console.log('server res: ', res);
      setLoading(false);
      // setImageUrl(res.data.data.image_url);
      handleProductSource(ProductInfo.id, res.data.data.image_url);
    } catch (err) {
      console.log('Eroor: ', err);
      // const error = new Error('Some error');
      onError({ err });
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

  // const id = React.useMemo(() => {
  //   return uuidv4();
  // }, []);

  return (
    <ImageWrapper>
      <CustomUpload
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        style={{ marginLeft: '100px' }}
        beforeUpload={beforeUpload}
        // onChange={handleChange}
        customRequest={handleChange}
      >
        {ProductInfo.path ? (
          <img
            src={ProductInfo.path}
            alt="avatar"
            style={{
              width: '100%'
            }}
          />
        ) : (
          uploadButton
        )}
      </CustomUpload>
      <InputWrapper>
        <CustomInput
          onChange={(e) => {
            handleProductName(ProductInfo.id, e);
          }}
          value={ProductInfo.name}
          placeholder="Image name"
        />
        <CustomInput
          onChange={(e) => {
            handleProductAlt(ProductInfo.id, e);
          }}
          value={ProductInfo.alt}
          placeholder="Alt"
        />
        <CustomInput
          onChange={(e) => {
            handleProductPriority(ProductInfo.id, e);
          }}
          type="number"
          value={ProductInfo.priority}
          placeholder="Priority"
        />
      </InputWrapper>
      <ButtonWrapper>
        <BsFillTrashFill
          className="BsFillTrashFill"
          onClick={() => {
            handleDeleteModal(ProductInfo.id);
          }}
          size={24}
        />
        <AiFillEdit className="AiFillEdit" size={24} />
      </ButtonWrapper>
    </ImageWrapper>
  );
};

export default memo(AtomUploadProductImage);

const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 150px;
  background-color: #4096ff9f;
  border-radius: 8px;
  margin-top: 20px;
  align-items: center;
`;

const InputWrapper = styled.div`
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  width: 200%;
  height: 130px;
  border-radius: 8px;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 130px;
  border-radius: 8px;
  align-items: center;
  gap: 10px;
  padding: 10px;
  justify-content: space-around;

  .BsFillTrashFill {
    cursor: pointer;
  }

  .AiFillEdit {
    cursor: pointer;
  }
`;
const CustomUpload = styled(Upload)`
  margin-left: 20px;
`;

const CustomInput = styled(Input)`
  margin-top: 10px;
`;
