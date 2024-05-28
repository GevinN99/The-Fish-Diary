import React, {useEffect, useState} from 'react';
import {Avatar, Button, Card, Col, Form, Input, message, Row} from 'antd';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {Tilt} from 'react-tilt';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loading from "../Components/Loading/Loading";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import '../App.css';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [updating, setUpdating] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:8070/api/users/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUser(res.data);
            } catch (err) {
                message.error('Failed to fetch user profile');
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [navigate]);

    const onFinish = async (values) => {
        try {
            setUpdating(true);
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:8070/api/users/profile', values, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            message.success('Profile updated successfully');
            navigate('/');
        } catch (err) {
            message.error('Failed to update profile');
        } finally {
            setUpdating(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Loading/>;
    }

    const defaultOptions = {
        reverse: false,
        max: 35,
        perspective: 1000,
        scale: 1.3,
        speed: 1000,
        transition: true,
        axis: null,
        reset: true,
        easing: "cubic-bezier(.03,.98,.52,.99)",
    }

    return (
        <div className="overflow-hidden">
            <Navbar activeKey="profile"/>
            <div className="profile-container">
                <div className="container mt-5">
                    {user && (
                        <Row className="justify-content-center">
                            <Col md={8}>
                                <Card className="profile-card">
                                    <div className="text-center mb-4">
                                        <Tilt options={defaultOptions} style={{height: '100%'}}>
                                            <Avatar size={128} src={user.googleProfilePic} className="profile-avatar"/>
                                        </Tilt>
                                    </div>
                                    <Form
                                        name="profile"
                                        initialValues={{
                                            name: user.name,
                                            email: user.email
                                        }}
                                        onFinish={onFinish}
                                    >
                                        <Form.Item
                                            name="name"
                                            rules={[{required: true, message: 'Please input your Name!'}]}
                                        >
                                            <Input placeholder="Name"/>
                                        </Form.Item>
                                        <Form.Item
                                            name="email"
                                            rules={[{required: true, message: 'Please input your Email!'}]}
                                        >
                                            <Input placeholder="Email"/>
                                        </Form.Item>
                                        <Form.Item>
                                            <Button type="primary" htmlType="submit" loading={updating} block>
                                                Update Profile
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </Card>
                            </Col>
                        </Row>
                    )}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Profile;
