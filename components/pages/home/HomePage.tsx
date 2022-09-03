import type { NextPage } from "next";
import Link from "next/link";
import { NavigationFooter } from "../../common/NavigationFooter/NavigationFooter";
import { Page } from "../../common/Page/Page";
import homePageStyles from "./HomePage.module.scss";

export const HomePage: NextPage = () => {
  return (
    <Page
      accessibilityLabel={"home"}
      pageTabTitle={"clumsycomputer"}
      pageDescription={"a junction for all things clumsycomputer"}
      pageContentContainerClassname={homePageStyles.pageContentContainer}
    >
      <div role={"figure"} className={homePageStyles.landingImageContainer}>
        <svg className={homePageStyles.landingImage} viewBox={"0 0 100 100"}>
          <rect x={0} y={0} width={100} height={100} fill={"gold"} />
        </svg>
      </div>
      <div role={"list"} className={homePageStyles.routesContainer}>
        {[
          {
            prompt: "packages",
            linkHref: "/software/packages",
          },
          {
            prompt: "resume",
            linkHref: "/software/resume",
          },
          {
            prompt: "graphics",
            linkHref: "/art/graphics",
          },
          {
            prompt: "- music +",
            linkHref: "/curations/music",
          },
        ].map((someRouteAction) => (
          <div
            role={"listitem"}
            className={homePageStyles.routeActionContainer}
            key={someRouteAction.linkHref}
          >
            <Link href={someRouteAction.linkHref}>
              <a className={homePageStyles.routeAction}>
                {someRouteAction.prompt}
              </a>
            </Link>
          </div>
        ))}
      </div>
      <NavigationFooter
        routeLinks={[
          {
            routeName: "github",
            routeHref: "https://github.com/clumsycomputer",
          },
          {
            routeName: "twitter",
            routeHref: "https://twitter.com/c1umsyc0mputer",
          },
          {
            routeName: "hnews",
            routeHref: "https://news.ycombinator.com/user?id=clumsycomputer",
          },
        ]}
        pdfLink={null}
      />
    </Page>
  );
};
