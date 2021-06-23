import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';
import { Typography, Grid, Box, InputAdornment, IconButton, TextField } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { submitForm } from 'services/api';
import { config } from 'core/constants';

export default ({ setTypeButton, setCreationResponse, formName }) => {
  const { formatMessage: f } = useIntl();
  const [showPasswords, setShowPasswords] = useState({ first: false, second: false });
  const [errorMessage, setErrorMessage] = useState('');
  const validations = {
    required: true,
    minLength: config.INPUT_LENGTH.min,
    maxLength: config.INPUT_LENGTH.medium,
    pattern: /^(?=\w*\d)(?=\w*[A-Z])\S{8,24}$/,
  };

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
        return f({ id: 'error.required', defaultMessage: 'Required input' });
      case 'minLength':
        return f(
          { id: 'error.minLength', defaultMessage: 'Minimum length is 8 characters' },
          { minLength: config.INPUT_LENGTH.min },
        );
      case 'maxLength':
        return f(
          { id: 'error.maxLength', defaultMessage: 'The maximum length is 24 characters' },
          { maxLength: config.INPUT_LENGTH.medium },
        );
      case 'pattern':
        return f({
          id: 'error.pattern',
          defaultMessage:
            'Format error: You must introduce at least one number and one capital letter. Remember not to use blank spaces',
        });
      default:
        break;
    }
  };

  const onSubmit = data => {
    const { firstPass, secondPass, hint } = data;

    firstPass.includes(secondPass)
      ? submitForm(firstPass, secondPass, hint)
          .then(response => {
            setCreationResponse(response?.status);
          })
          .catch(response => {
            setCreationResponse(response?.status);
          })
      : setErrorMessage(f({ id: 'error.noEquals', defaultMessage: 'Passwords must match' }));
  };

  return (
    <>
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
                  defaultMessage: 'Create your Master Key',
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
                  defaultMessage: 'Repeat your Master Key',
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
          <Box pt={4}>
            <Typography>
              {f({
                id: 'CreationPasswordForm.info.createHint',
                defaultMessage: 'You can also create a hint to help you remember your master password',
              })}
            </Typography>
            <Box pt={2}>
              <Typography variant="body2">
                {f({
                  id: 'CreationPasswordForm.input.createHint',
                  defaultMessage: 'Create your hint to remember your password (optional)',
                })}
              </Typography>
            </Box>
            <Box pt={1}>
              <TextField
                fullWidth
                variant="outlined"
                name="hint"
                placeholder={f({
                  id: 'CreationPasswordForm.input.createHint.placeholder',
                  defaultMessage: 'Introduce your hint',
                })}
                inputRef={register({
                  maxLength: {
                    value: config.INPUT_LENGTH.max,
                    message: f(
                      {
                        id: 'error.maxLength',
                        defaultMessage: '',
                      },
                      { maxLength: config.INPUT_LENGTH.max },
                    ),
                  },
                })}
                error={errors?.hasOwnProperty('hint')}
                helperText={errors?.hasOwnProperty('hint') ? errors?.hint?.message : ''}
              />
            </Box>
          </Box>
        </form>
      </Box>
    </>
  );
};
