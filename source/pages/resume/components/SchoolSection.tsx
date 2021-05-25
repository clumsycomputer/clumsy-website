import React from 'react'
import { ContentsSection } from './ContentSection'

export interface SchoolSectionProps {
  schoolName: string
  programName: string
  dateRange: string
  programDescription: string
  techStack: string[]
}

export function SchoolSection(props: SchoolSectionProps) {
  const {
    schoolName,
    programName,
    dateRange,
    programDescription,
    techStack,
  } = props
  return (
    <ContentsSection
      accessibilityLabel={`school: ${schoolName} - ${programName}`}
      headerLabels={[
        {
          variant: 'text',
          label: schoolName,
        },
        {
          variant: 'text',
          label: programName,
        },
        {
          variant: 'text',
          label: 'student',
        },
        {
          variant: 'text',
          label: dateRange,
        },
      ]}
      bodyContents={[
        {
          accessibilityLabel: `program description: ${schoolName} - ${programName}: `,
          contentType: 'text',
          contentLabel: 'description',
          textContent: programDescription,
        },
        {
          accessibilityLabel: `technology used: ${schoolName} - ${programName}`,
          contentType: 'wrapList',
          contentLabel: 'tech',
          listItems: techStack,
        },
      ]}
    />
  )
}
