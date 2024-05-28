import React from 'react';
import { List, Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const PreviewList = ({ images, onRemove }) => {
    const renderPreview = (url) => {
        return <img src={url} alt="preview" style={{ width: '100px', height: '100px' }} />;
    };

    return (
        <List
            bordered
            dataSource={images}
            renderItem={item => (
                <List.Item
                    actions={[
                        <Popconfirm title="Sure to delete?" onConfirm={() => onRemove(item)}>
                            <Button icon={<DeleteOutlined />} type="link" />
                        </Popconfirm>
                    ]}
                >
                    {renderPreview(item)}
                </List.Item>
            )}
        />
    );
};

export default PreviewList;
