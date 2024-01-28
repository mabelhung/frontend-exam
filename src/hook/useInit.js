import { useEffect } from 'react'
import useAPIStore from '../store/api'
import { values } from 'ramda'

function useInit() {
  const {
    fetchEducationLevelList,
    fetchSalaryLevelList, 
    fetchJobs, 
    jobs, 
    salaryLevelList, 
    educationLevelList, 
    fetchJobsByFilters
  } = useAPIStore()

  useEffect(() => {
    async function fetchData() {
      await fetchEducationLevelList()
      await fetchSalaryLevelList()
      await fetchJobs()
    }
    fetchData()
  }, [fetchEducationLevelList, fetchJobs, fetchSalaryLevelList])

  useEffect(() => {
    console.log('jobs', jobs)
  }, [jobs])

  return [
    jobs, 
    values(salaryLevelList), 
    values(educationLevelList),
    fetchJobsByFilters,
  ]
}

export default useInit;