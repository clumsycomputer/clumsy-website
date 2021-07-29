import React from 'react'
import { SectionBase, SectionBaseProps } from '../../components/SectionBase'
import { SectionDivider } from '../../components/SectionDivider'
import { SectionContent, SectionContentProps } from './SectionContent'

export interface ContentsSectionProps
  extends Pick<SectionBaseProps, 'accessibilityLabel' | 'headerLabels'> {
  bodyContents: SectionContentProps[]
}

export function ContentsSection(props: ContentsSectionProps) {
  const { accessibilityLabel, headerLabels, bodyContents } = props
  return (
    <SectionBase
      sectionDivider={<SectionDivider />}
      accessibilityLabel={accessibilityLabel}
      headerLabels={headerLabels}
      bodyContent={bodyContents.map((contentProps) => (
        <SectionContent key={contentProps.contentLabel} {...contentProps} />
      ))}
    />
  )
}
