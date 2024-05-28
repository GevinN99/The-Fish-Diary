import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Layout, Menu, message, theme} from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavLogo from '../../assets/images/NavLogo.png';
import {UserOutlined} from "@ant-design/icons";

const {Header} = Layout;

export default function AdminNavbar({activeKey}) {
    const navigate = useNavigate();
    const userRole = localStorage.getItem('role');

    const {
        token: {colorBgContainer},
    } = theme.useToken();

    if (userRole !== 'admin') {
        navigate('/');
    }

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('role');
        navigate('/');
        message.success('Logout successful');
    };

    const determineActiveKey = () => {
        return activeKey;
    };

    return (
        <Header style={{position: 'fixed', zIndex: 1, width: '100%', backgroundColor: colorBgContainer, padding: 0}}>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[determineActiveKey()]} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Menu.Item key="logo">
                    <img src={NavLogo} alt="logo" style={{height: '30px'}}/>
                </Menu.Item>
                <Menu.Item key="dash" onClick={() => navigate('/admin')}>
                    <b>Dashboard</b>
                </Menu.Item>
                <Menu.Item key="ad-livestock" onClick={() => navigate('/ad-livestock')}>
                    <b>Livestock</b>
                </Menu.Item>
                <Menu.Item key="ad-tanks" onClick={() => navigate('/ad-tanks')}>
                    <b>Tanks & Setups</b>
                </Menu.Item>
                <Menu.Item key="ad-medication" onClick={() => navigate('/ad-medication')}>
                    <b>Medication & Conditioner</b>
                </Menu.Item>
                <Menu.Item key="ad-other" onClick={() => navigate('/ad-other')}>
                    <b>Other Items</b>
                </Menu.Item>
                <Menu.Item key="ad-orders" onClick={() => navigate('/ad-orders')} style={{ marginLeft: 'auto' }}>
                    <b>Orders</b>
                </Menu.Item>
                <Menu.Item key="ad-profile" onClick={() => navigate('/ad-profile')}>
                    <b><UserOutlined style={{fontSize: '20px'}}/></b>
                </Menu.Item>
                <Menu.Item key="logout" danger onClick={handleLogout}>
                    <b>Logout</b>
                </Menu.Item>
            </Menu>
        </Header>
    );
}
