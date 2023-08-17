import { memo } from 'react';
// material-ui
import { styled } from '@mui/material/styles';

const AuthWrapper1 = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export default memo(AuthWrapper1);
