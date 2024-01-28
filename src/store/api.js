/* eslint-disable no-return-assign */
import {create} from 'zustand'
import produce from 'immer'

const useStore = create((set, get) => ({
  jobs: {},
  fetchJobs: () => {
    fetch('/api/v1/jobs')
    .then(response => response.json())
    .then(data => {
        set(
            produce((draft) => {
                draft.jobs = data
            })
        )
    })
  },

  fetchJobsByFilters: (pre_page, page, company_name, education_level, salary_level) => {
    fetch('/api/v1/jobs/?pre_page=' + pre_page + '&page=' + page + '&company_name=' + company_name + '&education_level=' + education_level + '&salary_level=' + salary_level)
    .then(response => response.json())
    .then(data => {
        set(
            produce((draft) => {
                console.log('fetchJobsByFilters', data)
                draft.jobs = data
            })
        )
    })
  },

  salaryLevelList: {},
  fetchSalaryLevelList: () => {
    fetch('/api/v1/salaryLevelList')
    .then(response => response.json())
    .then(data => {
        set(
            produce((draft) => {
                draft.salaryLevelList = data
            })
        )
    })
  },

  educationLevelList: {},
  fetchEducationLevelList: () => {
    fetch('/api/v1/educationLevelList')
    .then(response => response.json())
    .then(data => {
        set(
            produce((draft) => {
                draft.educationLevelList = data
            })
        )
    })
  },

}))

export default useStore
