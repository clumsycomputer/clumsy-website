import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import {
  MusicCurationsPage,
  MusicCurationsPageProps,
} from "../../components/pages/curations/music/MusicCurationsPage";
export { getStaticProps } from "../../components/pages/curations/music/MusicCurationsPage";

const _MusicCurationsPage = (props: MusicCurationsPageProps) => {
  const pageRouter = useRouter();
  const [pageElement, setPageElement] = useState<ReactNode>(null);
  useEffect(() => {
    if (pageRouter.isReady) {
      setPageElement(<MusicCurationsPage {...props} />);
    }
  }, [pageRouter, props]);
  return pageElement;
};

export default _MusicCurationsPage;
