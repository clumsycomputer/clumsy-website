import { NextRouter } from "next/router";
import { MusicCurationsPageState } from "./models";

export interface GetUpdatedPageRouteApi {
  pageRouter: NextRouter;
  currentState: MusicCurationsPageState;
  stateUpdates: Partial<MusicCurationsPageState>;
}

export function getUpdatedPageRoute(api: GetUpdatedPageRouteApi) {
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
