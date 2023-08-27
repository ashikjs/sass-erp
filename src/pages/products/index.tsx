import React, {useEffect, useState} from 'react';
import {Button, Container, Flex, Heading} from '@chakra-ui/react';

import axiosApi from "src/app/utiles/axiosApi";
import ProductList from "src/app/components/productList/ProductList";
import Pagination from "src/app/components/pagination/Pagination";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    fetchProducts(currentPage, pageSize);
  }, []);

  const handlePageChange = (newPage) => {
    console.log('NewPage:LL:  ', newPage)
    setCurrentPage(newPage);
    fetchProducts(newPage, pageSize);
  };

  const fetchProducts = async (page, size) => {
    try {
      const response = await axiosApi.get(`/products?page=${page}&pageSize=${size}`);
      setTotalPages(Math.ceil(response.data?.total / pageSize))
      setProducts(response.data?.datas);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <Container maxW='container.xl'>
      <Flex justifyContent="space-between" alignItems="center" marginBottom="20px" marginTop="40px">
        <Heading>Products</Heading>
        <Button colorScheme="blue">Add Product</Button>
      </Flex>
      <ProductList products={products}/>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Container>
  );
};

export default ProductsPage;