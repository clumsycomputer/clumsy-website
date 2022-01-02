import React, { Fragment } from 'react'
import { createUseStyles } from 'react-jss'
import { siteConfig } from '../../siteConfig'
import { SiteTheme } from '../../siteTheme'
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
  const styles = useGraphicSectionStyles()
  return (
    <SectionBase
      sectionDivider={sectionDivider}
      accessibilityLabel={`graphic: ${graphicName}`}
      sectionContent={
        <Fragment>
          <div role={'presentation'} className={styles.bodyContainer}>
            <div role={'group'} className={styles.bodyContentContainer}>
              <img
                style={{
                  width: '100%',
                  backgroundColor: 'black',
                  borderRadius: 6,
                }}
                src={listUrl}
                alt={graphicDescription}
              />
            </div>
          </div>
          <div role={'presentation'} className={styles.footerContainer}>
            <div role={'list'} className={styles.graphicLabelsContainer}>
              {(
                [
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
                  // {
                  //   variant: 'link',
                  //   label: 'view hi-res',
                  //   linkHref: soloUrl,
                  // },
                ] as SectionLabelProps[]
              ).map((someSectionLabel) => (
                <div
                  role={'listitem'}
                  className={styles.labelContainer}
                  key={someSectionLabel.label}
                >
                  <SectionLabel {...someSectionLabel} />
                </div>
              ))}
            </div>
            <div role={'list'} className={styles.actionsContainer}>
              <div role={'listitem'} className={styles.actionContainer}>
                <a className={styles.actionLabel} href={soloUrl}>
                  view hi-res
                </a>
              </div>
            </div>
          </div>
        </Fragment>
      }
    />
  )
}

const useGraphicSectionStyles = createUseStyles((theme: SiteTheme) => ({
  footerContainer: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 256,
    display: 'flex',
    flexDirection: 'row',
    paddingTop: theme.spacing(1 / 2),
    paddingBottom: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  graphicLabelsContainer: {
    flexGrow: 1,
    flexShrink: 1,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  labelContainer: {
    display: 'flex',
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(1),
  },
  actionsContainer: {
    flexShrink: 0,
    paddingLeft: theme.spacing(3),
  },
  actionContainer: {
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  actionLabel: {
    paddingLeft: theme.spacing(5 / 8),
    paddingRight: theme.spacing(5 / 8),
    paddingTop: theme.spacing(3 / 8),
    paddingBottom: theme.spacing(3 / 8),
    fontWeight: 700,
  },
  bodyContainer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 512,
    paddingLeft: theme.spacing(0),
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
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
