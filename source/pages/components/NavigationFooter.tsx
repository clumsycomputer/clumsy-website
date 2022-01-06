import React, { ReactNode } from 'react'
import { createUseStyles } from 'react-jss'
import { SiteTheme } from '../../siteTheme'

export interface InternalNavigationFooterProps {
  routeLinks: Array<{
    routeName: string
    routeHref: string
  }>
  pdfHref: string | null
}

export function InternalNavigationFooter(props: InternalNavigationFooterProps) {
  const { routeLinks, pdfHref } = props
  const styles = useInternalNavigationFooterStyles()
  return (
    <NavigationFooterContainer>
      <NavigationListContainer>
        {routeLinks.map((someRouteLink) => (
          <div
            role={'listitem'}
            className={styles.routeLinkContainer}
            key={someRouteLink.routeName}
          >
            <a
              role={'link'}
              className={styles.routeLink}
              href={someRouteLink.routeHref}
            >
              {someRouteLink.routeName}
            </a>
          </div>
        ))}
      </NavigationListContainer>
      <div role={'none'} className={styles.pdfLinkContainer}>
        {pdfHref ? (
          <a className={styles.pdfLink} href={pdfHref}>
            view pdf
          </a>
        ) : null}
      </div>
    </NavigationFooterContainer>
  )
}

const useInternalNavigationFooterStyles = createUseStyles(
  (theme: SiteTheme) => ({
    routeLinksContainer: {
      flexGrow: 1,
      flexShrink: 1,
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    routeLinkContainer: {
      display: 'flex',
      flexDirection: 'row',
      padding: theme.spacing(1),
      paddingLeft: theme.spacing(3),
    },
    routeLink: {
      fontSize: 16,
      fontWeight: 600,
    },
    pdfLinkContainer: {
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(4),
    },
    pdfLink: {
      fontSize: 13,
      fontWeight: 500,
    },
  })
)

export interface ExternalNavigationFooterProps {
  websiteLinks: Array<{
    linkLabel: string
    linkText: string
    linkHref: string
  }>
}

export function ExternalNavigationFooter(props: ExternalNavigationFooterProps) {
  const { websiteLinks } = props
  const styles = useExternalNavigationFooterStyles()
  return (
    <NavigationFooterContainer>
      <NavigationListContainer>
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
      </NavigationListContainer>
    </NavigationFooterContainer>
  )
}

const useExternalNavigationFooterStyles = createUseStyles(
  (theme: SiteTheme) => ({
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
  })
)

interface NavigationListContainerProps {
  children: ReactNode
}

function NavigationListContainer(props: NavigationListContainerProps) {
  const { children } = props
  const styles = useNavigationListContainerStyles()
  return (
    <div role={'list'} className={styles.navigationLinksContainer}>
      {children}
    </div>
  )
}

const useNavigationListContainerStyles = createUseStyles(
  (theme: SiteTheme) => ({
    navigationLinksContainer: {
      flexGrow: 1,
      flexShrink: 1,
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  })
)

interface NavigationFooterContainerProps {
  children: ReactNode
}

function NavigationFooterContainer(props: NavigationFooterContainerProps) {
  const { children } = props
  const styles = useNavigationFooterContainerStyles()
  return (
    <div role={'none'} className={styles.footerContainer}>
      <div role={'navigation'} className={styles.navigationContainer}>
        {children}
      </div>
    </div>
  )
}

const useNavigationFooterContainerStyles = createUseStyles(
  (theme: SiteTheme) => ({
    footerContainer: {
      padding: theme.spacing(1),
      paddingTop: theme.spacing(3 / 2),
      paddingBottom: theme.pdfMode ? theme.spacing(5 / 2) : theme.spacing(5),
    },
    navigationContainer: {
      display: 'flex',
      flexDirection: 'row',
      padding: theme.spacing(1),
      paddingLeft: theme.spacing(1 / 4),
      paddingRight: theme.spacing(2),
      borderRadius: theme.spacing(1 / 2),
      backgroundColor: theme.palette.lightGrey,
    },
  })
)
