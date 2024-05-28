import React, {useEffect, useState} from "react";
import {Button, Form, Input, message, Modal, Select, Table} from "antd";
import axios from "axios";
import AdminNavbar from "../../Components/Admin/AdminNavbar";
import Loading from "../../Components/Loading/Loading";
import Footer from "../../Components/Footer/Footer";

const {Option} = Select;

const AdminDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:8070/api/users");
                const filteredUsers = res.data.filter(user => user._id !== localStorage.getItem('userId'));
                setUsers(filteredUsers);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching users: ", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleEdit = (user) => {
        setSelectedUser(user);
        setVisible(true);
        form.setFieldsValue({
            name: user.name,
            email: user.email,
            role: user.role,
        });
    };

    const handleUpdate = async (values) => {
        try {
            await axios.put(`http://localhost:8070/api/users/${selectedUser._id}`, values);
            message.success("User updated successfully");
            setVisible(false);
            const res = await axios.get("http://localhost:8070/api/users");
            const filteredUsers = res.data.filter(user => user._id !== localStorage.getItem('userId'));
            setUsers(filteredUsers);
        } catch (error) {
            message.error("Failed to update user");
            console.error("Error updating user: ", error);
        }
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <Button type="primary" onClick={() => handleEdit(record)}>
                    Edit
                </Button>
            ),
        },
    ];

    if (loading) {
        return <Loading/>;
    }

    return (
        <div className="overflow-hidden">
            <AdminNavbar activeKey="dash"/>
            <div className="vh-100" style={{paddingTop: 64}}>

                <h1 className="text-center m-3 p-3 border border-0 shadow shadow-lg rounded-5">
                    <span className="text-danger">Admin </span>
                    <span className="text-success"> Dashboard</span>
                </h1>

                <div>
                    <Table
                        dataSource={users}
                        columns={columns}
                        rowKey="_id"
                        pagination={{pageSize: 10}}
                    />
                </div>
                <Modal
                    title="Edit User"
                    visible={visible}
                    onCancel={() => setVisible(false)}
                    footer={null}
                >
                    <Form form={form} onFinish={handleUpdate}>
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{required: true, message: "Please enter name"}]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{required: true, message: "Please enter email"}]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label="Role"
                            name="role"
                            rules={[{required: true, message: "Please select role"}]}
                        >
                            <Select>
                                <Option value="user">User</Option>
                                <Option value="admin">Admin</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Update
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
            <Footer/>
        </div>
    );
};

export default AdminDashboard;
