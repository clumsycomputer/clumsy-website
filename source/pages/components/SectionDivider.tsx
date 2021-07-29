import React from 'react'
import { createUseStyles } from 'react-jss'
import { SiteTheme } from '../../siteTheme'

export function SectionDivider() {
  const styles = useSectionDividerStyles()
  return <div role={'separator'} className={styles.sectionDivider} />
}

const useSectionDividerStyles = createUseStyles((theme: SiteTheme) => ({
  sectionDivider: {
    backgroundColor: theme.palette.lightGrey,
    height: theme.spacing(1 / 2),
    borderRadius: theme.spacing(1 / 4),
  },
}))
