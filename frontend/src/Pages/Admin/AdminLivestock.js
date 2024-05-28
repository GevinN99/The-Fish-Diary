import React, { useState, useEffect } from "react";
import Footer from "../../Components/Footer/Footer";
import FishImg from "../../assets/images/sample/fish.jpg";
import Loading from "../../Components/Loading/Loading";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Form, Input, InputNumber, message } from 'antd';
import axios from 'axios';
import ReactQuill from 'react-quill';
import AdminNavbar from "../../Components/Admin/AdminNavbar";
import FileUpload from '../../Components/Admin/FileUpload/FileUpload';
import PreviewList from '../../Components/Admin/FileUpload/PreviewList';

export default function AdminLivestock() {
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [fishData, setFishData] = useState([]);
    const [currentFish, setCurrentFish] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [form] = Form.useForm();
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchFishData = async () => {
            try {
                const res = await axios.get('http://localhost:8070/api/fish');
                setFishData(res.data);
            } catch (error) {
                message.error('Failed to fetch fish data');
            }
            setLoading(false);
        };

        fetchFishData();
    }, []);

    const showModal = (fish = null) => {
        if (fish) {
            setIsEditMode(true);
            setCurrentFish(fish);
            form.setFieldsValue(fish);
            setImages(fish.images);
        } else {
            setIsEditMode(false);
            setCurrentFish(null);
            form.resetFields();
            setImages([]);
        }
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setCurrentFish(null);
        form.resetFields();
        setImages([]);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            const updatedValues = {
                ...values,
                images: images
            };

            if (isEditMode && currentFish) {
                await axios.put(`http://localhost:8070/api/fish/${currentFish._id}`, updatedValues);
                message.success('Fish updated successfully');
            } else {
                await axios.post('http://localhost:8070/api/fish', updatedValues);
                message.success('Fish added successfully');
            }
            handleCancel();
            setLoading(true);
            const res = await axios.get('http://localhost:8070/api/fish');
            setFishData(res.data);
            setLoading(false);
        } catch (error) {
            message.error('Operation failed');
        }
    };

    const handleDelete = async (fishId) => {
        try {
            await axios.delete(`http://localhost:8070/api/fish/${fishId}`);
            message.success('Fish deleted successfully');
            setLoading(true);
            const res = await axios.get('http://localhost:8070/api/fish');
            setFishData(res.data);
            setLoading(false);
        } catch (error) {
            message.error('Failed to delete fish');
        }
    };

    const handleFileUploadSuccess = (url) => {
        const newImages = [...images, url];
        setImages(newImages);
        form.setFieldsValue({ images: newImages.join(',') });
    };

    const handleRemoveUrl = (url) => {
        const updatedImages = images.filter(imgUrl => imgUrl !== url);
        setImages(updatedImages);
        form.setFieldsValue({ images: updatedImages.join(',') });
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="overflow-hidden">
            <AdminNavbar activeKey="ad-livestock" />
            <div className="vh-100" style={{paddingTop: 64}}>
                <div className="row m-4">
                    <div className="col d-flex justify-content-center align-items-center">
                        <div className="btn btn-warning p-2 fs-5 fw-bold" onClick={() => showModal()}>
                            Add New Fish
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row m-4">
                        {fishData.map(fish => (
                            <div key={fish._id} className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 mb-4">
                                <div className="card">
                                    <img src={fish.images[0] || FishImg} className="card-img-top" alt="Fish"/>
                                    <div className="card-body">
                                        <h5 className="card-title">{fish.name}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">{fish.species}</h6>
                                        <p className="card-text">Rs. {fish.price}</p>
                                        <div className="btn btn-success" onClick={() => showModal(fish)}>Update</div>
                                        <div className="btn btn-danger mx-3"
                                             onClick={() => handleDelete(fish._id)}>Delete
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Modal
                title={isEditMode ? "Update Fish" : "Add New Fish"}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                width={1000}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="species" label="Species" rules={[{ required: true, message: 'Please input the species' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please input the price' }]}>
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                        <ReactQuill
                            theme="snow"
                            value={form.getFieldValue('description')}
                            onChange={(value) => form.setFieldsValue({ description: value })}
                        />
                    </Form.Item>
                    <Form.Item name="images" label="Upload Images">
                        <FileUpload onUploadSuccess={handleFileUploadSuccess} />
                        <PreviewList
                            images={images}
                            onRemove={handleRemoveUrl}
                        />
                    </Form.Item>
                    <Form.Item name="stock" label="Stock">
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                </Form>
            </Modal>

            <Footer/>
        </div>
    );
}
