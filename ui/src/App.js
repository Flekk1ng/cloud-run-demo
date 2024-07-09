import React from "react";
import { useEffect } from 'react';
import './App.css';
import UploadComponent from './components/Upload/UploadComponent'
import ProcessComponent from './components/ProcessComponent/ProcessComponent'

import {Flex, Row, Col, Layout, theme} from 'antd';

import { BASE_URL } from './constants';

const {Header, Content} = Layout;

function App() {
    const {
        token: {colorBgContainer, borderRadiusLG, colorBgLayout, boxShadowSecondary}
    } = theme.useToken();

    useEffect(() => {
        const deleteAllFiles = async () => {
            const response = await fetch(`${BASE_URL}/delete_all`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
            });
              
            if (response.ok) {
                console.log('All files deleted successfully');
            } else {
                const errorData = await response.json();
                console.error('Error deleting files:', errorData);
            }
        };
    
        deleteAllFiles();
    }, []);

    return (
        <>
            <Layout>
                <Header><h2 style={{margin: 0, color: "white"}}>CSV Transformer</h2>
                </Header>
                <Content style={{
                    padding: '20px',
                    margin: '20px 48px',
                    background: colorBgContainer,
                    minHeight: 280,
                    borderRadius: borderRadiusLG,
                    boxShadow: boxShadowSecondary
                }}>
                    <Flex gap="middle" vertical>
                        <Row gutter={16}>
                            <Col span={12}>
                                <UploadComponent />
                            </Col>
                            <Col span={12}>
                                <ProcessComponent />
                            </Col>
                        </Row>
                    </Flex>
                </Content>
            </Layout>
        </>
    )
}

export default App;
