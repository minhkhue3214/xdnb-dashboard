import { memo, useCallback, useState } from 'react';

import {
  Box, Button
  // Typography
  , FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel, Link, OutlinedInput,
  Stack
} from '@mui/material';

import { useTheme } from '@mui/material/styles';

// third party
import { Formik } from 'formik';
import * as Yup from 'yup';

// project imports
import { useAuthenticationStore } from '~/hooks/authentication';
import AnimateButton from '~/ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const AuthRecoveryPassword2 = ({ ...others }) => {
  const theme = useTheme();
  const { dispatchRecoveryPassword2 } = useAuthenticationStore();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = useCallback(() => {
    setShowPassword((value) => !value);
  }, []);

  const handleMouseDownPassword = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          token: '',
          password: '',
          password_confirmation: 'minhkhue123',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().matches(/\S/, 'Email không hợp lệ').max(255).required('Vui lòng nhập email'),
          token: Yup.string().max(20).required('Vui lòng nhập token'),
          password: Yup.string().max(20).required('Vui lòng nhập mật khẩu'),
          password_confirmation: Yup.string().max(20).required('Vui lòng nhập lại mật khẩu')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          if (values.password !== values.password_confirmation) {
            setErrMess(true);
            return;
          }
          try {
            const result = dispatchRecoveryPassword2({
              email: values.email,
              token: values.token,
              password: values.password,
              password_confirmation: values.password_confirmation
            });

            if (result) {
              console.log('dispatchRecoveryPassword2', result);
              // console.log('authenticationState', authenticationState);
              // setStatus({ success: true });
              // setErrMess(false);
              // setSubmitting(false);
            }
          } catch (err) {
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-username-login">Email</InputLabel>
              <OutlinedInput
                size="small"
                id="outlined-adornment-username-login"
                type="text"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email"
                inputProps={{}}
              />
              <FormHelperText
                error
                id="standard-weight-helper-text-username-login"
                style={{ visibility: touched.email && errors.email ? 'visible' : 'hidden', display: 'block' }}
              >
                {errors.email}
              </FormHelperText>
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.token && errors.token)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-username-login">Token</InputLabel>
              <OutlinedInput
                size="small"
                id="outlined-adornment-username-login"
                type="text"
                value={values.token}
                name="token"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Token"
                inputProps={{}}
              />
              <FormHelperText
                error
                id="standard-weight-helper-text-username-login"
                style={{ visibility: touched.email && errors.email ? 'visible' : 'hidden', display: 'block' }}
              >
                {errors.email}
              </FormHelperText>
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password_confirmation && errors.password_confirmation)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-username-login">Password confirmation</InputLabel>
              <OutlinedInput
                size="small"
                id="outlined-adornment-username-login"
                type="password"
                value={values.password_confirmation}
                name="password_confirmation"
                onBlur={handleBlur}
                onChange={handleChange}
                label="password_confirmation"
                inputProps={{}}
              />
              <FormHelperText
                error
                id="standard-weight-helper-text-username-login"
                style={{ visibility: touched.email && errors.email ? 'visible' : 'hidden', display: 'block' }}
              >
                {errors.email}
              </FormHelperText>
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
              <OutlinedInput
                size="small"
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                inputProps={{}}
              />
              <FormHelperText
                error
                id="standard-weight-helper-text-password-login"
                style={{ visibility: touched.password && errors.password ? 'visible' : 'hidden', display: 'block' }}
              >
                {errors.password}
              </FormHelperText>
            </FormControl>

            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <FormControlLabel control={<Link href="/login">Đăng nhập</Link>} />
            </Stack>

            <Box sx={{ mt: 3, visibility: errors.submit ? 'visible' : 'hidden' }}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                  style={{ color: 'white' }}
                >
                  Thay đổi mật khẩu
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default memo(AuthRecoveryPassword2);
