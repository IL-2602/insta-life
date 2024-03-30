import { SetStateAction, useEffect, useState } from 'react'

import { useUpdateProfileMutation } from '@/services/profileService/profileEndpoints'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { useProfileSettingsForm } from '@/widgets/profile/profileSettings/ui/generalInformation/ui/textFields/hooks/useProfileSettingsForm'
import { useDebouncedCallback } from 'use-debounce'

export const useContainer = () => {
  const { t } = useTranslation()

  const [cities, setCities] = useState([])
  const [cityValue, setCityValue] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [isFetchSuccess, setIsFetchSuccess] = useState(false)

  const [updateProfile, { isLoading, isSuccess }] = useUpdateProfileMutation()

  const { control, errors, handleSubmit, watch } = useProfileSettingsForm()

  const errorUserName = errors.userName?.message
  const errorFirstName = errors.firstName?.message
  const errorLastName = errors.lastName?.message
  const errorAboutMe = errors.aboutMe?.message

  const inputFields = {
    aboutMe: watch('aboutMe'),
    firstName: watch('firstName'),
    lastName: watch('lastName'),
    userName: watch('userName'),
  }

  const isDisabled =
    !inputFields.userName ||
    !inputFields.firstName ||
    !inputFields.lastName ||
    !Object.keys(errors) ||
    isFetchSuccess

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
  }, 250)

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
      setDropdownOpen(false)
      setCities([])
    }
  }

  useEffect(() => {
    if (cities) {
      setDropdownOpen(true)
    }
  }, [setDropdownOpen, cities])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownOpen])

  const updateProfileHandler = handleSubmit(() => {
    updateProfile({
      aboutMe: inputFields.aboutMe,
      city: selectedCity,
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
    cityValue,
    control,
    dropdownOpen,
    errorAboutMe,
    errorFirstName,
    errorLastName,
    errorUserName,
    handleCityChange,
    handleOptionClick,
    isDisabled,
    isLoading,
    t,
    updateProfileHandler,
  }
}
