import { Col, Row } from 'antd'

const CardView = ({ dataSource, renderItem }) => {
    return (
        dataSource?.length ? <>
            <Row gutter={[16, 16]} className='card__view'>
                {
                    dataSource.map((item) => {
                        return <Col key={item?.id}
                            xs={{ flex: '100%' }}
                            sm={{ flex: '50%' }}
                            md={{ flex: '33.33%' }}
                        >
                            {renderItem(item)}
                        </Col>
                    })
                }
            </Row>
        </> : null
    )
}

export default CardView