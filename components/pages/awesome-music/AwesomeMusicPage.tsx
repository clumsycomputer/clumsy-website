import { NextPage } from "next";
import { Page } from "../../common/Page/Page";
import pageStyles from "./AwesomeMusicPage.module.scss";

export const AwesomeMusicPage: NextPage = () => (
  <Page
    accessibilityLabel={"awesome-music"}
    pageTabTitle={"awesome music - clumsycomputer"}
    pageDescription={"a catalog of awesome music"}
    pageContentContainerClassname={pageStyles.pageContentContainer}
  >
    {awesomeMusicData.map((someMusicItem) => {
      return (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ maxInlineSize: 96 }}>
            <img style={{ width: "100%" }} src={someMusicItem.thumbnailHref} />
          </div>
          <div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div>Title:</div>
              <div>{someMusicItem.musicTitle}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div>Artist:</div>
              <div>{someMusicItem.artistName}</div>
            </div>
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

type MusicItem =
  | GeneralMusicItem
  | SongMusicItem
  | SingleMusicItem
  | EpMusicItem
  | AlbumMusicItem
  | CompilationMusicItem
  | SoundtrackMusicItem
  | MixMusicItem
  | LiveMusicItem
  | LiveAlbumMusicItem
  | ConcertMusicItem
  | ConcertAlbumMusicItem
  | ConcertCompilationMusicItem;

interface GeneralMusicItem extends MusicItemBase<"music", []> {}

interface SongMusicItem extends MusicItemBase<"song"> {}

interface SingleMusicItem extends MusicItemBase<"single"> {}

interface EpMusicItem extends MusicItemBase<"ep"> {}

interface AlbumMusicItem extends MusicItemBase<"album"> {}

interface CompilationMusicItem extends MusicItemBase<"compilation"> {}

interface SoundtrackMusicItem extends MusicItemBase<"soundtrack"> {}

interface MixMusicItem extends MusicItemBase<"mix"> {}

interface LiveMusicItem extends MusicItemBase<"live"> {}

interface LiveAlbumMusicItem
  extends MusicItemBase<
    "liveAlbum",
    MusicTags<LiveMusicItem, AlbumMusicItem>
  > {}

interface ConcertMusicItem
  extends MusicItemBase<"concert", MusicTags<LiveMusicItem, ["concert"]>> {}

interface ConcertAlbumMusicItem
  extends MusicItemBase<
    "concertAlbum",
    MusicTags<ConcertMusicItem, AlbumMusicItem>
  > {}

interface ConcertCompilationMusicItem
  extends MusicItemBase<
    "concertCompilation",
    MusicTags<ConcertMusicItem, CompilationMusicItem>
  > {}

interface MusicItemBase<
  MusicType extends string,
  RequiredTags extends Array<string> = [MusicType]
> {
  musicType: MusicType;
  musicTitle: string;
  artistName: string;
  thumbnailHref: string;
  requiredMusicTags: StringPermutation<RequiredTags[number]>;
  additionalMusicTags: Array<string>;
  musicLinks: Array<{
    linkLabel: string;
    linkHref: string;
  }>;
}

type MusicTags<
  MusicItemA extends MusicItemBase<string, Array<string>>,
  SomeMusicTagsOrMusicItemB extends
    | MusicItemBase<string, Array<string>>
    | MusicItemBase<string, Array<string>>["requiredMusicTags"]
> = [
  ...MusicItemA["requiredMusicTags"],
  ...(SomeMusicTagsOrMusicItemB extends MusicItemBase<string, Array<string>>
    ? SomeMusicTagsOrMusicItemB["requiredMusicTags"]
    : SomeMusicTagsOrMusicItemB)
];

type StringPermutation<Options extends string> = {
  [SomeOption in Options]: [
    SomeOption,
    ...(Exclude<Options, SomeOption> extends never
      ? []
      : StringPermutation<Exclude<Options, SomeOption>>)
  ];
}[Options];

const awesomeMusicData: Array<MusicItem> = [
  {
    musicType: "album",
    musicTitle: "IC-01 Hanoi",
    artistName: "Unknown Mortal Orchestra",
    requiredMusicTags: ["album"],
    additionalMusicTags: [],
    thumbnailHref:
      "https://upload.wikimedia.org/wikipedia/en/5/57/UnknownMortalOrchestraIC-01Hanoi.png",
    musicLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_nCjQf37f4TiIDL2budDY-NCgch1gRrPH0&playnext=1&index=1",
      }),
    ],
  },
  {
    musicType: "ep",
    musicTitle: "Premiers Symptômes",
    artistName: "Air",
    requiredMusicTags: ["ep"],
    additionalMusicTags: [],
    thumbnailHref:
      "https://upload.wikimedia.org/wikipedia/en/e/ee/Air_-_Premiers_Sympt%C3%B4mes.png",
    musicLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/watch?v=-fdf0aPAlxw&list=OLAK5uy_ly5-qc6sTJFqfArTGCB9HoBaRZFWWpLMM",
      }),
    ],
  },
  {
    musicType: "liveAlbum",
    musicTitle: "Live Vol. 1",
    artistName: "Parcels",
    requiredMusicTags: ["live", "album"],
    additionalMusicTags: [],
    thumbnailHref:
      "https://i.scdn.co/image/ab67616d00001e028a39d1a2a747e9c7336a25ce",
    musicLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_lLJK7Z5OSt6XzI7rcgDmeIWpqervk2ycE&playnext=1&index=1",
      }),
    ],
  },
  {
    musicType: "compilation",
    musicTitle: "The Best Of What's Around Vol. 01",
    artistName: "Dave Matthews Band",
    requiredMusicTags: ["compilation"],
    additionalMusicTags: ["concert", "live"],
    thumbnailHref:
      "https://upload.wikimedia.org/wikipedia/en/a/a4/The_Best_of_What%27s_Around_Vol._1_%28Dave_Matthews_Band_album_-_cover_art%29.jpg",
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
