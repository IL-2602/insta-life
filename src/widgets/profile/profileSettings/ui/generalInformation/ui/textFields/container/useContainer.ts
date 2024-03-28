import { SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useUpdateProfileMutation } from '@/services/profileService/profileEndpoints'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDebouncedCallback } from 'use-debounce'
import { z } from 'zod'

const userNameRegExp = RegExp(/^[0-9A-Za-z_-]+$/)
const firstAndLastNameRegExp = RegExp(/^[A-Za-zА-Яа-я]*$/)
const AboutMeRegExp = RegExp(/^[0-9A-Za-zА-Яа-я\W\s]*$/)

const profileSchema = z.object({
  aboutMe: z
    .string()
    .regex(AboutMeRegExp, 'About Me must contain 0-9, A-Z, a-z, А-Я, а-я and special characters')
    .trim()
    .max(200, 'Maximum number of characters 200'),
  firstName: z
    .string()
    .regex(firstAndLastNameRegExp, 'First Name must contain A-Z, a-z, А-Я, а-я')
    .trim()
    .min(1, 'Minimum number of characters 1')
    .max(50, 'Maximum number of characters 50'),
  lastName: z
    .string()
    .regex(firstAndLastNameRegExp, 'Last Name must contain A-Z, a-z, А-Я, а-я')
    .trim()
    .min(1, 'Minimum number of characters 1')
    .max(50, 'Maximum number of characters 50'),
  userName: z
    .string()
    .regex(userNameRegExp, 'Username must contain a-z, A-Z, 0-9, _, -')
    .trim()
    .min(6, 'Minimum number of characters 6')
    .max(30, 'Maximum number of characters 30'),
})

type profileFormSchema = z.infer<typeof profileSchema>

export const useContainer = () => {
  const { t } = useTranslation()

  const [cities, setCities] = useState([])
  const [cityValue, setCityValue] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
    watch,
  } = useForm<profileFormSchema>({
    defaultValues: {
      aboutMe: '',
      firstName: '',
      lastName: '',
      userName: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(profileSchema),
  })

  const errorUserName = errors.userName?.message
  const errorFirstName = errors.firstName?.message
  const errorLastName = errors.lastName?.message
  const errorAboutMe = errors.aboutMe?.message

  const userName = watch('userName')
  const firstName = watch('firstName')
  const lastName = watch('lastName')
  const aboutMe = watch('aboutMe')

  const isDisabled = !userName || !firstName || !lastName || !Object.keys(errors)

  const [updateProfile, { isLoading }] = useUpdateProfileMutation()

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
      aboutMe,
      city: selectedCity,
      firstName,
      lastName,
      userName,
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
