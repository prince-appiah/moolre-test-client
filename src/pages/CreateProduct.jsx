import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { api } from "../axios";
import { uploadFile } from "../firebase";

const Products = () => {
  const [productName, setProductName] = useState("");
  const [amount, setAmount] = useState(0);
  const [image, setImage] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const formRef = useRef(null);
  const history = useHistory();

  const handleUpload = async (ev) => {
    const file = ev.target.files[0];

    try {
      setImageLoading(true);
      const response = await uploadFile(file);
      if (response) {
        setImageLoading(false);
        setImage(response);
        return;
      }
      setImageLoading(false);
    } catch (error) {
      setImageLoading(false);
    }
  };

  const handleCreateProduct = async () => {
    setIsLoading(true);
    try {
      const response = await api.post("/products", {
        name: productName,
        price: amount,
        image,
      });

      if (response.data && response.status === 201) {
        setIsLoading(false);
        setProductName("");
        setAmount("");
        setImage("");
        setSuccessMsg("Product created");
        // formRef.current.reset();
        history.push("/");
        return;
      }

      if (response.status === 400) {
        setErrorMsg("Could not create product");
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      {/* <Heading size="md">Create A Product</Heading> */}
      <Flex direction="column" py={3}>
        <form>
          <VStack spacing={5}>
            <FormControl>
              <FormLabel>Product Name</FormLabel>
              <Input
                name="product_name"
                value={productName}
                onChange={(ev) => setProductName(ev.target.value)}
                placeholder="Eg. 4 crates of eggs"
              />
            </FormControl>
            <FormControl label="Amount">
              <FormLabel>Amount</FormLabel>
              <Input
                name="amount"
                type="number"
                value={amount}
                onChange={(ev) => setAmount(ev.target.value)}
                placeholder="Eg. 34.99"
              />
            </FormControl>
            <FormControl label="Image">
              <FormLabel>Upload a picture for the product</FormLabel>
              <Input type="file" onChange={handleUpload} />

              {image && (
                <Image src={image} objectFit="cover" width={300} height={300} />
              )}
            </FormControl>
            <Button
              width="full"
              bg="teal"
              color="white"
              isLoading={isLoading || imageLoading}
              disabled={
                !productName || !amount || !image || isLoading || imageLoading
              }
              onClick={handleCreateProduct}
            >
              Create Product
            </Button>
          </VStack>
        </form>
      </Flex>
    </Container>
  );
};

export default Products;
