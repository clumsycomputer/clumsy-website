import { NextPage } from "next";
import { Page } from "../../common/Page/Page";
import pageStyles from "./MusicCollectionPage.module.scss";
import Link from "next/link";
import { ReactNode } from "react";

export const MusicCollectionPage: NextPage = () => (
  <Page
    accessibilityLabel={"music collection"}
    pageTabTitle={"music collection - clumsycomputer"}
    pageDescription={"a catalog of awesome music"}
    pageContentContainerClassname={pageStyles.pageContentContainer}
  >
    {musicCollection.map((someMusicItem) => {
      return (
        <div
          key={someMusicItem.itemId}
          style={{
            display: "flex",
            flexDirection: "column",
            padding: 4,
            paddingRight: 8,
            paddingBottom: 8,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
            }}
          >
            <svg
              style={{
                marginInline: 4,
                marginBlock: 4,
                width: 128,
                height: 128,
              }}
              viewBox={"0 0 100 100"}
            >
              <rect
                x={0}
                y={0}
                width={100}
                height={100}
                rx={3}
                ry={3}
                fill={"rgb(241,241,241"}
              />
              <image
                href={someMusicItem.thumbnailHref}
                x={1}
                y={1}
                width={98}
                height={98}
                clipPath={"inset(0% round 2.5)"}
              />
            </svg>
            <div
              style={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              {someMusicItem.externalLinks.map((someExternalLink) => {
                return (
                  <Link
                    key={someExternalLink.linkLabel}
                    href={someExternalLink.linkHref}
                  >
                    <a
                      style={{
                        marginInline: 4,
                        marginBlock: 4,
                        fontWeight: 600,
                      }}
                    >
                      {someExternalLink.linkLabel}
                    </a>
                  </Link>
                );
              })}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <MusicItemPropertyList>
              <MusicItemProperty propertyValue={someMusicItem.musicName} />
            </MusicItemPropertyList>
            <MusicItemPropertyList>
              {someMusicItem.musicArtist.map((someMusicArtist) => (
                <MusicItemProperty
                  key={someMusicArtist}
                  propertyValue={someMusicArtist}
                />
              ))}
            </MusicItemPropertyList>
            <MusicItemPropertyList>
              <MusicItemProperty
                propertyValue={`${someMusicItem.recordingStyle.join("/")} ${
                  someMusicItem.itemType === "collection"
                    ? someMusicItem.collectionType
                    : someMusicItem.itemType
                }`}
              />
            </MusicItemPropertyList>
            <MusicItemPropertyList>
              {someMusicItem.musicTags.map((someMusicTag) => (
                <MusicItemProperty
                  key={someMusicTag}
                  propertyValue={someMusicTag}
                />
              ))}
            </MusicItemPropertyList>
          </div>
        </div>
      );
    })}
  </Page>
);

interface MusicItemPropertyListProps {
  children: ReactNode;
}

function MusicItemPropertyList(props: MusicItemPropertyListProps) {
  const { children } = props;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      {children}
    </div>
  );
}

interface MusicItemPropertyProps {
  propertyValue: string;
}

function MusicItemProperty(props: MusicItemPropertyProps) {
  const { propertyValue } = props;
  return (
    <div
      style={{
        marginInline: 4,
        marginBlock: 4,
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        backgroundColor: "rgb(241,241,241)",
        borderRadius: 3,
        paddingInline: 4,
        paddingBottom: 2,
        fontWeight: 600,
      }}
    >
      {propertyValue.toLowerCase()}
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
  itemId: string;
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
    itemId: "0",
    itemType: "collection",
    collectionType: "album",
    thumbnailHref:
      "https://m.media-amazon.com/images/I/815pLljpegL._SL1500_.jpg",
    musicName: "IC-01 Hanoi",
    musicArtist: ["Unknown Mortal Orchestra"],
    recordingStyle: ["studio"],
    musicTags: ["rock", "instrumental", "experimental"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_nCjQf37f4TiIDL2budDY-NCgch1gRrPH0&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/1gmj1UwTm2mT6DoS8H4jke?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/ic-01-hanoi/1434607269",
      }),
    ],
  },
  {
    itemId: "1",
    itemType: "collection",
    collectionType: "ep",
    thumbnailHref:
      "https://m.media-amazon.com/images/I/61XiJrQYpuL._UX500_FMwebp_QL85_.jpg",
    musicName: "Premiers Symptômes",
    musicArtist: ["Air"],
    recordingStyle: ["studio"],
    musicTags: ["groove", "instrumental", "lush"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://www.youtube.com/watch?v=tl7dASVOY-U&list=OLAK5uy_ly5-qc6sTJFqfArTGCB9HoBaRZFWWpLMM&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/3g9O7pvuaaFRvdzsoSJXVc?autoplay=true",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/us/album/premiers-sympt%C3%B4mes-ep/966652812",
      }),
    ],
  },
  {
    itemId: "2",
    itemType: "collection",
    collectionType: "album",
    thumbnailHref:
      "https://m.media-amazon.com/images/I/71CzC0CGECL._AC_UY436_FMwebp_QL65_.jpg",
    musicName: "Live Vol. 1",
    musicArtist: ["Parcels"],
    recordingStyle: ["live"],
    musicTags: ["pop", "social"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_lLJK7Z5OSt6XzI7rcgDmeIWpqervk2ycE&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/4ckyPfMqe26PrOgEWdjWns?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/live-vol-1/1506250361",
      }),
    ],
  },
  {
    itemId: "3",
    itemType: "collection",
    collectionType: "compilation",
    thumbnailHref:
      "https://m.media-amazon.com/images/I/41Eldx-iyAL._UX500_FMwebp_QL85_.jpg",
    musicName: "The Best Of What's Around Vol. 01",
    musicArtist: ["Dave Matthews Band"],
    recordingStyle: ["studio", "concert"],
    musicTags: ["pop", "jam"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_mnKHdXzQnlF54alv4i-UTCtpxLc-ujwfo",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/1kae5MA0gbXveSdJDYtFHo?autoplay=true",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/us/album/the-best-of-whats-around-vol-1/311604755",
      }),
    ],
  },
  {
    itemId: "4",
    itemType: "collection",
    collectionType: "album",
    thumbnailHref:
      "https://m.media-amazon.com/images/I/71XmXBCQ+XL._AC_UY436_FMwebp_QL65_.jpg",
    musicName: "Blank Face LP",
    musicArtist: ["ScHoolboy Q"],
    recordingStyle: ["studio"],
    musicTags: ["hip-hop", "street"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_nn39BWFdkmInyIa8zuRv16th53bELbtBQ&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/0YbpATCIng8Fz2JrfHmEf7?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/blank-face-lp/1440870906",
      }),
    ],
  },
  {
    itemId: "5",
    itemType: "collection",
    collectionType: "album",
    thumbnailHref: "https://m.media-amazon.com/images/I/41us+rdexmL.jpg",
    musicName: "Pickin' on Modest Mouse: A Bluegrass Tribute",
    musicArtist: ["Iron Horse", "Modest Mouse"],
    recordingStyle: ["studio"],
    musicTags: ["covers", "bluegrass"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_lR47WSacINRlobDIqT57PVHE-Hp5FKizg&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/3hewWfO0hKXbAFfcsmpYk5?autoplay=true",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/us/album/pickin-on-modest-mouse/983448014",
      }),
    ],
  },
  {
    itemId: "6",
    itemType: "collection",
    collectionType: "album",
    thumbnailHref:
      "https://m.media-amazon.com/images/I/51my4h86mRL._AC_UY312_FMwebp_QL65_.jpg",
    musicName: "Trouble",
    musicArtist: ["Totally Extinct Enormous Dinosaurs"],
    recordingStyle: ["studio"],
    musicTags: ["electronic"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_n9kdQogDwJvVlB5KLTebiUjyPQ5TXKxGQ&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/1srFzlchwSOzxO8n99tJxP?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/trouble/1442636211",
      }),
    ],
  },
  {
    itemId: "7",
    itemType: "collection",
    collectionType: "album",
    thumbnailHref:
      "https://m.media-amazon.com/images/I/718tt6ncquL._AC_UY436_FMwebp_QL65_.jpg",
    musicName: "Room 41",
    musicArtist: ["Paul Cauthen"],
    recordingStyle: ["studio"],
    musicTags: ["country", "rock", "soul"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_liodoEz6-VjfyY_RJpJgLW2IMA2Eo-nGc&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/4ABV7fsu8iN6eAmnQhvd0a?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/room-41/1466095577",
      }),
    ],
  },
  {
    itemId: "8",
    itemType: "collection",
    collectionType: "album",
    thumbnailHref:
      "https://m.media-amazon.com/images/I/61XijFIRaxL._AC_UY436_FMwebp_QL65_.jpg",
    musicName: "Organ Recital",
    musicArtist: ["Bastien Keb"],
    recordingStyle: ["studio"],
    musicTags: ["soul"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_mZIP4yLMAoq7d2wa8NojzttHzBPuV3PY0&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/2CmRxlrIhDSmpM3STHxB5A?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/organ-recital/1626095915",
      }),
    ],
  },
  {
    itemId: "9",
    itemType: "collection",
    collectionType: "album",
    thumbnailHref:
      "https://m.media-amazon.com/images/I/813BJ4cG9RL._SS500_.jpg",
    musicName: "Filling Up the City Skies - Disc 1",
    musicArtist: ["Pretty Lights"],
    recordingStyle: ["studio"],
    musicTags: ["soul", "hip-hop", "electronica"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_mQuwlK3nAsIdmW9FCAZe-VHy94NRlzt34&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/48DZzoUru3KKjcgZD6ZjTg?autoplay=true",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/us/album/filling-up-the-city-skies-vol-1/301057252",
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

interface GetSpotifyLinkDataApi {
  spotifyHref: string;
}

function getSpotifyLinkData(api: GetSpotifyLinkDataApi) {
  const { spotifyHref } = api;
  return {
    linkLabel: "spotify",
    linkHref: spotifyHref,
  };
}

interface GetAppleLinkDataApi {
  appleHref: string;
}

function getAppleLinkData(api: GetAppleLinkDataApi) {
  const { appleHref } = api;
  return {
    linkLabel: "apple",
    linkHref: appleHref,
  };
}
