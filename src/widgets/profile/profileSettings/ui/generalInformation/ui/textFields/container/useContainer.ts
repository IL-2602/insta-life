import { SetStateAction, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { useUpdateProfileMutation } from '@/services/profileService/profileEndpoints'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { useProfileSettingsForm } from '@/widgets/profile/profileSettings/ui/generalInformation/ui/textFields/hooks/useProfileSettingsForm'
import { parse } from 'date-fns'
import { useDebouncedCallback } from 'use-debounce'

export const useContainer = () => {
  const { t } = useTranslation()
  const { control, errors, handleSubmit, isGetProfileLoading, profile, register, reset, watch } =
    useProfileSettingsForm()

  const [cities, setCities] = useState([])
  const [cityValue, setCityValue] = useState('')
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
      .then(() => setDropdownOpen(true))
      .catch(err => console.log(err))
  }, 300)

  const handleCityChange = (text: string) => {
    debouncedSearch(text)
    setCityValue(text)
  }

  const handleOptionClick = (option: string) => {
    setSelectedCity(option)
    setCityValue(option)
    setDropdownOpen(false)
    setCities([])
  }

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement

    if (dropdownOpen && !target.closest('.target')) {
      setCities([])
      setDropdownOpen(false)
    }
  }

  useEffect(() => {
    if (profile) {
      reset({
        aboutMe: profile.aboutMe || '',
        calendar: profile?.dateOfBirth
          ? parse(profile.dateOfBirth, "yyyy-MM-dd'T'HH:mm:ss.SSSX", new Date())
          : new Date(),
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        userName: profile.userName || '',
      })

      setCityValue(profile.city)
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
      city: selectedCity,
      dateOfBirth: inputFields?.calendar,
      firstName: inputFields.firstName,
      lastName: inputFields.lastName,
      userName: inputFields.userName,
    })
      .unwrap()
      .then(() =>
        toast.success(t.toast.profileSaveChanges, {
          pauseOnHover: false,
          style: {
            background: '#0A6638',
            border: '1px solid #14CC70',
            color: 'white',
            fontSize: '14px',
          },
        })
      )
      .catch(() =>
        toast.error(t.toast.profileError, {
          pauseOnHover: false,
          style: {
            background: '#660A1D',
            border: '1px solid #CC1439',
            color: 'white',
            fontSize: '14px',
          },
        })
      )
  })

  return {
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
    profile,
    register,
    t,
    updateProfileHandler,
  }
}
