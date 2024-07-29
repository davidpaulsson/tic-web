import { Meta, StoryObj } from '@storybook/react';

import React from 'react';

import { cn } from '@/lib/utils';

import { Header } from './header';

const meta: Meta<typeof Header> = {
  title: 'Sections/Header',
  component: Header,
  tags: ['autodocs'],
  args: {
    theme: 'dark',
  },
  argTypes: {
    theme: {
      description: 'The theme of the header, a dark themed header works on a light background and vice-versa.',
    },
  },
  render: ({ theme }) => (
    <div
      className={cn({
        'bg-white': theme === 'dark',
        'bg-tic-blue-dark': theme === 'light',
      })}
    >
      <Header theme={theme} />
    </div>
  ),
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Dark: Story = {
  args: {
    theme: 'dark',
  },
};

export const Light: Story = {
  args: {
    theme: 'light',
  },
};
