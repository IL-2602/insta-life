import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import { TextArea, TextAreaFieldProps } from '@/shared/ui/TextArea'

type Props<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
} & Omit<TextAreaFieldProps, 'onChange' | 'value'>
export const ControlledTextAreaField = <T extends FieldValues>({
  control,
  name,
  ...rest
}: Props<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  })

  return <TextArea {...field} errorMessage={error?.message} {...rest} />
}
