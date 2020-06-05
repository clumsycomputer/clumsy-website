import React, { FunctionComponent } from 'react'
import styles from './Section.module.css'
import { SectionContent, SectionContentProps } from './SectionContent'

export interface SectionProps {
  header: string[]
  body?: SectionContentProps[]
  showDivider?: boolean
}

export const Section: FunctionComponent<SectionProps> = ({
  showDivider,
  header,
  body,
}) => (
  <div className={styles.sectionDividerContainer}>
    {showDivider ? <div className={styles.divider} /> : null}
    <div className={styles.sectionContainer}>
      <div className={styles.headerContainer}>
        {header.map((label) => (
          <div key={label} className={styles.labelContainer}>
            <div className={styles.label}>{label}</div>
          </div>
        ))}
      </div>
      {body ? (
        <div className={styles.bodyContainer}>
          {body.map((contentProps) => (
            <SectionContent key={contentProps.title} {...contentProps} />
          ))}
        </div>
      ) : null}
    </div>
  </div>
)
