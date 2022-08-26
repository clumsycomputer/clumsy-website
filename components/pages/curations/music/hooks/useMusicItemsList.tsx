import { NextRouter } from "next/router";
import { useMemo } from "react";
import { getUpdatedPageRoute } from "../common/getUpdatedPageRoute";
import {
  ActiveMusicItemsListPageLink,
  DisabledMusicItemsListPageLink,
  MusicItemsListNavigation,
} from "../components/MusicItemsListNavigation";
import { EmptyListItem, MusicListItem } from "../components/MusicListItem";
import { MusicCurationsPageProps } from "../MusicCurationsPage";
import { usePageState } from "./usePageState";

export interface UseMusicItemsListApi
  extends Pick<MusicCurationsPageProps, "musicItemDataset"> {
  pageRouter: NextRouter;
  pageState: ReturnType<typeof usePageState>;
}

export function useMusicItemsList(api: UseMusicItemsListApi) {
  const { musicItemDataset, pageRouter, pageState } = api;
  return useMemo(() => {
    const searchQuery =
      typeof pageRouter.query.searchQuery === "string"
        ? pageRouter.query.searchQuery
        : "";
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
    const pageSize = 10;
    const pageCount = Math.ceil(filteredMusicItems.length / pageSize) || 1;
    const _pageIndex =
      pageState.pageIndex > 0 && pageState.pageIndex <= pageCount
        ? pageState.pageIndex
        : 1;
    const pageIndexStart = pageSize * (_pageIndex - 1);
    const musicItemsListPage = filteredMusicItems.slice(
      pageIndexStart,
      pageIndexStart + pageSize
    );
    return {
      musicListItems:
        musicItemsListPage.length > 0 ? (
          musicItemsListPage.map((someMusicItem) => (
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
          <EmptyListItem />
        ),
      musicItemsListNavigation: (
        <MusicItemsListNavigation
          _pageIndex={_pageIndex}
          pageCount={pageCount}
          previousPageLink={
            _pageIndex > 1 ? (
              <ActiveMusicItemsListPageLink
                linkLabel={"prev"}
                dataPageHref={getUpdatedPageRoute({
                  pageRouter,
                  currentState: pageState,
                  stateUpdates: {
                    pageIndex: _pageIndex - 1,
                  },
                })}
              />
            ) : (
              <DisabledMusicItemsListPageLink linkLabel={"prev"} />
            )
          }
          nextPageLink={
            _pageIndex < pageCount ? (
              <ActiveMusicItemsListPageLink
                linkLabel={"next"}
                dataPageHref={getUpdatedPageRoute({
                  pageRouter,
                  currentState: pageState,
                  stateUpdates: {
                    pageIndex: _pageIndex + 1,
                  },
                })}
              />
            ) : (
              <DisabledMusicItemsListPageLink linkLabel={"next"} />
            )
          }
        />
      ),
    };
  }, [pageRouter, pageState, musicItemDataset]);
}
