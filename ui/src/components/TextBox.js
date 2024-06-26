import { Box } from "@chakra-ui/react";

const TextBox = () => {
  return (
    <Box
      whiteSpace="nowrap"
      overflow="hidden"
      fontSize="md"
      maxW="200px"
    >
      Этот длинный текст будет уменьшаться в размере, если не помещается в контейнер.
    </Box>
  );
};

export default TextBox;