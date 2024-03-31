import React, { useState } from 'react'
import DatePicker from 'react-datepicker'

import { useTranslation } from '@/shared/hooks/useTranslation'
import { CustomHeader } from '@/shared/ui/Calendar/CustomHeader'
import { ControlledTextField } from '@/shared/ui/controlledInsta/ControlledTextField/ControlledTextField'
import { enUS, ru } from 'date-fns/locale'
import { useRouter } from 'next/router'

import './Calendar.scss'
import 'react-datepicker/dist/react-datepicker.css'

import CalendarIcon from '../../assets/icons/Calendar/Calendar'

type Props = {
  control: any
  errorDateOfBirth: string | undefined
  errorMessage: string | undefined
}
export const Calendar = ({ control, errorDateOfBirth, errorMessage }: Props) => {
  const [startDate, setStartDate] = useState(new Date())
  const { t } = useTranslation()

  const { locale } = useRouter()

  return (
    <DatePicker
      customInput={
        <ControlledTextField
          control={control}
          errorMessage={errorDateOfBirth}
          iconEnd={<CalendarIcon />}
          name={'dateOfBirth'}
        />
      }
      dateFormatCalendar={'YYYY'}
      formatWeekDay={date => date.substring(0, 3)}
      locale={locale === 'ru' ? ru : enUS}
      onChange={(date: any) => setStartDate(date)}
      renderCustomHeader={({ changeMonth, changeYear, date, decreaseMonth, increaseMonth }) => (
        <CustomHeader
          changeMonth={changeMonth}
          changeYear={changeYear}
          date={date}
          decreaseMonth={decreaseMonth}
          increaseMonth={increaseMonth}
        />
      )}
      selected={startDate}
      showMonthDropdown
      showYearDropdown
    />
  )
}
