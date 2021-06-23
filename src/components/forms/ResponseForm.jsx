import React from 'react';
import { useIntl } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import { config } from 'core/constants';

export default ({ history, status }) => {
  const { formatMessage: f } = useIntl();
  const okStatus = status === config.RESPONSE.ok;

  return (
    <Paper>
      <Box p={2}>
        <Grid container direction="row" justify="flex-start" spacing={2} alignContent="center">
          <Grid item>
            {okStatus ? (
              <CheckCircleOutlineIcon fontSize="large" color="secondary" />
            ) : (
              <ReportProblemOutlinedIcon fontSize="large" color="secondary" />
            )}
          </Grid>
          <Grid item>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="h6">
                  {okStatus
                    ? f({ id: 'ResponseForm.title.ok', defaultMessage: 'Your Password Manager has been created!' })
                    : f({ id: 'ResponseForm.title.ko', defaultMessage: 'An error has occurred' })}
                </Typography>
              </Grid>
              <Grid item>
                <Typography>
                  {okStatus
                    ? f({
                        id: 'ResponseForm.subtitle.ok',
                        defaultMessage: 'Click on the button below to start using the application.',
                      })
                    : f({
                        id: 'ResponseForm.subtitle.ko',
                        defaultMessage: 'Sorry, we were unable to create your Master Password. Try again later.',
                      })}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justify="flex-end">
          <Button
            color="secondary"
            onClick={() => history.push('/')}
            endIcon={<NavigateNextIcon style={{ fontSize: 22 }} />}
          >
            {okStatus
              ? f({ id: 'button.access', defaultMessage: 'Access' })
              : f({ id: 'button.goBack', defaultMessage: 'Go back to Password Manager' })}
          </Button>
        </Grid>
      </Box>
    </Paper>
  );
};
