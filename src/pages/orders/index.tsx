import React, {useCallback, useEffect, useState} from 'react';
import {Button, Container, Flex, Heading} from '@chakra-ui/react';

import axiosApi from "./../../app/utiles/axiosApi";
import Pagination from "./../../app/components/pagination/Pagination";
import OrderList from "./../../app/components/orderList/OrderList";
import NextLink from "next/link";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const fetchOrders = useCallback(async (page: number, size: number) => {
    try {
      const response = await axiosApi.get(`/orders?page=${page}&pageSize=${size}`);
      setTotalPages(Math.ceil(response.data?.total / size))
      console.log(response.data)
      setOrders(response.data?.datas);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }, [setTotalPages, setOrders]);

  useEffect(() => {
    fetchOrders(currentPage, pageSize);
  }, [currentPage, pageSize, fetchOrders]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    fetchOrders(newPage, pageSize);
  };


  return (
    <Container maxW='container.xl'>
      <Flex justifyContent="space-between" alignItems="center" marginBottom="20px" marginTop="40px">
        <Heading>Orders</Heading>
        <NextLink href="/products/create" passHref>
          <Button colorScheme="blue">Create Order</Button>
        </NextLink>
      </Flex>
      <OrderList orders={orders}/>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Container>
  );
};

export default OrdersPage;
