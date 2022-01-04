import React, { ReactNode } from 'react'
import { createUseStyles } from 'react-jss'
import { SiteTheme } from '../../../siteTheme'

export interface GraphicSectionProps {
  sectionDivider: ReactNode
  graphicName: string
  graphicDescription: string
  projectName: string
  projectLocation: string
  projectDate: string
  soloUrl: string
  listUrl: string
}

export function GraphicSection(props: GraphicSectionProps) {
  const {
    sectionDivider,
    graphicName,
    projectName,
    projectLocation,
    projectDate,
    soloUrl,
    listUrl,
    graphicDescription,
  } = props
  const accessibilityLabel = `graphic: ${graphicName}`
  const styles = useGraphicSectionStyles()
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
        <div role={'presentation'} className={styles.bodyContainer}>
          <div role={'presentation'} className={styles.bodyContentContainer}>
            <img
              className={styles.graphicImage}
              src={listUrl}
              alt={graphicDescription}
            />
          </div>
          <div role={'presentation'} className={styles.footerContainer}>
            <div role={'list'} className={styles.labelsContainer}>
              {[graphicName, projectName, projectLocation, projectDate].map(
                (someGraphicLabel) => (
                  <div
                    role={'listitem'}
                    className={styles.labelContainer}
                    key={someGraphicLabel}
                  >
                    <div
                      className={`${styles.graphicLabel} ${styles.footerTextBase}`}
                    >
                      {someGraphicLabel}
                    </div>
                  </div>
                )
              )}
            </div>
            <div role={'list'} className={styles.actionsContainer}>
              {[
                {
                  prompt: 'view hi-res',
                  linkHref: soloUrl,
                },
              ].map((someGraphicAction, actionIndex) => (
                <div
                  role={'listitem'}
                  className={styles.actionContainer}
                  key={`${actionIndex}`}
                >
                  <a
                    className={`${styles.graphicAction} ${styles.footerTextBase}`}
                    href={someGraphicAction.linkHref}
                  >
                    {someGraphicAction.prompt}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const useGraphicSectionStyles = createUseStyles((theme: SiteTheme) => ({
  sectionContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
  },
  accessibilityHeader: {
    display: 'none',
  },
  bodyContainer: {
    flexGrow: 1,
    flexShrink: 1,
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  bodyContentContainer: {
    flexGrow: 0,
    flexShrink: 1,
  },
  graphicImage: {
    width: '100%',
    backgroundColor: 'black',
    borderRadius: 6,
  },
  footerContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  labelsContainer: {
    flexGrow: 1,
    flexShrink: 1,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  labelContainer: {
    display: 'flex',
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  graphicLabel: {
    backgroundColor: theme.palette.lightGrey,
  },
  actionsContainer: {
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: theme.spacing(4),
  },
  actionContainer: {
    display: 'flex',
    paddingTop: theme.spacing(1),
  },
  graphicAction: {},
  footerTextBase: {
    paddingLeft: theme.spacing(5 / 8),
    paddingRight: theme.spacing(5 / 8),
    paddingTop: theme.spacing(3 / 8),
    paddingBottom: theme.spacing(3 / 8),
    borderRadius: theme.spacing(3 / 8),
    fontWeight: 700,
  },
}))
