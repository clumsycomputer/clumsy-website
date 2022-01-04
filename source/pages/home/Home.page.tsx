import React from 'react'
import { createUseStyles } from 'react-jss'
import { SiteTheme } from '../../siteTheme'
import { Page } from '../components/Page'

export default {
  pageRoute: '/',
  PageContent: HomePage,
  htmlTitle: 'home - jmath',
  htmlDescription: 'a sampling of recent explorations into space',
  generatePdf: false,
  pdfFileName: 'home',
}

function HomePage() {
  const styles = useHomePageStyles()
  return (
    <Page
      accessibilityLabel={'home'}
      pageContentContainerClassname={styles.pageContentContainer}
    >
      <div className={styles.selfieContainer}>
        <div
          className={styles.selfieBackground}
          style={{
            background: `linear-gradient(115deg, #CDDC39, #FFC107)`,
          }}
        >
          <img
            className={styles.selfieImage}
            src={'/selfie.jpeg'}
            alt={'selfie'}
          />
        </div>
      </div>
      <div className={styles.routesContainer}>
        {[
          {
            prompt: 'graphics',
            linkHref: '/graphics',
          },
          {
            prompt: 'resume',
            linkHref: '/resume',
          },
        ].map((someRouteAction) => (
          <div className={styles.routeActionContainer}>
            <a className={styles.routeAction} href={someRouteAction.linkHref}>
              {someRouteAction.prompt}
            </a>
          </div>
        ))}
      </div>
    </Page>
  )
}

const useHomePageStyles = createUseStyles((theme: SiteTheme) => ({
  pageContentContainer: {
    flexBasis: 512,
  },
  selfieContainer: {
    display: 'flex',
    padding: theme.spacing(2),
  },
  selfieBackground: {
    display: 'flex',
    padding: theme.spacing(1),
    borderRadius: 6,
    // background: () => `linear-gradient(to left top, #CDDC39, #E65100)`,
  },
  selfieImage: {
    width: '100%',
    borderRadius: 3,
  },
  routesContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  routeActionContainer: {
    paddingTop: theme.spacing(2),
  },
  routeAction: {
    paddingLeft: theme.spacing(5 / 8),
    paddingRight: theme.spacing(5 / 8),
    paddingTop: theme.spacing(3 / 8),
    paddingBottom: theme.spacing(3 / 8),
    borderRadius: theme.spacing(3 / 8),
    fontWeight: 700,
    fontSize: 30,
  },
}))
