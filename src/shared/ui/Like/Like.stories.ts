import type { Meta, StoryObj } from '@storybook/react'

import { Like } from './'

const meta = {
  component: Like,
  tags: ['autodocs'],
  title: 'Components/Card',
} satisfies Meta<typeof Like>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Card content',
  },
}
