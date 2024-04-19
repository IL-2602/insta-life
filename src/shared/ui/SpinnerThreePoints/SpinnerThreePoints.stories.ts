import type { Meta, StoryObj } from '@storybook/react'

import { SpinnerThreePoints } from './SpinnerThreePoints'

const meta = {
  component: SpinnerThreePoints,
  tags: ['autodocs'],
  title: 'Components/SpinnerThreePoints',
} satisfies Meta<typeof SpinnerThreePoints>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
