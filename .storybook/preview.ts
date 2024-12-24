import type { Preview } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  argTypes: {
    onClick: { action: 'clicked' },
    onChange: { action: 'changed' },
  },
  decorators: [
    (Story) =>
      React.createElement('div', {
        className: 'p-4 bg-acnh-beige min-h-screen',
        children: Story(),
      }),
  ],
};

export default preview;
