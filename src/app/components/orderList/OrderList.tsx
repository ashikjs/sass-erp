import {Table, Thead, Tbody, Tr, Th, Td, Box, IconButton, HStack} from '@chakra-ui/react';
import NextLink from "next/link";
import {Link} from '@chakra-ui/react'
import {EditIcon, ViewIcon} from "@chakra-ui/icons";

import styles from './OrderList.module.scss';

interface props {
  orders: any[];
}

const OrderList = ({ orders }: props) => {
  return (
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
            <Th p={2}>Phone</Th>
            <Th p={2}>Category</Th>
            <Th p={2}>Price</Th>
            <Th p={2} textAlign="center">Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders?.map((order: any) => (
            <Tr key={order._id}
                bgColor={order.quantity === 0 ? 'red.100' : order.quantity < 20 ? 'yellow.100' : 'white'}>
              <Td p={2}>{order.userInfo?.name}</Td>
              <Td p={2}>{order.userInfo?.phone}</Td>
              <Td p={2}>{order.productCategory}</Td>
              <Td p={2}>৳{order.cashAmount}</Td>
              <Td p={2} textAlign="center">
                <HStack spacing='8px' justifyContent="center">
                  <Link as={NextLink} href={`/orders/edit/${order._id}`}>
                    <IconButton
                      colorScheme='teal'
                      aria-label='Edit'
                      size='xs'
                      icon={<EditIcon/>}
                    />
                  </Link>
                  <Link as={NextLink} href={`/orders/view/${order._id}`}>
                    <IconButton
                      colorScheme='blackAlpha'
                      aria-label='View'
                      size='xs'
                      icon={<ViewIcon/>}
                    />
                  </Link>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default OrderList;
