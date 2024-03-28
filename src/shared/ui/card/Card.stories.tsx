import type { Meta, StoryObj } from '@storybook/react';

import { Card } from './Card';

const meta = {
  title: 'Layout/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    outlined: { control: 'boolean' },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Outlined: Story = {
  args: {
    children: <p>Outlined</p>,
    sx: {
      width: '100px',
    },
    outlined: true,
  },
};

export const Default: Story = {
  args: {
    children: <p>Default</p>,
    sx: {
      width: '100px',
    },
  },
};
