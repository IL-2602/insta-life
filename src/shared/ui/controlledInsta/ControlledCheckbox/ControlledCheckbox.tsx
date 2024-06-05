import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Checkbox } from '@/shared/ui/Checkbox'
import { CheckboxProps } from '@radix-ui/react-checkbox'

type Props<T extends FieldValues> = Omit<CheckboxProps, 'onChange' | 'value'> &
  Omit<UseControllerProps<T>, 'defaultValues' | 'rules'>

export const ControlledCheckbox = <T extends FieldValues>({
  control,
  name,
  shouldUnregister,
  ...rest
}: Props<T>) => {
  const {
    field: { onChange: onChange, value },
    fieldState: { error },
  } = useController({
    control,
    name,
    shouldUnregister,
  })
  const handleChange = onChange as (value: boolean) => void

  return (
    <Checkbox checked={value} errorMessage={error?.message} onChange={handleChange} {...rest} />
  )
}
