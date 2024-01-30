/* eslint-disable no-return-assign */
import {create} from 'zustand'
import produce from 'immer'

const useStore = create((set, get) => ({
  jobs: {},
  fetchJobs: (pre_page, page, company_name, education_level, salary_level) => {
    let filters = [
        'pre_page=' + pre_page,
        'page=' + page
    ]
    if (company_name) filters.push('company_name=' + company_name)
    if (education_level) filters.push('education_level=' + education_level)
    if (salary_level) filters.push('salary_level=' + salary_level)
    fetch('/api/v1/jobs/?' + filters.join('&'))
    .then(response => response.json())
    .then(data => {
        set(
            produce((draft) => {
                console.log('fetchJobs', data)
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
