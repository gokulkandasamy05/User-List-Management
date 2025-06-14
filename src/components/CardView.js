import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Avatar, Card, Col, Popconfirm, Row, Space } from 'antd'

const CardView = ({ dataSource, handleDelete, openModal }) => {
    return (
        dataSource?.length ? <>
            <Row gutter={[16, 16]} className='card__view'>
                {
                    dataSource.map(item => {
                        return <Col key={item?.id}
                            xs={{ flex: '100%' }}
                            sm={{ flex: '50%' }}
                            md={{ flex: '33.33%' }}
                            style={{ textAlign: 'center' }}
                        >
                            <Card
                                hoverable
                                className='card__view--card'
                            >
                                <Avatar size={80} alt='Avatar' src={item?.avatar ?? ''} />
                                <p className='card__view--card-name'>{item?.first_name + ' ' + item?.last_name}</p>
                                <p className='card__view--card-email'>{item?.email}</p>
                                <div className='card__view--card-actions'>
                                    <Space>
                                        <EditOutlined className='icons-edit' onClick={() =>openModal(item)}/>
                                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(item.id)}>
                                            <DeleteOutlined className='icons-delete' />
                                        </Popconfirm>
                                    </Space>
                                </div>
                            </Card>

                        </Col>
                    })
                }
            </Row>
        </> : null
    )
}

export default CardView