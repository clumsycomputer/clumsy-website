import React from 'react'
import { createUseStyles } from 'react-jss'
import { SiteTheme } from '../../../siteTheme'
import { SectionBase, SectionBaseProps } from './SectionBase'
import { SectionContent, SectionContentProps } from './SectionContent'

export interface ContentsSectionProps
  extends Pick<SectionBaseProps, 'accessibilityLabel' | 'headerLabels'> {
  bodyContents: SectionContentProps[]
}

export function ContentsSection(props: ContentsSectionProps) {
  const { accessibilityLabel, headerLabels, bodyContents } = props
  const styles = useContentsSectionStyles()
  return (
    <SectionBase
      sectionDivider={
        <div role={'separator'} className={styles.sectionDivider} />
      }
      accessibilityLabel={accessibilityLabel}
      headerLabels={headerLabels}
      bodyContent={bodyContents.map((contentProps) => (
        <SectionContent key={contentProps.contentLabel} {...contentProps} />
      ))}
    />
  )
}

const useContentsSectionStyles = createUseStyles((theme: SiteTheme) => ({
  sectionDivider: {
    backgroundColor: theme.palette.lightGrey,
    height: theme.spacing(1 / 2),
    borderRadius: theme.spacing(1 / 4),
  },
}))
