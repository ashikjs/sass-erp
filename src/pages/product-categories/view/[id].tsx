import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {Container, Box, Heading, Text} from '@chakra-ui/react';

import axiosApi from "./../../../app/utiles/axiosApi";

const ProductCategoryDetails = () => {
  const router = useRouter();
  const {id} = router.query; // Get the id parameter from the URL
  const [productCategory, setProductCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (id) {
      // Fetch product details using axios
      axiosApi.get(`/categories/${id}`)
        .then((response: any) => {
          setProductCategory(response.data);
          setLoading(false);
        })
        .catch((error: any) => {
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
