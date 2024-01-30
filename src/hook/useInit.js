import { useEffect } from 'react'
import useAPIStore from '../store/api'
import { values } from 'ramda'
import PER_PAGE from '../constants/config'

function useInit() {
  const {
    fetchEducationLevelList,
    fetchSalaryLevelList, 
    fetchJobs, 
    jobs, 
    salaryLevelList, 
    educationLevelList, 
  } = useAPIStore()

  useEffect(() => {
    async function fetchData() {
      await fetchEducationLevelList()
      await fetchSalaryLevelList()
      await fetchJobs(PER_PAGE, 1)
    }
    fetchData()
  }, [fetchEducationLevelList, fetchJobs, fetchSalaryLevelList])

  return [
    jobs, 
    values(salaryLevelList), 
    values(educationLevelList),
    fetchJobs,
  ]
}

export default useInit;