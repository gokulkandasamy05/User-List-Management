import React, { useEffect, useMemo, useRef, useState } from 'react'
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
import { FETCH_USERS_SUCCESS } from '../redux/types';

const perPage = 5

const UserList = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const responseData = useSelector(state => state?.User)
  const [copyOforiginalData, setCopyOfOriginalData] = useState([])
  const [usersList, setUsersList] = useState({})

  const [view, setView] = useState('Table')
  const [modalOpen, isModalOpen] = useState({
    isOpen: false,
    editData: {}
  })
  const [deleteModal, seDeleteModal] = useState({
    isOpen: false,
    deleteData: {}
  })


  useEffect(() => {
    dispatch(fetchUsers(50));
  }, []);


  useEffect(() => {
    if (copyOforiginalData?.length) {
      const users = showUserPerPage(copyOforiginalData, 1)
      setUsersList(p => {
        return { ...p, users: users, count: copyOforiginalData?.length }
      })
    }
  }, [copyOforiginalData])

  useEffect(() => {
    if (responseData) {
      const _data = [...responseData?.users]
      setCopyOfOriginalData(_data)
    }
  }, [responseData])


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
            <Button type="primary" danger onClick={() => toggleDeleteModal(record)}>Delete</Button>
          </Space>
      },
    ]
  }, []);

  const setListView = (val) => {
    setView(val)
  }



  //pagination
  const showUserPerPage = (list, val = 1) => {
    if (list?.length) {
      const slicedData = list.slice(
        (val - 1) * perPage,
        val * perPage
      );
      return slicedData
    }
  }

  const onPageClick = (val) => {
    let users = showUserPerPage(copyOforiginalData, val)
    setUsersList(p => {
      return { ...p, users: users }
    })
  }



  //filter
  const filerUserList = (searchText = '') => {
    let user_data = [...responseData?.users]
    if (user_data?.length && !!searchText) {
      const value = !!searchText ? searchText.toLowerCase() : ''
      const filteredData = user_data.filter(item => (item.first_name.toLowerCase().includes(value) || item.last_name.toLowerCase().includes(value)))
      setCopyOfOriginalData(filteredData)
    }else{
      setCopyOfOriginalData([...responseData?.users])
    }
  }

  const onSearchClick = (val) => {
    if (val) {
      filerUserList(val)
    } else {
      toast.error('Please enter value')
    }
  }

  const getDebounceValue = (val) => {
    if (!!val) {
      filerUserList(val)
    } else {
      setCopyOfOriginalData([...responseData?.users])
    }
  }


  const toggleDeleteModal = (data = {}) => {
    seDeleteModal(p => {
      return { ...p, isOpen: !p.isOpen, deleteData: data }
    })
  }


  //form
  const addUser = (data) => {
    const arr = responseData?.users
    arr.unshift(data)
    dispatch({ type: FETCH_USERS_SUCCESS, payload: { users: arr } })
  }

  const editUser = (data, _id) => {
    const arr = responseData?.users
    let modifiedArr = arr.map(item => {
      if ((+item?.id) === (+_id)) {
        return { ...data }
      }
      return item
    })
    dispatch({ type: FETCH_USERS_SUCCESS, payload: { users: modifiedArr } })
  }

  const deleteUser = (_id) => {
    let a = responseData.users.filter(item => item?.id !== _id)
    dispatch({ type: FETCH_USERS_SUCCESS, payload: { users: a } })
  }

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

  const submitForm = async (values) => {
    dispatch(setLoadingTrue())
    const _id = modalOpen?.editData?.id
    let res = !!_id ? Axios.put(`/users/${_id}`, values) : Axios.post('/users', values)
    res.then(res => {
      console.log(res)
      const status = res?.status
      if (_id && status === 200) {
        editUser(res?.data, _id)
        toast.success('User Updated Successfully')
      } else if (!(!!_id) && status === 201) {
        addUser(res?.data)
        toast.success('User Created Successfully')
      }
    }).catch(err => {
      console.log(err)
      toast.error('Something Went Wrong')
    }).finally(() => {
      dispatch(setLoadingFalse())
      openModal('')
    })
  }

  const handleDelete = () => {
    dispatch(setLoadingTrue())
    const _id = deleteModal?.deleteData?.id
    if (_id) {
      Axios.delete(`/users/${_id}`).then(res => {
        console.log(res);
        if (res?.status === 204) {
          deleteUser(_id)
          toast.success('User Deleted Successfully')
        }
      }).catch(err => {
        console.log(err)
        toast.error('Something Went Wrong')
      }).finally(() => {
        dispatch(setLoadingFalse())
        toggleDeleteModal()
      })
    }
  }

console.log(copyOforiginalData, usersList);


  return (
    <>
      <div className='container'>
        <Card className='container__card'>

          <div className='container__card--header'>
            <h2>Users</h2>
            <div className='search_user'>
              <DebounceSearch getDebounceValue={getDebounceValue} onSearchClick={onSearchClick} delay={500}></DebounceSearch>
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
            view === 'Card' ? <CardView dataSource={usersList?.users} renderItem={(item) => <UserCard item={item} toggleDeleteModal={toggleDeleteModal} openModal={openModal}></UserCard>} />
              : <TableView columns={columns} dataSource={usersList?.users} />
          }

          <PaginationCom onChange={onPageClick} total={usersList?.count} perPage={perPage}></PaginationCom>

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
          layout="vertical"
          form={form}
        >

          <Form.Item
            label="First Name"
            name="first_name"
            layout="vertical"
            labelCol={{ span: 12 }}
            className='form__input'
            rules={[{ required: true, message: 'First Name is required' }]}
          >
            <Input size="large" placeholder="First Name" />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="last_name"
            layout="vertical"
            labelCol={{ span: 12 }}
            className='form__input'
            rules={[{ required: true, message: 'Last Name is required' }]}
          >
            <Input size="large" placeholder="Last Name" />
          </Form.Item>


          <Form.Item
            label="Email"
            name="email"
            className='form__input'
            layout="vertical"
            labelCol={{ span: 12 }}
            rules={[
              { required: true, message: 'Email is required' },
              { type: 'email', message: 'Please enter valid email' }
            ]}
          >
            <Input size="large" placeholder="Email" />
          </Form.Item>

          <Form.Item
            label="Profile Image Link"
            name="avatar"
            layout="vertical"
            labelCol={{ span: 12 }}
            className='form__input'
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

      <Modal
        title={'Delete User'}
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={deleteModal?.isOpen}
        onCancel={() => toggleDeleteModal()}
        footer={null}
      >
        <p>Are you sure ?</p>
        <Space>
          <Button block onClick={() => toggleDeleteModal()}>
            Cancel
          </Button>
          <Button block type="primary" onClick={handleDelete}>
            Submit
          </Button>
        </Space>
      </Modal>
    </>
  )
}

export default UserList