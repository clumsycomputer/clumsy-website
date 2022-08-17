import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useMemo } from "react";
import { NavigationFooter } from "../../../common/NavigationFooter/NavigationFooter";
import { Page } from "../../../common/Page/Page";
import styles from "./MusicCurationsPage.module.scss";
import { musicItemsDataset } from "./musicItemsDataset";

export const MusicCurationsPage: NextPage = () => {
  const pageRouter = useRouter();
  const { dataPageItems, dataPageNavigation } = useMemo(() => {
    const dataPageSize = Number(pageRouter.query.dataPageSize) || 10;
    const dataPageIndex = Number(pageRouter.query.dataPageIndex) || 1;
    const dataPageItemIndexStart = dataPageSize * (dataPageIndex - 1);
    const filteredMusicItems = musicItemsDataset.filter(() => true);
    const dataPageCount = Math.ceil(filteredMusicItems.length / dataPageSize);
    return {
      dataPageItems: filteredMusicItems.slice(
        dataPageItemIndexStart,
        dataPageItemIndexStart + dataPageSize
      ),
      dataPageNavigation: (
        <DataPageNavigation
          dataPageCount={dataPageCount}
          dataPageIndex={dataPageIndex}
          previousPageLink={
            dataPageIndex > 1 ? (
              <ActiveDataPageLink
                relativePageLinkLabel={"prev"}
                dataPageHref={`${pageRouter.route}?dataPageIndex=${
                  dataPageIndex - 1
                }`}
              />
            ) : (
              <DisabledDataPageLink relativePageLinkLabel={"prev"} />
            )
          }
          nextPageLink={
            dataPageIndex < dataPageCount ? (
              <ActiveDataPageLink
                relativePageLinkLabel={"next"}
                dataPageHref={`${pageRouter.route}?dataPageIndex=${
                  dataPageIndex + 1
                }`}
              />
            ) : (
              <DisabledDataPageLink relativePageLinkLabel={"next"} />
            )
          }
        />
      ),
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
        {dataPageItems.map((someMusicItem) => {
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
      </div>
      {dataPageNavigation}
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

interface DataPageNavigationProps {
  dataPageCount: number;
  dataPageIndex: number;
  previousPageLink: ReactNode;
  nextPageLink: ReactNode;
}

function DataPageNavigation(props: DataPageNavigationProps) {
  const { previousPageLink, dataPageIndex, dataPageCount, nextPageLink } =
    props;
  return (
    <div className={styles.dataPageNavigationContainer}>
      {previousPageLink}
      <div className={styles.focusedDataPageIndexDisplayContainer}>
        <div
          className={styles.dataPageNavigationText}
        >{`${dataPageIndex} / ${dataPageCount}`}</div>
      </div>
      {nextPageLink}
    </div>
  );
}

interface ActiveDataPageLinkProps extends DataPageLinkBaseProps {
  dataPageHref: string;
}

function ActiveDataPageLink(props: ActiveDataPageLinkProps) {
  const { dataPageHref, relativePageLinkLabel } = props;
  return (
    <Link href={dataPageHref}>
      <a className={styles.activeDataPageLink}>{relativePageLinkLabel}</a>
    </Link>
  );
}

interface DisabledDataPageLinkProps extends DataPageLinkBaseProps {}

function DisabledDataPageLink(props: DisabledDataPageLinkProps) {
  const { relativePageLinkLabel } = props;
  return <a className={styles.disabledDataPageLink}>{relativePageLinkLabel}</a>;
}

interface DataPageLinkBaseProps {
  relativePageLinkLabel: string;
}
