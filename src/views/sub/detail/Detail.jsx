import { useEffect, memo, useState } from 'react'
import {
    Button, Box, Dialog, DialogActions, DialogContent, DialogContentText,DialogTitle
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
      console.log('get Info by jobId', data)
    })
  }, [jobId])

  useEffect(() => {
    console.log('info.companyPhoto', info.companyPhoto)
  }, [info.companyPhoto])

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {info.companyName}
        </DialogTitle>
        <Carousel companyPhoto={info.companyPhoto}/>
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
    </Box>
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