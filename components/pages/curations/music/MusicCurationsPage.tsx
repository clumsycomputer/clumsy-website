import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { NavigationFooter } from "../../../common/NavigationFooter/NavigationFooter";
import { Page } from "../../../common/Page/Page";
import styles from "./MusicCurationsPage.module.scss";
import { musicItemsDataset } from "./musicItemsDataset";

export const MusicCurationsPage: NextPage = () => {
  const pageRouter = useRouter();
  const { filteredMusicItems, dataPageIndex, dataPageCount } = useMemo(() => {
    const dataPageSize = Number(pageRouter.query.dataPageSize) || 10;
    const dataPageIndex = Number(pageRouter.query.dataPageIndex) || 1;
    const dataPageCount = Math.ceil(musicItemsDataset.length / dataPageSize);
    const dataPageItemIndexStart = dataPageSize * (dataPageIndex - 1);
    const filteredMusicItems = musicItemsDataset.slice(
      dataPageItemIndexStart,
      dataPageItemIndexStart + dataPageSize
    );
    return {
      filteredMusicItems,
      dataPageIndex,
      dataPageCount,
    };
  }, [pageRouter.query]);
  return (
    <Page
      accessibilityLabel={"music curations"}
      pageTabTitle={"+ music - clumsycomputer"}
      pageDescription={"a catalog of awesome music"}
      pageContentContainerClassname={styles.pageContentContainer}
    >
      <div className={styles.musicItemsContainer}>
        {filteredMusicItems.map((someMusicItem) => {
          return (
            <div
              key={someMusicItem.itemId}
              className={styles.musicItemContainer}
            >
              <div className={styles.musicItemTopRowContainer}>
                <Link href={someMusicItem.externalLinks[0].linkHref}>
                  <a
                    className={styles.thumbnailLink}
                    rel={"noreferrer"}
                    target={"_blank"}
                  >
                    <svg
                      className={styles.thumbnailSvg}
                      viewBox={"0 0 100 100"}
                    >
                      <rect
                        x={0}
                        y={0}
                        width={100}
                        height={100}
                        rx={3}
                        ry={3}
                        fill={"#EEEEEE"}
                      />
                      <image
                        href={someMusicItem.thumbnailHref}
                        x={1}
                        y={1}
                        width={98}
                        height={98}
                        clipPath={"inset(0% round 2.5)"}
                      />
                    </svg>
                  </a>
                </Link>
                <div className={styles.externalLinksContainer}>
                  {someMusicItem.externalLinks.map((someExternalLink) => {
                    return (
                      <div
                        key={someExternalLink.linkLabel}
                        className={styles.externalLinkContainer}
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
              <div className={styles.musicItemLabelsContainer}>
                <MusicItemLabelList musicLabels={[someMusicItem.musicName]} />
                <MusicItemLabelList musicLabels={someMusicItem.musicArtist} />
                <MusicItemLabelList
                  musicLabels={[
                    `${someMusicItem.recordingStyle.join("/")} ${
                      someMusicItem.sourceType === "collection"
                        ? someMusicItem.collectionType
                        : someMusicItem.sourceType
                    }${someMusicItem.itemType === "clip" ? " (clip)" : ""}`,
                  ]}
                />
                <MusicItemLabelList musicLabels={someMusicItem.musicTags} />
              </div>
            </div>
          );
        })}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            paddingInline: 12,
            paddingBlockStart: 10,
            paddingBlockEnd: 16,
            alignItems: "baseline",
          }}
        >
          <div>
            {dataPageIndex > 1 ? (
              <Link
                href={`${pageRouter.route}?dataPageIndex=${dataPageIndex - 1}`}
              >
                <a
                  style={{
                    fontWeight: 600,
                    fontSize: 18,
                  }}
                >
                  prev
                </a>
              </Link>
            ) : (
              <a
                style={{
                  fontWeight: 600,
                  fontSize: 18,
                  color: "#CCCCCC",
                }}
              >
                prev
              </a>
            )}
          </div>
          <div
            style={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontWeight: 600,
                fontSize: 18,
              }}
            >
              {`${dataPageIndex} / ${dataPageCount}`}
            </div>
          </div>
          <div>
            {dataPageIndex < dataPageCount ? (
              <Link
                href={`${pageRouter.route}?dataPageIndex=${dataPageIndex + 1}`}
              >
                <a
                  style={{
                    fontWeight: 600,
                    fontSize: 18,
                  }}
                >
                  next
                </a>
              </Link>
            ) : (
              <a
                style={{
                  fontWeight: 600,
                  fontSize: 18,
                  color: "#CCCCCC",
                }}
              >
                next
              </a>
            )}
          </div>
        </div>
      </div>
      <NavigationFooter
        routeLinks={[
          { routeName: "home", routeHref: "/" },
          { routeName: "software", routeHref: "/software" },
          { routeName: "resume", routeHref: "/resume" },
          { routeName: "graphics", routeHref: "/graphics" },
        ]}
        pdfLink={null}
      />
    </Page>
  );
};

interface MusicItemLabelListProps {
  musicLabels: Array<string>;
}

function MusicItemLabelList(props: MusicItemLabelListProps) {
  const { musicLabels } = props;
  return (
    <div className={styles.musicItemLabelList}>
      {musicLabels.map((someMusicLabel) => (
        <div key={someMusicLabel} className={styles.musicItemLabel}>
          {someMusicLabel.toLowerCase()}
        </div>
      ))}
    </div>
  );
}
