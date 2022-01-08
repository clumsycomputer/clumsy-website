import React from 'react'
import { createUseStyles } from 'react-jss'
import { SiteTheme } from '../../siteTheme'
import { ExternalNavigationFooter } from '../components/NavigationFooter'
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
      <div role={'figure'} className={styles.selfieContainer}>
        <div role={'presentation'} className={styles.selfieBackground}>
          <img
            className={styles.selfieImage}
            src={'/selfie.jpeg'}
            alt={'¡perro ladrando!'}
          />
        </div>
        <div role={'presentation'} className={styles.selfieCaptionContainer}>
          <figcaption className={styles.selfieCaption}>
            ¡perro ladrando!
          </figcaption>
        </div>
      </div>
      <div role={'list'} className={styles.routesContainer}>
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
          <div
            role={'listitem'}
            className={styles.routeActionContainer}
            key={someRouteAction.linkHref}
          >
            <a className={styles.routeAction} href={someRouteAction.linkHref}>
              {someRouteAction.prompt}
            </a>
          </div>
        ))}
      </div>
      <ExternalNavigationFooter
        websiteLinks={[
          {
            linkLabel: 'github',
            linkText: 'clumsycomputer',
            linkHref: 'https://github.com/clumsycomputer',
          },
          {
            linkLabel: 'hnews',
            linkText: 'jmath',
            linkHref: 'https://news.ycombinator.com/user?id=jmath',
          },
        ]}
      />
    </Page>
  )
}

const useHomePageStyles = createUseStyles((theme: SiteTheme) => ({
  pageContentContainer: {
    flexBasis: 512,
  },
  selfieContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    paddingTop: theme.spacing(2.125),
  },
  selfieBackground: {
    display: 'flex',
    padding: theme.spacing(1),
    paddingBottom: theme.spacing(0.95),
    borderRadius: 7,
    background: `linear-gradient(115deg, ${theme.palette.lime}, ${theme.palette.mustardGold})`,
  },
  selfieImage: {
    width: '100%',
    borderRadius: 4,
  },
  selfieCaptionContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: theme.spacing(3 / 2),
  },
  selfieCaption: {
    fontStyle: 'italic',
    fontWeight: 500,
    fontSize: 16,
  },
  routesContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: theme.spacing(6),
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
