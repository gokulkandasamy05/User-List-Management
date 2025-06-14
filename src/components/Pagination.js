import { Pagination } from 'antd'

const PaginationCom = ({onChange, current, total}) => {
    return (
        <div className='pagination'>
            <Pagination onChange={onChange} current={current} defaultCurrent={1} total={total} />
        </div>
    )
}

export default PaginationCom