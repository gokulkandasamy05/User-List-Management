import { useEffect, useState } from 'react'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'


const PaginationCom = ({ onChange, total, perPage = 5 }) => {


    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)


    useEffect(() => {
        setTotalPages(Math.ceil(total / perPage))
    }, [total])


    useEffect(() => {
        if (currentPage) {
            onChange(currentPage)
        }
    }, [currentPage])

    console.log(totalPages);
    


    return (
        !!totalPages && <div className="pagination">
            <Button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} icon={<LeftOutlined />} />

            <Space>
                {Array.from({ length: totalPages }, (_, i) => (
                    <Button className={currentPage === (i + 1) ? 'active' : ''} key={i} onClick={() => setCurrentPage(i + 1)}>{i + 1}</Button>
                ))}
            </Space>

            <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} icon={<RightOutlined />} />

        </div>

    )
}

export default PaginationCom