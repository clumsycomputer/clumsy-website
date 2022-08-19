export type MusicItemData = ClippedMusicItemData | WholeMusicItemData;

interface ClippedMusicItemData
  extends MusicItemBase<"clip">,
    Pick<SongMusicItemData | MixMusicItemData, "sourceType"> {}

type WholeMusicItemData =
  | SongMusicItemData
  | CollectionMusicItemData
  | MixMusicItemData;

interface SongMusicItemData extends SourceMusicItemBase<"song"> {}

type CollectionMusicItemData =
  | SingleMusicItemData
  | EpMusicItemData
  | AlbumMusicItemData
  | CompilationMusicItemData
  | SoundtrackMusicItemData;

interface SingleMusicItemData extends CollectionMusicItemBase<"single"> {}

interface EpMusicItemData extends CollectionMusicItemBase<"ep"> {}

interface AlbumMusicItemData extends CollectionMusicItemBase<"album"> {}

interface CompilationMusicItemData
  extends CollectionMusicItemBase<"compilation"> {}

interface SoundtrackMusicItemData
  extends CollectionMusicItemBase<"soundtrack"> {}

interface CollectionMusicItemBase<CollectionType extends string>
  extends SourceMusicItemBase<"collection"> {
  collectionType: CollectionType;
}

interface MixMusicItemData extends SourceMusicItemBase<"mix"> {}

interface SourceMusicItemBase<SourceType extends string>
  extends MusicItemBase<"source"> {
  sourceType: SourceType;
}

interface MusicItemBase<
  ItemType extends string,
  RecordingStyle = "studio" | "live" | "concert",
  ExternalLink = {
    linkLabel: string;
    linkHref: string;
  }
> {
  itemId: number;
  itemType: ItemType;
  thumbnailHref: string;
  musicName: string;
  musicYear: number;
  musicArtist: Array<string>;
  musicTags: Array<string>;
  recordingStyle: Array<RecordingStyle>;
  externalLinks: [ExternalLink, ...Array<ExternalLink>];
}
