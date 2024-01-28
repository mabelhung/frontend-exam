import React, { useEffect, useState } from 'react';
import { Container, List, ListItem, Pagination, Typography } from '@mui/material';

import PropTypes from 'prop-types'

const PageList = (props) => {
  const { total }  = props
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    console.log('total', total)
  }, [total])
  const totalPages = Math.ceil(total / itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Container>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        size="large"
        showFirstButton
        showLastButton
        sx={{ marginTop: 2 }}
      />
    </Container>
  );
};

export default PageList;

PageList.propTypes = {
  total: PropTypes.number,
}

PageList.defaultProps = {
  total: 0,
}