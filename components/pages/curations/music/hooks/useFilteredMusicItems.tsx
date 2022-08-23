import { NextRouter } from "next/router";
import { useMemo } from "react";
import { getUpdatedPageRoute } from "../common/getUpdatedPageRoute";
import {
  ActiveMusicItemsPageLink,
  DisabledMusicItemsPageLink,
  FilteredMusicItemsNavigation,
} from "../components/FilteredMusicItemsNavigation";
import { MusicListItem } from "../components/MusicListItem";
import { MusicCurationsPageProps } from "../MusicCurationsPage";
import { usePageState } from "./usePageState";

export interface UseFilteredMusicItemsApi
  extends Pick<MusicCurationsPageProps, "musicItemDataset"> {
  pageRouter: NextRouter;
  pageState: ReturnType<typeof usePageState>;
}

export function useFilteredMusicItems(api: UseFilteredMusicItemsApi) {
  const { musicItemDataset, pageRouter, pageState } = api;
  return useMemo(() => {
    const searchQuery =
      typeof pageRouter.query.searchQuery === "string"
        ? pageRouter.query.searchQuery
        : "";
    const filteredMusicItemsPageSize = 10;
    const filteredMusicItems = musicItemDataset
      .filter((someMusicItem) =>
        `${someMusicItem.musicTitle},${someMusicItem.musicArtist.join(
          ","
        )},${someMusicItem.musicStyles.join(",")},${
          someMusicItem.musicYear
        },${`${someMusicItem.recordingContext.join("/")} ${
          someMusicItem.sourceType === "collection"
            ? someMusicItem.collectionType
            : someMusicItem.sourceType
        }${someMusicItem.musicType === "clip" ? " clip" : ""}`}`
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
    const filteredMusicItemsPage = filteredMusicItems.slice(
      filteredMusicItemsItemIndexStart,
      filteredMusicItemsItemIndexStart + filteredMusicItemsPageSize
    );
    return {
      filteredMusicListItems:
        filteredMusicItemsPage.length > 0 ? (
          filteredMusicItemsPage.map((someMusicItem) => (
            <MusicListItem
              key={someMusicItem.musicId}
              musicThumbnailHref={someMusicItem.musicThumbnailHref}
              musicTitle={someMusicItem.musicTitle}
              musicArtist={someMusicItem.musicArtist}
              musicStyles={someMusicItem.musicStyles}
              externalLinks={someMusicItem.externalLinks}
              musicContext={`${
                someMusicItem.musicYear
              } ${someMusicItem.recordingContext.join("/")} ${
                someMusicItem.sourceType === "collection"
                  ? someMusicItem.collectionType
                  : someMusicItem.sourceType
              }${someMusicItem.musicType === "clip" ? " (clip)" : ""}`}
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
        ),
      filteredMusicItemsNavigation: (
        <FilteredMusicItemsNavigation
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
  }, [pageRouter, pageState]);
}
