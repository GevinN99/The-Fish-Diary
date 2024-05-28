import React, { useEffect, useState } from "react";
import Footer from "../../Components/Footer/Footer";
import MedicImg from "../../assets/images/sample/medic.png";
import Loading from "../../Components/Loading/Loading";
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminNavbar from "../../Components/Admin/AdminNavbar";
import { Form, Input, InputNumber, message, Modal, Select } from 'antd';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import FileUpload from '../../Components/Admin/FileUpload/FileUpload';
import PreviewList from '../../Components/Admin/FileUpload/PreviewList';

export default function AdminMedication() {
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [medicData, setMedicData] = useState([]);
    const [currentMedic, setCurrentMedic] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [form] = Form.useForm();
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchMedicData = async () => {
            try {
                const res = await axios.get('http://localhost:8070/api/medics');
                setMedicData(res.data);
            } catch (error) {
                message.error('Failed to fetch medic data');
            } finally {
                setLoading(false);
            }
        };

        fetchMedicData();
    }, []);

    const showModal = (medic = null) => {
        if (medic) {
            setIsEditMode(true);
            setCurrentMedic(medic);
            form.setFieldsValue(medic);
            setImages(medic.images || []);
        } else {
            setIsEditMode(false);
            setCurrentMedic(null);
            form.resetFields();
            setImages([]);
        }
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setCurrentMedic(null);
        form.resetFields();
        setImages([]);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            values.images = images;
            if (isEditMode && currentMedic) {
                await axios.put(`http://localhost:8070/api/medics/${currentMedic._id}`, values);
                message.success('Medic updated successfully');
            } else {
                await axios.post('http://localhost:8070/api/medics', values);
                message.success('Medic added successfully');
            }
            handleCancel();
            setLoading(true);
            const res = await axios.get('http://localhost:8070/api/medics');
            setMedicData(res.data);
            setLoading(false);
        } catch (error) {
            message.error('Operation failed');
        }
    };

    const handleDelete = async (medicId) => {
        try {
            await axios.delete(`http://localhost:8070/api/medics/${medicId}`);
            message.success('Medic deleted successfully');
            setLoading(true);
            const res = await axios.get('http://localhost:8070/api/medics');
            setMedicData(res.data);
            setLoading(false);
        } catch (error) {
            message.error('Failed to delete medic');
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="overflow-hidden">
            <AdminNavbar activeKey="ad-medication" />
            <div className="vh-100" style={{ paddingTop: 64 }}>
                <div className="row m-4">
                    <div className="col d-flex justify-content-center align-items-center">
                        <div className="btn btn-warning p-2 fs-5 fw-bold btn btn-warning p-2 fs-5 fw-bold"
                             onClick={() => showModal()}>Add New Medic
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row m-4">
                        {medicData.map(medic => (
                            <div key={medic._id} className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 mb-4">
                                <div className="card">
                                    <img src={medic.images[0] || MedicImg} className="card-img-top" alt="Medic" />
                                    <div className="card-body">
                                        <h5 className="card-title">{medic.name}</h5>
                                        <p className="card-text">Rs. {medic.price}</p>
                                        <div className="btn btn-success" onClick={() => showModal(medic)}>Update</div>
                                        <div className="btn btn-danger mx-3"
                                             onClick={() => handleDelete(medic._id)}>Delete
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Modal
                title={isEditMode ? "Update Medic" : "Add New Medic"}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                width={1000}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                        <ReactQuill theme="snow" />
                    </Form.Item>
                    <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please input the price' }]}>
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                    {/* File upload and preview components */}
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
                </Form>
            </Modal>
            <Footer />
        </div>
    );
}
