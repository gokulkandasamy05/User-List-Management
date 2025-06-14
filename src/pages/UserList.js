import React, { useEffect, useMemo, useState } from 'react'
import '../styles/user.scss'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../redux/actions/userActions';
import { Button, Card, Space, Input, Segmented, Avatar, Popconfirm, Modal, Form } from 'antd';
import { AppstoreOutlined, TableOutlined } from '@ant-design/icons';
import CardView from '../components/CardView';
import TableView from '../components/TableView';
import Axios from '../utils/axios';
import { setLoadingFalse, setLoadingTrue } from '../redux/actions/loaderActions';
import { toast } from 'react-toastify';
import PaginationCom from '../components/Pagination';
import UserCard from '../components/user/UserCard';
import DebounceSearch from '../components/common/DebounceSearch';


const UserList = () => {
  const dispatch = useDispatch();
  const responseData = useSelector(state => state?.User)
  const [form] = Form.useForm();
  const [usersList, setUsersList] = useState({})
  const [view, setView] = useState('Table')
  const [modalOpen, isModalOpen] = useState({
    isOpen: false,
    editData: {}
  })


  const columns = useMemo(() => {
    return [
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
          <Space>
            <Button type="primary" onClick={() => openModal(record)}>Edit</Button>
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
              <Button type="primary" danger>Delete</Button>
            </Popconfirm>
          </Space>
      },
    ]
  }, []);

  useEffect(() => {
    if (responseData) {
      setUsersList({ ...responseData })
    }
  }, [responseData])

  useEffect(() => {
    dispatch(fetchUsers(1));
  }, []);



  const openModal = (data = {}) => {
    form.setFieldsValue({
      email: data?.email ?? '',
      first_name: data?.first_name ?? '',
      last_name: data?.last_name ?? '',
      avatar: data?.avatar ?? '',
      id: data?.id ?? ''
    });
    isModalOpen(p => {
      return { ...p, isOpen: !p.isOpen, editData: data }
    })
  }


  const onChange = (val) => {
    dispatch(fetchUsers(val));
  }

  const onSearchClick = (val) => {
    filerUserList(val)
  }

  const setListView = (val) => {
    setView(val)
  }

  const handleDelete = (val) => {
    dispatch(setLoadingTrue())
    Axios.delete(`/users/${val}`).then(res => {
      console.log(res);
      if (res?.status === 204) {
        toast.success('User Deleted Successfully')
        dispatch(fetchUsers(1));
      }
    }).catch(err => {
      console.log(err)
      toast.error('Something Went Wrong')
    }).finally(() => {
      dispatch(setLoadingFalse())
    })
  }

  const filerUserList = (searchText = '') => {
    let user_data = responseData?.users
    if (user_data?.length) {
      const value = !!searchText ? searchText.toLowerCase() : ''
      const filteredData = user_data.filter(item => item.first_name.toLowerCase().includes(value) || item.last_name.toLowerCase().includes(value))
      setUsersList(p => {
        return { ...p, users: filteredData, count: filteredData?.length ?? 0, totalPages: 1 }
      })
    }
  }


  const submitForm = async (values) => {
    dispatch(setLoadingTrue())
    const _id = modalOpen?.editData?.id
    let res = !!_id ? Axios.put(`/users/${_id}`, values) : Axios.post('/users', values)
    res.then(res => {
      console.log(res)
      const status = res?.status
      if (_id && status === 200) {
        toast.success('User Updated Successfully')
      } else if (!(!!_id) && status === 201) {
        toast.success('User Created Successfully')
      }
      dispatch(fetchUsers(1));
    }).catch(err => {
      console.log(err)
      toast.error('Something Went Wrong')
    }).finally(() => {
      dispatch(setLoadingFalse())
      openModal('')
    })
  }


  const getDebounceValue = (val) => {
    if (val) {
      filerUserList(val)
    } else {
      setUsersList({ ...responseData })
    }
  }

  return (
    <>
      <div className='container'>
        <Card className='container__card'>

          <div className='container__card--header'>
            <h2>Users</h2>
            <div className='search_user'>
              <DebounceSearch getDebounceValue={getDebounceValue} onSearchClick={onSearchClick}></DebounceSearch>
              <Button type="primary" onClick={() => openModal()}>Create User</Button>
            </div>
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



          {
            view === 'Card' ?
              <CardView dataSource={usersList?.users} renderItem={(item) => <UserCard item={item} handleDelete={handleDelete} openModal={openModal}></UserCard>} />
              : <TableView columns={columns} dataSource={usersList?.users} />
          }


          <PaginationCom onChange={onChange} current={usersList?.currentPage} total={usersList?.count}></PaginationCom>


        </Card>
      </div>

      <Modal
        title={!!modalOpen?.editData?.id ? 'Edit User' : "Create New User"}
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={modalOpen?.isOpen}
        onCancel={() => openModal()}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{ span: 0 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 800, marginTop: '2rem' }}
          initialValues={{ first_name: '', last_name: '', email: '', avatar: '' }}
          onFinish={submitForm}
          autoComplete="off"
          form={form}
        >

          <Form.Item
            label="First Name"
            name="first_name"
            rules={[{ required: true, message: 'First Name is required' }]}
          >
            <Input size="large" placeholder="First Name" />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[{ required: true, message: 'Last Name is required' }]}
          >
            <Input size="large" placeholder="Last Name" />
          </Form.Item>


          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Email is requred' },
              { type: 'email', message: 'Please enter valid email' }
            ]}
          >
            <Input size="large" placeholder="Email" />
          </Form.Item>

          <Form.Item
            label="Profile Image Link"
            name="avatar"
            rules={[{ required: true, message: 'Profile Image Link is required' }]}
          >
            <Input size="large" placeholder="Profile Image Link" />
          </Form.Item>

          <Form.Item label={null}>
            <div style={{ float: 'right' }}>
              <Space>
                <Button block onClick={() => openModal()}>
                  Cancel
                </Button>
                <Button block type="primary" htmlType="submit">
                  Submit
                </Button>
              </Space>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default UserList