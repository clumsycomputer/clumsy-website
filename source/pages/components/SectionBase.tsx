import React, { ReactNode } from 'react'
import { createUseStyles } from 'react-jss'
import { SiteTheme } from '../../siteTheme'

export interface SectionBaseProps {
  sectionDivider: ReactNode
  accessibilityLabel: string
  sectionContent: ReactNode
}

export function SectionBase(props: SectionBaseProps) {
  const { sectionDivider, accessibilityLabel, sectionContent } = props
  const styles = useSectionBaseStyles()
  return (
    <div role={'none'} className={styles.sectionContainer}>
      {sectionDivider}
      <div
        role={'region'}
        aria-label={accessibilityLabel}
        className={styles.contentContainer}
      >
        <div
          role={'header'}
          aria-level={2}
          className={styles.accessibilityHeader}
        >
          {accessibilityLabel}
        </div>
        {sectionContent}
      </div>
    </div>
  )
}

const useSectionBaseStyles = createUseStyles((theme: SiteTheme) => ({
  sectionContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: theme.spacing(1),
  },
  accessibilityHeader: {
    display: 'none',
  },
}))
