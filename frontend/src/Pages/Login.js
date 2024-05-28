import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Card } from 'antd';
import axios from 'axios';
import { GoogleOutlined } from '@ant-design/icons';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import '../App.css';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token');
        const userId = searchParams.get('userId');
        const name = searchParams.get('name');
        const role = searchParams.get('role');

        if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            localStorage.setItem('name', name);
            localStorage.setItem('role', role);

            message.success('Login successful');
            if (role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        }
    }, [location, navigate]);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:8070/api/auth/login', values);
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('userId', user.id);
            localStorage.setItem('name', user.name);
            localStorage.setItem('role', user.role);
            message.success('Login successful');
            if (user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (err) {
            message.error('Login failed');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:8070/api/auth/google';
    };

    return (
        <div className="overflow-hidden">
            <Navbar activeKey="login" />
            <div className="login-container">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <Card className="login-card">
                                <h2 className="text-center mb-4">Login</h2>
                                <Form name="login" onFinish={onFinish} layout="vertical">
                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Password"
                                        name="password"
                                        rules={[{ required: true, message: 'Please input your password!' }]}
                                    >
                                        <Input.Password />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" loading={loading} block>
                                            Login
                                        </Button>
                                    </Form.Item>
                                </Form>
                                <Button type="default" icon={<GoogleOutlined />} onClick={handleGoogleLogin} block>
                                    Login with Google
                                </Button>
                                <div className="text-center mt-3">
                                    <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
