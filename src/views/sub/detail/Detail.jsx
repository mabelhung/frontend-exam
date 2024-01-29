import { useEffect, memo, useState } from 'react'
import {
    Button, Box, Dialog, DialogActions, DialogContent, DialogTitle,  Typography, Divider
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

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          詳細資訊
        </DialogTitle>
        <Divider />
        <Typography variant="h6" gutterBottom sx={{ p: 1, pt:2,  pl: 2.8}}>
        {info.companyName} - {info.jobTitle}
        </Typography>
        <Divider />
        <Carousel companyPhoto={info.companyPhoto}/>
        <DialogContent>
          <div dangerouslySetInnerHTML={{ __html: info.description }} />
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