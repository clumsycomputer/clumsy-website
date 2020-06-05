import React, { FunctionComponent } from 'react'
import styles from './SectionContent.module.css'

export type SectionContentProps =
  | TextContentProps
  | ColumnListContentProps
  | RowListContentProps

export const SectionContent: FunctionComponent<SectionContentProps> = (props) =>
  props.variant === 'text' ? (
    <TextContent {...props} />
  ) : props.variant === 'columnList' ? (
    <ColumnListContent {...props} />
  ) : props.variant === 'rowList' ? (
    <WrapListContent {...props} />
  ) : null

interface TextContentProps extends BaseContentProps<'text', string> {}

const TextContent: FunctionComponent<TextContentProps> = ({ title, data }) => (
  <div className={styles.contentContainer}>
    <ContentTitle title={title} />
    <div className={styles.textContainer}>{data}</div>
  </div>
)

interface ColumnListContentProps
  extends BaseContentProps<'columnList', string[]> {}

const ColumnListContent: FunctionComponent<ColumnListContentProps> = ({
  title,
  data,
}) => (
  <div className={styles.contentContainer}>
    <ContentTitle title={title} />
    <div className={styles.columnListContainer}>
      {data.map((listItem) => (
        <div key={listItem} className={styles.columnListItemContainer}>
          - <div className={styles.columnListItem}>{listItem}</div>
        </div>
      ))}
    </div>
  </div>
)

interface RowListContentProps extends BaseContentProps<'rowList', string[]> {}

const WrapListContent: FunctionComponent<RowListContentProps> = ({
  title,
  data,
}) => (
  <div className={styles.contentContainer}>
    <ContentTitle title={title} />
    <div className={styles.wrapListContainer}>
      {data.map((listItem) => (
        <div key={listItem} className={styles.wrapListItemContainer}>
          <div className={styles.wrapListItem}>{listItem}</div>
        </div>
      ))}
    </div>
  </div>
)

interface ContentTitleProps extends Pick<BaseContentProps, 'title'> {}

const ContentTitle: FunctionComponent<ContentTitleProps> = ({ title }) => (
  <div className={styles.contentTitle}>
    {title}
    <div className={styles.contentTitleLine} />
  </div>
)

interface BaseContentProps<
  SomeContentVariant extends string = string,
  SomeData = any
> {
  variant: SomeContentVariant
  title: string
  data: SomeData
}
