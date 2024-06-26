import {Button, useToast} from "@chakra-ui/react";

function ToastExample() {
  const toast = useToast()
  return (
    <Button size='lg' colorScheme='green' mt='24px'
      onClick={() =>
        toast({
          title: 'Жмякккк',
          description: "Вы жмякнули на кнопку.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      }
    >
      Жмяк
    </Button>
  )
}

export default ToastExample;