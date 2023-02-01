import {
  AvatarInline,
  Icon,
  Layout,
  Sidebar,
} from "ebs-design";
import { ReactNode, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as BiIcons from "react-icons/bi";

import AuthContext from "../../store/auth-context";
import './Layout.css'

type LayoutProps = {
  children: ReactNode;
};

const LayoutDashboard = ({ children }: LayoutProps) => {

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    authCtx.logout();
    navigate("/login", {  replace: true });
  };

  const  [ activeTab, setActiveTab ] = useState(' ');

  const setActiveHandler = (name:string) => {
    setActiveTab(name);
  }

  return (
    <Layout>
      <Layout.Topbar>
        <Layout.Topbar.Toggler />
        <Layout.Topbar.Title>Dashboard_EBS</Layout.Topbar.Title>
        <Layout.Topbar.RightSide>
          <AvatarInline alt={authCtx.currentUser?.name} status="active" reversed />
        </Layout.Topbar.RightSide>
      </Layout.Topbar>

      <Sidebar>
        <Sidebar.TopMenu >
          <Sidebar.Item
            prefix={<Icon type="chart" model="bold"/>}
            text="Home"
            onClick={() => {navigate('/dashboard'); setActiveHandler('Home')}} 
            active={activeTab==='Home' ? true : false}
          />
          <Sidebar.Item
            prefix={<Icon type="users" model="bold"/>}
            text="Users"
            onClick={() => {navigate('/users'); setActiveHandler('Users')}}
            active={activeTab==='Users'? true : false}
          />
           <Sidebar.Item
            prefix={<Icon type="globe" model="bold"/>}
            text="Posts"
            onClick={() => {navigate('/posts'); setActiveHandler('Posts')}}
            active={activeTab==='Posts'? true : false}
          />        
        </Sidebar.TopMenu>

        <Sidebar.BottomMenu>
          <Sidebar.Item prefix={<div className="icon_layout"><BiIcons.BiLogOut/></div>} text="Logout" onClick={logoutHandler} />
        </Sidebar.BottomMenu>
      </Sidebar>
      <Layout.Content>
        <main>{children}</main>
      </Layout.Content>

    </Layout>
  );
};

export default LayoutDashboard;

