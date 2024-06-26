import {Card, Box, Heading, Text, Button, Center} from "@chakra-ui/react";
import ToastExample from "./ToastExample";

const CardComponent = () => {
    return (
        <Center>
            <Card margin={8}>
                <Box margin={8}>
                    <Box maxW='32rem'>
                        <Heading mb={4}>Карточка :v</Heading>
                        <Text fontSize='xl'>
                            Запущено с помощью GKE (управляемая служба кластера Kubernetes от Google Cloud, которая может размещать контейнерные рабочие нагрузки в облаке)
                        </Text>
                        <ToastExample />
                    </Box>
                </Box>
            </Card>
        </Center>
    );
};

export default CardComponent;