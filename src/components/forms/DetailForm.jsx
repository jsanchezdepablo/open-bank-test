import React, { useState, useEffect } from 'react';
import { Typography, Grid, Box } from '@material-ui/core';
import { useIntl } from 'react-intl';
import brainLogo from 'core/content/assets/img/group.svg';
import securityLogo from 'core/content/assets/img/group-3.svg';
import DefaultCheckBox from 'components/checkbox/DefaultCheckbox';

export default ({ setIsDisabled }) => {
  const { formatMessage: f } = useIntl();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setIsDisabled(!checked);
  }, [checked, setIsDisabled]);

  return (
    <>
      <Grid container spacing={2} direction="row" justify="space-evenly" alignItems="center">
        <Grid item xs={4}>
          <Grid container direction="row" alignItems="center">
            <Grid item xs={6}>
              <img src={brainLogo} alt="brain-logo"></img>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                {f({
                  id: 'DetailForm.image.brain.footer',
                  defaultMessage:
                    'Save here all your passwords, data or any information, forget paper notes and unprotected applications.',
                })}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container direction="row" alignItems="center">
            <Grid item xs={5}>
              <img src={securityLogo} alt="security-logo"></img>
            </Grid>
            <Grid item xs={7}>
              <Typography>
                {f({
                  id: 'DetailForm.image.security.footer',
                  defaultMessage: 'Create your master key: only you will be able to access to your secrets.',
                })}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box pt={6}>
        <Typography variant="body2">
          {f({
            id: 'DetailForm.section.howWorks',
            defaultMessage: 'How works?',
          })}
        </Typography>
        <Typography>
          {f({
            id: 'DetailForm.section.howWorks.content',
            defaultMessage:
              'First of all, you have to create a different password for each of your electronic devices. You will not be able to recover your password, so remember it well.',
          })}
        </Typography>
      </Box>
      <Box pt={3}>
        <Typography variant="body2">
          {f({
            id: 'DetailForm.section.whatSave',
            defaultMessage: 'What can I save?',
          })}
        </Typography>
        <Typography>
          {f({
            id: 'DetailForm.section.whatSave.content',
            defaultMessage:
              "For example, you can save your card number, your mobile phone's PIN and PUK, or any information that you need to have in a safe place.",
          })}
        </Typography>
      </Box>
      <Box pt={4} pl={2}>
        <DefaultCheckBox
          checked={checked}
          name="accept-data-checkbox"
          onChange={() => setChecked(!checked)}
          label={f({
            id: 'DetailForm.checkBox.label',
            defaultMessage:
              "Are you an adult and do you accept that we treat your data according to the company's data protection policy?",
          })}
        />
      </Box>
    </>
  );
};
