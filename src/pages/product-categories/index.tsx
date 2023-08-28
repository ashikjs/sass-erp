import React, {useEffect, useState} from 'react';
import {Button, Container, Flex, Heading} from '@chakra-ui/react';

import axiosApi from "./../../app/utiles/axiosApi";
import ProductCategoryList from "./../../app/components/productCategoryList/ProductCategoryList";
import NextLink from "next/link";

const ProductCategoriesPage = () => {
  const [productCategories, setProductCategories] = useState([]);
  const currentPage = 0;
  const pageSize = 200;

  useEffect(() => {
    fetchProducts(currentPage, pageSize);
  }, []);

  const fetchProducts = async (page, size) => {
    try {
      const response = await axiosApi.get(`/categories?page=${page}&pageSize=${size}`);
      setProductCategories(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <Container maxW='container.xl'>
      <Flex justifyContent="space-between" alignItems="center" marginBottom="20px" marginTop="40px">
        <Heading>Product Categories</Heading>
        <NextLink href="/product-categories/create" passHref>
          <Button colorScheme="blue">Add Product Category</Button>
        </NextLink>
      </Flex>
      <ProductCategoryList categories={productCategories}/>
    </Container>
  );
};

export default ProductCategoriesPage;
