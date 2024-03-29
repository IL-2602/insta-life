import type { Meta, StoryObj } from '@storybook/react'

import { CreateNewPassword } from '@/widgets/auth/createNewPassword'
import { ProfileHeader } from '@/widgets/profile/profileHeader'

const meta = {
  argTypes: {},
  component: ProfileHeader.widget,
  tags: ['autodocs'],
  title: 'Widgets/ProfileHeader',
} satisfies Meta<typeof CreateNewPassword.widget>

export default meta
type Story = StoryObj<typeof ProfileHeader.widget>

export const Default: Story = {}
