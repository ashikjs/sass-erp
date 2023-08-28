import {Table, Thead, Tbody, Tr, Th, Td, Box, IconButton, HStack} from '@chakra-ui/react';
import NextLink from "next/link";
import {Link} from '@chakra-ui/react'
import {EditIcon, ViewIcon} from "@chakra-ui/icons";

import styles from './ProductList.module.scss';

interface props {
  products: any[];
}

const ProductList = ({products}: props) => {
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
            <Th p={2}>Category</Th>
            <Th p={2}>Quantity</Th>
            <Th p={2}>Price</Th>
            <Th p={2} textAlign="center">Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products?.map((product: any) => (
            <Tr key={product._id}
                bgColor={product.quantity === 0 ? 'red.100' : product.quantity < 20 ? 'yellow.100' : 'white'}>
              <Td p={2}>{product.name}</Td>
              <Td p={2}>{product.category?.name}</Td>
              <Td p={2}>{product.quantity}</Td>
              <Td p={2}>${product.price}</Td>
              <Td p={2} textAlign="center">
                <HStack spacing='8px' justifyContent="center">
                  <Link as={NextLink} href={`/products/edit/${product._id}`}>
                    <IconButton
                      colorScheme='teal'
                      aria-label='Edit'
                      size='xs'
                      icon={<EditIcon/>}
                    />
                  </Link>
                  <Link as={NextLink} href={`/products/view/${product._id}`}>
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

export default ProductList;
