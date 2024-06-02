'use client'
import { useEffect } from 'react'

const ElementsInitializer = () => {
  useEffect(() => {
    const init = async () => {
      const { Ripple, initTWE } = await import('tw-elements')
      initTWE({ Ripple })
    }
    init()
  }, [])

  return null
}

export default ElementsInitializer
