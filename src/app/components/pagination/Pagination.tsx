import React from 'react';
import {Button, Flex} from '@chakra-ui/react';

const Pagination = ({currentPage, totalPages, onPageChange}) => {
  const renderPageButtons = () => {
    const pagesToShow = Math.min(5, totalPages);
    const startPage = Math.max(currentPage - Math.floor(pagesToShow / 2), 0);
    const endPage = Math.min(startPage + pagesToShow - 1, totalPages - 1);

    const buttons = [];
    for (let page = startPage; page <= endPage; page++) {
      buttons.push(
        <Button
          key={page}
          colorScheme={page === currentPage ? 'blue' : 'gray'}
          onClick={() => onPageChange(page)}
          m={1}
        >
          {page + 1}
        </Button>
      );
    }
    return buttons;
  };

  return (
    <Flex justifyContent="center" mt={4}>
      <Button
        isDisabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
        m={1}
      >
        Previous
      </Button>
      {renderPageButtons()}
      <Button
        isDisabled={currentPage >= totalPages - 1}
        onClick={() => onPageChange(currentPage + 1)}
        m={1}
      >
        Next
      </Button>
    </Flex>
  );
};

export default Pagination;
