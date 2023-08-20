import { memo } from 'react';
// material-ui
import { styled } from '@mui/material/styles';

const AuthWrapper1 = styled('div')(() => ({
  backgroundImage: 'url("../../../../public/bg.jpg")', // Thay đổi đường dẫn ở đây
  backgroundSize: 'cover', // Tùy chọn: cover, contain, hoặc các giá trị khác
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));

export default memo(AuthWrapper1);
