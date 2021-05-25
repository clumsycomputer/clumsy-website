import React, { ReactNode } from 'react'
import { createUseStyles } from 'react-jss'
import { SiteTheme } from '../../../siteTheme'

export type SectionContentProps =
  | SomeSectionContentProps<'text', TextContentProps>
  | SomeSectionContentProps<'columnList', ColumnListContentProps>
  | SomeSectionContentProps<'wrapList', WrapListContentProps>

type SomeSectionContentProps<
  SomeContentType extends string,
  SomeContentProps
> = { contentType: SomeContentType } & SomeContentProps

export function SectionContent(props: SectionContentProps) {
  switch (props.contentType) {
    case 'text':
      return <TextContent {...props} />
    case 'columnList':
      return <ColumnListContent {...props} />
    case 'wrapList':
      return <WrapListContent {...props} />
  }
}

interface TextContentProps
  extends Pick<ContentBaseProps, 'accessibilityLabel' | 'contentLabel'> {
  textContent: string
}

function TextContent(props: TextContentProps) {
  const { accessibilityLabel, contentLabel, textContent } = props
  const styles = useTextContentStyles()
  return (
    <ContentBase
      accessibilityLabel={accessibilityLabel}
      contentLabel={contentLabel}
      sectionContent={
        <div role={'paragraph'} className={styles.textContainer}>
          {textContent}
        </div>
      }
    />
  )
}

const useTextContentStyles = createUseStyles((theme: SiteTheme) => ({
  textContainer: {
    paddingLeft: theme.spacing(3 / 2),
  },
}))

interface ColumnListContentProps
  extends Pick<ContentBaseProps, 'accessibilityLabel' | 'contentLabel'> {
  listItems: string[]
}

function ColumnListContent(props: ColumnListContentProps) {
  const { accessibilityLabel, contentLabel, listItems } = props
  const styles = useColumnListStyles()
  return (
    <ContentBase
      accessibilityLabel={accessibilityLabel}
      contentLabel={contentLabel}
      sectionContent={
        <div role={'list'} className={styles.columnListContainer}>
          {listItems.map((listItem) => (
            <div
              key={listItem}
              role={'listitem'}
              className={styles.listItemContainer}
            >
              <div role={'presentation'} className={styles.listItemBullet}>
                -
              </div>
              <div role={'paragraph'} className={styles.listItem}>
                {listItem}
              </div>
            </div>
          ))}
        </div>
      }
    />
  )
}

const useColumnListStyles = createUseStyles((theme: SiteTheme) => ({
  columnListContainer: {
    paddingLeft: theme.spacing(3 / 2),
  },
  listItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    '&:not(:last-child)': {
      paddingBottom: theme.spacing(5 / 4),
    },
  },
  listItemBullet: {},
  listItem: {
    paddingLeft: theme.spacing(1),
  },
}))

interface WrapListContentProps
  extends Pick<ContentBaseProps, 'accessibilityLabel' | 'contentLabel'> {
  listItems: string[]
}

function WrapListContent(props: WrapListContentProps) {
  const { accessibilityLabel, contentLabel, listItems } = props
  const styles = useWrapListStyles()
  return (
    <ContentBase
      accessibilityLabel={accessibilityLabel}
      contentLabel={contentLabel}
      sectionContent={
        <div role={'list'} className={styles.listContainer}>
          {listItems.map((listItem) => (
            <div
              key={listItem}
              role={'listitem'}
              className={styles.itemContainer}
            >
              <div role={'paragraph'} className={styles.listItem}>
                {listItem}
              </div>
            </div>
          ))}
        </div>
      }
    />
  )
}

const useWrapListStyles = createUseStyles((theme: SiteTheme) => ({
  listContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    paddingLeft: theme.spacing(3 / 2),
    marginTop: theme.spacing(-5 / 4),
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: theme.spacing(5 / 4),
    paddingRight: theme.spacing(3 / 2),
  },
  listItem: {},
}))

interface ContentBaseProps {
  accessibilityLabel: string
  contentLabel: string
  sectionContent: ReactNode
}

function ContentBase(props: ContentBaseProps) {
  const { accessibilityLabel, contentLabel, sectionContent } = props
  const styles = useContentBaseStyles()
  return (
    <div
      role={'region'}
      aria-label={accessibilityLabel}
      className={styles.contentContainer}
    >
      <div role={'heading'} aria-level={3} className={styles.labelContainer}>
        {contentLabel}
        <div role={'separator'} className={styles.labelUnderline} />
      </div>
      {sectionContent}
    </div>
  )
}

const useContentBaseStyles = createUseStyles((theme: SiteTheme) => ({
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingBottom: theme.spacing(3),
  },
  labelContainer: {
    fontWeight: 700,
    marginBottom: theme.spacing(5 / 4),
  },
  labelUnderline: {
    marginLeft: theme.spacing(1),
    width: '100%',
    height: 1,
    borderRadius: 1,
    backgroundColor: 'black',
  },
}))
