import React, { useEffect, useRef, useState } from 'react'

const useDebounce = (count = 500) => {
    const timer = useRef(null)
    const [debounceValue, setDebounceValue] = useState('')

    useEffect(() => {
        return () => clearTimeout(timer.current)
    }, [])


    const debounceOnChange = (e) => {
        timer.current = setTimeout(() => {
            const text = e?.target?.value
            setDebounceValue(text)
        }, count)
    }

    return [debounceValue, debounceOnChange]
}

export default useDebounce