import React from 'react';
import { useIntl } from 'react-intl';
import { Stepper, Step, StepLabel, Typography, Grid, Box, Divider } from '@material-ui/core';
import PrimaryButton from 'components/buttons/PrimaryButton';
import SecondaryButton from 'components/buttons/SecondaryButton';
import DefaultBox from 'components/grids/DefaultBox';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

// import DetailForm from 'components/forms/DetailForm';

export default ({ history }) => {
  const { formatMessage: f } = useIntl();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = ['', '', ''];

  return (
    <>
      <Stepper activeStep={activeStep} color="primary">
        {steps?.map((step, index) => (
          <Step key={index}>
            <StepLabel></StepLabel>
          </Step>
        ))}
      </Stepper>
      <DefaultBox>
        <Typography variant="h5">
          {f({ id: 'CreationLayout.title', defaultMessage: 'Create your Password Manager' })}
        </Typography>
        <Divider className="short-divider" />
        {/* <DetailForm {...props} /> */}
      </DefaultBox>

      <Divider />

      <DefaultBox>
        <Grid container direction="row" justify="space-between">
          <Box>
            <Grid item>
              <SecondaryButton onClick={() => history.push('/')}>
                {f({ id: 'button.cancel', defaultMessage: 'Cancel' })}
              </SecondaryButton>
            </Grid>
          </Box>
          <Box>
            <Grid item>
              <PrimaryButton
                onClick={() => setActiveStep(activeStep + 1)}
                endIcon={<NavigateNextIcon style={{ fontSize: 22 }} />}
              >
                {f({ id: 'button.next', defaultMessage: 'Next' })}
              </PrimaryButton>
            </Grid>
          </Box>
        </Grid>
      </DefaultBox>
    </>
  );
};
