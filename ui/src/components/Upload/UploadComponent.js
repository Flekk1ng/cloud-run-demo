import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, theme, Upload } from 'antd';

import { BASE_URL } from '../../constants';

const handleFileRemove = async (file) => {
    try {
      await deleteFile(file.name);
      console.log(`File ${file.name} successfully deleted.`);
    } catch (error) {
      console.error(`File deletion error. ${file.name}: ${error.message}`);
    }
};
  
const deleteFile = async (filename) => {
    const response = await fetch(`${BASE_URL}/delete_file/${filename}`, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      throw new Error(`Error ${response.detail}`);
    }
};

const {Dragger} = Upload;

const props = {
    name: 'file',
    multiple: true,
    action: `${BASE_URL}/upload`,
    onChange(info) {
        const {status} = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} Файл успешно загружен.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} Ошибка загрузки файла.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};

function UploadComponent() {
    return (
        <>
            <h2 style={{marginTop: 0}}>Загрузка файлов</h2>
            <div>
                <Dragger {...props} onRemove={handleFileRemove}> 
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined/>
                    </p>
                    <p className="ant-upload-text">Нажмите или перетащите файлы чтобы загрузить</p>
                </Dragger>
            </div>
        </>
    )
}

export default UploadComponent;