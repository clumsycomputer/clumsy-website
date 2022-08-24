import { NextPage } from "next";
import { useRouter } from "next/router";
import { NavigationFooter } from "../../../common/NavigationFooter/NavigationFooter";
import { Page } from "../../../common/Page/Page";
import { getUpdatedPageRoute } from "./common/getUpdatedPageRoute";
import { MusicItem } from "./common/models";
import { SearchQueryInput } from "./components/SearchQueryInput";
import { SortOrderSelect } from "./components/SortOrderSelect";
import { useFilteredMusicItems } from "./hooks/useFilteredMusicItems";
import { usePageState } from "./hooks/usePageState";
import styles from "./MusicCurationsPage.module.scss";
import { musicItemDataset } from "./musicItemDataset";

export function getStaticProps() {
  return {
    props: {
      musicItemDataset: musicItemDataset.map((someItem) => someItem),
    },
  };
}

export interface MusicCurationsPageProps {
  musicItemDataset: Array<MusicItem>;
}

export const MusicCurationsPage: NextPage<MusicCurationsPageProps> = (
  props: MusicCurationsPageProps
) => {
  const { musicItemDataset } = props;
  const pageRouter = useRouter();
  const pageState = usePageState({
    pageRouter,
  });
  const { filteredMusicListItems, filteredMusicItemsNavigation } =
    useFilteredMusicItems({
      musicItemDataset,
      pageRouter,
      pageState,
    });
  return (
    <Page
      pageContentContainerClassname={styles.pageContentContainer}
      accessibilityLabel={"music curations"}
      pageTabTitle={"+ music - clumsycomputer"}
      pageDescription={"a catalog of awesome music"}
    >
      <div className={styles.itemsFilterContainer}>
        <div className={styles.sortOrderSelectContainer}>
          <SortOrderSelect
            value={pageState.sortOrder}
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
        <SearchQueryInput
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
          clearSearchQuery={() => {
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
        />
      </div>
      <div className={styles.musicItemsList} role={"list"}>
        {filteredMusicListItems}
      </div>
      {filteredMusicItemsNavigation}
      <NavigationFooter
        routeLinks={[
          { routeName: "home", routeHref: "/" },
          { routeName: "packages", routeHref: "/software/packages" },
          { routeName: "resume", routeHref: "/software/resume" },
          { routeName: "graphics", routeHref: "/art/graphics" },
        ]}
        pdfLink={null}
      />
    </Page>
  );
};
