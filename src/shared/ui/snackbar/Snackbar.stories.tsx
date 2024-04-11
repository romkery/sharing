import { Alert } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';

import { Snackbar } from './Snackbar';

const meta = {
  title: 'Layout/Snackbar',
  component: Snackbar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    anchorOrigin: {
      control: 'select',
      defaultValue: 'topLeft',
      options: {
        topLeft: {
          vertical: 'top',
          horizontal: 'left',
        },
        topCenter: {
          vertical: 'top',
          horizontal: 'center',
        },
        topRight: {
          vertical: 'top',
          horizontal: 'right',
        },
        bottomLeft: {
          vertical: 'bottom',
          horizontal: 'left',
        },
        bottomCenter: {
          vertical: 'bottom',
          horizontal: 'center',
        },
        bottomRight: {
          vertical: 'bottom',
          horizontal: 'right',
        },
      },
    },
    open: { control: 'boolean' },
  },
} satisfies Meta<typeof Snackbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'left',
    },
    children: <Alert variant="standard">Default</Alert>,
    sx: {
      width: '150px',
    },
  },
};
