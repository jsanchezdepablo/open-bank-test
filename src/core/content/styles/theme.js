import { createMuiTheme } from '@material-ui/core/styles';
import { primary, secondary, terciary, terciaryLight } from 'core/content/styles/colors';

export const theme = createMuiTheme({
  typography: {
    fontFamily: ['Quicksand', 'Helvetica Neue', 'Arial', 'Helvetica', 'sans-serif'].join(','),
    h5: {
      fontWeight: 900,
      color: primary,
    },
    body1: {
      color: primary,
    },
    /*h6: {
      fontFamily: ['BentonSansBBVA Medium', 'Helvetica Neue', 'Arial', 'Helvetica', 'sans-serif'].join(','),
      fontWeight: 500,
    },*/
    button: {
      fontFamily: ['Quicksand', 'Helvetica Neue', 'Arial', 'Helvetica', 'sans-serif'].join(','),
      fontWeight: 900,
      textTransform: 'none',
    },
  },
  palette: {
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
    },
  },
  overrides: {
    MuiStepper: {
      root: {
        background: terciaryLight,
      },
    },
    MuiStepIcon: {
      root: {
        color: terciary,
      },
      active: {
        color: `${primary} !important`,
      },
      completed: {
        color: `${secondary} !important`,
      },
    },
    MuiStepConnector: {
      root: {
        '& .MuiStepConnector-lineHorizontal': {
          borderTopWidth: 2,
        },
        '& .MuiStepConnector-line': {
          borderColor: `${terciary} !important`,
        },
      },
      active: {
        '& .MuiStepConnector-line': {
          borderColor: `${primary} !important`,
        },
      },
      completed: {
        '& .MuiStepConnector-line': {
          borderColor: `${secondary} !important`,
        },
      },
    },
    MuiDivider: {
      root: {
        '&.short-divider': {
          marginTop: 8,
          height: 3,
          width: 35,
          backgroundColor: secondary,
        },
      },
    },
    MuiButton: {
      root: {
        borderRadius: 2,
        padding: '8px 16px 8px 16px ',
      },
      endIcon: {
        marginLeft: 1,
        marginTop: 2,
      },
      textPrimary: {
        padding: '8px 16px 8px 0px',
        '&:hover': {
          backgroundColor: 'transparent',
        },
      },
    },
  },
});
