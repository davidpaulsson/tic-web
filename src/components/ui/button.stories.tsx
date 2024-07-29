import { Meta, StoryFn } from '@storybook/react';

import React from 'react';

import { Button, ButtonProps } from './button';

export default {
  title: 'UI/Button',
  component: Button,
  argTypes: {
    children: { control: 'text' },
    variant: {
      control: { type: 'select' },
      options: ['default', 'secondary', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['default'],
    },
    asChild: { table: { disable: true } },
  },
  args: {
    children: 'The Intelligence Company',
    variant: 'default',
    size: 'default',
  },
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn<ButtonProps> = (args) => <Button {...args}>{args.children}</Button>;

export const Default = Template.bind({});
Default.args = {
  variant: 'default',
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
};

export const Ghost = Template.bind({});
Ghost.args = {
  variant: 'ghost',
};
