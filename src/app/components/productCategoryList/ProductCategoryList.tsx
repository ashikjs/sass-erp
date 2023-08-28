import {Table, Thead, Tbody, Tr, Th, Td, Box, IconButton, HStack} from '@chakra-ui/react';
import NextLink from "next/link";
import {Link} from '@chakra-ui/react'
import {EditIcon, ViewIcon} from "@chakra-ui/icons";

import styles from './ProductCategoryList.module.scss';

interface props {
  categories: any[];
}

const ProductCategoryList = ({categories}: props) => {
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
            <Th p={2}>Status</Th>
            <Th p={2}>Description</Th>
            <Th p={2}>ParentID</Th>
            <Th p={2} textAlign="center">Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {categories?.map((category: any) => (
            <Tr key={category._id}
                bgColor={category.status !== 'ACTIVE' ? 'gray.100' : 'white'}>
              <Td p={2}>{category.name}</Td>
              <Td p={2}>{category.status}</Td>
              <Td p={2}>{category.description}</Td>
              <Td p={2}>{category.parentID}</Td>
              <Td p={2} textAlign="center">
                <HStack spacing='8px' justifyContent="center">
                  <Link as={NextLink} href={`/product-categories/edit/${category._id}`}>
                    <IconButton
                      colorScheme='teal'
                      aria-label='Edit'
                      size='xs'
                      icon={<EditIcon/>}
                    />
                  </Link>
                  <Link as={NextLink} href={`/product-categories/view/${category._id}`}>
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

export default ProductCategoryList;
