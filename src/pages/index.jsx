import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { productsState } from "../atoms/productsAtom";
import { api } from "../axios";
import usePayments from "../hooks/usePayments";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const products = useRecoilValue(productsState);
  const setProductsState = useSetRecoilState(productsState);
  const { payments, getPaidProduct } = usePayments();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/products");
        setProductsState(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [setProductsState]);

  const handleDelete = async (id) => {
    try {
      setIsLoading(true);

      const response = await api.delete(`/products/${id}`);

      if (response.status === 204 || response.status === 201) {
        setProductsState((prev) => prev.filter((item) => item._id !== id));
        setIsLoading(false);
        toast({
          title: "Product deleted",
          status: "success",
          position: "top-right",
          variant: "left-accent",
        });
        return;
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handlePayment = async ({ product_name, price, product_id }) => {
    try {
      setIsLoading(true);

      const response = await api.post("/payments", {
        product_id,
        product_name,
        price,
      });

      if (response.status === 201) {
        setIsLoading(false);
        toast({
          title: response.data.msg,
          status: "success",
          position: "top-right",
          variant: "left-accent",
        });
        return;
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Flex justify="center" mt={3}>
      {products.length !== 0 ? (
        <Grid
          gap={3}
          gridTemplateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4,1fr)" }}
        >
          {products.map((item) => (
            <Item
              key={item._id}
              item={item}
              handlePayment={handlePayment}
              handleDelete={handleDelete}
              getPaidProduct={getPaidProduct}
            />
          ))}
        </Grid>
      ) : (
        <>No products found</>
      )}
    </Flex>
  );
};

const Item = ({ item, handleDelete, handlePayment, getPaidProduct }) => {
  console.log("🚀 ~ item", item);
  const isPaid = getPaidProduct(item._id);
  console.log("🚀 ~ isPaid", isPaid);

  return (
    <GridItem
      display="flex"
      p={2}
      flexDirection="column"
      bg="white"
      borderRadius="lg"
    >
      <Image
        src={item.image}
        alt={item.name}
        width={200}
        height={200}
        objectFit="cover"
      />
      <Text fontWeight={600}>{item.name}</Text>
      <Text fontSize={15}>$ {item.price}</Text>
      <HStack mt={3}>
        <Button
          bg="teal"
          color="white"
          disabled={isPaid}
          onClick={() =>
            handlePayment({
              product_id: item._id,
              product_name: item.name,
              price: item.price,
            })
          }
        >
          {isPaid ? "Paid" : "Pay Now"}
        </Button>
        <Button
          variant="outline"
          color="red"
          onClick={() => handleDelete(item._id)}
        >
          Delete
        </Button>
      </HStack>
    </GridItem>
  );
};

export default Home;
