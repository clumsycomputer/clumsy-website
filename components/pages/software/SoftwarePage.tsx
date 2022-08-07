import { NextPage } from "next";
import { Fragment } from "react";
import { ContentsSection } from "../../common/Document/ContentSection";
import { DocumentPage } from "../../common/Document/DocumentPage";
import { DocumentSectionBase } from "../../common/Document/DocumentSectionBase";
import { SectionContent } from "../../common/Document/SectionContent";
import { NavigationFooter } from "../../common/NavigationFooter/NavigationFooter";

export const SoftwarePage: NextPage = () => {
  const pageTitle = "software";
  const fullName = "jared mathews";
  return (
    <DocumentPage
      accessibilityLabel={pageTitle}
      pageTabTitle={`${pageTitle} - clumsycomputer`}
      pageDescription={`a quick rundown of ${fullName}'s active open-source software projects`}
    >
      <SoftwareHeaderSection
        pageTitle={pageTitle}
        fullName={fullName}
        githubHref={"https://github.com/clumsycomputer"}
        softwareOverview={
          "the projects here are open versions of software that ive been iterating on in one form or another for almost a decade now, and believe they can offer unique value to the typescript community and beyond"
        }
      />
      <SoftwareProjectSection
        projectName={"clumsy-graphics"}
        repositoryHref={
          "https://github.com/clumsycomputer/clumsy-graphics#readme"
        }
        packageHref={"https://www.npmjs.com/package/clumsy-graphics"}
        projectDescription={
          "a tool for rapidly developing animations where frames are described using svg elements à la react 🙃"
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
        projectDescription={"a little library of helpful math utensils 🙂"}
        projectRoadmap={[
          "supply convenient prime number utilities",
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
        ]}
        pdfLink={null}
      />
    </DocumentPage>
  );
};

interface SoftwareHeaderSectionProps {
  githubHref: string;
  fullName: string;
  pageTitle: string;
  softwareOverview: string;
}

function SoftwareHeaderSection(props: SoftwareHeaderSectionProps) {
  const { fullName, pageTitle, githubHref, softwareOverview } = props;
  return (
    <DocumentSectionBase
      sectionDivider={null}
      accessibilityLabel={`${pageTitle}: ${fullName}`}
      headerLabels={[
        {
          variant: "text",
          label: pageTitle,
        },
        {
          variant: "link",
          label: "github",
          linkHref: githubHref,
        },
      ]}
      bodyContent={
        <Fragment>
          <SectionContent
            accessibilityLabel={`software overview: ${fullName}`}
            contentType={"text"}
            contentLabel={"overview"}
            textContent={softwareOverview}
          />
        </Fragment>
      }
    />
  );
}

interface SoftwareProjectSectionProps {
  projectName: string;
  repositoryHref: string;
  packageHref: string;
  projectDescription: string;
  projectRoadmap: Array<string>;
  projectTech: Array<string>;
}

function SoftwareProjectSection(props: SoftwareProjectSectionProps) {
  const {
    projectName,
    repositoryHref,
    packageHref,
    projectDescription,
    projectRoadmap,
    projectTech,
  } = props;
  return (
    <ContentsSection
      accessibilityLabel={`project: ${projectName}`}
      headerLabels={[
        {
          variant: "text",
          label: projectName,
        },
        {
          variant: "link",
          label: "repository",
          linkHref: repositoryHref,
        },
        {
          variant: "link",
          label: "package",
          linkHref: packageHref,
        },
      ]}
      bodyContents={[
        {
          accessibilityLabel: `project description: ${projectName}`,
          contentType: "text",
          contentLabel: "description",
          textContent: projectDescription,
        },
        {
          accessibilityLabel: `project roadmap: ${projectName}`,
          contentType: "columnList",
          contentLabel: "roadmap",
          listItems: projectRoadmap,
        },
        {
          accessibilityLabel: `technology used: ${projectName}`,
          contentType: "wrapList",
          contentLabel: "tech",
          listItems: projectTech,
        },
      ]}
    />
  );
}
