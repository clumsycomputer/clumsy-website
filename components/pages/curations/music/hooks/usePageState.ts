import { NextRouter } from "next/router";
import { useMemo } from "react";
import { MusicCurationsPageState } from "../common/models";

export interface UsePageStateApi {
  pageRouter: NextRouter;
}

export function usePageState(api: UsePageStateApi) {
  const { pageRouter } = api;
  return useMemo<MusicCurationsPageState>(() => {
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
  }, [pageRouter]);
}
