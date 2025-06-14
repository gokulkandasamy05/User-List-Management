import React, { useEffect } from 'react'
import { Input } from 'antd';
import useDebounce from '../../hooks/useDebounce';
const { Search } = Input;

const DebounceSearch = ({ getDebounceValue, onSearchClick }) => {
    const [debounceValue, debounceOnChange] = useDebounce(1000)
    useEffect(() => {
        getDebounceValue(debounceValue)
    }, [debounceValue])

    return (
        <Search className='search' placeholder="Search" onChange={debounceOnChange} onSearch={onSearchClick} style={{ width: '100%' }} />
    )
}

export default React.memo(DebounceSearch)