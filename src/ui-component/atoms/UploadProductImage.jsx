import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Input, Upload } from 'antd';
import axios from 'axios';
import React, { memo, useState } from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import { FiTrash } from 'react-icons/fi';
import styled from 'styled-components';
import { useAuthenticationStore } from '~/hooks/authentication';
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
  // const avatarDefault = 'https://ionicframework.com/docs/img/demos/avatar.svg';

  const { authenticationState } = useAuthenticationStore();

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
    const config = {
      headers: {
        Authorization: `Bearer ${authenticationState.token}`
      }
    };
    try {
      const res = await axios.post('https://tenmienmienphi.online/api/upload-image', fmData, config);

      onSuccess('Ok');
      console.log('server res: ', res);
      setLoading(false);
      // setImageUrl(res.data.data.image_url);
      handleProductSource(ProductInfo.id, res.data.data.image_path);
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

  const handleDeleteImage = () => {
    handleProductSource(ProductInfo.id, '');
  };

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
        disabled={ProductInfo.path ? true : false}
      >
        {ProductInfo.path ? (
          <GroupIcon>
            <img src={`https://tenmienmienphi.online/storage/${ProductInfo.path}`} alt="avatar" style={{ width: '100%' }} />
            <StyledTrashIcon onClick={handleDeleteImage} />
          </GroupIcon>
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
        <BsFillTrashFillIcon
          className="BsFillTrashFill"
          color="#ffffff"
          onClick={() => {
            handleDeleteModal(ProductInfo.id);
          }}
          size={24}
        />
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
  background-color: #4096ff;
  border-radius: 8px;
  margin-top: 20px;
  align-items: center;
`;

const InputWrapper = styled.div`
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  width: 200%;
  height: 130px;
  border-radius: 8px;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  margin-right: 10px;
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

const BsFillTrashFillIcon = styled(BsFillTrashFill)`
  &:hover {
    color: black;
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
