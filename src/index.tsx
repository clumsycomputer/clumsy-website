import React from 'react'
import ReactDOM from 'react-dom'
import { Resume } from './components/Resume'
import styles from './index.module.css'

ReactDOM.render(
  <React.StrictMode>
    <div className={styles.rootContainer}>
      <Resume
        personalInfo={{
          name: 'jared mathews',
          email: 'clumsycomputer@gmail.com',
        }}
        workExperience={[
          {
            companyName: 'confident cannabis',
            engineeringTeam: 'wholesale',
            dateRange: '2020.04 <= 2019.05',
            jobTitle: 'software engineer',
            product: '',
            responsibilities: [],
            toolbelt: [],
          },
          {
            companyName: 'datasplice',
            engineeringTeam: 'research & development',
            dateRange: '2018.05 <= 2016.05',
            jobTitle: 'software engineer',
            product: '',
            responsibilities: [],
            toolbelt: [],
          },
        ]}
      />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
)
