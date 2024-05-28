import React from 'react';
import {Button, message, Upload} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../Config/firebaseConfig';
import { v4 as uuidv4 } from 'uuid';

const FileUpload = ({ onUploadSuccess }) => {
    const handleUpload = async ({ file, onSuccess, onError }) => {
        const fileRef = ref(storage, `files/${file.name + uuidv4()}`);

        try {
            await uploadBytes(fileRef, file);
            const url = await getDownloadURL(fileRef);
            onSuccess(null, file);
            onUploadSuccess(url);
            message.success('File uploaded successfully!');
        } catch (error) {
            onError(error);
            console.error("Upload error:", error);
            message.error("Upload error:", error);
        }
    };

    return (
        <Upload
            customRequest={handleUpload}
            showUploadList={false}
        >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
    );
};

export default FileUpload;
