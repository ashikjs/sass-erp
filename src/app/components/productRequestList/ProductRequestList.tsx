import {Box, Button, Table, Tbody, Td, Th, Thead, Tr} from '@chakra-ui/react';
import axios from "axios";

import styles from './ProductRequestList.module.scss';

interface props {
  requests: any[];
}

const ProductRequestList = ({requests}: props) => {
  const handleApproveClick = async () => {
    try {
      // Make the API request here
      const response = await axios.post("your/api/endpoint", {
        // Include any necessary data for the API request
      });

      // Handle the response or show success message
      console.log("API response:", response.data);
    } catch (error) {
      // Handle error or show error message
      console.error("Error:", error);
    }
  };
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
            <Th p={2}>Urgent Quantity</Th>
            <Th p={2} textAlign="center">Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {requests?.map((request: any) => (
            <Tr key={request._id} >
              <Td p={2}>{request.product.name}</Td>
              <Td p={2}>{request.product.category?.name}</Td>
              <Td p={2}>{request.urgentQuantity}</Td>
              <Td p={2} textAlign="center">
                <Button colorScheme='teal'
                        onClick={handleApproveClick}
                        size='sm' >Approved</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ProductRequestList;
