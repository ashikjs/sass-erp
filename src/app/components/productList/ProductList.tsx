import React from 'react';
import {Table, Thead, Tbody, Tr, Th, Td} from '@chakra-ui/react';
import styles from './ProductList.module.scss'; // Import the CSS module

const ProductList = ({products}) => {
  return (
    <Table variant="simple" className={styles['table-container']}>
      <colgroup>
        <col className={styles['table-column']} />
        <col className={styles['table-column']} />
        <col className={styles['table-column']} />
        <col/>
      </colgroup>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Category</Th>
          <Th>Quantity</Th>
          <Th>Price</Th>
        </Tr>
      </Thead>
      <Tbody>
        {products.map((product) => (
          <Tr key={product._id}>
            <Td>{product.name}</Td>
            <Td>{product.category?.name}</Td>
            <Td>{product.quantity}</Td>
            <Td>${product.price}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default ProductList;
