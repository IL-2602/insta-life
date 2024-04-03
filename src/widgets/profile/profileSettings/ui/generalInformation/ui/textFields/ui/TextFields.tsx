import { memo } from 'react'

import { Button } from '@/shared/ui/Button'
import { Calendar } from '@/shared/ui/Calendar/Calendar'
import { Spinner } from '@/shared/ui/Spinner'
import { TextField } from '@/shared/ui/Textfield'
import { Typography } from '@/shared/ui/Typography'
import { ControlledTextAreaField } from '@/shared/ui/controlledInsta/ControlledTextArea/ControlledTextArea'
import { ControlledTextField } from '@/shared/ui/controlledInsta/ControlledTextField/ControlledTextField'
import { TextFieldsProps } from '@/widgets/profile/profileSettings/ui/generalInformation/ui/textFields/container'
import { clsx } from 'clsx'
import Link from 'next/link'

import s from './TextFields.module.scss'

export const TextFields = memo(
  ({
    cities,
    cityValue,
    control,
    dropdownOpen,
    errorAboutMe,
    errorDateOfBirth,
    errorFirstName,
    errorLastName,
    errorUserName,
    handleCityChange,
    handleOptionClick,
    isDisabled,
    isGetProfileLoading,
    isLoading,
    t,
    updateProfileHandler,
  }: TextFieldsProps) => {
    if (isGetProfileLoading) {
      return <Spinner />
    }

    return (
      <form className={s.container}>
        <div className={s.inputWrap}>
          <label className={s.label}>
            {t.profileSettings.tab.generalInformation.form.username}
            <span className={s.star}>*</span>
            <ControlledTextField control={control} errorMessage={errorUserName} name={'userName'} />
          </label>
        </div>
        <div className={s.inputWrap}>
          <label className={s.label}>
            {t.profileSettings.tab.generalInformation.form.firstname}
            <span className={s.star}>*</span>
            <ControlledTextField
              control={control}
              errorMessage={errorFirstName}
              name={'firstName'}
            />
          </label>
        </div>
        <div className={s.inputWrap}>
          <label className={s.label}>
            {t.profileSettings.tab.generalInformation.form.lastname}
            <span className={s.star}>*</span>
            <ControlledTextField control={control} errorMessage={errorLastName} name={'lastName'} />
          </label>
        </div>
        <div className={s.inputWrap}>
          <label className={s.label}>
            {t.profileSettings.tab.generalInformation.form.dateOfBirthday}
            <Calendar
              control={control}
              errorLink={
                <Link className={s.errorLink} href={'/auth/privacy-policy'}>
                  {t.auth.privacyPolicyPage.title}
                </Link>
              }
              errorMessage={errorDateOfBirth}
              name={'calendar'}
            />
          </label>
        </div>
        <div className={s.inputWrap}>
          <label className={s.label}>
            {t.profileSettings.tab.generalInformation.form.city}
            <TextField
              onChange={e => handleCityChange(e.target.value)}
              placeholder={t.profileSettings.tab.generalInformation.form.enterName}
              value={cityValue}
            />
          </label>
          <ul className={clsx(cities.length > 0 ? s.citiesList : s.displayNone, 'target')}>
            {dropdownOpen &&
              cities?.map((city, index) => (
                <li className={s.city} key={index} onClick={() => handleOptionClick(city)}>
                  {city}
                </li>
              ))}
          </ul>
        </div>
        <div className={s.inputWrap}>
          <label className={s.label}>
            {t.profileSettings.tab.generalInformation.form.aboutMe}
            <ControlledTextAreaField
              control={control}
              errorMessage={errorAboutMe}
              name={'aboutMe'}
              rows={3}
            />
          </label>
        </div>
        <Button className={s.button} disabled={isDisabled} onClick={updateProfileHandler}>
          {isLoading ? <Spinner /> : <Typography>{t.button.saveChanges}</Typography>}
        </Button>
      </form>
    )
  }
)
