import { createTheme } from '@mui/material/styles';

type ColorPalette = {
  light: string;
  pale: string;
  default: string;
};

type ColorPalettes = {
  blue: ColorPalette & { semiLight: string };
  orange: ColorPalette;
  violet: ColorPalette;
  red: ColorPalette & { semiLight: string };
  green: ColorPalette;
  gray: {
    dark: string;
    semiDark: string;
    medium: string;
    light: string;
    default: string;
  };
  white: {
    default: string;
  };
};

export const palette: ColorPalettes = {
  blue: {
    semiLight: '#73ffe1',
    light: '#c6fff0',
    pale: '#e4fff8',
    default: '#48ffd5',
  },
  orange: {
    pale: '#FFE0C3',
    light: '#FFC997',
    default: '#FF7A00',
  },
  violet: {
    pale: '#FAECFF',
    light: '#F3D0FF',
    default: '#C832FD',
  },
  red: {
    pale: '#FFDFE3',
    light: '#FFA8B1',
    semiLight: '#ff596b',
    default: '#FF011D',
  },
  green: {
    pale: '#E1F2CF',
    light: '#B8EE82',
    default: '#6BD700',
  },
  gray: {
    dark: '#000002',
    semiDark: '#3f3f3f',
    medium: '#595959',
    light: '#DEDFE8',
    default: '#8C8EA5',
  },
  white: {
    default: '#FFFFFF',
  },
};

export const theme = createTheme({
  palette: {
    primary: {
      main: '#48ffd5',
    },
    secondary: {
      main: '#ff4081',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#FFFFFF',
    },
  },
});
