import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {Container, Box, Heading, Text} from '@chakra-ui/react';

import axiosApi from "src/app/utiles/axiosApi";

const ProductCategoryDetails = () => {
  const router = useRouter();
  const {id} = router.query; // Get the id parameter from the URL
  const [productCategory, setProductCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(id)
    if (id) {
      // Fetch product details using axios
      axiosApi.get(`/categories/${id}`)
        .then((response) => {
          setProductCategory(response.data);
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
        {productCategory ? (
          <>
            <Heading size="md" paddingBottom={2}>{productCategory.name}</Heading>
            <Text paddingBottom={1}><b>Status</b>: {productCategory.status}</Text>
            <Text paddingBottom={1}><b>Description</b>: {productCategory.description}</Text>
          </>
        ) : (
          <Text>No product found.</Text>
        )}
      </Box>
    </Container>
  );
};

export default ProductCategoryDetails;
