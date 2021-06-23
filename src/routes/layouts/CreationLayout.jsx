import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Stepper, Step, StepLabel, Typography, Grid, Box, Divider } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import PrimaryButton from 'components/buttons/PrimaryButton';
import SecondaryButton from 'components/buttons/SecondaryButton';
import DefaultBox from 'components/grids/DefaultBox';
import DetailForm from 'components/forms/DetailForm';
import CreationPasswordForm from 'components/forms/CreationPasswordForm';
import ResponseForm from 'components/forms/ResponseForm';

export default ({ history }) => {
  const { formatMessage: f } = useIntl();
  const [activeStep, setActiveStep] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const [typeButton, setTypeButton] = useState(null);
  const [creationResponse, setCreationResponse] = useState(null);
  const steps = ['detail', 'creationPassword', 'creationPasswordResult'];
  const FORM_NAME = 'password-creation';

  useEffect(() => {
    if (creationResponse) {
      setActiveStep(2);
    }
  }, [creationResponse]);

  const getStepComponent = () => {
    switch (activeStep) {
      case 0:
        return <DetailForm setIsDisabled={setIsDisabled} />;
      case 1:
        return (
          <CreationPasswordForm
            setTypeButton={setTypeButton}
            setCreationResponse={setCreationResponse}
            formName={FORM_NAME}
          />
        );
      case 2:
        return <ResponseForm status={creationResponse} />;
      default:
        break;
    }
  };

  return (
    <>
      <Stepper activeStep={activeStep} color="primary">
        {steps?.map((step, index) => (
          <Step key={`${index}-${step}`}>
            <StepLabel></StepLabel>
          </Step>
        ))}
      </Stepper>
      <DefaultBox>
        <Typography variant="h5">
          {f({ id: 'CreationLayout.title', defaultMessage: 'Create your Password Manager' })}
        </Typography>
        <Divider className="short-divider" />
        <Box pt={4}>{getStepComponent()}</Box>
      </DefaultBox>
      {activeStep !== 2 && (
        <>
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
                    form={FORM_NAME}
                    disabled={isDisabled}
                    onClick={() => (typeButton ? {} : setActiveStep(activeStep + 1))}
                    endIcon={<NavigateNextIcon style={{ fontSize: 22 }} />}
                    {...(typeButton ? { type: typeButton } : {})}
                  >
                    {f({ id: 'button.next', defaultMessage: 'Next' })}
                  </PrimaryButton>
                </Grid>
              </Box>
            </Grid>
          </DefaultBox>
        </>
      )}
    </>
  );
};
