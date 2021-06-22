import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';
import { Typography, Grid, Box, InputAdornment, IconButton, TextField } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { submitForm } from 'services/api';

export default ({ setTypeButton, setCreationResponse, formName }) => {
  const { formatMessage: f } = useIntl();
  const [showPasswords, setShowPasswords] = useState({ first: false, second: false });
  const [errorMessage, setErrorMessage] = useState('');
  const validations = { required: true, minLength: 8, maxLength: 24, pattern: /^(?=\w*\d)(?=\w*[A-Z])\S{8,24}$/ };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  useEffect(() => {
    setTypeButton('submit');
  }, [setTypeButton]);

  const handleClickShowPassword = name => {
    setShowPasswords({ ...showPasswords, [name]: !showPasswords[name] });
  };

  const getErrorMessage = error => {
    switch (error) {
      case 'required':
        return f({ id: 'error.required', defaultMessage: '' });
      case 'minLength':
        return f({ id: 'error.minLength', defaultMessage: '' });
      case 'maxLength':
        return f({ id: 'error.maxLength', defaultMessage: '' });
      case 'pattern':
        return f({ id: 'error.pattern', defaultMessage: '' });
      default:
        break;
    }
  };

  const onSubmit = data => {
    const { firstPass, secondPass } = data;

    if (firstPass.includes(secondPass)) {
      submitForm(data.example)
        .then(response => {
          setCreationResponse(response?.status); //DEVUELVO EL COMPONENTE DE SUCCESS
        })
        .catch(response => {
          setCreationResponse(response?.status); //DEVUELVO EL COMPONENTE DE ERROR
        });
    } else {
      setErrorMessage(f({ id: 'error.noEquals', defaultMessage: '' }));
    }
  };

  return (
    <Box pt={4}>
      <Typography>
        {f({
          id: 'CreationPasswordForm.info.masterKeyCreation',
          defaultMessage: 'First of all, you need to create a different password that will be your master key.',
        })}
      </Typography>
      <Typography>
        {f({
          id: 'CreationPasswordForm.info.noRecover',
          defaultMessage: "You won't be able to recover your password, so don't forget it.",
        })}
      </Typography>

      <Box pt={4}>
        <form id={formName} onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container direction="row" spacing={5}>
            <Grid item xs={4}>
              <TextField
                required
                fullWidth
                variant="outlined"
                name="firstPass"
                label={f({
                  id: 'CreationPasswordForm.input.firstPass',
                  defaultMessage: "You won't be able to recover your password, so don't forget it.",
                })}
                type={showPasswords?.first ? 'text' : 'password'}
                inputRef={register({
                  ...validations,
                  validate: {
                    removeErrors: () => {
                      setErrorMessage('');
                    },
                  },
                })}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        aria-label="toggle password visibility"
                        onClick={() => handleClickShowPassword('first')}
                      >
                        {showPasswords?.first ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={errors?.hasOwnProperty('firstPass') || !!errorMessage}
                helperText={
                  errors?.hasOwnProperty('firstPass') ? getErrorMessage(errors?.firstPass?.type) : errorMessage
                }
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                required
                fullWidth
                variant="outlined"
                name="secondPass"
                label={f({
                  id: 'CreationPasswordForm.input.secondPass',
                  defaultMessage: "You won't be able to recover your password, so don't forget it.",
                })}
                type={showPasswords?.second ? 'text' : 'password'}
                inputRef={register({
                  ...validations,
                  validate: {
                    removeErrors: () => {
                      setErrorMessage('');
                    },
                  },
                })}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => handleClickShowPassword('second')}
                        edge="end"
                      >
                        {showPasswords?.second ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={errors?.hasOwnProperty('secondPass') || !!errorMessage}
                helperText={
                  errors?.hasOwnProperty('secondPass') ? getErrorMessage(errors?.secondPass?.type) : errorMessage
                }
              />
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};
