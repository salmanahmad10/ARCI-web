import React from 'react'
import { Layout, Menu } from 'antd';
import '../app.css';
import { Link } from 'react-router-dom'

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

class Sidebar extends React.Component {




  render() {
    return (
      <Layout style={{}}>
        <Sider theme="light" >
          <Menu defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" >
              <Link to="/">DashBoard</Link>
            </Menu.Item>

            <SubMenu key="sub1" title="Setting">
              <Menu.Item key="3"><Link to="/linkedin_setting">LinkedIn</Link></Menu.Item>
              <Menu.Item key="3"><Link to="/pubmed_setting">Pubmed</Link></Menu.Item>

            </SubMenu>
            <SubMenu key="sub2" title="Status">
              <Menu.Item key="6"><Link to="/linkedin_status">LinkedIn</Link></Menu.Item>
              <Menu.Item key="6"><Link to="/pubmed_status">Pubmed</Link></Menu.Item>
              <Menu.Item key="8"><Link to="/scheduler">Scheduler</Link></Menu.Item>
            </SubMenu>
            <Menu.Item key="9" />
          </Menu>
        </Sider>
        <Layout className="site-layout">

          <Content style={{ margin: '0 16px' }}>

            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              {this.props.children}
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Sidebar