import React from 'react'
import { SectionDivider } from '../../components/SectionDivider'
import { ResumeSectionBase, ResumeSectionBaseProps } from './ResumeSectionBase'
import { SectionContent, SectionContentProps } from './SectionContent'

export interface ContentsSectionProps
  extends Pick<ResumeSectionBaseProps, 'accessibilityLabel' | 'sectionLabels'> {
  bodyContents: SectionContentProps[]
}

export function ContentsSection(props: ContentsSectionProps) {
  const { accessibilityLabel, sectionLabels, bodyContents } = props
  return (
    <ResumeSectionBase
      sectionDivider={<SectionDivider />}
      accessibilityLabel={accessibilityLabel}
      sectionLabels={sectionLabels}
      bodyContent={bodyContents.map((contentProps) => (
        <SectionContent key={contentProps.contentLabel} {...contentProps} />
      ))}
    />
  )
}
