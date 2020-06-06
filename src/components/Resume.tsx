import React, { FunctionComponent } from 'react'
import { JobDescription, JobSection } from './JobSection'
import styles from './Resume.module.css'
import { SchoolDescription, SchoolSection } from './SchoolSection'
import { Section } from './Section'

export interface ResumeProps {
  personalInfo: PersonDescription
  workExperience: JobDescription[]
  education: SchoolDescription[]
}

interface PersonDescription {
  name: string
  email: string
}

export const Resume: FunctionComponent<ResumeProps> = ({
  personalInfo,
  workExperience,
  education,
}) => (
  <div className={styles.resumeContainer}>
    <Section header={['resume', personalInfo.name, personalInfo.email]} />
    {workExperience.map((jobDescription) => (
      <JobSection jobDescription={jobDescription} />
    ))}
    {education.map((schoolDescription) => (
      <SchoolSection schoolDescription={schoolDescription} />
    ))}
  </div>
)
