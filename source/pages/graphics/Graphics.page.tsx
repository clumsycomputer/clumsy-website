import React from 'react'
import { siteConfig } from '../../siteConfig'
import { NavigationFooter } from '../components/NavigationFooter'
import { Page } from '../components/Page'
import { SectionBase, SectionBaseProps } from '../components/SectionBase'
import { SectionDivider } from '../components/SectionDivider'

export default {
  pageRoute: '/',
  PageContent: Graphics,
  htmlTitle: 'graphics - jmath',
  htmlDescription: 'a sampling of recent explorations into space',
  generatePdf: false,
  pdfFileName: 'graphics',
}

function Graphics() {
  return (
    <Page accessibilityLabel={'graphics'}>
      <GraphicSection
        sectionDivider={null}
        graphicName={'kool-pah-bleh'}
        graphicDescription={'what do you see?'}
        projectName={'plural pinata'}
        projectLocation={'sea you dad day mexico'}
        projectDate={'july 2021'}
        soloUrl={'/graphics/kool-pah-bleh.hi.png'}
        listUrl={'/graphics/kool-pah-bleh.png'}
      />
      <GraphicSection
        sectionDivider={<SectionDivider />}
        graphicName={'mahs-koh-tah'}
        graphicDescription={'what do you see?'}
        projectName={'plural pinata'}
        projectLocation={'sea you dad day mexico'}
        projectDate={'july 2021'}
        soloUrl={'/graphics/mahs-koh-tah.hi.png'}
        listUrl={'/graphics/mahs-koh-tah.png'}
      />
      <GraphicSection
        sectionDivider={<SectionDivider />}
        graphicName={'kah-mah-rah-dah'}
        graphicDescription={'what do you see?'}
        projectName={'plural pinata'}
        projectLocation={'sea you dad day mexico'}
        projectDate={'july 2021'}
        soloUrl={'/graphics/kah-mah-rah-dah.hi.png'}
        listUrl={'/graphics/kah-mah-rah-dah.png'}
      />
      <GraphicSection
        sectionDivider={<SectionDivider />}
        graphicName={'kohm-plee-seh'}
        graphicDescription={'what do you see?'}
        projectName={'plural pinata'}
        projectLocation={'sea you dad day mexico'}
        projectDate={'july 2021'}
        soloUrl={'/graphics/kohm-plee-seh.hi.png'}
        listUrl={'/graphics/kohm-plee-seh.png'}
      />
      <GraphicSection
        sectionDivider={<SectionDivider />}
        graphicName={'rree-koh'}
        graphicDescription={'what do you see?'}
        projectName={'plural pinata'}
        projectLocation={'sea you dad day mexico'}
        projectDate={'july 2021'}
        soloUrl={'/graphics/rree-koh.hi.png'}
        listUrl={'/graphics/rree-koh.png'}
      />
      <NavigationFooter
        websiteLinks={[
          {
            linkLabel: 'resume',
            linkText: '/resume',
            linkHref: `${siteConfig.baseUrl}/resume`,
          },
          {
            linkLabel: 'github',
            linkText: 'clumsycomputer',
            linkHref: 'https://github.com/clumsycomputer',
          },
        ]}
      />
    </Page>
  )
}

export interface GraphicSectionProps
  extends Pick<SectionBaseProps, 'sectionDivider'> {
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
  return (
    <SectionBase
      sectionDivider={sectionDivider}
      accessibilityLabel={`graphic: ${graphicName}`}
      headerLabels={[
        {
          variant: 'text',
          label: graphicName,
        },
        {
          variant: 'text',
          label: projectName,
        },
        {
          variant: 'text',
          label: projectLocation,
        },
        {
          variant: 'text',
          label: projectDate,
        },
        {
          variant: 'link',
          label: 'view hi-res',
          linkHref: soloUrl,
        },
      ]}
      bodyContent={
        <img
          style={{
            width: '100%',
            backgroundColor: 'black',
            borderRadius: 6,
          }}
          src={listUrl}
          alt={graphicDescription}
        />
      }
    />
  )
}
