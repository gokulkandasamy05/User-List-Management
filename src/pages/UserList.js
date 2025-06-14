import React, { useEffect, useRef, useState } from 'react'
import '../styles/user.scss'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../redux/actions/userActions';
import { Avatar, Button, Card, Popconfirm, Space, Table, Input, Segmented, Pagination } from 'antd';
import { AppstoreOutlined, TableOutlined } from '@ant-design/icons';
import CardView from '../components/CardView';
const { Search } = Input;

const columns = [
  {
    title: '',
    dataIndex: 'avatar',
    key: 'avatar',
    width: 180,
    render: (_, record) =>
      <Avatar size={50} alt='Avatar' src={record?.avatar ?? ''} />
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'First Name',
    dataIndex: 'first_name',
    key: 'first_name',
  },
  {
    title: 'Last Name',
    dataIndex: 'last_name',
    key: 'last_name',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) =>
      <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
        <Space>
          <Button type="primary">Edit</Button>
          <Button type="primary" danger>Delete</Button>
        </Space>
      </Popconfirm>
  },
];

const handleDelete = () => {

}

const UserList = () => {
  const dispatch = useDispatch();
  const responseData = useSelector(state => state?.User)

  const [usersList, setUsersList] = useState({})
  const [view, setView] = useState('Table')
  const timer = useRef(null)

  useEffect(() => {
    if (responseData) {
      setUsersList({ ...responseData })
    }
  }, [responseData])

  useEffect(() => {
    dispatch(fetchUsers(1));
  }, []);

  const onChange = (val) => {
    dispatch(fetchUsers(val));
  }

  const onSearch = (val) => {
    filerUserList(val)
  }

  const setListView = (val) => {
    setView(val)
  }

  const filerUserList = (searchText) => {
    let user_data = responseData?.users
    if (user_data?.length) {
      const filteredData = user_data.filter(item => item.first_name.includes(searchText) || item.last_name.includes(searchText))
      setUsersList(p => {
        return { ...p, users: filteredData, count: filteredData?.length ?? 0, totalPages: 1 }
      })
    }
  }

  const searchOnChange = (val) => {
    if (!!timer?.current) {
      clearTimeout(timer.current)
    }
    timer.current = setTimeout(() => {
      const value = val?.target?.value
      if (value) {
        filerUserList(value)
      } else {
        setUsersList({ ...responseData })
      }
    }, 1000)
  }

  return (
    <div className='container'>
      <Card className='container__card'>

        <div className='container__card--header'>
          <h2>Users</h2>
          <Space>
            <Search className='search' placeholder="input search text" onChange={searchOnChange} onSearch={onSearch} style={{ width: 200 }} />
            <Button type="primary">Create User</Button>
          </Space>
        </div>
        <Segmented
          className="custom-segmented"
          value={view}
          style={{ marginBottom: 8 }}
          onChange={setListView}
          options={[
            {
              label: (
                <span>
                  <TableOutlined /> Table
                </span>
              ),
              value: 'Table',
            },
            {
              label: (
                <span>
                  <AppstoreOutlined /> Card
                </span>
              ),
              value: 'Card',
            },
          ]}
        />

        {view === 'Card' ? <CardView dataSource={usersList?.users}></CardView> : <Table pagination={false} columns={columns} dataSource={usersList?.users} scroll={{ x: 'max-content' }} />}
        <div className='pagination'>
          <Pagination  onChange={onChange} current={usersList?.currentPage} defaultCurrent={1} total={usersList?.count} />;
        </div>
      </Card>
    </div>
  )
}

export default UserList