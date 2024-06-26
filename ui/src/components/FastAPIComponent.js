import React, {useState, useEffect} from 'react';

import {Highlight, Center, Heading, Text} from '@chakra-ui/react';

const FastAPIComponent = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://34.88.58.149/');
                const data = await response.json();
                setMessage(data.message);
            } catch {
                setMessage('Error fetching data');
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Center margin={8}>
                <Text fontSize='1xl' fontWeight='bold'>
                    {message === 'Error fetching data' ? (
                        <Highlight
                            query="Error fetching data"
                            styles={{
                                px: '2',
                                py: '1',
                                rounded: 'full',
                                bg: 'red.100',
                            }}
                        >
                            {`FastAPI Response = ${message}`}
                        </Highlight>
                    ) : (
                        <Highlight
                            query={message}
                            styles={{
                                px: '2',
                                py: '1',
                                rounded: 'full',
                                bg: 'green.100',
                            }}
                        >
                            {`FastAPI Response = ${message}`}
                        </Highlight>
                    )}
                </Text>
            </Center>
        </div>
    );
};

export default FastAPIComponent;