import React from 'react'
import { createUseStyles } from 'react-jss'
import { siteConfig } from '../../siteConfig'
import { HeaderSection } from './components/HeaderSection'
import { JobSection } from './components/JobSection'
import { NavigationFooter } from './components/NavigationFooter'
import { SchoolSection } from './components/SchoolSection'

export default {
  pageRoute: '/',
  PageContent: Resume,
  htmlTitle: 'resume - jmath',
  htmlDescription:
    "a concise overview of jared mathews's career in software development",
  generatePdf: true,
  pdfFileName: 'resume',
}

function Resume() {
  const styles = useResumeStyles()
  return (
    <div role={'none'} className={styles.pageContainer}>
      <div role={'main'} className={styles.resumeContainer}>
        <div role={'header'} aria-level={1} className={styles.mainHeader}>
          resume
        </div>
        <HeaderSection
          fullName={'jared mathews'}
          emailAddress={'hire@jmath.dev'}
          briefText={
            'a balanced frontend developer who has worked on a variety of products across several companies'
          }
          statusText={
            'looking to join a healthy team of doers that blend pragmatism and quality when solving the problem at hand'
          }
        />
        <JobSection
          companyName={'native roots'}
          teamName={'operations'}
          jobTitle={'frontend developer'}
          dateRange={'2021.04 - 2020.12'}
          productDescription={
            'two unique web stores each serving their own market of cannabis consumers either in colorado, united states or manitoba, canada'
          }
          workResponsibilities={[
            'provide clients with a simpler less error-prone purchase flow',
            'revive an abandoned and brittle nextjs codebase',
            'stabilize repository via typescript, more comprehensive e2e test, simpler environment/dependency management, and a modernized palette of development scripts for a streamlined workflow',
            'migrate from shopify api to dutchie plus api for a smoother cannabis shopping experience',
            'resolve outstanding wcag 2.1 level aa and ada title iii accessibility lawsuit',
          ]}
          techStack={[
            'nextjs',
            'react',
            'typescript',
            'nodejs',
            'cypress',
            'firebase',
            'git',
          ]}
        />
        <JobSection
          companyName={'confident cannabis'}
          teamName={'wholesale'}
          jobTitle={'junior developer'}
          dateRange={'2020.04 - 2019.05'}
          productDescription={
            'a b2b marketplace/network that helps licensed businesses in the cannabis industry manage and transact tested inventory'
          }
          workResponsibilities={[
            'empower clients by simplifying their operations in a tightly regulated industry',
            'improve experience around order creation/management',
            'collaborate with teammates on monthly milestones',
            'identify, describe, and patch bugs',
            'maintain, design, and implement react forms/inputs',
            'maintain, design, and implement react hooks',
            'maintain and refactor legacy react components',
          ]}
          techStack={[
            'react',
            'typescript',
            'material-ui',
            'redux',
            'storybook',
            'git',
          ]}
        />
        <JobSection
          companyName={'datasplice'}
          teamName={'research & development'}
          jobTitle={'apprentice developer'}
          dateRange={'2018.05 - 2016.05'}
          productDescription={
            'an offline-first/mobile-first web app that helps enterprise organize, navigate, and manipulate data regardless of location'
          }
          workResponsibilities={[
            'collaborate with teammates towards providing clients with a flexible and reliable platform for assisting workers out in the field',
            'identify, describe, and patch bugs',
            'maintain and integrate bluetooth hardware for cordova ios extension',
            'design and implement a robust component for marking-up/annotating images on the fly',
            'maintain, design, and implement a shared react components library',
            'begin refactor of core app functionality towards improved readability/testability by way of redux-saga',
          ]}
          techStack={[
            'react',
            'redux',
            'redux-saga',
            'cordova',
            'coffeescript',
            'git',
          ]}
        />
        <SchoolSection
          schoolName={'galvanize'}
          programName={'fullstack web development'}
          dateRange={'2016.04 - 2015.10'}
          programDescription={
            'an immersive six-month bootcamp that covered technologies, patterns, and best-practices applied throughout industry'
          }
          techStack={[
            'javascript',
            'nodejs',
            'git',
            'css',
            'express',
            'postgresql',
          ]}
        />
        <NavigationFooter
          websiteLinks={[
            {
              linkLabel: 'website',
              linkText: 'jmath.dev',
              linkHref: siteConfig.baseUrl,
            },
            {
              linkLabel: 'github',
              linkText: 'clumsycomputer',
              linkHref: 'https://github.com/clumsycomputer',
            },
          ]}
          pdfHref={siteConfig.resumePdfUrl}
        />
      </div>
    </div>
  )
}

const useResumeStyles = createUseStyles({
  '@global': {
    body: {
      margin: 0,
      fontFamily: 'monospace',
      WebkitTextSizeAdjust: '100%',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      lineHeight: 5 / 4,
    },
  },
  pageContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resumeContainer: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 832,
    display: 'flex',
    flexDirection: 'column',
  },
  mainHeader: {
    display: 'none',
  },
})
