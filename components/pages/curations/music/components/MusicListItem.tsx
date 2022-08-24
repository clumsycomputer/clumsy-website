import Link from "next/link";
import { MusicItem } from "../common/models";
import styles from "./MusicListItem.module.scss";

export interface MusicListItemProps
  extends Pick<
    MusicItem,
    | "musicThumbnailHref"
    | "musicTitle"
    | "musicArtist"
    | "musicStyles"
    | "externalLinks"
  > {
  musicContext: string;
}

export function MusicListItem(props: MusicListItemProps) {
  const {
    musicThumbnailHref,
    externalLinks,
    musicTitle,
    musicArtist,
    musicContext,
    musicStyles,
  } = props;
  return (
    <div className={styles.itemContainer} role={"listitem"}>
      <div className={styles.topRowContainer} role={"presentation"}>
        <Link href={externalLinks[0].linkHref}>
          <a
            className={styles.thumbnailLink}
            rel={"noreferrer"}
            target={"_blank"}
          >
            <svg
              className={styles.thumbnailSvg}
              viewBox={"0 0 100 100"}
              role={"img"}
            >
              <title>{`${musicTitle}: thumbnail image`}</title>
              <rect
                x={0}
                y={0}
                width={100}
                height={100}
                rx={4}
                ry={4}
                fill={"#EEEEEE"}
              />
              <image
                href={musicThumbnailHref}
                x={1}
                y={1}
                width={98}
                height={98}
                clipPath={"inset(0% round 3)"}
              />
            </svg>
          </a>
        </Link>
        <div className={styles.externalLinksContainer} role={"list"}>
          {externalLinks.map((someExternalLink) => {
            return (
              <div
                className={styles.externalLinkContainer}
                key={someExternalLink.linkLabel}
                role={"listitem"}
              >
                <Link
                  key={someExternalLink.linkLabel}
                  href={someExternalLink.linkHref}
                >
                  <a
                    className={styles.externalLinkLabel}
                    rel={"noreferrer"}
                    target={"_blank"}
                  >
                    {someExternalLink.linkLabel}
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.itemLabelsContainer} role={"group"}>
        <MusicItemLabelList
          accessibilityLabel={"music title"}
          musicLabels={[musicTitle]}
        />
        <MusicItemLabelList
          accessibilityLabel={"music artist"}
          musicLabels={musicArtist}
        />
        <MusicItemLabelList
          accessibilityLabel={"music context"}
          musicLabels={[musicContext]}
        />
        <MusicItemLabelList
          accessibilityLabel={"music styles"}
          musicLabels={musicStyles}
        />
      </div>
    </div>
  );
}

interface MusicItemLabelListProps {
  accessibilityLabel: string;
  musicLabels: Array<string>;
}

function MusicItemLabelList(props: MusicItemLabelListProps) {
  const { accessibilityLabel, musicLabels } = props;
  return (
    <div
      className={styles.itemLabelList}
      role={"list"}
      aria-label={accessibilityLabel}
    >
      {musicLabels.map((someMusicLabel) => (
        <div
          className={styles.itemLabel}
          key={someMusicLabel}
          role={"listitem"}
        >
          {someMusicLabel.toLowerCase()}
        </div>
      ))}
    </div>
  );
}

export interface EmptyListItemsProps {}

export function EmptyListItem(props: EmptyListItemsProps) {
  return <div className={styles.emptyListItem}>no items match</div>;
}
