import React from 'react'
import { createUseStyles } from 'react-jss'
import { siteConfig } from '../../siteConfig'
import { SiteTheme } from '../../siteTheme'
import { Page } from '../components/Page'
import { SectionDivider } from '../components/SectionDivider'
import { GraphicSection } from './components/GraphicSection'

export default {
  pageRoute: '/graphics',
  PageContent: GraphicsPage,
  htmlTitle: 'graphics - jmath',
  htmlDescription: 'a sampling of recent explorations into space',
  generatePdf: false,
  pdfFileName: 'graphics',
}

function GraphicsPage() {
  const styles = useGraphicsPageStyles()
  return (
    <Page
      accessibilityLabel={'graphics'}
      pageContentContainerClassname={styles.pageContentContainer}
    >
      <GraphicSection
        sectionDivider={null}
        graphicName={'rree-koh'}
        graphicDescription={'what do you see?'}
        projectName={'plural pinata'}
        projectLocation={'mexico city'}
        projectDate={'summer 2021'}
        soloUrl={'/graphics/rree-koh.hi.png'}
        listUrl={'/graphics/rree-koh.png'}
      />
      <GraphicSection
        sectionDivider={<SectionDivider />}
        graphicName={'kohm-plee-seh'}
        graphicDescription={'what do you see?'}
        projectName={'plural pinata'}
        projectLocation={'mexico city'}
        projectDate={'summer 2021'}
        soloUrl={'/graphics/kohm-plee-seh.hi.png'}
        listUrl={'/graphics/kohm-plee-seh.png'}
      />
      <GraphicSection
        sectionDivider={<SectionDivider />}
        graphicName={'mahs-koh-tah'}
        graphicDescription={'what do you see?'}
        projectName={'plural pinata'}
        projectLocation={'mexico city'}
        projectDate={'summer 2021'}
        soloUrl={'/graphics/mahs-koh-tah.hi.png'}
        listUrl={'/graphics/mahs-koh-tah.png'}
      />
      <GraphicSection
        sectionDivider={<SectionDivider />}
        graphicName={'kool-pah-bleh'}
        graphicDescription={'what do you see?'}
        projectName={'plural pinata'}
        projectLocation={'mexico city'}
        projectDate={'summer 2021'}
        soloUrl={'/graphics/kool-pah-bleh.hi.png'}
        listUrl={'/graphics/kool-pah-bleh.png'}
      />
      <GraphicSection
        sectionDivider={<SectionDivider />}
        graphicName={'trywe'}
        graphicDescription={'what do you see?'}
        projectName={'try all'}
        projectLocation={'fort collins'}
        projectDate={'winter 2017-18'}
        soloUrl={'/graphics/trywe.hi.png'}
        listUrl={'/graphics/trywe.png'}
      />
      <GraphicSection
        sectionDivider={<SectionDivider />}
        graphicName={'trythee'}
        graphicDescription={'what do you see?'}
        projectName={'try all'}
        projectLocation={'fort collins'}
        projectDate={'winter 2017-18'}
        soloUrl={'/graphics/trythee.hi.png'}
        listUrl={'/graphics/trythee.png'}
      />
      <GraphicSection
        sectionDivider={<SectionDivider />}
        graphicName={'tryme'}
        graphicDescription={'what do you see?'}
        projectName={'try all'}
        projectLocation={'fort collins'}
        projectDate={'winter 2017-18'}
        soloUrl={'/graphics/tryme.hi.png'}
        listUrl={'/graphics/tryme.png'}
      />
      <GraphicSection
        sectionDivider={<SectionDivider />}
        graphicName={'litethrewyou'}
        graphicDescription={'what do you see?'}
        projectName={'squared'}
        projectLocation={'fort collins'}
        projectDate={'winter 2017-18'}
        soloUrl={'/graphics/litethrewyou.hi.png'}
        listUrl={'/graphics/litethrewyou.png'}
      />
      <GraphicSection
        sectionDivider={<SectionDivider />}
        graphicName={'leadtwowater'}
        graphicDescription={'what do you see?'}
        projectName={'squared'}
        projectLocation={'fort collins'}
        projectDate={'winter 2017-18'}
        soloUrl={'/graphics/leadtwowater.hi.png'}
        listUrl={'/graphics/leadtwowater.png'}
      />
      <GraphicSection
        sectionDivider={<SectionDivider />}
        graphicName={'sonsetrise'}
        graphicDescription={'what do you see?'}
        projectName={'chord theory'}
        projectLocation={'fort collins'}
        projectDate={'winter 2017-18'}
        soloUrl={'/graphics/sonsetrise.hi.png'}
        listUrl={'/graphics/sonsetrise.png'}
      />
      <GraphicSection
        sectionDivider={<SectionDivider />}
        graphicName={'sircomevent'}
        graphicDescription={'what do you see?'}
        projectName={'chord theory'}
        projectLocation={'fort collins'}
        projectDate={'winter 2017-18'}
        soloUrl={'/graphics/sircomevent.hi.png'}
        listUrl={'/graphics/sircomevent.png'}
      />
      <div role={'none'} className={styles.footerContainer}>
        <div role={'navigation'} className={styles.footerContent}>
          <div role={'list'} className={styles.routeLinksContainer}>
            {[
              { routeName: 'home', routeHref: '/' },
              { routeName: 'resume', routeHref: '/resume' },
            ].map((someWebsiteLink) => (
              <div
                role={'listitem'}
                className={styles.routeLinkContainer}
                key={someWebsiteLink.routeName}
              >
                <a
                  role={'link'}
                  className={styles.routeLink}
                  href={someWebsiteLink.routeHref}
                >
                  {someWebsiteLink.routeName}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Page>
  )
}

const useGraphicsPageStyles = createUseStyles((theme: SiteTheme) => ({
  pageContentContainer: {
    flexBasis: 512,
  },
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
    // paddingRight: theme.spacing(2),
  },
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
    fontSize: 20,
    fontWeight: 600,
  },
}))
