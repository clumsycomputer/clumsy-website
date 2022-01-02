import React, { Fragment } from 'react'
import { ResumeSectionBase } from './ResumeSectionBase'
import { SectionContent } from './SectionContent'

export interface HeaderSectionProps {
  fullName: string
  emailAddress: string
  briefText: string
  statusText: string
}

export function HeaderSection(props: HeaderSectionProps) {
  const { fullName, emailAddress, briefText, statusText } = props
  return (
    <ResumeSectionBase
      sectionDivider={null}
      accessibilityLabel={`career overview: ${fullName}`}
      sectionLabels={[
        {
          variant: 'text',
          label: fullName,
        },
        {
          variant: 'link',
          label: emailAddress,
          linkHref: `mailto:${emailAddress}`,
        },
      ]}
      bodyContent={
        <Fragment>
          <SectionContent
            accessibilityLabel={`career brief: ${fullName}`}
            contentType={'text'}
            contentLabel={'brief'}
            textContent={briefText}
          />
          <SectionContent
            accessibilityLabel={`career status: ${fullName}`}
            contentType={'text'}
            contentLabel={'status'}
            textContent={statusText}
          />
        </Fragment>
      }
    />
  )
}
