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
              'a b2b marketplace/network that helps licensed businesses in the cannabis industry manage|transact regulated inventory',
            responsibilities: [
              'collaborate with teammates towards monthly milestones',
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
              'an offline-first/mobile-first web app that helps enterprise organize|navigate|manipulate data regardless of location',
            responsibilities: [
              'collaborate with teammates towards serving clients',
              'identify|describe|patch bugs',
              'maintain|integrate bluetooth hardware for cordova ios extension',
              'maintain|design|implement shared react components library',
              'begin refactor of core app functionality towards improved readability/testability',
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
        education={[
          {
            schoolName: 'galvanize',
            programName: 'fullstack web development',
            dateRange: '2016.04 <= 2015.10',
            programDescription:
              'an immersive six-month bootcamp that covered technologies/patterns/best-practices applied in industry',
            toolbelt: [
              'javascript',
              'nodejs',
              'git',
              'css',
              'express',
              'postgresql',
            ],
          },
        ]}
      />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
)