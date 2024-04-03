import { SetStateAction, useEffect, useState } from 'react'

import { useUpdateProfileMutation } from '@/services/profileService/profileEndpoints'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { useProfileSettingsForm } from '@/widgets/profile/profileSettings/ui/generalInformation/ui/textFields/hooks/useProfileSettingsForm'
import { parse } from 'date-fns'
import { useDebouncedCallback } from 'use-debounce'

export const useContainer = () => {
  const { t } = useTranslation()
  const {
    control,
    errors,
    handleSubmit,
    isGetProfileLoading,
    profile,
    register,
    reset,
    setValue,
    watch,
  } = useProfileSettingsForm()

  const [cities, setCities] = useState([])
  const [selectedCity, setSelectedCity] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const [updateProfile, { isLoading }] = useUpdateProfileMutation()

  const errorUserName = errors.userName?.message
  const errorFirstName = errors.firstName?.message
  const errorLastName = errors.lastName?.message
  const errorAboutMe = errors.aboutMe?.message
  const errorDateOfBirth = errors.calendar?.message

  const inputFields = {
    aboutMe: watch('aboutMe'),
    calendar: watch('calendar'),
    city: watch('city'),
    firstName: watch('firstName'),
    lastName: watch('lastName'),
    userName: watch('userName'),
  }

  const isDisabled =
    !inputFields.userName ||
    !inputFields.firstName ||
    !inputFields.lastName ||
    !Object.keys(errors) ||
    !!errorDateOfBirth

  const debouncedSearch = useDebouncedCallback((query: string) => {
    fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=${process.env.NEXT_PUBLIC_GEO_API_KEY}`
    )
      .then(res => res.json())
      .then(({ features }) => {
        if (features) {
          const cities = features.map((city: any) => city.properties.city)
          const uniqueCities: string[] = Array.from(new Set(cities))

          setCities(uniqueCities as SetStateAction<never[]>)
        }
      })
      .catch(err => console.log(err))
  }, 300)

  // console.log('cities: ', cities)
  // console.log('getValues: ', getValues('city'))
  // console.log('inputFields.city: ', inputFields.city)

  useEffect(() => {
    debouncedSearch(inputFields.city)
  }, [debouncedSearch, inputFields.city])

  useEffect(() => {
    if (cities.length === 1) {
      setCities([])
    }
  }, [cities])

  const handleOptionClick = (option: string) => {
    setCities([])
    setDropdownOpen(false)
    setValue('city', option)
  }

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement

    if (dropdownOpen && !target.closest('.target')) {
      setCities([])
      setDropdownOpen(false)
    }
  }

  useEffect(() => {
    if (cities) {
      setDropdownOpen(true)
    }
  }, [setDropdownOpen, cities])

  useEffect(() => {
    if (profile) {
      reset({
        aboutMe: profile.aboutMe,
        calendar: profile?.dateOfBirth
          ? parse(profile.dateOfBirth, "yyyy-MM-dd'T'HH:mm:ss.SSSX", new Date())
          : new Date(),
        city: profile.city,
        firstName: profile.firstName,
        lastName: profile.lastName,
        userName: profile.userName,
      })
    }
  }, [profile, reset])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownOpen])

  const updateProfileHandler = handleSubmit(() => {
    updateProfile({
      aboutMe: inputFields.aboutMe ? inputFields.aboutMe : '',
      city: inputFields.city,
      dateOfBirth: inputFields?.calendar,
      firstName: inputFields.firstName,
      lastName: inputFields.lastName,
      userName: inputFields.userName,
    })
      .unwrap()
      .then(res => console.log(res))
      .catch(err => console.log(err))
  })

  return {
    cities,
    control,
    dropdownOpen,
    errorAboutMe,
    errorDateOfBirth,
    errorFirstName,
    errorLastName,
    errorUserName,
    handleOptionClick,
    isDisabled,
    isGetProfileLoading,
    isLoading,
    register,
    t,
    updateProfileHandler,
  }
}
