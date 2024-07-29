import { Tooltip } from '@radix-ui/react-tooltip';
import { Meta, StoryObj } from '@storybook/react';

import React from 'react';

import { cn } from '@/lib/utils';

import { Header } from './header';
import { TooltipProvider } from './ui/tooltip';

const meta: Meta<typeof Header> = {
  title: 'Sections/Header',
  component: Header,
  // tags: ['autodocs'],
  args: {
    theme: 'dark',
  },
  render: ({ theme }) => (
    <TooltipProvider delayDuration={100}>
      <div
        className={cn({
          'bg-white': theme === 'dark',
          'bg-tic-blue-dark': theme === 'light',
        })}
      >
        <Header theme={theme} />
      </div>
    </TooltipProvider>
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
