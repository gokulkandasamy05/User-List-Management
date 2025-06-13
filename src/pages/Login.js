import '../styles/login.scss'
import { Button, Card, Checkbox, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Axios from '../utils/axios';
import { useDispatch } from 'react-redux';
import { setLoadingFalse, setLoadingTrue } from '../redux/actions/loaderActions';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  
  const submitForm = (values) => {
    const { remember, ...body } = values
    dispatch(setLoadingTrue())
    Axios.post('/login', body)
      .then(res => {
        const responseData = res?.data
        console.log(responseData)
        if (!!responseData) {
          localStorage.setItem(process.env.REACT_APP_LOGIN_TOKEN, JSON.stringify(responseData))
          navigate('/user_list')
        }
      })
      .catch(err => {
        console.log(err)
        dispatch(setLoadingFalse())
      })
  };


  return (
    <>
      <div className='login'>
        <Card className='login__form'>
          <Form
            name="basic"
            labelCol={{ span: 0 }}
            wrapperCol={{ span: 24 }}
            style={{ maxWidth: 800 }}
            initialValues={{ remember: true }}
            onFinish={submitForm}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Email is requred' },
                { type: 'email', message: 'Please enter valid email' }
              ]}
              className='login__form--input'
            >
              <Input size="large" placeholder="Email" prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Password is required' }]}
              className='login__form--input'
            >
              <Input.Password size="large" placeholder="Password" prefix={<LockOutlined />} />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" label={null}>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item label={null}>
              <Button block type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  )
}

export default Login
