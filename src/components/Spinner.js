import { Spin } from 'antd'
import '../styles/spinner.scss'
import React from 'react'

const Spinner = () => {
    return (
        <div className='spinner'>
            <Spin fullscreen size="large"/>
        </div>
    )
}

export default Spinner