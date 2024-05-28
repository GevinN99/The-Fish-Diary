import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Layout, Menu, message, theme} from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavLogo from '../../assets/images/NavLogo.png';
import {ShoppingCartOutlined, UserOutlined} from "@ant-design/icons";

const {Header} = Layout;

export default function Navbar({activeKey}) {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('userId') && localStorage.getItem('token');
    const userName = localStorage.getItem('name');
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        navigate('/');
        message.success('Logout successful');
    };

    const determineActiveKey = () => {
        return (activeKey);
    };

    return (
        <Header style={{position: 'fixed', zIndex: 1, width: '100%', backgroundColor: "colorBgContainer", padding: 0}}>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[determineActiveKey()]} style={{float: 'right'}}>
                {isLoggedIn ? (
                    <>
                        <Menu.Item key="profile" onClick={() => navigate('/profile')}>
                            <b><UserOutlined style={{fontSize:'20px'}} /></b>
                        </Menu.Item>
                        <Menu.Item key="cart" onClick={() => navigate('/cart')}>
                            <b><ShoppingCartOutlined style={{fontSize:'20px'}} /></b>
                        </Menu.Item>
                        <Menu.Item key="logout" danger onClick={handleLogout}>
                            <b>Logout</b>
                        </Menu.Item>
                    </>
                ) : (
                    <>
                        <Menu.Item key="cart" onClick={() => navigate('/cart')}>
                            <b><ShoppingCartOutlined style={{fontSize:'20px'}} /></b>
                        </Menu.Item>
                        <Menu.Item key="login" onClick={() => navigate('/login')}>
                            <b>Login</b>
                        </Menu.Item>
                        <Menu.Item key="signup" onClick={() => navigate('/signup')}>
                            <b>Signup</b>
                        </Menu.Item>
                    </>
                )}
            </Menu>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[determineActiveKey()]}>
                <Menu.Item key="logo">
                    <img src={NavLogo} alt="logo" style={{height: '30px'}}/>
                </Menu.Item>
                <Menu.Item key="home" onClick={() => navigate('/')}>
                    <b>Home</b>
                </Menu.Item>
                <Menu.Item key="livestock" onClick={() => navigate('/livestock')}>
                    <b>Livestock</b>
                </Menu.Item>
                <Menu.Item key="tanks" onClick={() => navigate('/tanks')}>
                    <b>Tanks & Setups</b>
                </Menu.Item>
                <Menu.Item key="medication" onClick={() => navigate('/medication')}>
                    <b>Medication & Conditioner</b>
                </Menu.Item>
                <Menu.Item key="other" onClick={() => navigate('/other')}>
                    <b>Other Items</b>
                </Menu.Item>
            </Menu>
        </Header>

    );
}
