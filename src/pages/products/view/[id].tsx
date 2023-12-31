import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {Container, Box, Heading, Text} from '@chakra-ui/react';

import axiosApi from "./../../../app/utiles/axiosApi";

const ProductDetails = () => {
  const router = useRouter();
  const {id} = router.query; // Get the id parameter from the URL
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (id) {
      // Fetch product details using axios
      axiosApi.get(`/products/${id}`)
        .then((response) => {
          setProduct(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <Container maxWidth="xl">
      <Box p={4}>
        {product ? (
          <>
            <Heading size="md" paddingBottom={2}>{product.name}</Heading>
            <Text paddingBottom={1}><b>Price</b>: {product.price}</Text>
            <Text paddingBottom={1}><b>Category</b>: {product.category?.name}</Text>
            <Text paddingBottom={1}><b>Quantity</b>: {product.quantity}</Text>
            <Text paddingBottom={1}><b>Description</b>: {product.description}</Text>
          </>
        ) : (
          <Text>No product found.</Text>
        )}
      </Box>
    </Container>
  );
};

export default ProductDetails;
