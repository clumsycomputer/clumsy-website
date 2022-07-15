import Link from "next/link";
import { ReactNode } from "react";
import externalNavigationFooterStyles from "./ExternalNavigationFooter.module.scss";
import internalNavigationFooterStyles from "./InternalNavigationFooter.module.scss";
import navigationFooterContainerStyles from "./NavigationFooterContainer.module.scss";
import navigationListContainerStyles from "./NavigationListContainer.module.scss";

export interface InternalNavigationFooterProps {
  routeLinks: Array<{
    routeName: string;
    routeHref: string;
  }>;
  pdfLink: ReactNode;
}

export function InternalNavigationFooter(props: InternalNavigationFooterProps) {
  const { routeLinks, pdfLink } = props;
  return (
    <NavigationFooterContainer>
      <NavigationListContainer>
        {routeLinks.map((someRouteLink) => (
          <div
            role={"listitem"}
            className={internalNavigationFooterStyles.routeLinkContainer}
            key={someRouteLink.routeName}
          >
            <Link href={someRouteLink.routeHref}>
              <a
                role={"link"}
                className={internalNavigationFooterStyles.routeLink}
              >
                {someRouteLink.routeName}
              </a>
            </Link>
          </div>
        ))}
      </NavigationListContainer>
      <div
        role={"none"}
        className={internalNavigationFooterStyles.pdfLinkContainer}
      >
        {pdfLink}
      </div>
    </NavigationFooterContainer>
  );
}

export interface ExternalNavigationFooterProps {
  websiteLinks: Array<{
    linkLabel: string;
    linkText: string;
    linkHref: string;
  }>;
}

export function ExternalNavigationFooter(props: ExternalNavigationFooterProps) {
  const { websiteLinks } = props;
  return (
    <NavigationFooterContainer>
      <NavigationListContainer>
        {websiteLinks.map((someWebsiteLink) => (
          <div
            role={"listitem"}
            className={externalNavigationFooterStyles.websiteLinkContainer}
            key={someWebsiteLink.linkLabel}
          >
            <div
              className={
                externalNavigationFooterStyles.websiteLinkLabelContainer
              }
            >
              {someWebsiteLink.linkLabel}:
            </div>
            <a
              role={"link"}
              className={externalNavigationFooterStyles.websiteLink}
              href={someWebsiteLink.linkHref}
            >
              {someWebsiteLink.linkText}
            </a>
          </div>
        ))}
      </NavigationListContainer>
    </NavigationFooterContainer>
  );
}

interface NavigationListContainerProps {
  children: ReactNode;
}

function NavigationListContainer(props: NavigationListContainerProps) {
  const { children } = props;
  return (
    <div
      role={"list"}
      className={navigationListContainerStyles.navigationLinksContainer}
    >
      {children}
    </div>
  );
}

interface NavigationFooterContainerProps {
  children: ReactNode;
}

function NavigationFooterContainer(props: NavigationFooterContainerProps) {
  const { children } = props;
  return (
    <div
      role={"none"}
      className={navigationFooterContainerStyles.footerContainer}
    >
      <div
        role={"navigation"}
        className={navigationFooterContainerStyles.navigationContainer}
      >
        {children}
      </div>
    </div>
  );
}
