import React, {useEffect, useState} from 'react';
import {Container, Flex, Heading} from '@chakra-ui/react';

import axiosApi from "./../../app/utiles/axiosApi";
import ProductRequestList from "./../../app/components/productRequestList/ProductRequestList";

const ProductRequestPage = () => {
  const [productRequests, setProductRequests] = useState([]);
  const currentPage = 0;
  const pageSize = 200;

  useEffect(() => {
    fetchProductRequests(currentPage, pageSize);
  }, []);

  const fetchProductRequests = async (page: number, size: number) => {
    try {
      const response = await axiosApi.get(`/product-requests?page=${page}&pageSize=${size}`);
      setProductRequests(response.data);
    } catch (error) {
      console.error('Error fetching products request:', error);
    }
  };

  return (
    <Container maxW='container.xl'>
      <Flex justifyContent="space-between" alignItems="center" marginBottom="20px" marginTop="40px">
        <Heading>Product Requests</Heading>
      </Flex>
      <ProductRequestList requests={productRequests}/>
    </Container>
  );
};

export default ProductRequestPage;
