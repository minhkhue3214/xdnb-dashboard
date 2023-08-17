// import { memo, useCallback, useState } from 'react';

// import {
//   Box,
//   Link,
//   Checkbox,
//   FormControl,
//   FormControlLabel,
//   FormHelperText,
//   IconButton,
//   InputAdornment,
//   InputLabel,
//   OutlinedInput,
//   Stack,
//   Button
//   // Typography
// } from '@mui/material';

// import { useTheme } from '@mui/material/styles';

// // third party
// import { Formik } from 'formik';
// import * as Yup from 'yup';

// // project imports
// import { useAuthenticationStore } from '~/hooks/authentication';
// import AnimateButton from '~/ui-component/extended/AnimateButton';

// // assets
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';

// const FirebaseLogin = ({ ...others }) => {
//   const theme = useTheme();
//   const { dispatchLogin, authenticationState, dispatchChangeRememberMe } = useAuthenticationStore();
//   const [showPassword, setShowPassword] = useState(false);

//   const handleClickShowPassword = useCallback(() => {
//     setShowPassword((value) => !value);
//   }, []);

//   const handleMouseDownPassword = useCallback((event) => {
//     event.preventDefault();
//   }, []);

//   return (
//     <>
//       <Formik
//         initialValues={{
//           username: '',
//           password: '',
//           submit: null
//         }}
//         validationSchema={Yup.object().shape({
//           username: Yup.string().matches(/\S/, 'Tên người dùng không hợp lệ').max(255).required('Vui lòng nhập tên người dùng'),
//           password: Yup.string().max(255).required('Vui lòng nhập mật khẩu')
//         })}
//         onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
//           try {
//             const result = dispatchLogin({
//               username: values.username,
//               password: values.password
//             });

//             if (result) {
//               console.log('authenticationState', authenticationState);
//               setStatus({ success: true });
//               setSubmitting(false);
//             }
//           } catch (err) {
//             console.error(err);
//             setStatus({ success: false });
//             setErrors({ submit: err.message });
//             setSubmitting(false);
//           }
//         }}
//       >
//         {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
//           <form noValidate onSubmit={handleSubmit} {...others}>
//             <FormControl fullWidth error={Boolean(touched.username && errors.username)} sx={{ ...theme.typography.customInput }}>
//               <InputLabel htmlFor="outlined-adornment-username-login">Username</InputLabel>
//               <OutlinedInput
//                 size="small"
//                 id="outlined-adornment-username-login"
//                 type="text"
//                 value={values.username}
//                 name="username"
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 label="Username"
//                 inputProps={{}}
//               />
//               <FormHelperText
//                 error
//                 id="standard-weight-helper-text-username-login"
//                 style={{ visibility: touched.username && errors.username ? 'visible' : 'hidden', display: 'block' }}
//               >
//                 {errors.username}
//               </FormHelperText>
//             </FormControl>

//             <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
//               <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
//               <OutlinedInput
//                 size="small"
//                 id="outlined-adornment-password-login"
//                 type={showPassword ? 'text' : 'password'}
//                 value={values.password}
//                 name="password"
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 endAdornment={
//                   <InputAdornment position="end">
//                     <IconButton
//                       aria-label="toggle password visibility"
//                       onClick={handleClickShowPassword}
//                       onMouseDown={handleMouseDownPassword}
//                       edge="end"
//                       size="large"
//                     >
//                       {showPassword ? <Visibility /> : <VisibilityOff />}
//                     </IconButton>
//                   </InputAdornment>
//                 }
//                 label="Password"
//                 inputProps={{}}
//               />
//               <FormHelperText
//                 error
//                 id="standard-weight-helper-text-password-login"
//                 style={{ visibility: touched.password && errors.password ? 'visible' : 'hidden', display: 'block' }}
//               >
//                 {errors.password}
//               </FormHelperText>
//             </FormControl>
//             <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     checked={authenticationState.rememberMe}
//                     onChange={(event) => dispatchChangeRememberMe(event.target.checked)}
//                     name="checked"
//                     color="primary"
//                   />
//                 }
//                 label="Ghi nhớ mật khẩu"
//               />
//               <FormControlLabel control={<Link href="/recoverypassword1">Quên mật khẩu</Link>} />
//             </Stack>
//             <Box sx={{ mt: 3, visibility: errors.submit ? 'visible' : 'hidden' }}>
//               <FormHelperText error>{errors.submit}</FormHelperText>
//             </Box>

//             <Box sx={{ mt: 2 }}>
//               <AnimateButton>
//                 <Button
//                   disableElevation
//                   disabled={isSubmitting}
//                   fullWidth
//                   size="large"
//                   type="submit"
//                   variant="contained"
//                   color="secondary"
//                   style={{ color: 'white' }}
//                 >
//                   Đăng nhập
//                 </Button>
//               </AnimateButton>
//             </Box>
//           </form>
//         )}
//       </Formik>
//     </>
//   );
// };

// export default memo(FirebaseLogin);


// import { memo } from 'react';
// import { Link } from 'react-router-dom';

// // material-ui
// import { Grid, Stack, Typography, useMediaQuery } from '@mui/material';
// import { useTheme } from '@mui/material/styles';

// // project imports
// import Logo from '~/ui-component/Logo';
// import AuthCardWrapper from '../AuthCardWrapper';
// import AuthWrapper1 from '../AuthWrapper1';
// import AuthLogin from '../auth-forms/AuthLogin';

// const Login = () => {
//   const theme = useTheme();
//   const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

//   return (
//     <AuthWrapper1>
//       <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
//         <Grid item xs={12}>
//           <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
//             <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
//               <AuthCardWrapper>
//                 <Grid container spacing={2} alignItems="center" justifyContent="center">
//                   <Grid item sx={{ mb: 3 }}>
//                     <Link to="#">
//                       <Logo />
//                     </Link>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
//                       <Grid item>
//                         <Stack alignItems="center" justifyContent="center" spacing={1}>
//                           <Typography color={theme.palette.secondary.main} gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
//                             Dashboard quản lý bảo vệ
//                           </Typography>
//                         </Stack>
//                       </Grid>
//                     </Grid>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <AuthLogin />
//                   </Grid>
//                 </Grid>
//               </AuthCardWrapper>
//             </Grid>
//           </Grid>
//         </Grid>
//         <Grid item xs={12} sx={{ m: 3, mt: 1 }}></Grid>
//       </Grid>
//     </AuthWrapper1>
//   );
// };

// export default memo(Login);

// import { memo } from 'react';
// import { Link } from 'react-router-dom';

// // material-ui
// import { Grid, Stack, Typography, useMediaQuery } from '@mui/material';
// import { useTheme } from '@mui/material/styles';

// // project imports
// import Logo from '~/ui-component/Logo';
// import AuthCardWrapper from '../AuthCardWrapper';
// import AuthWrapper1 from '../AuthWrapper1';
// import AuthRecoveryPassword1 from '../auth-forms/AuthRecoveryPassword1';

// const RecoveryPassword1 = () => {
//   const theme = useTheme();
//   const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

//   return (
//     <AuthWrapper1>
//       <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
//         <Grid item xs={12}>
//           <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
//             <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
//               <AuthCardWrapper>
//                 <Grid container spacing={2} alignItems="center" justifyContent="center">
//                   <Grid item sx={{ mb: 3 }}>
//                     <Link to="#">
//                       <Logo />
//                     </Link>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
//                       <Grid item>
//                         <Stack alignItems="center" justifyContent="center" spacing={1}>
//                           <Typography color={theme.palette.secondary.main} gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
//                             Dashboard quản lý bảo vệ
//                           </Typography>
//                         </Stack>
//                       </Grid>
//                     </Grid>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <AuthRecoveryPassword1 />
//                   </Grid>
//                 </Grid>
//               </AuthCardWrapper>
//             </Grid>
//           </Grid>
//         </Grid>
//         <Grid item xs={12} sx={{ m: 3, mt: 1 }}></Grid>
//       </Grid>
//     </AuthWrapper1>
//   );
// };

// export default memo(RecoveryPassword1);

