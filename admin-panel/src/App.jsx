import { Layout, Menu } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";

const { Content, Sider } = Layout;

const App = () => {
  const location = useLocation();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item key="/">
              <Link to="/">Rooms</Link>
            </Menu.Item>
            <Menu.Item key="/movies">
              <Link to="/movies">Movies</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
