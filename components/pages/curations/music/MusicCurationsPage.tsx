import { NextPage } from "next";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { Fragment, ReactNode, useEffect, useMemo, useState } from "react";
import { usePopper } from "react-popper";
import { NavigationFooter } from "../../../common/NavigationFooter/NavigationFooter";
import { Page } from "../../../common/Page/Page";
import { MusicItemData } from "./common/models";
import styles from "./MusicCurationsPage.module.scss";
import { musicItemsDataset } from "./musicItemsDataset";

export function getStaticProps() {
  return {
    props: {
      adjustedMusicItems: musicItemsDataset,
    },
  };
}

export interface MusicCurationsPageProps {
  adjustedMusicItems: Array<MusicItemData>;
}

export const MusicCurationsPage: NextPage<MusicCurationsPageProps> = (
  props: MusicCurationsPageProps
) => {
  const { adjustedMusicItems } = props;
  const pageRouter = useRouter();
  const pageState = useMemo<MusicCurationsPageState>(() => {
    return {
      pageIndex:
        parseInt(
          typeof pageRouter.query["pageIndex"] === "string"
            ? pageRouter.query["pageIndex"]
            : "wtf?"
        ) || 1,
      searchQuery:
        typeof pageRouter.query["searchQuery"] === "string"
          ? pageRouter.query["searchQuery"]
          : "",
      sortOrder:
        typeof pageRouter.query["sortOrder"] === "string" &&
        [
          "titleAscending",
          "titleDescending",
          "artistAscending",
          "artistDescending",
          "yearAscending",
          "yearDescending",
        ].reduce((sortOrderValid, someValidSortOrder) => {
          return sortOrderValid
            ? sortOrderValid
            : someValidSortOrder === pageRouter.query["sortOrder"];
        }, false)
          ? (pageRouter.query[
              "sortOrder"
            ] as MusicCurationsPageState["sortOrder"])
          : "titleAscending",
    };
  }, [pageRouter.query]);
  const { filteredMusicItemsPage, filteredMusicItemsPageNavigation } =
    useMemo(() => {
      const searchQuery =
        typeof pageRouter.query.searchQuery === "string"
          ? pageRouter.query.searchQuery
          : "";
      const filteredMusicItemsPageSize = 10;
      const filteredMusicItems = adjustedMusicItems
        .filter((someMusicItemData) =>
          `${someMusicItemData.musicTitle},${someMusicItemData.musicArtist.join(
            ","
          )},${someMusicItemData.musicTags.join(",")},${
            someMusicItemData.musicYear
          },${`${someMusicItemData.recordingStyle.join("/")} ${
            someMusicItemData.sourceType === "collection"
              ? someMusicItemData.collectionType
              : someMusicItemData.sourceType
          }${someMusicItemData.itemType === "clip" ? " clip" : ""}`}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
        .sort((itemA, itemB) => {
          switch (pageState.sortOrder) {
            case "titleAscending":
              return itemA.musicTitle.localeCompare(itemB.musicTitle);
            case "titleDescending":
              return itemB.musicTitle.localeCompare(itemA.musicTitle);
            case "artistAscending":
              return itemA.musicArtist[0].localeCompare(itemB.musicArtist[0]);
            case "artistDescending":
              return itemB.musicArtist[0].localeCompare(itemA.musicArtist[0]);
            case "yearAscending":
              return itemA.musicYear.localeCompare(itemB.musicYear);
            case "yearDescending":
              return itemB.musicYear.localeCompare(itemA.musicYear);
          }
        });
      const filteredMusicItemsPageCount =
        Math.ceil(filteredMusicItems.length / filteredMusicItemsPageSize) || 1;
      const filteredMusicItemsItemIndexStart =
        filteredMusicItemsPageSize * (pageState.pageIndex - 1);
      return {
        filteredMusicItemsPage: filteredMusicItems.slice(
          filteredMusicItemsItemIndexStart,
          filteredMusicItemsItemIndexStart + filteredMusicItemsPageSize
        ),
        filteredMusicItemsPageNavigation: (
          <FilteredMusicItemsPageNavigation
            filteredMusicItemsPageIndex={pageState.pageIndex}
            filteredMusicItemsPageCount={filteredMusicItemsPageCount}
            previousPageLink={
              pageState.pageIndex > 1 ? (
                <ActiveMusicItemsPageLink
                  relativePageLinkLabel={"prev"}
                  dataPageHref={getUpdatedPageRoute({
                    pageRouter,
                    currentState: pageState,
                    stateUpdates: {
                      pageIndex: pageState.pageIndex - 1,
                    },
                  })}
                />
              ) : (
                <DisabledMusicItemsPageLink relativePageLinkLabel={"prev"} />
              )
            }
            nextPageLink={
              pageState.pageIndex < filteredMusicItemsPageCount ? (
                <ActiveMusicItemsPageLink
                  relativePageLinkLabel={"next"}
                  dataPageHref={getUpdatedPageRoute({
                    pageRouter,
                    currentState: pageState,
                    stateUpdates: {
                      pageIndex: pageState.pageIndex + 1,
                    },
                  })}
                />
              ) : (
                <DisabledMusicItemsPageLink relativePageLinkLabel={"next"} />
              )
            }
          />
        ),
      };
    }, [pageRouter.query, pageState, pageRouter, adjustedMusicItems]);
  return (
    <Page
      pageContentContainerClassname={styles.pageContentContainer}
      accessibilityLabel={"music curations"}
      pageTabTitle={"+ music - clumsycomputer"}
      pageDescription={"a catalog of awesome music"}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 12,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            paddingBottom: 8,
          }}
        >
          <SortSelect
            sortOrder={pageState.sortOrder}
            onChange={(nextSortOrder) => {
              pageRouter.push(
                getUpdatedPageRoute({
                  pageRouter,
                  currentState: pageState,
                  stateUpdates: {
                    sortOrder: nextSortOrder,
                  },
                }),
                undefined,
                {
                  shallow: true,
                }
              );
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            borderColor: "black",
            borderStyle: "solid",
            borderRadius: 3,
            borderWidth: 1.5,
            paddingBlock: 1,
            paddingInline: 4,
            paddingInlineEnd: 2,
          }}
        >
          <input
            type={"text"}
            style={{
              flexGrow: 1,
              border: "none",
              outline: "none",
              padding: 0,
              fontFamily: "monospace",
              fontStyle: "italic",
              fontWeight: 600,
              fontSize: 18,
            }}
            placeholder={"search music"}
            value={pageState.searchQuery}
            onChange={(someChangeEvent) => {
              pageRouter.push(
                getUpdatedPageRoute({
                  pageRouter,
                  currentState: pageState,
                  stateUpdates: {
                    searchQuery: someChangeEvent.currentTarget.value,
                    pageIndex: 1,
                  },
                }),
                undefined,
                {
                  shallow: true,
                }
              );
            }}
          />
          <svg
            width={18}
            height={18}
            viewBox={"0 0 1 1"}
            style={{ paddingLeft: 8, cursor: "pointer" }}
            onClick={() => {
              pageRouter.push(
                getUpdatedPageRoute({
                  pageRouter,
                  currentState: pageState,
                  stateUpdates: {
                    searchQuery: "",
                    pageIndex: 1,
                  },
                }),
                undefined,
                {
                  shallow: true,
                }
              );
            }}
          >
            <g transform={"translate(0.0,0)"}>
              <circle
                cx={0.5}
                cy={0.5}
                r={0.35}
                stroke={"black"}
                strokeWidth={0.07}
                strokeLinejoin={"round"}
                strokeLinecap={"round"}
                fill={"white"}
              />
              <polygon
                points={
                  "0.5,0.5 0.625,0.375, 0.5,0.5 0.625,0.625 0.5,0.5, 0.375,0.625 0.5,0.5, 0.375,0.375 0.5,0.5"
                }
                stroke={"black"}
                strokeWidth={0.07}
                strokeLinejoin={"round"}
                fill={"white"}
              />
            </g>
          </svg>
        </div>
      </div>
      <div className={styles.musicItemsContainer} role={"list"}>
        {filteredMusicItemsPage.length > 0 ? (
          filteredMusicItemsPage.map((someMusicItemData) => (
            <MusicItem
              key={someMusicItemData.itemId}
              musicTitle={someMusicItemData.musicTitle}
              musicArtist={someMusicItemData.musicArtist}
              musicTags={someMusicItemData.musicTags}
              thumbnailHref={someMusicItemData.thumbnailHref}
              externalLinks={someMusicItemData.externalLinks}
              musicContext={`${
                someMusicItemData.musicYear
              } ${someMusicItemData.recordingStyle.join("/")} ${
                someMusicItemData.sourceType === "collection"
                  ? someMusicItemData.collectionType
                  : someMusicItemData.sourceType
              }${someMusicItemData.itemType === "clip" ? " (clip)" : ""}`}
            />
          ))
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: 18,
              fontWeight: 600,
              fontStyle: "italic",
              color: "#CCCCCC",
              padding: 32,
              paddingTop: 24,
            }}
          >
            no items match
          </div>
        )}
      </div>
      {filteredMusicItemsPageNavigation}
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

interface SortSelectProps {
  sortOrder: MusicCurationsPageState["sortOrder"];
  onChange: (nextSortOrder: MusicCurationsPageState["sortOrder"]) => void;
}

function SortSelect(props: SortSelectProps) {
  const { sortOrder, onChange } = props;
  const [selectMenuOpen, setSelectMenuOpen] = useState(false);
  const [selectElement, setSelectElement] = useState<HTMLDivElement | null>(
    null
  );
  const [selectMenuElement, setSelectMenuElement] =
    useState<HTMLDivElement | null>(null);
  const selectMenuPopper = usePopper(selectElement, selectMenuElement, {
    placement: "bottom-end",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [2, -28],
        },
      },
    ],
  });
  return (
    <Fragment>
      <div
        tabIndex={0}
        ref={setSelectElement}
        style={{
          width: 164,
          borderStyle: "solid",
          borderColor: "black",
          borderWidth: 1.5,
          borderRadius: 3,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingBlock: 1,
          paddingInline: 4,
          fontWeight: 600,
          fontSize: 18,
          fontStyle: "italic",
          cursor: "pointer",
        }}
        onClick={() => {
          setSelectMenuOpen(true);
        }}
      >
        <div style={{ flexGrow: 1 }}>
          {getSortOrderLabel({
            sortOrder,
          })}
        </div>
        <svg
          width={14}
          height={14}
          viewBox={"0 0 1 1"}
          style={{ paddingLeft: 8 }}
        >
          <polygon
            points={"0.2,0.375 0.8,0.375 0.5,0.775"}
            stroke={"black"}
            strokeWidth={0.11}
            strokeLinejoin={"round"}
            fill={"white"}
          />
        </svg>
      </div>
      <div
        ref={setSelectMenuElement}
        {...selectMenuPopper.attributes.popper}
        style={{
          ...selectMenuPopper.styles.popper,
          backgroundColor: "white",
          borderStyle: "solid",
          borderColor: "black",
          borderWidth: 1.5,
          borderRadius: 3,
          display: selectMenuOpen ? "flex" : "none",
          flexDirection: "column",
          padding: 8,
          paddingRight: 12,
          paddingTop: 4,
          paddingBottom: 0,
          fontWeight: 600,
          fontSize: 18,
        }}
      >
        {(
          [
            "titleAscending",
            "titleDescending",
            "artistAscending",
            "artistDescending",
            "yearDescending",
            "yearAscending",
          ] as Array<MusicCurationsPageState["sortOrder"]>
        ).map((someSortOrder) => (
          <div
            key={someSortOrder}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              paddingBottom: 4,
              cursor: "pointer",
            }}
            onClick={() => {
              const nextSortOrder = someSortOrder;
              setSelectMenuOpen(false);
              onChange(nextSortOrder);
            }}
          >
            <div
              style={{
                fontSize: 24,
                paddingRight: 8,
                visibility: someSortOrder === sortOrder ? "visible" : "hidden",
              }}
            >
              ✓
            </div>
            {getSortOrderLabel({
              sortOrder: someSortOrder,
            })}
          </div>
        ))}
      </div>
    </Fragment>
  );
}

interface GetSortOrderLabelApi extends Pick<SortSelectProps, "sortOrder"> {}

function getSortOrderLabel(api: GetSortOrderLabelApi) {
  const { sortOrder } = api;
  switch (sortOrder) {
    case "titleAscending":
      return "title: a → z";
    case "titleDescending":
      return "title: z → a";
    case "artistAscending":
      return "artist: a → z";
    case "artistDescending":
      return "artist: z → a";
    case "yearAscending":
      return "year: oldest";
    case "yearDescending":
      return "year: newest";
  }
}

interface MusicCurationsPageState {
  pageIndex: number;
  sortOrder:
    | "titleAscending"
    | "titleDescending"
    | "artistAscending"
    | "artistDescending"
    | "yearAscending"
    | "yearDescending";
  searchQuery: string;
}

interface GetUpdatedPageRouteApi {
  pageRouter: NextRouter;
  currentState: MusicCurationsPageState;
  stateUpdates: Partial<MusicCurationsPageState>;
}

function getUpdatedPageRoute(api: GetUpdatedPageRouteApi) {
  const { pageRouter, stateUpdates, currentState } = api;
  return `${pageRouter.route}?pageIndex=${
    stateUpdates.pageIndex || currentState.pageIndex
  }&sortOrder=${
    stateUpdates.sortOrder !== undefined
      ? stateUpdates.sortOrder
      : currentState.sortOrder
  }${
    stateUpdates.searchQuery !== undefined && stateUpdates.searchQuery !== ""
      ? `&searchQuery=${stateUpdates.searchQuery}`
      : stateUpdates.searchQuery === undefined &&
        currentState.searchQuery &&
        currentState.searchQuery !== ""
      ? `&searchQuery=${currentState.searchQuery}`
      : ""
  }`;
}

interface MusicItemProps
  extends Pick<
    MusicItemData,
    | "musicTitle"
    | "musicArtist"
    | "musicTags"
    | "thumbnailHref"
    | "externalLinks"
  > {
  musicContext: string;
}

function MusicItem(props: MusicItemProps) {
  const {
    thumbnailHref,
    externalLinks,
    musicTitle,
    musicArtist,
    musicContext,
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
              <title>{`${musicTitle}: thumbnail image`}</title>
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
