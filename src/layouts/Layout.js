
import '../styles/layout.scss'
import { Outlet, useNavigate } from 'react-router-dom';
import { Layout } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import { logout } from '../utils/common';
import useLoginData from '../hooks/useLoginData';
import { useEffect } from 'react';
const { Header, Content } = Layout;


const LayoutSec = () => {
  const navigate = useNavigate()
  const [user] = useLoginData()
  
  return (
    <div className='layout'>
      <Layout>
        <Header className='layout__haeder'>
          <div className='layout__haeder--content'>
            <p>test</p>
            <LoginOutlined style={{fontSize:'1rem', cursor:'pointer', padding:'8px', backgroundColor:'red', borderRadius:'5px', alignContent:'center'}} onClick={() => logout(navigate)} />
          </div>
        </Header>
        <Content className='layout__content'>
          <Outlet />
        </Content>
      </Layout>
    </div>
  );
};

export default LayoutSec;
