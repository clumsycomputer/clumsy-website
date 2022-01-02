import React, { Fragment, ReactNode } from 'react'
import { createUseStyles } from 'react-jss'
import { SiteTheme } from '../../../siteTheme'
import { SectionBase, SectionBaseProps } from '../../components/SectionBase'

export interface ResumeSectionBaseProps
  extends Pick<SectionBaseProps, 'sectionDivider' | 'accessibilityLabel'> {
  sectionLabels: Array<SectionLabelProps>
  bodyContent: ReactNode
}

export function ResumeSectionBase(props: ResumeSectionBaseProps) {
  const { sectionDivider, accessibilityLabel, sectionLabels, bodyContent } =
    props
  const styles = useResumeSectionBaseStyles()
  return (
    <SectionBase
      sectionDivider={sectionDivider}
      accessibilityLabel={accessibilityLabel}
      sectionContent={
        <Fragment>
          <div role={'list'} className={styles.headerContainer}>
            {sectionLabels.map((someSectionLabel) => (
              <div
                role={'listitem'}
                className={styles.labelContainer}
                key={someSectionLabel.label}
              >
                <SectionLabel {...someSectionLabel} />
              </div>
            ))}
          </div>
          <div role={'presentation'} className={styles.bodyContainer}>
            <div role={'group'} className={styles.bodyContentContainer}>
              {bodyContent}
            </div>
          </div>
        </Fragment>
      }
    />
  )
}

const useResumeSectionBaseStyles = createUseStyles((theme: SiteTheme) => ({
  headerContainer: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 256,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: theme.spacing(1 / 2),
  },
  labelContainer: {
    display: 'flex',
    paddingTop: theme.spacing(1),
  },
  bodyContainer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 512,
    paddingLeft: theme.spacing(3 / 2),
    paddingTop: theme.spacing(3),
    paddingRight: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  bodyContentContainer: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 512,
  },
}))

type SectionLabelProps = TextSectionLabelProps | LinkSectionLabelProps

interface TextSectionLabelProps extends SectionLabelBaseProps<'text'> {}

interface LinkSectionLabelProps extends SectionLabelBaseProps<'link'> {
  linkHref: string
}

interface SectionLabelBaseProps<SomeVariant extends string> {
  variant: SomeVariant
  label: string
}

function SectionLabel(props: SectionLabelProps) {
  const styles = useSectionLabelStyles()
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

const useSectionLabelStyles = createUseStyles((theme: SiteTheme) => ({
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
