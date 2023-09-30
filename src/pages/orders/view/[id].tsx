import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {
  Container,
  Box,
  Heading,
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  BreadcrumbItem, Breadcrumb, BreadcrumbLink
} from '@chakra-ui/react';

import axiosApi from "./../../../app/utiles/axiosApi";
import styles from "src/app/components/orderList/OrderList.module.scss";
import Link from "next/link";
import {ChevronRightIcon} from "@chakra-ui/icons";

const OrderDetails = () => {
  const router = useRouter();
  const {id} = router.query; // Get the id parameter from the URL
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (id) {
      // Fetch product details using axios
      axiosApi.get(`/orders/${id}`)
        .then((response) => {
          setOrder(response.data);
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
        {order ? (
          <>
            <Breadcrumb fontWeight='medium' separator={<ChevronRightIcon color='gray.500' />}>
              <BreadcrumbItem>
                <BreadcrumbLink as={Link} href='/'>Home</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem>
                <BreadcrumbLink as={Link} href='/orders'>Order List</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>

            <Heading size="md" paddingBottom={2} marginTop={5}>{order.invoiceId}</Heading>
            <Text paddingBottom={1}><b>Price</b>: {order.cashAmount}</Text>
            <Text paddingBottom={1}><b>Category</b>: {order.productCategory}</Text>
            <Text paddingBottom={1}><b>Parcel Type</b>: {order.parcelType}</Text>
            <Text paddingBottom={1}><b>User Name</b>: {order.userInfo?.name}</Text>
            <Text paddingBottom={1}><b>User Phone</b>: <span>{order.userInfo?.phone}</span></Text>
            <Text paddingBottom={1}><b>Address</b>: <span> </span>
              {
                order.address && (
                  order.address.area + ', ' + order.address.division + ', ' + order.address.city
                )
              }
            </Text>
            <Text paddingBottom={1}><b>Product Details</b>:</Text>
            <Box overflowX="auto">
              <Table variant="simple" colorScheme="blackAlpha" rounded="md" className={styles['table-container']}>
                <colgroup>
                  <col className={styles['table-column']}/>
                  <col className={styles['table-column']}/>
                  <col className={styles['table-column']}/>
                  <col className={styles['table-column']}/>
                  <col/>
                </colgroup>
                <Thead>
                  <Tr bgColor="gray.100">
                    <Th p={2}>Name</Th>
                    <Th p={2}>Price</Th>
                    <Th p={2}>quantity</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {order.products?.map((product: any) => (
                    <Tr key={product._id}>
                      <Td p={2}>{product?.name}</Td>
                      <Td p={2}>৳{product.price}</Td>
                      <Td p={2}>{product.quantity}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </>
        ) : (
          <Text>No order found.</Text>
        )}
      </Box>
    </Container>
  );
};

export default OrderDetails;
