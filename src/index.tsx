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
            product:
              'confident cannabis wholesale is a b2b marketplace/network that facilitates licensed businesses in the cannabis industry to manage and transact their regulated inventory',
            responsibilities: [
              'listen|collaborate with teammates in monthly milestones',
              'identify|describe|patch bugs',
              'maintain|design|implement react form/input components',
              'maintain|design|implement react hooks',
              'maintain|refactor legacy react components',
            ],
            toolbelt: [
              'typescript',
              'git',
              'react',
              'material-ui',
              'storybook',
              'redux',
            ],
          },
          {
            companyName: 'datasplice',
            engineeringTeam: 'research & development',
            dateRange: '2018.05 <= 2016.05',
            jobTitle: 'software engineer',
            product:
              'datasplice is an offline-first, mobile-first, web-app that empowers enterprise to organize, navigate, and manipulate their data regardless of location',
            responsibilities: [
              'listen|collaborate with teammates in client feature requests',
              'identify|describe|patch bugs',
              'maintain|integrate bluetooth hardware with cordova ios extension',
              'maintain|design|implement shared react components library',
              'begin refactor of core app functionality towards improved readability and testability',
            ],
            toolbelt: [
              'git',
              'react',
              'redux',
              'redux-saga',
              'storybook',
              'webpack',
              'cordova',
              'coffeescript',
              'objective-c',
            ],
          },
        ]}
      />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
)
