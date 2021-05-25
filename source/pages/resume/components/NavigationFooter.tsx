import React from 'react'
import { createUseStyles } from 'react-jss'
import { SiteTheme } from '../../../siteTheme'

export interface NavigationFooterProps {
  websiteLinks: {
    linkLabel: string
    linkText: string
    linkHref: string
  }[]
  pdfHref: string
}

export function NavigationFooter(props: NavigationFooterProps) {
  const { websiteLinks, pdfHref } = props
  const styles = useNavigationFooterStyles()
  return (
    <div role={'none'} className={styles.footerContainer}>
      <div role={'navigation'} className={styles.footerContent}>
        <div role={'list'} className={styles.websiteLinksContainer}>
          {websiteLinks.map((someWebsiteLink) => (
            <div
              role={'listitem'}
              className={styles.websiteLinkContainer}
              key={someWebsiteLink.linkLabel}
            >
              <div className={styles.websiteLinkLabelContainer}>
                {someWebsiteLink.linkLabel}:
              </div>
              <a
                role={'link'}
                className={styles.websiteLink}
                href={someWebsiteLink.linkHref}
              >
                {someWebsiteLink.linkText}
              </a>
            </div>
          ))}
        </div>
        <div role={'none'} className={styles.pdfLinkContainer}>
          <a className={styles.pdfLink} href={pdfHref}>
            view pdf
          </a>
        </div>
      </div>
    </div>
  )
}

const useNavigationFooterStyles = createUseStyles((theme: SiteTheme) => ({
  footerContainer: {
    padding: theme.spacing(1),
    paddingTop: theme.spacing(3 / 2),
    paddingBottom: theme.pdfMode ? theme.spacing(5 / 2) : theme.spacing(5),
  },
  footerContent: {
    backgroundColor: theme.palette.lightGrey,
    borderRadius: theme.spacing(1 / 2),
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(1 / 4),
    paddingRight: theme.spacing(2),
  },
  websiteLinksContainer: {
    flexGrow: 1,
    flexShrink: 1,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  websiteLinkContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(3 / 2),
  },
  websiteLinkLabelContainer: {
    fontWeight: 700,
  },
  websiteLink: {
    paddingLeft: theme.spacing(1),
  },
  pdfLinkContainer: {
    paddingLeft: theme.spacing(4),
    paddingTop: theme.spacing(1),
    flexShrink: 0,
  },
  pdfLink: {
    visibility: theme.pdfMode ? 'hidden' : 'inherit',
  },
}))
