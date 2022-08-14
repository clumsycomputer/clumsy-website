import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { NavigationFooter } from "../../common/NavigationFooter/NavigationFooter";
import { Page } from "../../common/Page/Page";
import homePageStyles from "./HomePage.module.scss";

export const HomePage: NextPage = () => {
  return (
    <Page
      accessibilityLabel={"home"}
      pageTabTitle={"clumsycomputer"}
      pageDescription={"a junction of shareables"}
      pageContentContainerClassname={homePageStyles.pageContentContainer}
    >
      <div role={"figure"} className={homePageStyles.landingImageContainer}>
        <Image
          className={homePageStyles.landingImage}
          src={"/graphics/whichway.gif"}
          alt={"gary"}
          width={1024}
          height={1024}
        />
      </div>
      <div role={"list"} className={homePageStyles.routesContainer}>
        {[
          {
            prompt: "software",
            linkHref: "/software",
          },
          {
            prompt: "resume",
            linkHref: "/resume",
          },
          {
            prompt: "graphics",
            linkHref: "/graphics",
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
