import { Fragment, useEffect, memo, useState } from 'react'
import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText,DialogTitle
} from '@mui/material'

import PropTypes from 'prop-types'
import data from '../../../constants/salaryList'
import Carousel from '../carousel/Carousel'


const Detail = (props) => {
  const { open, updateOpenByClickCloseBtn, jobId } = props
  const [info, setInfo]= useState({})
  
  const handleClose = () => {
    updateOpenByClickCloseBtn()
  }

  useEffect(() => {
    fetch('/api/v1/jobs/'+ jobId)
    .then(response => response.json())
    .then(data => {
      setInfo(data)
      console.log('data', data)
    })
  }, [jobId])


  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {info.companyName}
        </DialogTitle>
        <Carousel />
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div dangerouslySetInnerHTML={{ __html: info.description }} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            關閉
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default memo(Detail)

Detail.propTypes = {
  open: PropTypes.bool,
  updateOpenByClickCloseBtn: PropTypes.func,
  jobId: PropTypes.string,
}
Detail.defaultProps = {
  open: false,
  updateOpenByClickCloseBtn: false,
  jobId: '1',
}