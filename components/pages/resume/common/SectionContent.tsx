import { ReactNode } from "react";
import sectionContentStyles from "./SectionContent.module.scss";

export type SectionContentProps =
  | SomeSectionContentProps<"text", TextContentProps>
  | SomeSectionContentProps<"columnList", ColumnListContentProps>
  | SomeSectionContentProps<"wrapList", WrapListContentProps>;

type SomeSectionContentProps<
  SomeContentType extends ReactNode,
  SomeContentProps
> = { contentType: SomeContentType } & SomeContentProps;

export function SectionContent(props: SectionContentProps) {
  switch (props.contentType) {
    case "text":
      return <TextContent {...props} />;
    case "columnList":
      return <ColumnListContent {...props} />;
    case "wrapList":
      return <WrapListContent {...props} />;
  }
}

interface TextContentProps
  extends Pick<ContentBaseProps, "accessibilityLabel" | "contentLabel"> {
  textContent: ReactNode;
}

function TextContent(props: TextContentProps) {
  const { accessibilityLabel, contentLabel, textContent } = props;
  return (
    <ContentBase
      accessibilityLabel={accessibilityLabel}
      contentLabel={contentLabel}
      sectionContent={
        <div role={"paragraph"} className={sectionContentStyles.textContainer}>
          {textContent}
        </div>
      }
    />
  );
}

interface ColumnListContentProps
  extends Pick<ContentBaseProps, "accessibilityLabel" | "contentLabel"> {
  listItems: ReactNode[];
}

function ColumnListContent(props: ColumnListContentProps) {
  const { accessibilityLabel, contentLabel, listItems } = props;
  return (
    <ContentBase
      accessibilityLabel={accessibilityLabel}
      contentLabel={contentLabel}
      sectionContent={
        <div role={"list"} className={sectionContentStyles.columnListContainer}>
          {listItems.map((listItem, listItemIndex) => (
            <div
              key={`${listItemIndex}`}
              role={"listitem"}
              className={sectionContentStyles.columnListItemContainer}
            >
              <div
                role={"presentation"}
                className={sectionContentStyles.columnListItemBullet}
              >
                -
              </div>
              <div
                role={"paragraph"}
                className={sectionContentStyles.columnListItem}
              >
                {listItem}
              </div>
            </div>
          ))}
        </div>
      }
    />
  );
}

interface WrapListContentProps
  extends Pick<ContentBaseProps, "accessibilityLabel" | "contentLabel"> {
  listItems: ReactNode[];
}

function WrapListContent(props: WrapListContentProps) {
  const { accessibilityLabel, contentLabel, listItems } = props;
  return (
    <ContentBase
      accessibilityLabel={accessibilityLabel}
      contentLabel={contentLabel}
      sectionContent={
        <div role={"list"} className={sectionContentStyles.wrapListContainer}>
          {listItems.map((listItem, listItemIndex) => (
            <div
              key={`${listItemIndex}`}
              role={"listitem"}
              className={sectionContentStyles.wrapListItemContainer}
            >
              <div
                role={"paragraph"}
                className={sectionContentStyles.wrapListItem}
              >
                {listItem}
              </div>
            </div>
          ))}
        </div>
      }
    />
  );
}

interface ContentBaseProps {
  accessibilityLabel: string;
  contentLabel: string;
  sectionContent: ReactNode;
}

function ContentBase(props: ContentBaseProps) {
  const { accessibilityLabel, contentLabel, sectionContent } = props;
  return (
    <div
      role={"region"}
      aria-label={accessibilityLabel}
      className={sectionContentStyles.contentContainer}
    >
      <div
        role={"heading"}
        aria-level={3}
        className={sectionContentStyles.labelContainer}
      >
        {contentLabel}
        <div
          role={"separator"}
          className={sectionContentStyles.labelUnderline}
        />
      </div>
      {sectionContent}
    </div>
  );
}
