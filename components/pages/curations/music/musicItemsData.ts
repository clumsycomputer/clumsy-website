import {
  getAppleLinkData,
  getSpotifyLinkData,
  getYoutubeLinkData,
} from "./common/getExternalLinkData";
import { MusicItem } from "./common/models";

export const musicItemsData: Array<MusicItem> = [
  {
    itemId: 0,
    itemType: "source",
    sourceType: "collection",
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
    itemId: 1,
    itemType: "source",
    sourceType: "collection",
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
    itemId: 2,
    itemType: "source",
    sourceType: "collection",
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
    itemId: 3,
    itemType: "source",
    sourceType: "collection",
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
    itemId: 4,
    itemType: "source",
    sourceType: "collection",
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
    itemId: 5,
    itemType: "source",
    sourceType: "collection",
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
    itemId: 6,
    itemType: "source",
    sourceType: "collection",
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
    itemId: 7,
    itemType: "source",
    sourceType: "collection",
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
    itemId: 8,
    itemType: "source",
    sourceType: "collection",
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
    itemId: 9,
    itemType: "source",
    sourceType: "collection",
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
  {
    itemId: 10,
    itemType: "source",
    sourceType: "collection",
    collectionType: "ep",
    thumbnailHref:
      "https://preview.redd.it/t55x4lyak2y51.jpg?auto=webp&s=6cffa2dd89b7bb9f41a7abe3979ab41f93313c72",
    musicName: "Bon Iver at AIR studios",
    musicArtist: ["Bon Iver", "Sean Carey"],
    recordingStyle: ["live"],
    musicTags: ["voice", "piano", "minimal"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref: "https://www.youtube.com/watch?v=A9Tp5fl18Ho",
      }),
    ],
  },
  {
    itemId: 11,
    itemType: "source",
    sourceType: "mix",
    thumbnailHref:
      "https://is4-ssl.mzstatic.com/image/thumb/Features125/v4/f4/6b/a9/f46ba999-c102-ea24-7efa-a8e48b43bebd/mza_4437830076440205700.jpg/1000x1000bb.webp",
    musicName: "WhoMadeWho",
    musicArtist: ["WhoMadeWho live at Abu Simbel"],
    recordingStyle: ["live"],
    musicTags: ["electronic", "cercle"],
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
    itemId: 12,
    itemType: "source",
    sourceType: "collection",
    collectionType: "album",
    thumbnailHref:
      "https://cdn.albumoftheyear.org/album/55039-in-rainbows-from-the-basement.jpg",
    musicName: "In Rainbows From the Basement",
    musicArtist: ["Radiohead", "Nigel Godrich"],
    recordingStyle: ["live"],
    musicTags: ["spooky", "spiritual", "rock"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref: "https://www.youtube.com/watch?v=DWuAn6C8Mfc",
      }),
    ],
  },
  {
    itemId: 13,
    itemType: "source",
    sourceType: "mix",
    thumbnailHref:
      "https://i1.sndcdn.com/artworks-000484735170-v2qg5l-t500x500.jpg",
    musicName: "Nicolas Jaar Presents the Network",
    musicArtist: ["Nicolas Jaar"],
    recordingStyle: ["studio"],
    musicTags: ["full-spectrum"],
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
    itemId: 14,
    itemType: "clip",
    sourceType: "mix",
    thumbnailHref:
      "https://e.snmc.io/i/1200/s/af23292a9abbba762d6e0d96ffa7eb03/7962041",
    musicName: "Hip-Hop portion - Nicolas Jaar Presents the Network",
    musicArtist: ["Nicolas Jaar"],
    recordingStyle: ["studio"],
    musicTags: ["space", "hip-hop"],
    externalLinks: [
      getYoutubeLinkData({
        youtubeHref:
          "https://www.youtube.com/watch?v=JqjhIrys238&start=7260&end=9320",
      }),
    ],
  },
  {
    itemId: 15,
    itemType: "source",
    sourceType: "collection",
    collectionType: "album",
    thumbnailHref:
      "https://m.media-amazon.com/images/I/71cHQs6MslL._AC_UY436_FMwebp_QL65_.jpg",
    musicName: "iridescence",
    musicArtist: ["BROCKHAMPTON"],
    recordingStyle: ["studio"],
    musicTags: ["pop", "hip-hop"],
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
    itemId: 16,
    itemType: "source",
    sourceType: "collection",
    collectionType: "ep",
    thumbnailHref:
      "https://m.media-amazon.com/images/I/51NdilLHVTL._UX500_FMwebp_QL85_.jpg",
    musicName: "Beyond Serious",
    musicArtist: ["Bibio"],
    recordingStyle: ["studio"],
    musicTags: ["electronic", "funk"],
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
    itemId: 17,
    itemType: "source",
    sourceType: "collection",
    collectionType: "album",
    thumbnailHref:
      "https://m.media-amazon.com/images/I/51h7dDC5oGL._AC_UL640_FMwebp_QL65_.jpg",
    musicName: "Surrounded",
    musicArtist: ["Tipper"],
    recordingStyle: ["studio"],
    musicTags: ["interdimensional", "hip-hop"],
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
    itemId: 18,
    itemType: "source",
    sourceType: "collection",
    collectionType: "album",
    thumbnailHref:
      "https://m.media-amazon.com/images/I/61zjF4Ft7tL._AC_UY436_FMwebp_QL65_.jpg",
    musicName: "OOFIE",
    musicArtist: ["Wiki"],
    recordingStyle: ["studio"],
    musicTags: ["hip-hop", "rap"],
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
    itemId: 19,
    itemType: "source",
    sourceType: "collection",
    collectionType: "album",
    thumbnailHref:
      "https://m.media-amazon.com/images/I/61V9YTk78EL._AC_UY436_FMwebp_QL65_.jpg",
    musicName: "Entroducing",
    musicArtist: ["DJ Shadow"],
    recordingStyle: ["studio"],
    musicTags: ["electronic", "hip-hop"],
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
    itemId: 20,
    itemType: "source",
    sourceType: "collection",
    collectionType: "album",
    thumbnailHref:
      "https://i.pinimg.com/736x/1c/f5/1c/1cf51c9f6658424cafaf0cd2a9079865.jpg",
    musicName: "The Love Below",
    musicArtist: ["Andre 3000", "Outkast"],
    recordingStyle: ["studio"],
    musicTags: ["love", "rap", "hip-hop"],
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
    itemId: 21,
    itemType: "source",
    sourceType: "collection",
    collectionType: "album",
    thumbnailHref:
      "https://m.media-amazon.com/images/I/71LCBA0rOHL._AC_UY436_FMwebp_QL65_.jpg",
    musicName: "Los Angeles",
    musicArtist: ["Flying Lotus"],
    recordingStyle: ["studio"],
    musicTags: ["primal", "electronic", "beats"],
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
    itemId: 22,
    itemType: "source",
    sourceType: "collection",
    collectionType: "album",
    thumbnailHref:
      "https://m.media-amazon.com/images/I/71bsHTr6idL._AC_UY436_FMwebp_QL65_.jpg",
    musicName: "Discovery",
    musicArtist: ["Daft Punk"],
    recordingStyle: ["studio"],
    musicTags: ["house", "electronic"],
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
    itemId: 23,
    itemType: "source",
    sourceType: "collection",
    collectionType: "album",
    thumbnailHref:
      "https://m.media-amazon.com/images/I/71lpRjtW+YL._AC_UY436_FMwebp_QL65_.jpg",
    musicName: "Con Todo El Mundo",
    musicArtist: ["Khruangbin"],
    recordingStyle: ["studio"],
    musicTags: ["style", "groove", "funk"],
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
    itemId: 24,
    itemType: "source",
    sourceType: "collection",
    collectionType: "album",
    thumbnailHref:
      "https://m.media-amazon.com/images/I/81D9t2wdqiL._AC_UY436_FMwebp_QL65_.jpg",
    musicName: "Speaking in Tongues",
    musicArtist: ["Talking Heads"],
    recordingStyle: ["studio"],
    musicTags: ["pop"],
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
];
