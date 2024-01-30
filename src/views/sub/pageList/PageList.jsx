import React, { useState } from 'react';
import { Pagination } from '@mui/material';

import PropTypes from 'prop-types'
import styles from './pageList.module.sass'
import PER_PAGE from '../../../constants/config'

const PageList = (props) => {
  const { total,  handlePageChange}  = props
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(total / PER_PAGE)

  const handlePageClick = (value) => {
    const page = parseInt(value, 10)
    setCurrentPage(page)
    handlePageChange(page)
  }

  return (
    <div className={styles.container}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(e)=> handlePageClick(e.target.textContent)}
        color="primary"
        size="large"
        showFirstButton
        showLastButton
        sx={{ marginTop: 2 }}
      />
    </div>
  );
};

export default PageList;

PageList.propTypes = {
  total: PropTypes.number,
  handlePageChange: PropTypes.func,
}

PageList.defaultProps = {
  total: 0,
  handlePageChange: () => {},
}