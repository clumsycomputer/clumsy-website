import React, { FunctionComponent } from 'react'
import { Section } from './Section'

export interface JobDescription {
  companyName: string
  engineeringTeam: string
  jobTitle: string
  dateRange: string
  product: string
  responsibilities: string[]
  toolbelt: string[]
}

export interface JobSectionProps {
  jobDescription: JobDescription
}

export const JobSection: FunctionComponent<JobSectionProps> = ({
  jobDescription,
}) => (
  <Section
    showDivider
    header={[
      jobDescription.companyName,
      jobDescription.engineeringTeam,
      jobDescription.dateRange,
      jobDescription.jobTitle,
    ]}
    body={[
      {
        variant: 'text',
        title: 'product',
        data: jobDescription.product,
      },
      {
        variant: 'columnList',
        title: 'responsibilities',
        data: jobDescription.responsibilities,
      },
      {
        variant: 'rowList',
        title: 'toolbelt',
        data: jobDescription.toolbelt,
      },
    ]}
  />
)
