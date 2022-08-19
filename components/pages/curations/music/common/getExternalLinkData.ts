export interface GetYoutubeLinkDataApi {
  youtubeHref: string;
}

export function getYoutubeLinkData(api: GetYoutubeLinkDataApi) {
  const { youtubeHref } = api;
  return {
    linkHref: youtubeHref,
    linkLabel: "youtube",
  };
}

export interface GetSpotifyLinkDataApi {
  spotifyHref: string;
}

export function getSpotifyLinkData(api: GetSpotifyLinkDataApi) {
  const { spotifyHref } = api;
  return {
    linkLabel: "spotify",
    linkHref: spotifyHref,
  };
}

export interface GetAppleLinkDataApi {
  appleHref: string;
}

export function getAppleLinkData(api: GetAppleLinkDataApi) {
  const { appleHref } = api;
  return {
    linkLabel: "apple",
    linkHref: appleHref,
  };
}
