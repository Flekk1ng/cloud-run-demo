import { useState, useEffect } from 'react';
import { Alert, message, Spin, Input, Button, List, ConfigProvider } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons'
import { red, green } from '@ant-design/colors';
import { TinyColor } from '@ctrl/tinycolor';

import { BASE_URL } from '../../constants';

const colors3 = ['#2bb673', '#30dd8a', '#2bb673'];
const getHoverColors = (colors) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());


function FileProcessingApp() {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputValueFilename, setInputValueFilename] = useState('output');
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [outputFilename, setOutputFilename] = useState(null);

  const processFiles = async (filename) => {
    try {
      setError(null)
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/process`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ output_filename: filename }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail);
      }

      if (data.status === 'success') {
        message.success('Обработка прошла успешно')
        setDownloadUrl(`${BASE_URL}/download/${data.output_filename}`);
        setOutputFilename(data.output_filename);
        setCountries(data.countries);
      } 
      setIsLoading(false);

    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const handleDownload = () => {
    if (downloadUrl) {
      window.open(downloadUrl, '_blank');
    } else {
      message.info('Сначала обработайте файл.');
    }
  };

  const handleInputValueFilenameChange = (e) => {
    setInputValueFilename(e.target.value);
  };

  return (
    <>
      <h2 style={{marginTop: 0}}>Обработка</h2>
      {error && <Alert style={{marginBottom: '1rem', color: red.primary}} message={'Ошибка ' + error} type="error" showIcon></Alert>}
      <Spin tip="Обработка..." size="large" spinning={isLoading}>
        <label htmlFor="input-field">
            Введите имя файла
        </label>
        <Input
          style={{ marginBottom: '0.5rem' }}
          placeholder="Введите имя файла"
          value={inputValueFilename}
          onChange={handleInputValueFilenameChange}
        />
        <Button
          type="primary"
          onClick={() => processFiles(inputValueFilename)}
          disabled={isLoading || !inputValueFilename}
        >
          Обработать
        </Button>
        { downloadUrl && (
          <>
            <hr style={{marginTop: '1rem'}}/>
            <Alert style={{marginBottom: '0.5rem'}} message={"Сводный отчет " + outputFilename + " успешно сформирован!"} type="success" showIcon />
            <List
              style={{marginBottom: '0.5rem'}}
              size="small"
              header={<p>Страны из отчетов:</p>}
              bordered
              dataSource={countries}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    colorPrimary: `linear-gradient(116deg,  ${colors3.join(', ')})`,
                    colorPrimaryHover: `linear-gradient(116deg, ${getHoverColors(colors3).join(', ')})`,
                    colorPrimaryActive: `linear-gradient(116deg, ${getActiveColors(colors3).join(', ')})`,
                    lineWidth: 0,
                  },
                },
              }}
            >
              <Button type="primary" onClick={handleDownload}>
                Скачать
              </Button>
            </ConfigProvider>
          </>
        )}
      </Spin>
    </>
  );
}

export default FileProcessingApp;