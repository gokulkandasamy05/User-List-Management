
import '../styles/layout.scss'
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
const { Header, Content } = Layout;


const LayoutSec = () => {
  return (
    <div className='layout'>
      <Layout>
        <Header className='layout__haeder'>
          <div className='layout__haeder--content'>
            <p>test</p>
            <LoginOutlined style={{color:'red', fontSize:'1.5rem', cursor:'pointer'}}/>
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
