import { NextPage } from "next";
import { Page } from "../../common/Page/Page";
import pageStyles from "./MusicCollectionPage.module.scss";

export const MusicCollectionPage: NextPage = () => (
  <Page
    accessibilityLabel={"music collection"}
    pageTabTitle={"music collection - clumsycomputer"}
    pageDescription={"a catalog of awesome music"}
    pageContentContainerClassname={pageStyles.pageContentContainer}
  >
    {musicCollection.map((someMusicItem) => {
      return (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ maxInlineSize: 96 }}>
            <img style={{ width: "100%" }} src={someMusicItem.thumbnailHref} />
          </div>
          <div>
            <PropertyDisplay
              label={"title:"}
              value={someMusicItem.musicTitle.toLowerCase()}
            />
            <PropertyDisplay
              label={"artist:"}
              value={someMusicItem.musicArtist
                .map((someString) => someString.toLowerCase())
                .join(", ")}
            />
            <PropertyDisplay
              label={"type:"}
              value={
                someMusicItem.itemType === "collection"
                  ? someMusicItem.collectionType
                  : someMusicItem.itemType
              }
            />
            <PropertyDisplay
              label={"recording:"}
              value={someMusicItem.recordingStyle.join(", ")}
            />
            <div>
              {someMusicItem.musicLinks.map((someMusicLink) => {
                return (
                  <a href={someMusicLink.linkHref}>{someMusicLink.linkLabel}</a>
                );
              })}
            </div>
          </div>
        </div>
      );
    })}
  </Page>
);

interface PropertyDisplayProps {
  label: string;
  value: string;
}

function PropertyDisplay(props: PropertyDisplayProps) {
  const { label, value } = props;
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div>{label}</div>
      <div>{value}</div>
    </div>
  );
}

type MusicItem =
  | ClipMusicItem
  | MixMusicItem
  | SongMusicItem
  | CollectionMusicItem;

interface ClipMusicItem extends MusicItemBase<"clip"> {}

interface MixMusicItem extends MusicItemBase<"mix"> {}

interface SongMusicItem extends MusicItemBase<"song"> {}

type CollectionMusicItem =
  | SingleMusicItem
  | EpMusicItem
  | AlbumMusicItem
  | CompilationMusicItem
  | MixtapeMusicItem
  | SoundtrackMusicItem;

interface SingleMusicItem extends CollectionMusicItemBase<"single"> {}

interface EpMusicItem extends CollectionMusicItemBase<"ep"> {}

interface AlbumMusicItem extends CollectionMusicItemBase<"album"> {}

interface CompilationMusicItem extends CollectionMusicItemBase<"compilation"> {}

interface MixtapeMusicItem extends CollectionMusicItemBase<"mixtape"> {}

interface SoundtrackMusicItem extends CollectionMusicItemBase<"soundtrack"> {}

interface CollectionMusicItemBase<CollectionType extends string>
  extends MusicItemBase<"collection"> {
  collectionType: CollectionType;
}

interface MusicItemBase<
  ItemType extends string,
  RecordingStyle = "studio" | "live" | "concert"
> {
  itemType: ItemType;
  thumbnailHref: string;
  musicTitle: string;
  musicArtist: Array<string>;
  recordingStyle: Array<RecordingStyle>;
  musicLinks: Array<{
    linkLabel: string;
    linkHref: string;
  }>;
}

const musicCollection: Array<MusicItem> = [
  {
    itemType: "collection",
    thumbnailHref:
      "https://upload.wikimedia.org/wikipedia/en/5/57/UnknownMortalOrchestraIC-01Hanoi.png",
    collectionType: "album",
    musicTitle: "IC-01 Hanoi",
    musicArtist: ["Unknown Mortal Orchestra"],
    recordingStyle: ["studio"],
    musicLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_nCjQf37f4TiIDL2budDY-NCgch1gRrPH0&playnext=1&index=1",
      }),
    ],
  },
  {
    itemType: "collection",
    thumbnailHref:
      "https://upload.wikimedia.org/wikipedia/en/e/ee/Air_-_Premiers_Sympt%C3%B4mes.png",
    collectionType: "ep",
    musicTitle: "Premiers Symptômes",
    musicArtist: ["Air"],
    recordingStyle: ["studio"],
    musicLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/watch?v=-fdf0aPAlxw&list=OLAK5uy_ly5-qc6sTJFqfArTGCB9HoBaRZFWWpLMM",
      }),
    ],
  },
  {
    itemType: "collection",
    thumbnailHref:
      "https://i.scdn.co/image/ab67616d00001e028a39d1a2a747e9c7336a25ce",
    collectionType: "album",
    musicTitle: "Live Vol. 1",
    musicArtist: ["Parcels"],
    recordingStyle: ["live"],
    musicLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_lLJK7Z5OSt6XzI7rcgDmeIWpqervk2ycE&playnext=1&index=1",
      }),
    ],
  },
  {
    itemType: "collection",
    thumbnailHref:
      "https://upload.wikimedia.org/wikipedia/en/a/a4/The_Best_of_What%27s_Around_Vol._1_%28Dave_Matthews_Band_album_-_cover_art%29.jpg",
    collectionType: "compilation",
    musicTitle: "The Best Of What's Around Vol. 01",
    musicArtist: ["Dave Matthews Band"],
    recordingStyle: ["studio", "concert"],
    musicLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_mnKHdXzQnlF54alv4i-UTCtpxLc-ujwfo",
      }),
    ],
  },
];

interface GetYoutubeLinkDataApi {
  youtubeHref: string;
}

function getYoutubeLinkData(api: GetYoutubeLinkDataApi) {
  const { youtubeHref } = api;
  return {
    linkLabel: "youtube",
    linkHref: youtubeHref,
  };
}
