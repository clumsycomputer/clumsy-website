import React, { Fragment } from 'react'
import { SectionBase } from './SectionBase'
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
    <SectionBase
      accessibilityLabel={`career overview: ${fullName}`}
      headerLabels={[
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
      sectionDivider={null}
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
