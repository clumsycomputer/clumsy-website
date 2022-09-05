import {
  getAppleLinkData,
  getSpotifyLinkData,
  getYoutubeLinkData,
} from "./common/getExternalLinkData";
import { MusicItem } from "./common/models";

export const musicItemDataset: Array<MusicItem> = [
  {
    musicId: 0,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/41lpwGEQvoL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2018",
    musicTitle: "IC-01 Hanoi",
    musicArtist: ["Unknown Mortal Orchestra"],
    recordingContext: ["studio"],
    musicStyles: ["experimental", "jazz", "rock"],
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
    musicId: 1,
    musicType: "source",
    sourceType: "collection",
    collectionType: "ep",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/61XiJrQYpuL._UX500_FMwebp_QL85_.jpg",
    musicYear: "1997",
    musicTitle: "Premiers Symptômes",
    musicArtist: ["Air"],
    recordingContext: ["studio"],
    musicStyles: ["downtempo", "electronic"],
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
    musicId: 2,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/51ZKa067uhL._UX500_FMwebp_QL85_.jpg",
    musicTitle: "Live Vol. 1",
    musicYear: "2020",
    musicArtist: ["Parcels"],
    recordingContext: ["live"],
    musicStyles: ["disco", "funk", "pop"],
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
    musicId: 3,
    musicType: "source",
    sourceType: "collection",
    collectionType: "compilation",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/41WZvHEcbuL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2006",
    musicTitle: "The Best Of What's Around Vol. 01",
    musicArtist: ["Dave Matthews Band"],
    recordingContext: ["studio", "concert"],
    musicStyles: ["jam", "rock"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://www.youtube.com/watch?v=wILVn4QrNxU&list=OLAK5uy_mnKHdXzQnlF54alv4i-UTCtpxLc-ujwfo&playnext=1&index=1",
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
    musicId: 4,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/51qCkOpjBYL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2016",
    musicTitle: "Blank Face LP",
    musicArtist: ["ScHoolboy Q"],
    recordingContext: ["studio"],
    musicStyles: ["hip-hop", "rap"],
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
    musicId: 5,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/61LlZokVjxL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2004",
    musicTitle: "Pickin' on Modest Mouse: A Bluegrass Tribute",
    musicArtist: ["Iron Horse", "Modest Mouse"],
    recordingContext: ["studio"],
    musicStyles: ["bluegrass"],
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
    musicId: 6,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/61yiLjG7QQL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2012",
    musicTitle: "Trouble",
    musicArtist: ["Totally Extinct Enormous Dinosaurs"],
    recordingContext: ["studio"],
    musicStyles: ["electronic", "pop"],
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
    musicId: 7,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/51OoNPSy4IL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2019",
    musicTitle: "Room 41",
    musicArtist: ["Paul Cauthen"],
    recordingContext: ["studio"],
    musicStyles: ["country", "rock", "soul"],
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
    musicId: 8,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/41wnneBCjFL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2022",
    musicTitle: "Organ Recital",
    musicArtist: ["Bastien Keb"],
    recordingContext: ["studio"],
    musicStyles: ["r&b", "folk", "soul"],
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
    musicId: 9,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/61UpX7MWpML._UX500_FMwebp_QL85_.jpg",
    musicYear: "2008",
    musicTitle: "Filling Up the City Skies - Disc 1",
    musicArtist: ["Pretty Lights"],
    recordingContext: ["studio"],
    musicStyles: ["downtempo", "hip-hop", "soul"],
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
  {
    musicId: 10,
    musicType: "source",
    sourceType: "collection",
    collectionType: "ep",
    musicThumbnailHref:
      "https://preview.redd.it/t55x4lyak2y51.jpg?auto=webp&s=6cffa2dd89b7bb9f41a7abe3979ab41f93313c72",
    musicYear: "2012",
    musicTitle: "Bon Iver at AIR studios",
    musicArtist: ["Bon Iver", "Sean Carey"],
    recordingContext: ["live"],
    musicStyles: ["folk"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref: "https://www.youtube.com/watch?v=A9Tp5fl18Ho",
      }),
    ],
  },
  {
    musicId: 11,
    musicType: "source",
    sourceType: "mix",
    musicThumbnailHref:
      "https://is4-ssl.mzstatic.com/image/thumb/Features125/v4/f4/6b/a9/f46ba999-c102-ea24-7efa-a8e48b43bebd/mza_4437830076440205700.jpg/600x600bb.webp",
    musicYear: "2021",
    musicTitle: "WhoMadeWho",
    musicArtist: ["WhoMadeWho live at Abu Simbel"],
    recordingContext: ["live"],
    musicStyles: ["electronic"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref: "https://www.youtube.com/watch?v=BDwAlto-NKU",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/us/album/cercle-whomadewho-in-abu-simbel-egypt-live/1585737974",
      }),
    ],
  },
  {
    musicId: 12,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://cdn.albumoftheyear.org/album/55039-in-rainbows-from-the-basement.jpg",
    musicYear: "2008",
    musicTitle: "In Rainbows From the Basement",
    musicArtist: ["Radiohead", "Nigel Godrich"],
    recordingContext: ["live"],
    musicStyles: ["experimental", "rock"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref: "https://www.youtube.com/watch?v=DWuAn6C8Mfc",
      }),
    ],
  },
  {
    musicId: 13,
    musicType: "source",
    sourceType: "mix",
    musicThumbnailHref:
      "https://i1.sndcdn.com/artworks-000484735170-v2qg5l-t500x500.jpg",
    musicYear: "2016",
    musicTitle: "Nicolás Jaar Presents the Network",
    musicArtist: ["Nicolás Jaar"],
    recordingContext: ["studio"],
    musicStyles: ["experimental", "ambient", "electronic"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref: "https://www.youtube.com/watch?v=JqjhIrys238",
      }),
      {
        linkLabel: "soundcloud(1)",
        linkHref:
          "https://soundcloud.com/otherpeoplerecords/nicolas-jaar-presents-the-network-part-1-sept-7-2016",
      },
      {
        linkLabel: "soundcloud(2)",
        linkHref:
          "https://soundcloud.com/otherpeoplerecords/nicolas-jaar-presents-the-network-part-2-sept-7-2016",
      },
    ],
  },
  {
    musicId: 14,
    musicType: "clip",
    sourceType: "mix",
    musicThumbnailHref:
      "https://e.snmc.io/i/1200/s/af23292a9abbba762d6e0d96ffa7eb03/7962041",
    musicYear: "2016",
    musicTitle: "hip-hop portion - Nicolás Jaar Presents the Network",
    musicArtist: ["Nicolás Jaar"],
    recordingContext: ["studio"],
    musicStyles: ["ambient", "electronic", "hip-hop"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://www.youtube.com/watch?v=JqjhIrys238&start=7260&end=9320",
      }),
    ],
  },
  {
    musicId: 15,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/41BZxoiQn3L._UX500_FMwebp_QL85_.jpg",
    musicYear: "2018",
    musicTitle: "iridescence",
    musicArtist: ["BROCKHAMPTON"],
    recordingContext: ["studio"],
    musicStyles: ["pop", "hip-hop", "rap"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_nGAVB_h2YgCbmGLq2I5j3gGXNDdpUkJfI&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/3Mj4A4nNJzIdxOyS4yzOhj?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/iridescence/1436535889",
      }),
    ],
  },
  {
    musicId: 16,
    musicType: "source",
    sourceType: "collection",
    collectionType: "ep",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/51NdilLHVTL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2017",
    musicTitle: "Beyond Serious",
    musicArtist: ["Bibio"],
    recordingContext: ["studio"],
    musicStyles: ["electronic", "house"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_meOmPY5SdCTsCv6wm6BN0RerkZxW2hfFU&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/0aPIoyP4acTVSfbd2VgQQF?autoplay=true&source_application=google_assistant",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/us/album/beyond-serious-ep/1228243251",
      }),
    ],
  },
  {
    musicId: 17,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/31TJO2-BIvL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2003",
    musicTitle: "Surrounded",
    musicArtist: ["Tipper"],
    recordingContext: ["studio"],
    musicStyles: ["downtempo", "electronic"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_kRf5h8JiqTHMJnHP-KCq_Gpoc-cfCgJ4g&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/3wE8r7MmysKGOtVTqm7ac9?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/surrounded/283227098",
      }),
    ],
  },
  {
    musicId: 18,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/413-5cIlSdL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2019",
    musicTitle: "OOFIE",
    musicArtist: ["Wiki"],
    recordingContext: ["studio"],
    musicStyles: ["hip-hop", "rap"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_nwNPu8L9UeH0F6OmbX-7XfOeriSJljt9k&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/5Ye9kDYxIZM0LVj1M1CvC6?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/oofie/1486639899",
      }),
    ],
  },
  {
    musicId: 19,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/41+Ai+nR7WL._UX500_FMwebp_QL85_.jpg",
    musicYear: "1996",
    musicTitle: "Entroducing",
    musicArtist: ["DJ Shadow"],
    recordingContext: ["studio"],
    musicStyles: ["downtempo", "hip-hop"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_lA4P3neYe5g7f9Vs7VD0oCYHcEPytjupI&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/4wvqGLk1HThPA0b5lzRK2l?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/endtroducing/1448896560",
      }),
    ],
  },
  {
    musicId: 20,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://i.pinimg.com/736x/1c/f5/1c/1cf51c9f6658424cafaf0cd2a9079865.jpg",
    musicYear: "2003",
    musicTitle: "The Love Below",
    musicArtist: ["Andre 3000", "Outkast"],
    recordingContext: ["studio"],
    musicStyles: ["hip-hop", "rap"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/watch?v=egKtZBPi1U4&list=OLAK5uy_m3lgBREvjnTGcUIPoD1e1Z1uCVwI5sjeo&index=20",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/1UsmQ3bpJTyK6ygoOOjG1r?autoplay=true",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/us/album/speakerboxxx-the-love-below/281430653",
      }),
    ],
  },
  {
    musicId: 21,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/51cFB2HlgsL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2008",
    musicTitle: "Los Angeles",
    musicArtist: ["Flying Lotus"],
    recordingContext: ["studio"],
    musicStyles: ["downtempo", "experimental", "electronic"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_nlsLRecArw04-4_Vo3qGJjlIUYXJ3a8Yc&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/7pdhnkO0t8HiRv4dmggt2I?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/los-angeles/279977486",
      }),
    ],
  },
  {
    musicId: 22,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/51qvf6oULJL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2007",
    musicTitle: "Alive 2007",
    musicArtist: ["Daft Punk"],
    recordingContext: ["concert"],
    musicStyles: ["electronic", "house"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_ndzMGozj4WUls-asc1dYQ_srOAacIY4yM&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/7u6zL7kqpgLPISZYXNTgYk?autoplay=true",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/us/album/alive-2007-live-deluxe-edition/717067737",
      }),
    ],
  },
  {
    musicId: 23,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/41Vjs9jFvwL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2018",
    musicTitle: "Con Todo El Mundo",
    musicArtist: ["Khruangbin"],
    recordingContext: ["studio"],
    musicStyles: ["funk"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_kuJ7H1aJ5o6nLTCfQVV3rMqUdb4LLZ8U0&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/09AkhNYWocEZWbeYl1YBf7?autoplay=true",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/us/album/con-todo-el-mundo/1299241642",
      }),
    ],
  },
  {
    musicId: 24,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/51ff-TQODYL._UX500_FMwebp_QL85_.jpg",
    musicYear: "1983",
    musicTitle: "Speaking in Tongues",
    musicArtist: ["Talking Heads"],
    recordingContext: ["studio"],
    musicStyles: ["pop", "new wave"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_nYHzD9LEtWIKxLhNm8OfmtIJ2Pu324MfU&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/78MM8HrabEGPLVWaJkM2t1?autoplay=true",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/us/album/speaking-in-tongues/300202199",
      }),
    ],
  },
  {
    musicId: 25,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/61lPDPdkfYL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2017",
    musicTitle: "Witches Stew",
    musicArtist: ["Lettuce"],
    recordingContext: ["live"],
    musicStyles: ["jazz"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_kpSCH55anM5tIYEjIKdLUAY3RTrvUoceM&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/5p0YrSUdEeURL2Ei1WNLZP?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/witches-stew/1292424573",
      }),
    ],
  },
  {
    musicId: 26,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/41JbqQVjLkL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2016",
    musicTitle: "Blonde",
    musicArtist: ["Frank Ocean"],
    recordingContext: ["studio"],
    musicStyles: ["pop", "r&b"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_kClWWfWghQXro7ONQ-DfH3RZ1oxiu0kMA&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/3mH6qwIy9crq0I9YQbOuDf?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/blonde/1146195596",
      }),
    ],
  },
  {
    musicId: 27,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/61l+GoCpryL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2018",
    musicTitle: "Little Dark Age",
    musicArtist: ["MGMT"],
    recordingContext: ["studio"],
    musicStyles: ["psychedelic", "rock"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_kBFHQWSR3V3RPeRDSA1JKl_HpHDVgYYEA&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/7GjVWG39IOj4viyWplJV4H?autoplay=true",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/us/album/little-dark-age/1334814526",
      }),
    ],
  },
  {
    musicId: 28,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/61Zt+yZ1coL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2015",
    musicTitle: "Choose Your Weapon",
    musicArtist: ["Hiatus Kaiyote"],
    recordingContext: ["studio"],
    musicStyles: ["funk", "soul"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_mxQdlK-tNsc1GCJG5XZ64I3fQBBt5ijv4&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/3qzmmmRmVBiOuMvrerfW4z?autoplay=true",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/us/album/choose-your-weapon/972218237",
      }),
    ],
  },
  {
    musicId: 29,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/51N5HSJz9MS._UX500_FMwebp_QL85_.jpg",
    musicYear: "2017",
    musicTitle: "Mister Mellow",
    musicArtist: ["Washed Out"],
    recordingContext: ["studio"],
    musicStyles: ["psychedelic", "downtempo", "electronic"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_kgLpntHizHSMzb85u4xPEDwVCm3gTINPA&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/6Rfsivv6DPegVm4oYLeAsm?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/mister-mellow/1243853548",
      }),
    ],
  },
  {
    musicId: 30,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/41jm4pUABmL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2015",
    musicTitle: "STUDIO",
    musicArtist: ["Benny Sings"],
    recordingContext: ["studio"],
    musicStyles: ["pop"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_kTsALwS42z9SeG0UZ3vVeyEybgmN9S9fI&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/6lud7M9JXFZ0QHoY2CeYCk?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/studio/1050342885",
      }),
    ],
  },
  {
    musicId: 31,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/61V5APQ63eL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2017",
    musicTitle: "Ctrl",
    musicArtist: ["SZA"],
    recordingContext: ["studio"],
    musicStyles: ["pop", "r&b"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_nc7f_y7E_3cXhJmMkV8yq9CU2iqpnooug&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/76290XdXVF9rPzGdNRWdCh?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/br/album/ctrl/1239976329",
      }),
    ],
  },
  {
    musicId: 32,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/4198maCNIwL._UX500_FMwebp_QL85_.jpg",
    musicYear: "1997",
    musicTitle: "Overcast!",
    musicArtist: ["Atmosphere"],
    recordingContext: ["studio"],
    musicStyles: ["hip-hop", "rap"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/watch?v=7i3wE2M1BBI&list=OLAK5uy_l6ka6bY5unpGPgYZhsNDDGRZmLJQGGkL4",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/30qOEMzZYtb5VJYk5cRKxS?si=SFj5Gjh_S3urZBu-4dQlkA?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/br/album/overcast/1516916379",
      }),
    ],
  },
  {
    musicId: 33,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/41EF0hxIr6L._UX500_FMwebp_QL85_.jpg",
    musicYear: "1996",
    musicTitle: "The Score",
    musicArtist: ["Fugees"],
    recordingContext: ["studio"],
    musicStyles: ["hip-hop", "rap"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_ljAN3FWIIkF0zqP_32xyMpC5WrheadLAQ&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/4z6F5s3RVaOsekuaegbLfD?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/br/album/the-score/281701670",
      }),
    ],
  },
  {
    musicId: 34,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/51XQywmFasL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2013",
    musicTitle: "Evil Friends",
    musicArtist: ["Portugal. The Man"],
    recordingContext: ["studio"],
    musicStyles: ["psychedelic", "rock"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_k1SkzsVL3L_X97PnTRlRJg4GQBRJAWLos&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/6VoOCCv0bXPrTHDncJyIgF?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/br/album/evil-friends/613557623",
      }),
    ],
  },
  {
    musicId: 35,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/61sx5GAnvfL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2008",
    musicTitle: "Flight of the Conchords",
    musicArtist: ["Flight of the Conchords"],
    recordingContext: ["studio"],
    musicStyles: ["parody"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_lmWE5WDOJdEPaDEuFWW78-MsDjeRp5LN8&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/0YFBrqatMlyDCqqYhhoizO?autoplay=true",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/br/album/flight-of-the-conchords/278064216",
      }),
    ],
  },
  {
    musicId: 36,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/51Jx+T890oL._UX500_FMwebp_QL85_.jpg",
    musicYear: "1967",
    musicTitle: "The Doors",
    musicArtist: ["The Doors"],
    recordingContext: ["studio"],
    musicStyles: ["psychedelic", "rock"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/watch?v=NFeUko-lQHg&list=OLAK5uy_mx98OhRuCf1iPS49rGdS-PxBTvjXdlU6I",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/1jWmEhn3ggaL6isoyLfwBn?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/br/album/the-doors/1622368510",
      }),
    ],
  },
  {
    musicId: 37,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/51YHX77vkwL._UX500_FMwebp_QL85_.jpg",
    musicYear: "1962",
    musicTitle: "Le Sacre du Printemps",
    musicArtist: ["Igor Stravinsky"],
    recordingContext: ["live"],
    musicStyles: ["atonal", "classical"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref: "https://m.youtube.com/watch?v=Q3SvnwGVem4",
      }),
      getSpotifyLinkData({
        spotifyHref: "https://open.spotify.com/album/4JSlgU7UYZWKuYspYvP00h",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/us/album/stravinsky-conducts-le-sacre-du-printemps-rite-spring/257253660",
      }),
    ],
  },
  {
    musicId: 38,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/41e6DSuUdDL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2020",
    musicTitle: "Adult Themes",
    musicArtist: ["El Michels Affair"],
    recordingContext: ["studio"],
    musicStyles: ["downtempo"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_mFc2D3li3lEnZGOa5sPoYsoYdLdgAHSS8&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/2btMPVa8QYYO6japUqGsZl?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/br/album/adult-themes/1497327175",
      }),
    ],
  },
  {
    musicId: 39,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/51iY-50F1AL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2013",
    musicTitle: "No Better Time Than Now",
    musicArtist: ["Shigeto"],
    recordingContext: ["studio"],
    musicStyles: ["downtempo", "electronic"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_noKjXkmoXHZpg3PiwVvfOYJMIgKMSYdW8&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/62tmAcovHK4IMrHxNO3h0s?autoplay=true",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/us/album/no-better-time-than-now/661873896",
      }),
    ],
  },
  {
    musicId: 40,
    musicType: "source",
    sourceType: "track",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/41D+IHLrtNL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2017",
    musicTitle: "Whitehouse Road",
    musicArtist: ["Tyler Childers"],
    recordingContext: ["concert"],
    musicStyles: ["country"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref: "https://m.youtube.com/watch?v=WtVrDud1gZM",
      }),
    ],
  },
  {
    musicId: 41,
    musicType: "source",
    sourceType: "track",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/61XofOaiGNL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2006",
    musicTitle: "Girlfriend is Better",
    musicArtist: ["Yonder Mountain String Band", "Talking Heads"],
    recordingContext: ["concert"],
    musicStyles: ["bluegrass"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref: "https://www.youtube.com/watch?v=7Owzmf9vp3E",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/track/0MSvkx1j6loHy3UYTVcLiS?autoplay=true",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/br/album/girlfriend-is-better/1229254751?i=1229254761",
      }),
    ],
  },
  {
    musicId: 42,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/51RMSBoXEEL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2007",
    musicTitle: "Little Dragon",
    musicArtist: ["Little Dragon"],
    recordingContext: ["studio"],
    musicStyles: ["synth", "pop"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_mnKHVBgZ9G6rpLaG7kBDx29McU7sCDCS4&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/34AtsFexhxnKPVJFtLIN1I?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/br/album/little-dragon/258615649",
      }),
    ],
  },
  {
    musicId: 43,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/61KSacLEgbL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2017",
    musicTitle: "Tinfoil & Turmoil",
    musicArtist: ["Billy Strings"],
    recordingContext: ["studio"],
    musicStyles: ["bluegrass"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_mUZqe4t8Kj9nBNfFN0xgsfiRSaVt0eza4&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/3CKP5G9f93RBbUi73HnyVC?autoplay=true",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/br/album/turmoil-tinfoil/1285696865",
      }),
    ],
  },
  {
    musicId: 44,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/51bVeULg4hL._AC_UY436_QL65_.jpg",
    musicYear: "2015",
    musicTitle: "Natureboy",
    musicArtist: ["Natureboy Flako"],
    recordingContext: ["studio"],
    musicStyles: ["electronic"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/watch?v=lvfbHQ5kNTo&list=OLAK5uy_nDgp2lEchi1x_c3JnF9i9yjQXM2YJvVmk",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/6y5l3VyZmHrIabKU0Lrp8n?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/br/album/natureboy/962791803",
      }),
    ],
  },
  {
    musicId: 45,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/612eezueHrL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2012",
    musicTitle: "Shark Wolf Rabbit Snake",
    musicArtist: ["Eliot Lipp"],
    recordingContext: ["studio"],
    musicStyles: ["electronic"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_nA-a4QgGruRJy24mbLh8HkZocpZo_ZM6I&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/5A7rqZVUTMf4uYUHQaxLkn?autoplay=true",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/br/album/shark-wolf-rabbit-snake/1553491366",
      }),
    ],
  },
  {
    musicId: 46,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/51zyZfXjF9L._UX500_FMwebp_QL85_.jpg",
    musicYear: "2022",
    musicTitle: "The Forever Story",
    musicArtist: ["JID"],
    recordingContext: ["studio"],
    musicStyles: ["hip-hop", "rap"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/watch?v=SOdbgUKx-s8&list=PL7FP4DkWGBb5BmcBuFaDjBVEaePMeE866",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/3QVjpIxcksDkJmOnvlOJjg?si=jO1mnqDaR9aivCY24AnVtQ?autoplay=true",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/us/album/the-forever-story/1637738689",
      }),
    ],
  },
  {
    musicId: 47,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/51XwxD4CiEL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2018",
    musicTitle: "Golden Hour",
    musicArtist: ["Kacey Musgraves"],
    recordingContext: ["studio"],
    musicStyles: ["pop", "country"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_kSDZsWub6uFJmTYpR5JhZdtpbp6sQ_Mv0&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/7f6xPqyaolTiziKf5R5Z0c?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/br/album/golden-hour/1440918116",
      }),
    ],
  },
  {
    musicId: 48,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/51ehsnfmZIL._UX500_FMwebp_QL85_.jpg",
    musicYear: "1993",
    musicTitle: "On the Night",
    musicArtist: ["Dire Straits"],
    recordingContext: ["concert"],
    musicStyles: ["rock"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_nkwORLvfaOjs4WxwsEfoeKadIDcxok-qk&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/3tybckgVqaIsR5oGnfWKpA?autoplay=true",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/br/album/on-the-night-remastered-live/1440910981",
      }),
    ],
  },
  {
    musicId: 49,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/51lGB1vZOnL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2006",
    musicTitle: "10 000 Days",
    musicArtist: ["Tool"],
    recordingContext: ["studio"],
    musicStyles: ["metal"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_l7KrE4YuWhZsfCdXlLJERHyk4YlwydukA&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/1fvWYcbjuycyHpzNPH1Vfk?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/br/album/10-000-days/1474250650",
      }),
    ],
  },
  {
    musicId: 50,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/51ZXbgjtobL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2017",
    musicTitle: "Nü Religion: HYENA",
    musicArtist: ["THEY."],
    recordingContext: ["studio"],
    musicStyles: ["r&b", "rap"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_ly1GjQX6ksVI_JPynYXAssySTmgKsCN0U&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/4XNJu6IYQqODqryQy8KjPo?autoplay=true",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/us/album/nü-religion-hyena/1199639601",
      }),
    ],
  },
  {
    musicId: 51,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/51dH2Rh-1sL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2016",
    musicTitle: "Wildflower",
    musicArtist: ["The Avalanches"],
    recordingContext: ["studio"],
    musicStyles: ["psychedelic", "downtempo", "hip-hop"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_mU6NoiUNrq0gGFf-7y2gR7GXaW2VA-huY&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/0j0djiGxLnBiW7meVc2PER?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/wildflower/1440837124",
      }),
    ],
  },
  {
    musicId: 52,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/418It7qCWoL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2022",
    musicTitle: "Bronco",
    musicArtist: ["Orville Peck"],
    recordingContext: ["studio"],
    musicStyles: ["country"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_kLBv1ZbTasPgNhwBRetBKPuqPxHNyp1Ls&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/2hCcPHWTbvF81CiXPUrM6I?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/bronco/1607593873",
      }),
    ],
  },
  {
    musicId: 53,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/51JzY2Ksr6L._UX500_FMwebp_QL85_.jpg",
    musicYear: "2010",
    musicTitle: "Timeless: Suite For Ma Dukes",
    musicArtist: ["Miguel Atwood-Ferguson", "J Dilla"],
    recordingContext: ["studio"],
    musicStyles: ["classical", "hip-hop"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/watch?v=ZS4l3NuSjDM&list=OLAK5uy_mBml-e54liexygnBq2s9lYACv9J_QTzaE",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/47TTaPKE8uOi4jiCatDCad?autoplay=true",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/us/album/timeless-suite-for-ma-dukes/1609098487",
      }),
    ],
  },
  {
    musicId: 54,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/51tm8shm6WL._UX500_FMwebp_QL85_.jpg",
    musicYear: "1998",
    musicTitle: "Roseland NYC Live",
    musicArtist: ["Portishead"],
    recordingContext: ["concert"],
    musicStyles: ["downtempo", "soul"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_mG_O2IZQqda0JOo1RQ9CHDrMjTcD8HJiw&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/1Td5bSMxDrTIDAvxJQIo5t?autoplay=true",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/us/album/roseland-nyc-live/1440913466",
      }),
    ],
  },
  {
    musicId: 55,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/61RRvrNYAAL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2016",
    musicTitle: "We Got It From Here... Thank You 4 Your Service",
    musicArtist: ["A Tribe Called Quest"],
    recordingContext: ["studio"],
    musicStyles: ["hip-hop", "rap"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_l1UCXPjqeTGO130ZjhMRPrHRaNukHqLZU&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/3WvQpufOsPzkZvcSuynCf3?autoplay=true",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/us/album/we-got-it-from-here-thank-you-4-your-service/1173106678",
      }),
    ],
  },
  {
    musicId: 56,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/51bxil4Hu2L._UX500_FMwebp_QL85_.jpg",
    musicYear: "2020",
    musicTitle: "2017–2019",
    musicArtist: ["Against All Logic", "Nicolás Jaar"],
    recordingContext: ["studio"],
    musicStyles: ["experimental", "electronic"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/watch?v=-gagW4QNcC4&list=OLAK5uy_mfGMP65Xt17DHisxYdEVpe-qY2660o5Vs",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/75vFTgDgdfVhbniLoyCNKh?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/2017-2019/1496655403",
      }),
    ],
  },
  {
    musicId: 57,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/51upfK1l2JL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2013",
    musicTitle: "Anything in Return",
    musicArtist: ["Toro y Moi"],
    recordingContext: ["studio"],
    musicStyles: ["synth", "pop"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/watch?v=iWe8Yx_SFcw&list=OLAK5uy_n68suY4-R7b6iLvlJOM9BwbBHqkwKARpM",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/6x1wyRPGlqGJ1b8uQ9UQdX?autoplay=true",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/us/album/anything-in-return/1583617153",
      }),
    ],
  },
  {
    musicId: 58,
    musicType: "source",
    sourceType: "collection",
    collectionType: "ep",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/51BZte7XfeL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2017",
    musicTitle: "Death to the Planet",
    musicArtist: ["The Comet is Coming", "Shabaka Hutchings"],
    recordingContext: ["studio"],
    musicStyles: ["electronic", "jazz"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/watch?v=-y3h4sIHzVo&list=OLAK5uy_kDIyut2vE2O5z0CCn2MyhBhm-ojwP2Bns",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/3qFgijcQbTS5frVRo3wt9R?autoplay=true",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/us/album/death-to-the-planet-ep/1384684762",
      }),
    ],
  },
  {
    musicId: 59,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/51TKPzaSFfL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2010",
    musicTitle: "Palomino",
    musicArtist: ["Trampled By Turtles"],
    recordingContext: ["studio"],
    musicStyles: ["bluegrass", "country"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_mEzcfTNRVCifyQ0frr0G7PGD_JouHSD-4&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/5sT4iQKiMLVJvOQKPVxn62?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/palomino/370090822",
      }),
    ],
  },
  {
    musicId: 60,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/51fK06Sf7PL._UX500_FMwebp_QL85_.jpg",
    musicYear: "1998",
    musicTitle: "Mezzanine",
    musicArtist: ["Massive Attack", "Tricky"],
    recordingContext: ["studio"],
    musicStyles: ["downtempo", "electronic"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_k2Qyv7jShU8WuWSBxfK5r20PZrwb81TPY&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/49MNmJhZQewjt06rpwp6QR?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/mezzanine/724466069",
      }),
    ],
  },
  {
    musicId: 61,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/51Eorz17p1L._UX500_FMwebp_QL85_.jpg",
    musicYear: "2001",
    musicTitle: "Melody A.M.",
    musicArtist: ["Röyksopp"],
    recordingContext: ["studio"],
    musicStyles: ["downtempo", "electronic"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_nWbm1n0nx7GV9PMjwqdoF9a5MJuA_JBuI&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/1WHbPhjPCBhjo49DpKvYbL?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/melody-a-m/1049806381",
      }),
    ],
  },
  {
    musicId: 62,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/51tuHve4KIL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2005",
    musicTitle: "Artifact",
    musicArtist: ["STS9"],
    recordingContext: ["studio"],
    musicStyles: ["electronic", "jam"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_l27tUNcpmHN5RPafx4QHnzfUY6m2GA9CA&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/5c3Yycwt69IZn6fevjQ0Ky?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/artifact/274859333",
      }),
    ],
  },
  {
    musicId: 63,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/51yzWaNgxCL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2008",
    musicTitle: "obZen",
    musicArtist: ["Meshuggah"],
    recordingContext: ["studio"],
    musicStyles: ["metal"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_mgNjCiPvJes7uDGvGD0EtIKJrWNa0Hd_M&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/2x2VoPa1pG2jSElA73a9Xa?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/br/album/obzen/274547457",
      }),
    ],
  },
  {
    musicId: 64,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/51b6CP2xdiL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2018",
    musicTitle: "Isolation",
    musicArtist: ["Kali Uchis"],
    recordingContext: ["studio"],
    musicStyles: ["r&b", "pop"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_mDBx9zKmDyvGMR1obcyOGwq-knkpK7ez8&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/4EPQtdq6vvwxuYeQTrwDVY?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/br/album/isolation/1358285249",
      }),
    ],
  },
  {
    musicId: 65,
    musicType: "source",
    sourceType: "collection",
    collectionType: "soundtrack",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/51hIrsByYxL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2007",
    musicTitle: "Across The Universe",
    musicArtist: ["The Beatles"],
    recordingContext: ["studio"],
    musicStyles: ["pop"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/watch?v=H4G32euigcs&list=OLAK5uy_m8F2SWaziGfyIO3ZZMVSaHJrVsfun1Srw",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/0wk2LEg0xFuuRq35UuLoNz?autoplay=true",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/us/album/across-the-universe/1598996306",
      }),
    ],
  },
  {
    musicId: 66,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/517I+0LWGIL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2017",
    musicTitle: "I Tell A Fly",
    musicArtist: ["Benjamin Clementine"],
    recordingContext: ["studio"],
    musicStyles: ["soul", "folk"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_mVhy2T-LOfEM3LYcZGYVAJJuAfPXdXafQ&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/1v4zmET7gBMnQ9UTfPatgs?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/i-tell-a-fly/1440883967",
      }),
    ],
  },
  {
    musicId: 67,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/61H0B6ZkUCL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2009",
    musicTitle: "Butter",
    musicArtist: ["Hudson Mohawke"],
    recordingContext: ["studio"],
    musicStyles: ["experimental", "electronic"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_lllYOGq5U_RWH8jEK367eUgoetZIOlKMU&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/5mM1wM86RvYN7IPwAcyxLR?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/butter/331305005",
      }),
    ],
  },
  {
    musicId: 68,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/51pT0R4OFxL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2013",
    musicTitle: "Amygdala",
    musicArtist: ["DJ Koze"],
    recordingContext: ["studio"],
    musicStyles: ["electronic", "house"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/watch?v=UMbNfVIN2Bg&list=PLJXDRKQUE7CAwc4ycTxQdEhmHhUMFaiBt",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/4W6mTFGMa5Zc4lWp7sOifv?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/amygdala/604071430",
      }),
    ],
  },
  {
    musicId: 69,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/41+yrqt7VGS._UX500_FMwebp_QL85_.jpg",
    musicYear: "1997",
    musicTitle: "The Lonesome Crowded West",
    musicArtist: ["Modest Mouse"],
    recordingContext: ["studio"],
    musicStyles: ["rock"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/watch?v=VuCXo7Vtrks&list=OLAK5uy_l8YHyFTor9ODe5M80fUoSo5W3Ava4KwRo",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/5mvHTVy1iUIkAflIufoOpj?autoplay=true",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/us/album/the-lonesome-crowded-west/1566174024",
      }),
    ],
  },
  {
    musicId: 70,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/41SzxWmko3L._UX500_FMwebp_QL85_.jpg",
    musicYear: "2005",
    musicTitle: "Prefuse 73 Reads The Books E.P.",
    musicArtist: ["Prefuse 73", "The Books"],
    recordingContext: ["studio"],
    musicStyles: ["downtempo", "hip-hop"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/watch?v=2CHr63JjgGM&list=OLAK5uy_ljP5OGG4FVLyDdsAW80PnBZHNgl3KOvOA",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/3NVmiw6v7IGahPrrvVGEAc?autoplay=true",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/us/album/prefuse-73-reads-the-books/292788233",
      }),
    ],
  },
  {
    musicId: 71,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/61a4Emiuf3L._UX500_FMwebp_QL85_.jpg",
    musicYear: "2014",
    musicTitle: "Our Love",
    musicArtist: ["Caribou"],
    recordingContext: ["studio"],
    musicStyles: ["electronic", "house"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_k-Homl-MhTJmgWrYh4Vl9LaK1apMwKcK0&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/1J9DdlpYK1NxXL6ciqSVoJ?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/our-love/883739153",
      }),
    ],
  },
  {
    musicId: 72,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/41E0neZS+mL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2018",
    musicTitle: "Harry Hard-On",
    musicArtist: ["Allan Rayman"],
    recordingContext: ["studio"],
    musicStyles: ["rock"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_noItPgVtIYqK5GoaAkjc1tQbZ9tFHKr0A&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/1eN0asiUp2OoMuRkI61cmm?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/harry-hard-on/1440609229",
      }),
    ],
  },
  {
    musicId: 73,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/51bmAqjAv4L._UX500_FMwebp_QL85_.jpg",
    musicYear: "2013",
    musicTitle: "Danish & Blue",
    musicArtist: ["Lilacs & Champagne"],
    recordingContext: ["studio"],
    musicStyles: ["downtempo", "hip-hop"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_khGVsZgYtss5nGHpgwNNDPylcXbWP4ruc&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/75EUlG7J74DW9ocTmJ6sh1?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/danish-blue/1602628444",
      }),
    ],
  },
  {
    musicId: 74,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/41s9LnNp5CL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2011",
    musicTitle: "SBTRKT",
    musicArtist: ["SBTRKT"],
    recordingContext: ["studio"],
    musicStyles: ["electronic"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_n5h-Iqdogy6kMId3BriCkKjgr09dgRwto&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/4ncktAfHYJlko5yZgqce3H?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/sbtrkt/1573470216",
      }),
    ],
  },
  {
    musicId: 75,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/41TZusHUilL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2022",
    musicTitle: "Grotto",
    musicArtist: ["Wilma Vritra"],
    recordingContext: ["studio"],
    musicStyles: ["hip-hop"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_kkbTa04DN2fq6ZttwNDi3CIopqwsmJ4ZY&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/12betAHniGpAyDzg4ty8ER?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/grotto/1610003157",
      }),
    ],
  },
  {
    musicId: 76,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/51VmF8pZVZL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2016",
    musicTitle: "IV",
    musicArtist: ["BADBADNOTGOOD"],
    recordingContext: ["studio"],
    musicStyles: ["jazz"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_kqhKkmbySqG4EMUgLHLkavMNLOEXmZQKw&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/5wAGlQICfKYQfaBppnUbmP?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/iv/1608122086",
      }),
    ],
  },
  {
    musicId: 77,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/51Nc7RIH1JL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2012",
    musicTitle: "Even If It Isn't Right",
    musicArtist: ["Michal Menert"],
    recordingContext: ["studio"],
    musicStyles: ["electronic", "hip-hop"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_mH-IhOeeJOXkDhlSKaR2PQSmZ7lKl79l8&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/5hvWMXFoeAxCK3RcBdgt7N?autoplay=true",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/us/album/even-if-it-isnt-right/521981386",
      }),
    ],
  },
  {
    musicId: 78,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/21VT4tYkuGL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2011",
    musicTitle: "Black Up",
    musicArtist: ["Shabazz Palaces"],
    recordingContext: ["studio"],
    musicStyles: ["experimental", "hip-hop", "rap"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_m4osqPwgG9lghYoipG9XQZbxz6Uop8WIg&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/2dNexssEWbK7rgh0veTjjz?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/black-up/669854622",
      }),
    ],
  },
  {
    musicId: 79,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/515FDvfvkbL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2022",
    musicTitle: "Louie",
    musicArtist: ["Kenny Beats"],
    recordingContext: ["studio"],
    musicStyles: ["hip-hop"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/watch?v=duMX-T4qDm8&list=PLOa7rvaTYe0Z96jY1oifR4AQ_YA9oAbC5",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/3SKVtzmihlnGFylW5nC5kj?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/louie/1635648979",
      }),
    ],
  },
  {
    musicId: 80,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/51cq-0hWQXL._UX500_FMwebp_QL85_.jpg",
    musicYear: "1992",
    musicTitle: "Rage Against The Machine",
    musicArtist: ["Rage Against The Machine"],
    recordingContext: ["studio"],
    musicStyles: ["rock", "hip-hop"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_mG7ndizgcX0QrrKh3zF9lFyU6eFzprgiE&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/4Io5vWtmV1rFj4yirKb4y4?autoplay=true",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/us/album/rage-against-the-machine-xx-20th-anniversary-special/578028823",
      }),
    ],
  },
  {
    musicId: 81,
    musicType: "source",
    sourceType: "track",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/51KDF5v8X1L._UX500_FMwebp_QL85_.jpg",
    musicYear: "1984",
    musicTitle: "Love Kills",
    musicArtist: ["Freddie Mercury", "Giorgio Moroder"],
    recordingContext: ["studio"],
    musicStyles: ["synth", "pop"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref: "https://www.youtube.com/watch?v=YcgBgJCaC-M",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/track/4HeNuE5fHrBQFErXCdVU7s?autoplay=true",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/us/album/love-kills-special-edition/1478416229?i=1478416406",
      }),
    ],
  },
  {
    musicId: 82,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/61Y8zY9DcBL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2012",
    musicTitle: "Be Strong",
    musicArtist: ["The 2 Bears"],
    recordingContext: ["studio"],
    musicStyles: ["electronic", "house"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_noXzslSBp14rG_4GcV90IFNxepFTUXaSY&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/0DSCXv8rx9jJgdqZnJ2LH9?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/be-strong/482128355",
      }),
    ],
  },
  {
    musicId: 83,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/51dH7OtfXGL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2008",
    musicTitle: "Loaded",
    musicArtist: ["The Wood Brothers"],
    recordingContext: ["studio"],
    musicStyles: ["rock", "blues"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_mm0bQQzoFsaWkr90K_qrnhtVYBWti6ABU&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/1IOJo40EKOLngOzy09pQMi?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/loaded/721290211",
      }),
    ],
  },
  {
    musicId: 84,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/61OfIe4JirL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2005",
    musicTitle: "Visions of Backbeat",
    musicArtist: ["BoomBox"],
    recordingContext: ["studio"],
    musicStyles: ["electronic", "funk"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/watch?v=A-TWpsfEO2U&list=OLAK5uy_lmxfos_kLmLAiSr3D8YM9f9uKaKaD9xnU",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/6lXhc0jECygZK464JIUvRb?autoplay=true",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/us/album/visions-of-backbeat/152216551",
      }),
    ],
  },
  {
    musicId: 85,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/61J5q+6hieL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2016",
    musicTitle: "99.9%",
    musicArtist: ["Kaytranada"],
    recordingContext: ["studio"],
    musicStyles: ["electronic", "hip-hop"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_lH2xUVNwi41nO_YeXVWSkTcejBwDN2MdE&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/6JD4Qerb8IcaAzFgpFw0sa?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/99-9/1092026376",
      }),
    ],
  },
  {
    musicId: 86,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/615kPrlw-HL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2019",
    musicTitle: "Hi This Is Flume",
    musicArtist: ["Flume"],
    recordingContext: ["studio"],
    musicStyles: ["experimental", "electronic"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_mebYgGjMINiO11XqdRUSOHf7i30KuJ4Ns&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/2Vx9FC6Um8i6kEtY7HNswB?autoplay=true",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/us/album/hi-this-is-flume-mixtape/1455360241",
      }),
    ],
  },
  {
    musicId: 87,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/51ehbJbCYKS._UX500_FMwebp_QL85_.jpg",
    musicYear: "2016",
    musicTitle: "Bloom",
    musicArtist: ["Rüfüs Du Sol"],
    recordingContext: ["studio"],
    musicStyles: ["electronic", "house"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_liwjzoU3ZYzKmofLkADaaHg3oK7I_-Ib0&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/56GSVkl0UZdallOvJuMOaO?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/bloom/1569160808",
      }),
    ],
  },
  {
    musicId: 88,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/41OmwgSEy0L._UX500_FMwebp_QL85_.jpg",
    musicYear: "2016",
    musicTitle: "Traditional Synthesizer Music",
    musicArtist: ["Venetian Snares"],
    recordingContext: ["studio"],
    musicStyles: ["electronic"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_kY6oiIafXcHlROlDvHDUb4IgwYoGw2sCU&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/7nqOcV9Ilnrnuzwvq77xn4?autoplay=true",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/us/album/traditional-synthesizer-music/1063392214",
      }),
    ],
  },
  {
    musicId: 89,
    musicType: "source",
    sourceType: "collection",
    collectionType: "ep",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/41sMeY50WeL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2015",
    musicTitle: "Computer Controlled Acoustic Instruments pt2",
    musicArtist: ["Aphex Twin"],
    recordingContext: ["studio"],
    musicStyles: ["experimental", "electronic"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/watch?v=laMkR-fxg6g&list=OLAK5uy_lNgiqMe1FzN7OlTUBG73a39yyzqV8tuBY",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/5IUjJ4VcmUvZnGAONAp2IX?autoplay=true",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/us/album/computer-controlled-acoustic-instruments-pt-2/955440196",
      }),
    ],
  },
  {
    musicId: 90,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/614WuP4jf5L._UX500_FMwebp_QL85_.jpg",
    musicYear: "1999",
    musicTitle: "Ghetty Green",
    musicArtist: ["Project Pat"],
    recordingContext: ["studio"],
    musicStyles: ["hip-hop", "rap"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/watch?v=8NYL2zl_qo0&list=OLAK5uy_nqyp1stMgk_Z-jomPVj8S_DHvU5_M24k0",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/60dkMXwuRlDMnOis7Y4L2t?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/ghetty-green/413579602",
      }),
    ],
  },
  {
    musicId: 91,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/61ouDVI1jBL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2017",
    musicTitle: "Paradise",
    musicArtist: ["Knox Fortune"],
    recordingContext: ["studio"],
    musicStyles: ["pop"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_nGEtbcXMhfXIhpf5n7wMiHzwdhcthin4w&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/0yCW3blpXzA0owDGQVQ5xY?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/paradise/1281804676",
      }),
    ],
  },
  {
    musicId: 92,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/51gYvSDtu2L._UX500_FMwebp_QL85_.jpg",
    musicYear: "2016",
    musicTitle: "24K Magic",
    musicArtist: ["Bruno Mars"],
    recordingContext: ["studio"],
    musicStyles: ["pop", "funk"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_nkOzLA76zVCUotP8td84Cvi4I788jjC1s&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/4PgleR09JVnm3zY1fW3XBA?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/24k-magic/1161503945",
      }),
    ],
  },
  {
    musicId: 93,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/613wW1S1PsL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2009",
    musicTitle: "Guns Don't Kill People... Lazers Do",
    musicArtist: ["Major Lazer"],
    recordingContext: ["studio"],
    musicStyles: ["electronic", "reggae"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_lsVLUb5HMhJ10EVmUIrJbvhpSoU8cZSxI&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/690h3YPCXOCE022G31IUaH?autoplay=true",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/us/album/guns-dont-kill-people-lazers-do-bonus-track-version/1443153977",
      }),
    ],
  },
  {
    musicId: 94,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/61xutJvvOUL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2017",
    musicTitle: "Funk Wav Bounces Vol. 1",
    musicArtist: ["Calvin Harris"],
    recordingContext: ["studio"],
    musicStyles: ["electronic", "pop"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/watch?v=8Ee4QjCEHHc&list=PLKDRMeFOOHVgv9c0wPQqt_4lDUyWGv5nI",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/2HaqChIDc5go3qxVunBDK0?autoplay=true",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/us/album/funk-wav-bounces-vol-1/1233869908",
      }),
    ],
  },
  {
    musicId: 95,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/61ry6fRAEqL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2010",
    musicTitle: "Lucky Shiner",
    musicArtist: ["Gold Panda"],
    recordingContext: ["studio"],
    musicStyles: ["electronic"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_lnXmxUy2fhwy881e88r2_-4zIeS5WCMBQ&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/2wSMFAWmbsbXCitByPWPLk?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/lucky-shiner/679905330",
      }),
    ],
  },
  {
    musicId: 96,
    musicType: "source",
    sourceType: "collection",
    collectionType: "ep",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/41PZqyDKwYL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2018",
    musicTitle: "Channel Tres",
    musicArtist: ["Channel Tres"],
    recordingContext: ["studio"],
    musicStyles: ["electronic", "house"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_lXO8ouPsTDuM2jpY9R95Gwd1ob7Mbw5NQ&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/01Vvrmisrvr1YOIGRn4brG?autoplay=true",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/us/album/channel-tres-ep/1591988570",
      }),
    ],
  },
  {
    musicId: 97,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/41TW9snxRgL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2013",
    musicTitle: "Cold Spring Fault Less Youth",
    musicArtist: ["Mount Kimbie"],
    recordingContext: ["studio"],
    musicStyles: ["electronic"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_lkJ_5y5TaPnSZto82qlNfRFcIZd2JHWBE&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/6ETAoJJ5NhxsGyD53cHApT?autoplay=true",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/us/album/cold-spring-fault-less-youth/627943335",
      }),
    ],
  },
  {
    musicId: 98,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/51vMhxO6TrL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2001",
    musicTitle: "Fahrenheit Fair Enough",
    musicArtist: ["Telefon Tel Aviv"],
    recordingContext: ["studio"],
    musicStyles: ["downtempo", "electronic"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_miDydIpPg4OVMW9EFqiXzX2NL9kUtm1Is&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/27teXombBxDGNa9f5jtOr2?autoplay=true",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/us/album/fahrenheit-fair-enough/1163911790",
      }),
    ],
  },
  {
    musicId: 99,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/41Bt31ZEFqL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2019",
    musicTitle: "Imagination & the Misfit Kid",
    musicArtist: ["Labrinth"],
    recordingContext: ["studio"],
    musicStyles: ["pop"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_milII0AL66b3Z-LdHfEemlrpwLWSjdcxo&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/0FSsRH1jeZqKbGcHwq3UO0?autoplay=true",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/us/album/imagination-the-misfit-kid/1485285334",
      }),
    ],
  },
  {
    musicId: 100,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/416adyFdguS._UX500_FMwebp_QL85_.jpg",
    musicYear: "2006",
    musicTitle: "Donuts",
    musicArtist: ["J Dilla"],
    recordingContext: ["studio"],
    musicStyles: ["hip-hop"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/watch?v=HOHa6j6Pd5E&list=OLAK5uy_m8VPjbn9rF3ninCB-n_ToxxHH5U3_TkvE",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/5fMlysqhFE0itGn4KezMBW?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/donuts/108233171",
      }),
    ],
  },
  {
    musicId: 101,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/616fELvttAL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2016",
    musicTitle: '"AWAKEN, MY LOVE!"',
    musicArtist: ["Childish Gambino"],
    recordingContext: ["studio"],
    musicStyles: ["r&b", "pop"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_lSoKa_JSXsvMGFOTc7JqL791Mk1KnnwGk&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/4Carzsnpd6yvuHZ49I0oz8?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/awaken-my-love/1450975800",
      }),
    ],
  },
  {
    musicId: 102,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/41KLi267rgL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2018",
    musicTitle: "Swimming",
    musicArtist: ["Mac Miller"],
    recordingContext: ["studio"],
    musicStyles: ["hip-hop", "rap"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_nDheeuXYg9hksmCezWxswPTivVoqyNCQc&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/5wtE5aLX5r7jOosmPhJhhk?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/swimming/1408996052",
      }),
    ],
  },
  {
    musicId: 103,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/51hNMl0yO2L._UX500_FMwebp_QL85_.jpg",
    musicYear: "2015",
    musicTitle: "Elaenia",
    musicArtist: ["Floating Points"],
    recordingContext: ["studio"],
    musicStyles: ["electronic"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_nymiUNxoqFZEzgvf4t0SW8ej2glgpTFRI&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/51QBkcL7S3KYdXSSA0zM9R?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/elaenia/1030953710",
      }),
    ],
  },
  {
    musicId: 104,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/51OEecp-0yL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2010",
    musicTitle: "Plastic Beach",
    musicArtist: ["Gorillaz"],
    recordingContext: ["studio"],
    musicStyles: ["pop", "electronic", "hip-hop"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_mYzpOFB-6D0ooK-rCL5PuR9zjAxFIV9lo&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/2dIGnmEIy1WZIcZCFSj6i8?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/plastic-beach/850569437",
      }),
    ],
  },
  {
    musicId: 105,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/319bGSNLyqL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2019",
    musicTitle: "Amnioverse",
    musicArtist: ["Lapalux"],
    recordingContext: ["studio"],
    musicStyles: ["electronic"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_lyUazMI1Dzud6YTMopEEaMoefFQ_F0L80&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/0xwvefY0dNUton1yVR6jal?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/amnioverse/1480355473",
      }),
    ],
  },
  {
    musicId: 106,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/51C19Sc2SmL._UX500_FMwebp_QL85_.jpg",
    musicYear: "1978",
    musicTitle: "Ambient 1: Music for Airports",
    musicArtist: ["Brian Eno"],
    recordingContext: ["studio"],
    musicStyles: ["ambient", "electronic"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/watch?v=LKZ3fGR2SDY&list=OLAK5uy_mfRTetqFB_MtRhjeOxR5tp0uVfK1YH-Sw",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/063f8Ej8rLVTz9KkjQKEMa?autoplay=true",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/us/album/ambient-1-music-for-airports/724435863",
      }),
    ],
  },
  {
    musicId: 107,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/51LBlAoj-DL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2008",
    musicTitle: "Elephant Revival",
    musicArtist: ["Elephant Revival"],
    recordingContext: ["studio"],
    musicStyles: ["folk"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_lod7nZPYLV_S1fF4PlB_WQgR2yt680jYg&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/1Qyc6kxZYssUHELLcImDnX?autoplay=true",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/us/album/elephant-revival/1133319156",
      }),
    ],
  },
  {
    musicId: 108,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/41XDwJZFL0L._UX500_FMwebp_QL85_.jpg",
    musicYear: "1998",
    musicTitle: "Permutation",
    musicArtist: ["Amon Tobin"],
    recordingContext: ["studio"],
    musicStyles: ["experimental", "electronic"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/watch?v=V4zGRmrG20w&list=OLAK5uy_kzoWUKmY03AQ8TpSRznZOusi-IQX3y5FM",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/7jxs0XY2yJS36PZCjUv4Hp?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/permutation/416328412",
      }),
    ],
  },
  {
    musicId: 109,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/515WLLCQOjL._UX500_FMwebp_QL10_.jpg",
    musicYear: "2008",
    musicTitle: "GEA",
    musicArtist: ["Mia Doi Todd"],
    recordingContext: ["studio"],
    musicStyles: ["folk"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_m-_It5NCT_EsFze1o2V0_mKYYtyVnKUNE&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/6PKJSufT6gVNjQ7dQ5c72V?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/gea/432067242",
      }),
    ],
  },
  {
    musicId: 110,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/416q2EVuheL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2011",
    musicTitle: "Dive",
    musicArtist: ["Tycho"],
    recordingContext: ["studio"],
    musicStyles: ["downtempo"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_lkCgIijL5sMC8ks-r6oAlOJXDZMt8mUQI&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/4CBUbnGFz2iKFJjYqRIwst?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/dive/679251532",
      }),
    ],
  },
  {
    musicId: 111,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/51TjcVN952L._UX500_FMwebp_QL85_.jpg",
    musicYear: "2014",
    musicTitle: "This Is All Yours",
    musicArtist: ["alt-J"],
    recordingContext: ["studio"],
    musicStyles: ["psychedelic", "rock"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_k0ZBPQh_nb1yaxillHshHa80jdM2Q96t0&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/4oktVvRuO1In9B7Hz0xm0a?autoplay=true",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/us/album/this-is-all-yours/1625672169",
      }),
    ],
  },
  {
    musicId: 112,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/61lb2MMKUuL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2016",
    musicTitle: "22, A Million",
    musicArtist: ["Bon Iver"],
    recordingContext: ["studio"],
    musicStyles: ["psychedelic", "folk"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_nwQaP_wXtJiNSkfmaUkQYxY7RztNFtLIU&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/4bJCKmpKgti10f3ltz6LLl?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/22-a-million/1141107722",
      }),
    ],
  },
  {
    musicId: 113,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/414riTT7KOL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2020",
    musicTitle: "Heaven To A Tortured Mind",
    musicArtist: ["Yves Tumour"],
    recordingContext: ["studio"],
    musicStyles: ["experimental", "rock"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_ke9gfBt56OHmCZr7SONStxmyMKu5zZdqI&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/5wnCTZtzIZxasRSHzI1JeW?autoplay=true",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/us/album/heaven-to-a-tortured-mind/1494929769",
      }),
    ],
  },
  {
    musicId: 114,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/414om-EA5XL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2021",
    musicTitle: "Sunsetter",
    musicArtist: ["Leisure"],
    recordingContext: ["studio"],
    musicStyles: ["pop", "funk"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_kO1qhmbRQWD-9EnC6P0bP1IbQbRuFbm-8&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/2jzhUfQcf0ypdVTs5eViUU?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/sunsetter/1593348262",
      }),
    ],
  },
  {
    musicId: 115,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/51f0-qjHSPL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2011",
    musicTitle: "Galactic Melt",
    musicArtist: ["Com Truise"],
    recordingContext: ["studio"],
    musicStyles: ["electronic"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_mBQkB2kJcdmt0pEhNzVCvkJ6au1ROUnyg&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/1PSr89gL5T8Ki87t4V5BGZ?autoplay=true",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/us/album/galactic-melt-10th-anniversary-edition/1593742194",
      }),
    ],
  },
  {
    musicId: 116,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://i.discogs.com/s3FSO_b2zSfYnJZFRHi--gg-Dt5dcw_cizXWg48BviM/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTYyMjMy/ODMtMTQxNDEwNzcy/Ny02NDg3LmpwZWc.jpeg",
    musicYear: "2013",
    musicTitle: "Studio Sessions From A Color Map of the Sun",
    musicArtist: ["Pretty Lights", "Joel Hamilton"],
    recordingContext: ["live"],
    musicStyles: ["funk", "soul", "instrumental"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/watch?v=q_YrcGRzIE0&list=PLRI0bqhn-VeZz9_SpgRkNMoHF8BsZbXwn",
      }),
      {
        linkLabel: "soundcloud",
        linkHref:
          "https://soundcloud.com/prettylights/sets/a-color-map-of-the-sun-live",
      },
    ],
  },
  {
    musicId: 117,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/61vKtD942xL._UX500_FMwebp_QL85_.jpg",
    musicYear: "1998",
    musicTitle: "Psyence Fiction",
    musicArtist: ["Unkle"],
    recordingContext: ["studio"],
    musicStyles: ["downtempo", "electronic"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_nl7mHg_l7FRu7pINT5r348Y2337k9KAcM&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/6Dxx0vxLQ83LK1PMZezlcY?autoplay=true",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/us/album/psyence-fiction/1440922148",
      }),
    ],
  },
  {
    musicId: 118,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/61AnhrPSfzL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2016",
    musicTitle: "Cloak",
    musicArtist: ["Jordan Rakei"],
    recordingContext: ["studio"],
    musicStyles: ["soul", "funk"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_lpWWJEDKyxBhoJDIj4Jqvn9TtMWQUKgPc&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/6iuOPJ2AAEdG71e5Y1mDMy?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/cloak/1540037358",
      }),
    ],
  },
  {
    musicId: 119,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/61A2MYHIdHL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2009",
    musicTitle: "Water 4 The Soul",
    musicArtist: ["Gramatik"],
    recordingContext: ["studio"],
    musicStyles: ["electronic", "hip-hop", "funk"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/watch?v=3S6u8FHkIeE&list=OLAK5uy_mRl7Fkins6Y3F1l6WXlYvcgjvF0FmUlPw",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/09ffEBtiinB8HP4FDJ2apt?autoplay=true",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/us/album/water-4-the-soul/806754280",
      }),
    ],
  },
];
