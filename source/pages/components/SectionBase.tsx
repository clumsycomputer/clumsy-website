import React, { ReactNode } from 'react'
import { createUseStyles } from 'react-jss'
import { SiteTheme } from '../../siteTheme'

export interface SectionBaseProps {
  sectionDivider: ReactNode
  accessibilityLabel: string
  headerLabels: HeaderLabelProps[]
  bodyContent: ReactNode
}

export function SectionBase(props: SectionBaseProps) {
  const { sectionDivider, accessibilityLabel, headerLabels, bodyContent } =
    props
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
        <div role={'list'} className={styles.headerContainer}>
          {headerLabels.map((someHeaderLabel) => (
            <div
              role={'listitem'}
              className={styles.labelContainer}
              key={someHeaderLabel.label}
            >
              <HeaderLabel {...someHeaderLabel} />
            </div>
          ))}
        </div>
        <div role={'group'} className={styles.bodyContainer}>
          {bodyContent}
        </div>
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
  headerContainer: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 256,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: theme.spacing(1 / 2),
  },
  accessibilityHeader: {
    display: 'none',
  },
  labelContainer: {
    display: 'flex',
    paddingTop: theme.spacing(1),
  },
  bodyContainer: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 512,
    paddingLeft: theme.spacing(3 / 2),
    paddingTop: theme.spacing(3),
    paddingRight: theme.spacing(2),
  },
}))

type HeaderLabelProps = TextHeaderLabelProps | LinkHeaderLabelProps

interface TextHeaderLabelProps extends HeaderLabelBaseProps<'text'> {}

interface LinkHeaderLabelProps extends HeaderLabelBaseProps<'link'> {
  linkHref: string
}

interface HeaderLabelBaseProps<SomeVariant extends string> {
  variant: SomeVariant
  label: string
}

function HeaderLabel(props: HeaderLabelProps) {
  const styles = useHeaderLabelStyles()
  switch (props.variant) {
    case 'text':
      return <div className={styles.headerLabel}>{props.label}</div>
    case 'link':
      return (
        <a className={styles.headerLabel} href={props.linkHref}>
          {props.label}
        </a>
      )
  }
}

const useHeaderLabelStyles = createUseStyles((theme: SiteTheme) => ({
  headerLabel: {
    backgroundColor: theme.palette.lightGrey,
    paddingLeft: theme.spacing(5 / 8),
    paddingRight: theme.spacing(5 / 8),
    paddingTop: theme.spacing(3 / 8),
    paddingBottom: theme.spacing(3 / 8),
    borderRadius: theme.spacing(3 / 8),
    fontWeight: 700,
  },
}))
