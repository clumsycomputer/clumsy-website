import React, { FunctionComponent } from 'react'
import { Section } from './Section'

export interface SchoolDescription {
  schoolName: string
  programName: string
  dateRange: string
  programDescription: string
  toolbelt: string[]
}

export interface SchoolSectionProps {
  schoolDescription: SchoolDescription
}

export const SchoolSection: FunctionComponent<SchoolSectionProps> = ({
  schoolDescription,
}) => (
  <Section
    showDivider
    header={[
      schoolDescription.schoolName,
      schoolDescription.programName,
      schoolDescription.dateRange,
      'student',
    ]}
    body={[
      {
        variant: 'text',
        title: 'description',
        data: schoolDescription.programDescription,
      },
      {
        variant: 'rowList',
        title: 'toolbelt',
        data: schoolDescription.toolbelt,
      },
    ]}
  />
)
