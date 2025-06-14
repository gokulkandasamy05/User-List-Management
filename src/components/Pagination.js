import { Pagination } from 'antd'
import React from 'react'

const PaginationCom = ({onChange, current, total}) => {
    return (
        <div className='pagination'>
            <Pagination onChange={onChange} current={current} defaultCurrent={1} total={total} />
        </div>
    )
}

export default React.memo(PaginationCom)