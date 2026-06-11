import type { Meta, StoryObj } from '@storybook/react'
import { Button, ButtonDock } from '@dock/buttons'

const meta: Meta<typeof ButtonDock> = {
  title: 'Widgets/ButtonDock',
  component: ButtonDock,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '200px', padding: '2rem', background: '#f8fafc', borderRadius: '8px' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ButtonDock>

export const Default: Story = {
  args: { showMode: true },
  render: (args) => (
    <ButtonDock {...args}>
      <Button variant="primary">Generar</Button>
      <Button variant="secondary">Guardar</Button>
      <Button variant="danger">Eliminar</Button>
    </ButtonDock>
  ),
}

export const WithIcons: Story = {
  args: { showMode: true },
  render: (args) => (
    <ButtonDock {...args}>
      <Button variant="primary">Acción 1</Button>
      <Button variant="ghost">Acción 2</Button>
    </ButtonDock>
  ),
}
