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
    const filteredMusicItemsPageSize = 10;
    const filteredMusicItems = musicItemsDataset.filter(() => true);
    const filteredMusicItemsPageCount = Math.ceil(
      filteredMusicItems.length / filteredMusicItemsPageSize
    );
    const filteredMusicItemsPageIndexQueryParam =
      parseInt(
        typeof pageRouter.query.filteredMusicItemsPageIndex === "string"
          ? pageRouter.query.filteredMusicItemsPageIndex
          : "wtf?"
      ) || -1;
    const filteredMusicItemsPageIndex =
      filteredMusicItemsPageIndexQueryParam > 0 &&
      filteredMusicItemsPageIndexQueryParam < filteredMusicItemsPageCount
        ? filteredMusicItemsPageIndexQueryParam
        : 1;
    const filteredMusicItemsItemIndexStart =
      filteredMusicItemsPageSize * (filteredMusicItemsPageIndex - 1);
    return {
      dataPageItems: filteredMusicItems.slice(
        filteredMusicItemsItemIndexStart,
        filteredMusicItemsItemIndexStart + filteredMusicItemsPageSize
      ),
      dataPageNavigation: (
        <FilteredMusicItemsPageNavigation
          filteredMusicItemsPageIndex={filteredMusicItemsPageIndex}
          filteredMusicItemsPageCount={filteredMusicItemsPageCount}
          previousPageLink={
            filteredMusicItemsPageIndex > 1 ? (
              <ActiveMusicItemsPageLink
                relativePageLinkLabel={"prev"}
                dataPageHref={`${
                  pageRouter.route
                }?filteredMusicItemsPageIndex=${
                  filteredMusicItemsPageIndex - 1
                }`}
              />
            ) : (
              <DisabledMusicItemsPageLink relativePageLinkLabel={"prev"} />
            )
          }
          nextPageLink={
            filteredMusicItemsPageIndex < filteredMusicItemsPageCount ? (
              <ActiveMusicItemsPageLink
                relativePageLinkLabel={"next"}
                dataPageHref={`${
                  pageRouter.route
                }?filteredMusicItemsPageIndex=${
                  filteredMusicItemsPageIndex + 1
                }`}
              />
            ) : (
              <DisabledMusicItemsPageLink relativePageLinkLabel={"next"} />
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

interface FilteredMusicItemsPageNavigationProps {
  filteredMusicItemsPageCount: number;
  filteredMusicItemsPageIndex: number;
  previousPageLink: ReactNode;
  nextPageLink: ReactNode;
}

function FilteredMusicItemsPageNavigation(
  props: FilteredMusicItemsPageNavigationProps
) {
  const {
    previousPageLink,
    filteredMusicItemsPageIndex,
    filteredMusicItemsPageCount,
    nextPageLink,
  } = props;

  return (
    <div
      className={styles.dataPageNavigationContainer}
      role={"navigation"}
      aria-label={"filtered music items page navigation"}
    >
      {previousPageLink}
      <div className={styles.focusedDataPageIndexDisplayContainer}>
        <label
          className={styles.filteredMusicItemsPageLabel}
          id={"filteredMusicItemsPageLabel"}
        >
          filtered music items page:
        </label>
        <div
          className={styles.filteredMusicItemsPageText}
          role={"meter"}
          aria-valuemin={1}
          aria-valuemax={filteredMusicItemsPageCount}
          aria-valuenow={filteredMusicItemsPageIndex}
          aria-labelledby={"filteredMusicItemsPageLabel"}
        >
          {`${filteredMusicItemsPageIndex} / ${filteredMusicItemsPageCount}`}
        </div>
      </div>
      {nextPageLink}
    </div>
  );
}

interface ActiveMusicItemsPageLinkProps extends MusicItemsPageBaseProps {
  dataPageHref: string;
}

function ActiveMusicItemsPageLink(props: ActiveMusicItemsPageLinkProps) {
  const { dataPageHref, relativePageLinkLabel } = props;
  return (
    <Link href={dataPageHref}>
      <a className={styles.activeFilteredMusicItemsPageLink}>
        {relativePageLinkLabel}
      </a>
    </Link>
  );
}

interface DisabledMusicItemsPageLinkProps extends MusicItemsPageBaseProps {}

function DisabledMusicItemsPageLink(props: DisabledMusicItemsPageLinkProps) {
  const { relativePageLinkLabel } = props;
  return (
    <a className={styles.disabledFilteredMusicItemsPageLink}>
      {relativePageLinkLabel}
    </a>
  );
}

interface MusicItemsPageBaseProps {
  relativePageLinkLabel: string;
}
