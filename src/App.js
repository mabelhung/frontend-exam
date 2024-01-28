import { useEffect, useState } from 'react'
import {
  Button, TextField, Select, FormControl, MenuItem, InputLabel, Stack, Box,
  Card, CardActionArea, CardActions, CardContent, Typography, CardTitle
} from '@mui/material'
import styles from './app.module.sass'
import useInit from './hook/useInit'
import { values } from 'ramda'
import Detail from './views/sub/detail/Detail'

function App() {
  const [jobs, salaryLevelList, educationLevelList, fetchJobsByFilters] = useInit()
  const [open, setOpen] = useState(false)
  const [jobId, setJobId] = useState(1)
  const [salaryLevelId, setSalaryLevelId] = useState('')
  const [educationLevelId, setEducationLevelId] = useState('')
  const [companyName, setCompanyName] = useState('')

  const handleClickOpen = (id) => {
    setJobId(id)
    setOpen(true)
  }
  const updateOpenByClickCloseBtn = () => {
    setOpen(false)
  } 

  const handleClickSearch = () => {
    fetchJobsByFilters(10, 1, companyName, educationLevelId, salaryLevelId)
  } 

  return (
    <Card variant="outlined" sx={{ mt: 40, ml:2, mr:2 }}>
      <Stack direction="column" spacing={2} m={4} sx={{ width: 1200 }}>
        <Stack>
          <Box>
            <label className={styles.label}>適合前端工程師的好工作</label>
          </Box>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Box sx={{ width: 500 }}>
            <TextField
                id="outlined-helperText"
                label="公司名稱"
                value={companyName}
                onChange={ (e)=> setCompanyName(e.target.value) }
              />
          </Box>
          <Box sx={{ width: 200}}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">教育程度</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={educationLevelId}
                label="教育程度"
                onChange={ (e)=> setEducationLevelId(e.target.value) }
              >
                {Object.values(educationLevelList).map(el => (
                  <MenuItem key={el.id} value={el.id}>{el.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ width: 200 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">薪水範圍</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={salaryLevelId}
                label="薪水範圍"
                onChange={ (e)=>setSalaryLevelId(e.target.value) }
              >
                {Object.values(salaryLevelList).map(el => (
                  <MenuItem key={el.id} value={el.id}>{el.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ width: 200 }}>
            <Button variant="contained" onClick={handleClickSearch}>條件搜尋</Button>
          </Box>
        </Stack>
        <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
          {jobs && values(jobs.data).length >0 && values(jobs.data).map((job, index) => {
            const salary =salaryLevelList.find(item => item.id === job.salaryId.toString())?.label
            const education = educationLevelList.find(item => item.id === job.educationId.toString())?.label
            return (
            <Card sx={{ width: 375 }} key={index}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {job.companyName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    前端工程師 {job.jobTitle}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    學歷 {education}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    薪水 {salary}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {job.preview}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary" variant="outlined" onClick={()=>handleClickOpen(job.id)}>
                  查看細節
                </Button>
              </CardActions>
            </Card>
          )
          })}
          {values(jobs.data).length === 0 && <Box sx={{ width: 1200}}>無資料</Box>}
        </Stack>
        </Stack>
        { open 
        && <Detail open={open} jobId={jobId} updateOpenByClickCloseBtn={updateOpenByClickCloseBtn}/>}
    </Card>
  );
}

export default App;
