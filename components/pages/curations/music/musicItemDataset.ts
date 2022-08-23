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
      "https://m.media-amazon.com/images/I/815pLljpegL._SL1500_.jpg",
    musicYear: "2018",
    musicTitle: "IC-01 Hanoi",
    musicArtist: ["Unknown Mortal Orchestra"],
    recordingContext: ["studio"],
    musicStyles: ["rock", "instrumental", "experimental"],
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
    musicStyles: ["groove", "instrumental", "lush"],
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
      "https://m.media-amazon.com/images/I/71CzC0CGECL._AC_UY436_FMwebp_QL65_.jpg",
    musicTitle: "Live Vol. 1",
    musicYear: "2020",
    musicArtist: ["Parcels"],
    recordingContext: ["live"],
    musicStyles: ["pop", "social"],
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
      "https://m.media-amazon.com/images/I/41Eldx-iyAL._UX500_FMwebp_QL85_.jpg",
    musicYear: "2006",
    musicTitle: "The Best Of What's Around Vol. 01",
    musicArtist: ["Dave Matthews Band"],
    recordingContext: ["studio", "concert"],
    musicStyles: ["jam"],
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
      "https://m.media-amazon.com/images/I/71XmXBCQ+XL._AC_UY436_FMwebp_QL65_.jpg",
    musicYear: "2016",
    musicTitle: "Blank Face LP",
    musicArtist: ["ScHoolboy Q"],
    recordingContext: ["studio"],
    musicStyles: ["hip-hop", "street"],
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
    musicThumbnailHref: "https://m.media-amazon.com/images/I/41us+rdexmL.jpg",
    musicYear: "2004",
    musicTitle: "Pickin' on Modest Mouse: A Bluegrass Tribute",
    musicArtist: ["Iron Horse", "Modest Mouse"],
    recordingContext: ["studio"],
    musicStyles: ["covers", "bluegrass"],
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
      "https://m.media-amazon.com/images/I/51my4h86mRL._AC_UY312_FMwebp_QL65_.jpg",
    musicYear: "2012",
    musicTitle: "Trouble",
    musicArtist: ["Totally Extinct Enormous Dinosaurs"],
    recordingContext: ["studio"],
    musicStyles: ["electronic"],
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
      "https://m.media-amazon.com/images/I/718tt6ncquL._AC_UY436_FMwebp_QL65_.jpg",
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
      "https://m.media-amazon.com/images/I/61XijFIRaxL._AC_UY436_FMwebp_QL65_.jpg",
    musicYear: "2022",
    musicTitle: "Organ Recital",
    musicArtist: ["Bastien Keb"],
    recordingContext: ["studio"],
    musicStyles: ["soul"],
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
      "https://m.media-amazon.com/images/I/813BJ4cG9RL._SS500_.jpg",
    musicYear: "2008",
    musicTitle: "Filling Up the City Skies - Disc 1",
    musicArtist: ["Pretty Lights"],
    recordingContext: ["studio"],
    musicStyles: ["soul", "hip-hop", "electronica"],
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
    musicStyles: ["voice", "piano", "minimal"],
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
      "https://is4-ssl.mzstatic.com/image/thumb/Features125/v4/f4/6b/a9/f46ba999-c102-ea24-7efa-a8e48b43bebd/mza_4437830076440205700.jpg/1000x1000bb.webp",
    musicYear: "2021",
    musicTitle: "WhoMadeWho",
    musicArtist: ["WhoMadeWho live at Abu Simbel"],
    recordingContext: ["live"],
    musicStyles: ["electronic", "cercle"],
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
    musicStyles: ["spooky", "spiritual", "rock"],
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
    musicTitle: "Nicolas Jaar Presents the Network",
    musicArtist: ["Nicolas Jaar"],
    recordingContext: ["studio"],
    musicStyles: ["full-spectrum"],
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
    musicTitle: "Hip-Hop portion - Nicolas Jaar Presents the Network",
    musicArtist: ["Nicolas Jaar"],
    recordingContext: ["studio"],
    musicStyles: ["space", "hip-hop"],
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
      "https://m.media-amazon.com/images/I/71cHQs6MslL._AC_UY436_FMwebp_QL65_.jpg",
    musicYear: "2018",
    musicTitle: "iridescence",
    musicArtist: ["BROCKHAMPTON"],
    recordingContext: ["studio"],
    musicStyles: ["pop", "hip-hop"],
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
    musicStyles: ["electronic", "funk"],
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
      "https://m.media-amazon.com/images/I/51h7dDC5oGL._AC_UL640_FMwebp_QL65_.jpg",
    musicYear: "2003",
    musicTitle: "Surrounded",
    musicArtist: ["Tipper"],
    recordingContext: ["studio"],
    musicStyles: ["interdimensional", "hip-hop"],
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
      "https://m.media-amazon.com/images/I/61zjF4Ft7tL._AC_UY436_FMwebp_QL65_.jpg",
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
      "https://m.media-amazon.com/images/I/61V9YTk78EL._AC_UY436_FMwebp_QL65_.jpg",
    musicYear: "1996",
    musicTitle: "Entroducing",
    musicArtist: ["DJ Shadow"],
    recordingContext: ["studio"],
    musicStyles: ["electronic", "hip-hop"],
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
    musicStyles: ["love", "rap", "hip-hop"],
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
      "https://m.media-amazon.com/images/I/71LCBA0rOHL._AC_UY436_FMwebp_QL65_.jpg",
    musicYear: "2008",
    musicTitle: "Los Angeles",
    musicArtist: ["Flying Lotus"],
    recordingContext: ["studio"],
    musicStyles: ["primal", "electronic", "beats"],
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
      "https://m.media-amazon.com/images/I/71bsHTr6idL._AC_UY436_FMwebp_QL65_.jpg",
    musicYear: "2001",
    musicTitle: "Discovery",
    musicArtist: ["Daft Punk"],
    recordingContext: ["studio"],
    musicStyles: ["house", "electronic"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://m.youtube.com/playlist?list=OLAK5uy_lMA_iEf3aqk5YSDsnrPKojXegOiecSF94&playnext=1&index=1",
      }),
      getSpotifyLinkData({
        spotifyHref:
          "https://open.spotify.com/album/2noRn2Aes5aoNVsU6iWThc?autoplay=true",
      }),
      getAppleLinkData({
        appleHref: "https://music.apple.com/us/album/discovery/697194953",
      }),
    ],
  },
  {
    musicId: 23,
    musicType: "source",
    sourceType: "collection",
    collectionType: "album",
    musicThumbnailHref:
      "https://m.media-amazon.com/images/I/71lpRjtW+YL._AC_UY436_FMwebp_QL65_.jpg",
    musicYear: "2018",
    musicTitle: "Con Todo El Mundo",
    musicArtist: ["Khruangbin"],
    recordingContext: ["studio"],
    musicStyles: ["style", "groove", "funk"],
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
      "https://m.media-amazon.com/images/I/81D9t2wdqiL._AC_UY436_FMwebp_QL65_.jpg",
    musicYear: "1983",
    musicTitle: "Speaking in Tongues",
    musicArtist: ["Talking Heads"],
    recordingContext: ["studio"],
    musicStyles: ["pop"],
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
    musicStyles: ["psychedelic", "groove", "electronic"],
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
      "https://is2-ssl.mzstatic.com/image/thumb/Video112/v4/fc/1b/b5/fc1bb5f1-252f-24a3-53d3-38753dcbb135/Job23508cff-ee56-4c24-9025-020e49851f71-132680369-PreviewImage_preview_image_nonvideo_sdr-Time1654619187377.png/540x540bb.webp",
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
      "https://is2-ssl.mzstatic.com/image/thumb/Music113/v4/dc/2a/14/dc2a1483-015c-2959-994a-d92786b2d2a9/cover.jpg/540x540bb.webp",
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
    musicStyles: ["rock"],
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
      "https://m.media-amazon.com/images/I/812op+rEfKL._AA256._SX354_SY354_BL0_QL100__UX500_FMwebp_QL85_.jpg",
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
    musicStyles: ["rock"],
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
      "https://is1-ssl.mzstatic.com/image/thumb/Features/70/0a/9f/dj.dnkdzyhk.jpg/1000x1000bf.webp",
    musicYear: "1962",
    musicTitle: "Le Sacre du Printemps",
    musicArtist: ["Igor Stravinsky"],
    recordingContext: ["live"],
    musicStyles: ["atonal", "classic"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref: "https://m.youtube.com/watch?v=Q3SvnwGVem4",
      }),
      getSpotifyLinkData({
        spotifyHref: "https://open.spotify.com/album/4JSlgU7UYZWKuYspYvP00h",
      }),
      getAppleLinkData({
        appleHref:
          "https://music.apple.com/br/album/stravinsky-conducts-le-sacre-du-printemps-rite-spring/257253660",
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
    musicStyles: ["jazz"],
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
      "https://m.media-amazon.com/images/I/813SCblk8XL._AA256._SX354_SY354_BL0_QL100__UX500_FMwebp_QL85_.jpg",
    musicYear: "2013",
    musicTitle: "No Better Time Than Now",
    musicArtist: ["Shigeto"],
    recordingContext: ["studio"],
    musicStyles: ["electronic", "jazz"],
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
          "https://music.apple.com/br/album/no-better-time-than-now/661873896",
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
    musicStyles: ["canyon", "country"],
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
    musicStyles: ["cover", "bluegrass"],
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
];
