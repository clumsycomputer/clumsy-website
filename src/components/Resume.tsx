import React, { FunctionComponent } from 'react'
import { JobDescription, JobSection } from './JobSection'
import styles from './Resume.module.css'
import { Section } from './Section'

export interface ResumeProps {
  personalInfo: PersonDescription
  workExperience: JobDescription[]
}

interface PersonDescription {
  name: string
  email: string
}

export const Resume: FunctionComponent<ResumeProps> = ({
  personalInfo,
  workExperience,
}) => (
  <div className={styles.resumeContainer}>
    <Section header={['resume', personalInfo.name, personalInfo.email]} />
    {workExperience.map((jobDescription) => (
      <JobSection jobDescription={jobDescription} />
    ))}
  </div>
)
