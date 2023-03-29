import { NextPage } from "next";
import { DocumentPage } from "../../../common/Document/DocumentPage";
import { NavigationFooter } from "../../../common/NavigationFooter/NavigationFooter";
import { SoftwareHeaderSection } from "./components/SoftwareHeaderSection";
import { SoftwareProjectSection } from "./components/SoftwareProjectSection";

export const SoftwarePage: NextPage = () => (
  <_SoftwarePage pageTitle={"packages"} fullName={"jared mathews"} />
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
          "listed below are open-source projects ive had the privledge of implementing. these packages offer unique value to the typescript community and beyond"
        }
      />
      <SoftwareProjectSection
        projectName={"clumsy-math"}
        githubHref={"https://github.com/clumsycomputer/clumsy-math#readme"}
        npmHref={"https://www.npmjs.com/package/clumsy-math"}
        projectDescription={"a little library of helpful math utensils :)"}
        projectStatus={"on the back burner"}
        projectRoadmap={[
          "continue improving documentation",
          "implement stack-safe variants of recursive modeled functions",
          "build rhythm/loop signal generators that are eurorack compatible via fpga",
        ]}
        projectTech={["typescript", "javascript"]}
      />
      <SoftwareProjectSection
        projectName={"clumsy-graphics"}
        githubHref={"https://github.com/clumsycomputer/clumsy-graphics#readme"}
        npmHref={"https://www.npmjs.com/package/clumsy-graphics"}
        projectDescription={
          "a tool for rapidly developing animations where frames are described using svg elements à la react (:"
        }
        projectStatus={"hibernating"}
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
        projectName={"clumsy-wav"}
        githubHref={"https://github.com/clumsycomputer/clumsy-wav#readme"}
        npmHref={"https://www.npmjs.com/package/clumsy-wav"}
        projectDescription={"functions for generating .wav file data ∿"}
        projectStatus={"maintenance"}
        projectRoadmap={["add file export utilities", "improve documentation"]}
        projectTech={["typescript", "javascript"]}
      />
      <NavigationFooter
        routeLinks={[
          { routeName: "home", routeHref: "/" },
          { routeName: "resume", routeHref: "/software/resume" },
          { routeName: "graphics", routeHref: "/art/graphics" },
        ]}
        pdfLink={null}
      />
    </DocumentPage>
  );
}
