import React from 'react'
import DatePicker from 'react-datepicker'
import { Controller } from 'react-hook-form'

import { CustomHeader } from '@/shared/ui/Calendar/CustomHeader'
import { TextField } from '@/shared/ui/Textfield'
import { enUS, ru } from 'date-fns/locale'
import { useRouter } from 'next/router'

import 'react-datepicker/dist/react-datepicker.css'

import moduleStyles from './Calendar.module.scss'

import './Calendar.scss' // eslint-disable-line

import CalendarIcon from '../../assets/icons/Calendar/Calendar'

type Props = {
  control: any
  errorMessage?: string | undefined
  name: string
}
export const Calendar = ({ control, errorMessage, name }: Props) => {
  const { locale } = useRouter()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onBlur, onChange, ref, value } }) => {
        return (
          <DatePicker
            className={`${moduleStyles}`}
            customInput={
              <TextField
                defaultValue={'00/00/0000'}
                errorMessage={errorMessage}
                iconEnd={<CalendarIcon />}
              />
            }
            dateFormat={'dd/MM/yyyy'}
            formatWeekDay={date => date.substring(0, 3)}
            locale={locale === 'ru' ? ru : enUS}
            onChange={onChange}
            renderCustomHeader={({
              changeMonth,
              changeYear,
              date,
              decreaseMonth,
              increaseMonth,
            }) => (
              <CustomHeader
                changeMonth={changeMonth}
                changeYear={changeYear}
                date={date}
                decreaseMonth={decreaseMonth}
                increaseMonth={increaseMonth}
              />
            )}
            selected={value}
            showMonthDropdown
            showYearDropdown
          />
        )
      }}
    />
  )
}
