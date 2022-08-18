import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useMemo } from "react";
import { NavigationFooter } from "../../../common/NavigationFooter/NavigationFooter";
import { Page } from "../../../common/Page/Page";
import { MusicItemData } from "./common/models";
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
      pageContentContainerClassname={styles.pageContentContainer}
      accessibilityLabel={"music curations"}
      pageTabTitle={"+ music - clumsycomputer"}
      pageDescription={"a catalog of awesome music"}
    >
      <div className={styles.musicItemsContainer} role={"list"}>
        {dataPageItems.map((someMusicItemData) => (
          <MusicItem
            key={someMusicItemData.itemId}
            musicName={someMusicItemData.musicName}
            musicArtist={someMusicItemData.musicArtist}
            musicTags={someMusicItemData.musicTags}
            thumbnailHref={someMusicItemData.thumbnailHref}
            externalLinks={someMusicItemData.externalLinks}
            musicType={`${someMusicItemData.recordingStyle.join("/")} ${
              someMusicItemData.sourceType === "collection"
                ? someMusicItemData.collectionType
                : someMusicItemData.sourceType
            }${someMusicItemData.itemType === "clip" ? " (clip)" : ""}`}
          />
        ))}
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

interface MusicItemProps
  extends Pick<
    MusicItemData,
    | "musicName"
    | "musicArtist"
    | "musicTags"
    | "thumbnailHref"
    | "externalLinks"
  > {
  musicType: string;
}

function MusicItem(props: MusicItemProps) {
  const {
    thumbnailHref,
    externalLinks,
    musicName,
    musicArtist,
    musicType,
    musicTags,
  } = props;
  return (
    <div className={styles.musicItemContainer} role={"listitem"}>
      <div className={styles.musicItemTopRowContainer} role={"presentation"}>
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
              <title>{`${musicName}: thumbnail image`}</title>
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
                href={thumbnailHref}
                x={1}
                y={1}
                width={98}
                height={98}
                clipPath={"inset(0% round 2.5)"}
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
      <div className={styles.musicItemLabelsContainer} role={"group"}>
        <MusicItemLabelList
          accessibilityLabel={"music name"}
          musicLabels={[musicName]}
        />
        <MusicItemLabelList
          accessibilityLabel={"music artist"}
          musicLabels={musicArtist}
        />
        <MusicItemLabelList
          accessibilityLabel={"music type"}
          musicLabels={[musicType]}
        />
        <MusicItemLabelList
          accessibilityLabel={"music tags"}
          musicLabels={musicTags}
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
      className={styles.musicItemLabelList}
      role={"list"}
      aria-label={accessibilityLabel}
    >
      {musicLabels.map((someMusicLabel) => (
        <div
          className={styles.musicItemLabel}
          key={someMusicLabel}
          role={"listitem"}
        >
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
    <div className={styles.dataPageNavigationContainer} role={"navigation"}>
      {previousPageLink}
      <div className={styles.focusedDataPageIndexDisplayContainer}>
        <label
          className={styles.filteredMusicItemsPageLabel}
          id={"filteredMusicItemsPageLabel"}
        >
          music item page:
        </label>
        <div
          className={styles.filteredMusicItemsPageText}
          role={"meter"}
          aria-valuemin={1}
          aria-valuemax={dataPageCount}
          aria-valuenow={dataPageIndex}
          aria-labelledby={"filteredMusicItemsPageLabel"}
        >
          {`${dataPageIndex} / ${dataPageCount}`}
        </div>
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
      <a className={styles.activeFilteredMusicItemsPageLink}>
        {relativePageLinkLabel}
      </a>
    </Link>
  );
}

interface DisabledDataPageLinkProps extends DataPageLinkBaseProps {}

function DisabledDataPageLink(props: DisabledDataPageLinkProps) {
  const { relativePageLinkLabel } = props;
  return (
    <a className={styles.disabledFilteredMusicItemsPageLink}>
      {relativePageLinkLabel}
    </a>
  );
}

interface DataPageLinkBaseProps {
  relativePageLinkLabel: string;
}
