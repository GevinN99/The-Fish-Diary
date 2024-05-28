import React, { useState } from 'react';
import { Button, Form, Input, message, Card } from 'antd';
import axios from 'axios';
import { GoogleOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import '../App.css';

const Signup = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8070/api/auth/register', values);
            message.success('Registration successful!');
            navigate('/login');
        } catch (error) {
            console.error(error);
            message.error(error.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    const googleAuth = () => {
        window.location.href = 'http://localhost:8070/api/auth/google';
    };

    return (
        <div className="overflow-hidden">
            <Navbar activeKey="signup" />
            <div className="signup-container">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <Card className="signup-card">
                                <h2 className="text-center mb-4">Sign Up</h2>
                                <Form name="signup" onFinish={onFinish} layout="vertical">
                                    <Form.Item
                                        label="Name"
                                        name="name"
                                        rules={[{ required: true, message: 'Please input your name!' }]}
                                    >
                                        <Input />
                                    </Form.Item>
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
                                            Sign Up
                                        </Button>
                                    </Form.Item>
                                </Form>
                                <Button type="default" icon={<GoogleOutlined />} onClick={googleAuth} block>
                                    Sign Up with Google
                                </Button>
                                <div className="text-center mt-3">
                                    <p>Already have an account? <Link to="/login">Login here</Link></p>
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

export default Signup;
