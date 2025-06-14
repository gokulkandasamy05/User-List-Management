import {Table } from 'antd'

const TableView = ({dataSource, columns}) => {
  return (
    <Table pagination={false} columns={columns} dataSource={dataSource} scroll={{ x: 'max-content' }} />
  )
}

export default TableView