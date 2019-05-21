import { useState } from 'react'
import { useStateValue } from '../../index'
import {
  login
} from '../actions'

const useProducts = () => {
  const [{auth}, dispatch] = useStateValue()
  const [isLoading, setIsLoading] = useState(false)

  const formData = async ({values, actions}) => {
    setIsLoading(true)

    setIsLoading(false)
    if (values.username !== '' && values.password !== '') {
      dispatch(login())
    }
  }

  return [auth, formData, isLoading]
}

export default useProducts
