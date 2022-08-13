import { NextPage } from "next";
import { Fragment } from "react";
import { Page } from "../../common/Page/Page";
import pageStyles from "./MusicCollectionPage.module.scss";

export const MusicCollectionPage: NextPage = () => (
  <Page
    accessibilityLabel={"music collection"}
    pageTabTitle={"music collection - clumsycomputer"}
    pageDescription={"a catalog of awesome music"}
    pageContentContainerClassname={pageStyles.pageContentContainer}
  >
    {musicCollection.map((someMusicItem, itemIndex) => {
      return (
        <div
          key={`${itemIndex}`}
          style={{
            display: "flex",
            flexDirection: "row",
            padding: 8,
            paddingBottom: 2,
          }}
        >
          <div
            style={{
              flexBasis: 128,
              flexShrink: 0,
              padding: 3,
            }}
          >
            <img
              style={{ width: "100%", border: "solid 1px rgb(241,241,241)" }}
              src={someMusicItem.thumbnailHref}
            />
          </div>
          <div
            style={{
              flexShrink: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <PropertyView propertyValue={someMusicItem.musicName} />
              <div style={{ display: "flex", flexDirection: "row" }}>
                {someMusicItem.musicArtist.map((someMusicArtist) => (
                  <PropertyView
                    key={someMusicArtist}
                    propertyValue={someMusicArtist}
                  />
                ))}
              </div>
              <PropertyView
                propertyValue={`${someMusicItem.recordingStyle.join("/")} ${
                  someMusicItem.itemType === "collection"
                    ? someMusicItem.collectionType
                    : someMusicItem.itemType
                }`}
              />
              <div style={{ display: "flex", flexDirection: "row" }}>
                {someMusicItem.musicTags.map((someMusicTag) => (
                  <PropertyView
                    key={someMusicTag}
                    propertyValue={someMusicTag}
                  />
                ))}
              </div>
            </div>
            <div
              style={{
                padding: 4,
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {someMusicItem.externalLinks.map((someExternalLink) => {
                return (
                  <a
                    key={someExternalLink.linkLabel}
                    style={{ fontWeight: 600, marginRight: 8 }}
                    href={someExternalLink.linkHref}
                    target={"_blank"}
                    rel={"noreferrer"}
                  >
                    {someExternalLink.linkLabel}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      );
    })}
  </Page>
);

interface PropertyViewProps {
  propertyValue: string;
}

function PropertyView(props: PropertyViewProps) {
  const { propertyValue } = props;
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div
        style={{
          flexShrink: 1,
          marginInline: 3,
          marginBlock: 3,
          paddingInline: 3,
          paddingBlock: 1,
          backgroundColor: "rgb(241,241,241)",
          fontWeight: 600,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          borderRadius: 2,
          // maxInlineSize: 280,
        }}
      >
        {propertyValue.toLowerCase()}
      </div>
      <div style={{ flexGrow: 1 }} />
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
  musicName: string;
  musicArtist: Array<string>;
  musicTags: Array<string>;
  recordingStyle: Array<RecordingStyle>;
  externalLinks: Array<{
    linkLabel: string;
    linkHref: string;
  }>;
}

const musicCollection: Array<MusicItem> = [
  {
    itemType: "collection",
    collectionType: "album",
    thumbnailHref:
      "https://upload.wikimedia.org/wikipedia/en/5/57/UnknownMortalOrchestraIC-01Hanoi.png",
    musicName: "IC-01 Hanoi",
    musicArtist: ["Unknown Mortal Orchestra"],
    recordingStyle: ["studio"],
    musicTags: ["rock", "instrumental", "experimental"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_nCjQf37f4TiIDL2budDY-NCgch1gRrPH0&playnext=1&index=1",
      }),
    ],
  },
  {
    itemType: "collection",
    collectionType: "ep",
    thumbnailHref:
      "https://upload.wikimedia.org/wikipedia/en/e/ee/Air_-_Premiers_Sympt%C3%B4mes.png",
    musicName: "Premiers Symptômes",
    musicArtist: ["Air"],
    recordingStyle: ["studio"],
    musicTags: ["groove", "instrumental", "lush"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://www.youtube.com/watch?v=tl7dASVOY-U&list=OLAK5uy_ly5-qc6sTJFqfArTGCB9HoBaRZFWWpLMM&index=1",
      }),
    ],
  },
  {
    itemType: "collection",
    collectionType: "album",
    thumbnailHref:
      "https://i.scdn.co/image/ab67616d00001e028a39d1a2a747e9c7336a25ce",
    musicName: "Live Vol. 1",
    musicArtist: ["Parcels"],
    recordingStyle: ["live"],
    musicTags: ["pop", "social"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_lLJK7Z5OSt6XzI7rcgDmeIWpqervk2ycE&playnext=1&index=1",
      }),
    ],
  },
  {
    itemType: "collection",
    collectionType: "compilation",
    thumbnailHref:
      "https://upload.wikimedia.org/wikipedia/en/a/a4/The_Best_of_What%27s_Around_Vol._1_%28Dave_Matthews_Band_album_-_cover_art%29.jpg",
    musicName: "The Best Of What's Around Vol. 01",
    musicArtist: ["Dave Matthews Band"],
    recordingStyle: ["studio", "concert"],
    musicTags: ["american"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_mnKHdXzQnlF54alv4i-UTCtpxLc-ujwfo",
      }),
    ],
  },
  {
    itemType: "collection",
    collectionType: "album",
    thumbnailHref:
      "https://upload.wikimedia.org/wikipedia/en/3/33/Blankfacelpcover.jpg",
    musicName: "Blank Face LP",
    musicArtist: ["ScHoolboy Q"],
    recordingStyle: ["studio"],
    musicTags: ["hip-hop", "street"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_nn39BWFdkmInyIa8zuRv16th53bELbtBQ&playnext=1&index=1",
      }),
    ],
  },
  {
    itemType: "collection",
    collectionType: "album",
    thumbnailHref:
      "https://upload.wikimedia.org/wikipedia/commons/b/b5/8878_lrg.jpg",
    musicName: "Pickin' on Modest Mouse: A Bluegrass Tribute",
    musicArtist: ["Iron Horse", "Modest Mouse"],
    recordingStyle: ["studio"],
    musicTags: ["covers", "bluegrass"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_lR47WSacINRlobDIqT57PVHE-Hp5FKizg&playnext=1&index=1",
      }),
    ],
  },
  {
    itemType: "collection",
    collectionType: "album",
    thumbnailHref:
      "https://upload.wikimedia.org/wikipedia/en/f/fb/TEEDTrouble.jpg",
    musicName: "Trouble",
    musicArtist: ["Totally Extinct Enormous Dinosaurs"],
    recordingStyle: ["studio"],
    musicTags: ["electronic"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_n9kdQogDwJvVlB5KLTebiUjyPQ5TXKxGQ&playnext=1&index=1",
      }),
    ],
  },
  {
    itemType: "collection",
    collectionType: "album",
    thumbnailHref:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiCBbLc-IFmEttU5BWIc5SwhkC-J-2lIs9QqG2E0c7dMr1qYdqLY357d1nVFIG_dtABDI&usqp=CAU",
    musicName: "Room 41",
    musicArtist: ["Paul Cauthen"],
    recordingStyle: ["studio"],
    musicTags: ["country", "rock", "soul"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_liodoEz6-VjfyY_RJpJgLW2IMA2Eo-nGc&playnext=1&index=1",
      }),
    ],
  },
  {
    itemType: "collection",
    collectionType: "album",
    thumbnailHref:
      "https://e.snmc.io/i/600/s/c96f32cd22ca3bdd6d5620dbe669d65a/9934086/bastien-keb-organ-recital-Cover-Art.jpg",
    musicName: "Organ Recital",
    musicArtist: ["Bastien Keb"],
    recordingStyle: ["studio"],
    musicTags: ["soul"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_mZIP4yLMAoq7d2wa8NojzttHzBPuV3PY0&playnext=1&index=1",
      }),
    ],
  },
  {
    itemType: "collection",
    collectionType: "album",
    thumbnailHref:
      "https://upload.wikimedia.org/wikipedia/en/a/ab/Pretty-Lights-Filling-Up-the-City-Skies.jpg",
    musicName: "Filling Up the City Skies - Disc 1",
    musicArtist: ["Pretty Lights"],
    recordingStyle: ["studio"],
    musicTags: ["soul", "hip-hop", "electronica"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeLabel: "youtube",
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_mQuwlK3nAsIdmW9FCAZe-VHy94NRlzt34&playnext=1&index=1",
      }),
      // getYoutubeLinkData({
      //   youtubeLabel: "disc 2 - youtube",
      //   youtubeHref:
      //     "https://m.youtube.com/watch?v=_lNWO4ImyxI&list=PL73E43D96EC1D09B6&playnext=1&index=1",
      // }),
    ],
  },
];

interface GetYoutubeLinkDataApi {
  youtubeLabel?: string;
  youtubeHref: string;
}

function getYoutubeLinkData(api: GetYoutubeLinkDataApi) {
  const { youtubeLabel = "youtube", youtubeHref } = api;
  return {
    linkLabel: youtubeLabel,
    linkHref: youtubeHref,
  };
}
