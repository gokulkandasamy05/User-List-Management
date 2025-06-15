import React from 'react'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Avatar, Card, Popconfirm, Space } from 'antd'



const UserCard = ({ item, toggleDeleteModal, openModal }) => {
    return (
        <Card
            hoverable
            className='card__view--card'
        >
            <Avatar size={80} alt='Avatar' src={item?.avatar ?? ''} />
            <p className='card__view--card-name'>{item?.first_name + ' ' + item?.last_name}</p>
            <p className='card__view--card-email'>{item?.email}</p>
            <div className='card__view--card-actions'>
                <Space>
                    <EditOutlined className='icons-edit' onClick={() => openModal(item)} />
                    <DeleteOutlined className='icons-delete' onClick={() => toggleDeleteModal(item)}/>
                </Space>
            </div>
        </Card>
    )
}

export default React.memo(UserCard)