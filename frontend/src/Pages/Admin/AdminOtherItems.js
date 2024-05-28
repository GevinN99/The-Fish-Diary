import React, {useEffect, useState} from "react";
import Footer from "../../Components/Footer/Footer";
import OtherImg from "../../assets/images/sample/other.png";
import Loading from "../../Components/Loading/Loading";
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminNavbar from "../../Components/Admin/AdminNavbar";
import {Form, Input, InputNumber, message, Modal, Select} from 'antd';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import FileUpload from '../../Components/Admin/FileUpload/FileUpload';
import PreviewList from '../../Components/Admin/FileUpload/PreviewList';

export default function AdminOtherItems() {
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [accessoryData, setAccessoryData] = useState([]);
    const [currentAccessory, setCurrentAccessory] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [form] = Form.useForm();
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchAccessoryData = async () => {
            try {
                const res = await axios.get('http://localhost:8070/api/accessories');
                setAccessoryData(res.data);
            } catch (error) {
                message.error('Failed to fetch accessory data');
            }
            setLoading(false);
        };

        fetchAccessoryData();
    }, []);

    const showModal = (accessory = null) => {
        if (accessory) {
            setIsEditMode(true);
            setCurrentAccessory(accessory);
            form.setFieldsValue({
                ...accessory,
                images: accessory.images.join(',')
            });
            setImages(accessory.images);
        } else {
            setIsEditMode(false);
            setCurrentAccessory(null);
            form.resetFields();
            setImages([]);
        }
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setCurrentAccessory(null);
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

            if (isEditMode && currentAccessory) {
                await axios.put(`http://localhost:8070/api/accessories/${currentAccessory._id}`, updatedValues);
                message.success('Accessory updated successfully');
            } else {
                await axios.post('http://localhost:8070/api/accessories', updatedValues);
                message.success('Accessory added successfully');
            }
            handleCancel();
            setLoading(true);
            const res = await axios.get('http://localhost:8070/api/accessories');
            setAccessoryData(res.data);
            setLoading(false);
        } catch (error) {
            message.error('Operation failed');
        }
    };

    const handleDelete = async (accessoryId) => {
        try {
            await axios.delete(`http://localhost:8070/api/accessories/${accessoryId}`);
            message.success('Accessory deleted successfully');
            setLoading(true);
            const res = await axios.get('http://localhost:8070/api/accessories');
            setAccessoryData(res.data);
            setLoading(false);
        } catch (error) {
            message.error('Failed to delete accessory');
        }
    };

    const handleFileUploadSuccess = (url) => {
        const newImages = [...images, url];
        setImages(newImages);
        form.setFieldsValue({images: newImages.join(',')});
    };

    const handleRemoveUrl = (url) => {
        const updatedImages = images.filter(imgUrl => imgUrl !== url);
        setImages(updatedImages);
        form.setFieldsValue({images: updatedImages.join(',')});
    };

    if (loading) {
        return <Loading/>;
    }

    return (
        <div className="overflow-hidden">
            <AdminNavbar activeKey="ad-other"/>
            <div className="vh-100" style={{paddingTop: 64, marginBottom: '100px'}}>
                <div className="row m-4">
                    <div className="col d-flex justify-content-center align-items-center">
                        <div className="btn btn-warning p-2 fs-5 fw-bold"
                             onClick={() => showModal()}>Add New Item
                        </div>
                    </div>
                </div>
                <div className="container vh-100">
                    <div className="row m-4">
                        {accessoryData.map(accessory => (
                            <div key={accessory._id} className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 mb-4">
                                <div className="card">
                                    <img
                                        src={accessory.images && accessory.images.length > 0 ? accessory.images[0] : OtherImg}
                                        className="card-img-top"
                                        alt="Accessory"/>
                                    <div className="card-body">
                                        <h5 className="card-title">{accessory.name}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">{accessory.category}</h6>
                                        <p className="card-text">Rs. {accessory.price}</p>
                                        <div className="btn btn-success" onClick={() => showModal(accessory)}>Update
                                        </div>
                                        <div className="btn btn-danger mx-3"
                                             onClick={() => handleDelete(accessory._id)}>Delete
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <Footer/>

                <Modal
                    title={isEditMode ? "Update Accessory" : "Add New Accessory"}
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    width={1000}
                >
                    <Form form={form} layout="vertical">
                        <Form.Item name="name" label="Name"
                                   rules={[{required: true, message: 'Please input the name'}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name="category" label="Category"
                                   rules={[{required: true, message: 'Please input the category'}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name="price" label="Price"
                                   rules={[{required: true, message: 'Please input the price'}]}>
                            <InputNumber min={0} style={{width: '100%'}}/>
                        </Form.Item>
                        <Form.Item name="description" label="Description">
                            <ReactQuill theme="snow"/>
                        </Form.Item>
                        <Form.Item name="images" label="Upload Image/Video">
                            <FileUpload onUploadSuccess={handleFileUploadSuccess}/>
                            <PreviewList
                                images={images}
                                onRemove={handleRemoveUrl}
                            />
                        </Form.Item>
                        <Form.Item name="stock" label="Stock">
                            <Select>
                                <Select.Option value="available">Available</Select.Option>
                                <Select.Option value="not available">Not Available</Select.Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    );
}
