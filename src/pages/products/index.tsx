import React, {useCallback, useEffect, useState} from 'react';
import {Button, Container, Flex, Heading} from '@chakra-ui/react';

import axiosApi from "./../../app/utiles/axiosApi";
import ProductList from "./../../app/components/productList/ProductList";
import Pagination from "./../../app/components/pagination/Pagination";
import NextLink from "next/link";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const fetchProducts = useCallback(async (page: number, size: number) => {
    try {
      const response = await axiosApi.get(`/products?page=${page}&pageSize=${size}`);
      setTotalPages(Math.ceil(response.data?.total / size));
      console.log(response.data);
      setProducts(response.data?.datas);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }, [setTotalPages, setProducts]);

  useEffect(() => {
    fetchProducts(currentPage, pageSize);
  }, [currentPage, pageSize, fetchProducts]);

  const handlePageChange = (newPage: number) => {
    // console.log('NewPage:LL:  ', newPage)
    setCurrentPage(newPage);
    fetchProducts(newPage, pageSize);
  };

  return (
    <Container maxW='container.xl'>
      <Flex justifyContent="space-between" alignItems="center" marginBottom="20px" marginTop="40px">
        <Heading>Products</Heading>
        <NextLink href="/products/create" passHref>
          <Button colorScheme="blue">Add Product</Button>
        </NextLink>
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
