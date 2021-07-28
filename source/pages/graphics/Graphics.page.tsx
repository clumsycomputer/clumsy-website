import React from 'react'
import { createUseStyles } from 'react-jss'
import { SiteTheme } from '../../siteTheme'
import { SectionBase, SectionBaseProps } from '../components/SectionBase'

export default {
  pageRoute: '/graphics',
  PageContent: Graphics,
  htmlTitle: 'graphics - jmath',
  htmlDescription: 'a sampling of recent explorations into space',
  generatePdf: false,
  pdfFileName: 'graphics',
}

function Graphics() {
  const styles = useGraphicStyles()
  return (
    <div role={'none'} className={styles.pageContainer}>
      <div role={'main'} className={styles.resumeContainer}>
        <div role={'header'} aria-level={1} className={styles.mainHeader}>
          graphics
        </div>
        <GraphicSection
          accessibilityLabel={'culprit-graphic'}
          headerLabels={[
            {
              variant: 'text',
              label: 'kool-pah-bleh',
            },
            {
              variant: 'text',
              label: 'plural pinata',
            },
            {
              variant: 'text',
              label: 'sea you dad day mexico',
            },
            {
              variant: 'text',
              label: 'july 2021',
            },
            {
              variant: 'link',
              label: 'view solo',
              linkHref: '/graphics/culprit.png',
            },
          ]}
          imageUrl={'/graphics/culprit.png'}
        />
        <GraphicSection
          accessibilityLabel={'mascot-graphic'}
          headerLabels={[
            {
              variant: 'text',
              label: 'mahs-koh-tah',
            },
            {
              variant: 'text',
              label: 'plural pinata',
            },
            {
              variant: 'text',
              label: 'sea you dad day mexico',
            },
            {
              variant: 'text',
              label: 'july 2021',
            },
            {
              variant: 'link',
              label: 'view solo',
              linkHref: '/graphics/mascot.png',
            },
          ]}
          imageUrl={'/graphics/mascot.png'}
        />
        <GraphicSection
          accessibilityLabel={'comrade-graphic'}
          headerLabels={[
            {
              variant: 'text',
              label: 'kah-mah-rah-dah',
            },
            {
              variant: 'text',
              label: 'plural pinata',
            },
            {
              variant: 'text',
              label: 'sea you dad day mexico',
            },
            {
              variant: 'text',
              label: 'july 2021',
            },
            {
              variant: 'link',
              label: 'view solo',
              linkHref: '/graphics/comrade.png',
            },
          ]}
          imageUrl={'/graphics/comrade.png'}
        />
        <GraphicSection
          accessibilityLabel={'accomplice-graphic'}
          headerLabels={[
            {
              variant: 'text',
              label: 'kohm-plee-seh',
            },
            {
              variant: 'text',
              label: 'plural pinata',
            },
            {
              variant: 'text',
              label: 'sea you dad day mexico',
            },
            {
              variant: 'text',
              label: 'july 2021',
            },
            {
              variant: 'link',
              label: 'view solo',
              linkHref: '/graphics/accomplice.png',
            },
          ]}
          imageUrl={'/graphics/accomplice.png'}
        />
      </div>
    </div>
  )
}

const useGraphicStyles = createUseStyles({
  '@global': {
    body: {
      margin: 0,
      fontFamily: 'monospace',
      WebkitTextSizeAdjust: '100%',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      lineHeight: 5 / 4,
    },
  },
  pageContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resumeContainer: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 832,
    display: 'flex',
    flexDirection: 'column',
  },
  mainHeader: {
    display: 'none',
  },
})

export interface GraphicSectionProps
  extends Pick<SectionBaseProps, 'accessibilityLabel' | 'headerLabels'> {
  imageUrl: string
}

export function GraphicSection(props: GraphicSectionProps) {
  const { accessibilityLabel, headerLabels, imageUrl } = props
  const styles = useGraphicSectionStyles()
  return (
    <SectionBase
      sectionDivider={
        <div role={'separator'} className={styles.sectionDivider} />
      }
      accessibilityLabel={accessibilityLabel}
      headerLabels={headerLabels}
      bodyContent={
        <div>
          <img
            style={{
              width: '100%',
              backgroundColor: 'black',
              borderRadius: 6,
            }}
            src={imageUrl}
          />
        </div>
      }
    />
  )
}

const useGraphicSectionStyles = createUseStyles((theme: SiteTheme) => ({
  sectionDivider: {
    backgroundColor: theme.palette.lightGrey,
    height: theme.spacing(1 / 2),
    borderRadius: theme.spacing(1 / 4),
  },
}))
