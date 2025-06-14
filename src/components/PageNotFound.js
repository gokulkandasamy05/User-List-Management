import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
    const navigate = useNavigate()
  return (
    <div className='pageNotFound'>
        <h1>Oops! Page not found</h1>
        <Button onClick={() => navigate('/user_list')}>Got to home</Button>
    </div>
  )
}

export default PageNotFound