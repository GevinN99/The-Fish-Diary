import React, { useEffect, useState } from "react";
import Footer from "../../Components/Footer/Footer";
import TankImg from "../../assets/images/sample/tank.png";
import Loading from "../../Components/Loading/Loading";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Input, InputNumber, message, Modal, Select } from 'antd';
import axios from 'axios';
import AdminNavbar from "../../Components/Admin/AdminNavbar";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import FileUpload from '../../Components/Admin/FileUpload/FileUpload';
import PreviewList from '../../Components/Admin/FileUpload/PreviewList';

export default function AdminTanks() {
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [tanks, setTanks] = useState([]);
    const [currentTank, setCurrentTank] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [form] = Form.useForm();
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchTanks = async () => {
            try {
                const res = await axios.get('http://localhost:8070/api/tanks');
                setTanks(res.data);
            } catch (error) {
                message.error('Failed to fetch tank data');
            } finally {
                setLoading(false);
            }
        };

        fetchTanks();
    }, []);

    const showModal = (tank = null) => {
        if (tank) {
            setIsEditMode(true);
            setCurrentTank(tank);
            form.setFieldsValue(tank);
            setDescription(tank.description || '');
            setImages(tank.images || []);
        } else {
            setIsEditMode(false);
            setCurrentTank(null);
            form.resetFields();
            setDescription('');
            setImages([]);
        }
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setCurrentTank(null);
        form.resetFields();
        setDescription('');
        setImages([]);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            values.description = description;
            values.images = images;
            if (isEditMode && currentTank) {
                await axios.put(`http://localhost:8070/api/tanks/${currentTank._id}`, values);
                message.success('Tank updated successfully');
            } else {
                await axios.post('http://localhost:8070/api/tanks', values);
                message.success('Tank added successfully');
            }
            handleCancel();
            const res = await axios.get('http://localhost:8070/api/tanks');
            setTanks(res.data);
        } catch (error) {
            message.error('Operation failed');
        }
    };

    const handleDelete = async (tankId) => {
        try {
            await axios.delete(`http://localhost:8070/api/tanks/${tankId}`);
            message.success('Tank deleted successfully');
            const res = await axios.get('http://localhost:8070/api/tanks');
            setTanks(res.data);
        } catch (error) {
            message.error('Failed to delete tank');
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="overflow-hidden">
            <AdminNavbar activeKey="ad-tanks" />
            <div className="vh-100" style={{ paddingTop: 64 }}>
                <div className="row m-4">
                    <div className="col d-flex justify-content-center align-items-center">
                        <div className="btn btn-warning p-2 fs-5 fw-bold btn btn-warning p-2 fs-5 fw-bold"
                             onClick={() => showModal()}>Add New Tank
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row m-4">
                        {tanks.map(tank => (
                            <div key={tank._id} className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 mb-4">
                                <div className="card">
                                    <img src={tank.images[0] || TankImg} className="card-img-top" alt="Tank" />
                                    <div className="card-body">
                                        <h5 className="card-title">{tank.name}</h5>
                                        <p className="card-text">Rs. {tank.price}</p>
                                        <div className="btn btn-success" onClick={() => showModal(tank)}>Update</div>
                                        <div className="btn btn-danger mx-3"
                                             onClick={() => handleDelete(tank._id)}>Delete
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Modal
                title={isEditMode ? "Update Tank" : "Add New Tank"}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                width={1000}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="size" label="Size" rules={[{ required: true, message: 'Please input the size' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                        <ReactQuill
                            value={description}
                            onChange={setDescription}
                            placeholder="Enter description"
                        />
                    </Form.Item>
                    <Form.Item name="images" label="Images">
                        <FileUpload onUploadSuccess={(url) => setImages([...images, url])} />
                        <PreviewList images={images} onRemove={(url) => setImages(images.filter(imgUrl => imgUrl !== url))} />
                    </Form.Item>
                    <Form.Item name="stock" label="Stock">
                        <Select>
                            <Select.Option value="available">Available</Select.Option>
                            <Select.Option value="not available">Not Available</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please input the price' }]}>
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                </Form>
            </Modal>
            <Footer />
        </div>
    );
}
