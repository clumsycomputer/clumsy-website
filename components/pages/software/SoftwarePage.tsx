import { NextPage } from "next";
import { DocumentPage } from "../../common/Document/DocumentPage";
import { NavigationFooter } from "../../common/NavigationFooter/NavigationFooter";
import { SoftwareHeaderSection } from "./components/SoftwareHeaderSection";
import { SoftwareProjectSection } from "./components/SoftwareProjectSection";

export const SoftwarePage: NextPage = () => (
  <_SoftwarePage pageTitle={"open-source"} fullName={"jared mathews"} />
);

interface _SoftwarePageProps {
  pageTitle: string;
  fullName: string;
}

function _SoftwarePage(props: _SoftwarePageProps) {
  const { pageTitle, fullName } = props;
  return (
    <DocumentPage
      accessibilityLabel={pageTitle}
      pageTabTitle={`${pageTitle} - clumsycomputer`}
      pageDescription={`a quick rundown of ${fullName}'s open-source software projects`}
    >
      <SoftwareHeaderSection
        pageTitle={pageTitle}
        fullName={fullName}
        githubHref={"https://github.com/clumsycomputer"}
        softwareOverview={
          "the projects here are open versions of software that have been iterated on in one form or another for close to a decade. these packages offer unique value to the typescript community and beyond"
        }
      />
      <SoftwareProjectSection
        projectName={"clumsy-graphics"}
        repositoryHref={
          "https://github.com/clumsycomputer/clumsy-graphics#readme"
        }
        packageHref={"https://www.npmjs.com/package/clumsy-graphics"}
        projectDescription={
          "a tool for rapidly developing animations where frames are described using svg elements à la react (:"
        }
        projectRoadmap={[
          "streamline installation and initialization",
          "enable exporting animation as gif",
          "improve documentation with simple examples of varied use-cases and a basic video tutorial walking through getting started",
        ]}
        projectTech={[
          "typescript",
          "react",
          "redux-saga",
          "nodejs",
          "docker",
          "ffmpeg",
          "inkscape",
        ]}
      />
      <SoftwareProjectSection
        projectName={"clumsy-math"}
        repositoryHref={"https://github.com/clumsycomputer/clumsy-math#readme"}
        packageHref={"https://www.npmjs.com/package/clumsy-math"}
        projectDescription={"a little library of helpful math utensils :)"}
        projectRoadmap={[
          "produce utilities for working with prime numbers",
          "introduce loop concept and basic apis",
          "provide in-depth documentation detailing expected inputs and outputs of exported functions",
          "implement stack-safe variants of recursive modeled functions",
        ]}
        projectTech={["typescript", "javascript"]}
      />
      <NavigationFooter
        routeLinks={[
          { routeName: "home", routeHref: "/" },
          { routeName: "graphics", routeHref: "/graphics" },
          { routeName: "resume", routeHref: "/resume" },
          { routeName: "- music +", routeHref: "/curations/music" },
        ]}
        pdfLink={null}
      />
    </DocumentPage>
  );
}
