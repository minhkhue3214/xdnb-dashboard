import { memo } from 'react';

import {
  Box, Button
  // Typography
  ,

  FormControl,
  FormControlLabel,
  FormHelperText, InputLabel, Link, OutlinedInput,
  Stack
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';

// third party
import { Formik } from 'formik';
import * as Yup from 'yup';

// project imports
import { useAuthenticationStore } from '~/hooks/authentication';
import AnimateButton from '~/ui-component/extended/AnimateButton';

// assets

const RecoveryPassword1 = ({ ...others }) => {
  const theme = useTheme();
  const navigateTo = useNavigate();
  const { dispatchRecoveryPassword1 } = useAuthenticationStore();

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: yup.string().email(t('input.error.user.invalidEmail')).required(t('input.error.user.pleaseEnterEmail')),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            dispatchRecoveryPassword1({
              email: values.email
            });
            navigateTo('/recoverypassword2');

            // if (result) {
            //   console.log('forgot pass result', result);
            //   setStatus({ success: true });
            //   setSubmitting(false);
            // }
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
              <InputLabel htmlFor="outlined-adornment-username-login">email</InputLabel>
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
                  Đăng nhập
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default memo(RecoveryPassword1);
