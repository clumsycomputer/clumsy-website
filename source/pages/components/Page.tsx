import React, { PropsWithChildren, ReactNode } from 'react'
import { createUseStyles } from 'react-jss'

export type PageProps = PropsWithChildren<{
  accessibilityLabel: string
}>

export function Page(props: PageProps) {
  const { accessibilityLabel, children } = props
  const styles = usePageStyles()
  return (
    <div role={'none'} className={styles.pageContainer}>
      <div role={'main'} className={styles.resumeContainer}>
        <div role={'header'} aria-level={1} className={styles.mainHeader}>
          {accessibilityLabel}
        </div>
        {children}
      </div>
    </div>
  )
}

const usePageStyles = createUseStyles({
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
