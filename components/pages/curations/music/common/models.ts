export type MusicItem = ClippedMusicItem | WholeMusicItem;

interface ClippedMusicItem
  extends MusicItemBase<"clip">,
    Pick<SongMusicItem | MixMusicItem, "sourceType"> {}

type WholeMusicItem = SongMusicItem | CollectionMusicItem | MixMusicItem;

interface SongMusicItem extends SourceMusicItemBase<"song"> {}

type CollectionMusicItem =
  | SingleMusicItem
  | EpMusicItem
  | AlbumMusicItem
  | CompilationMusicItem
  | SoundtrackMusicItem;

interface SingleMusicItem extends CollectionMusicItemBase<"single"> {}

interface EpMusicItem extends CollectionMusicItemBase<"ep"> {}

interface AlbumMusicItem extends CollectionMusicItemBase<"album"> {}

interface CompilationMusicItem extends CollectionMusicItemBase<"compilation"> {}

interface SoundtrackMusicItem extends CollectionMusicItemBase<"soundtrack"> {}

interface CollectionMusicItemBase<CollectionType extends string>
  extends SourceMusicItemBase<"collection"> {
  collectionType: CollectionType;
}

interface MixMusicItem extends SourceMusicItemBase<"mix"> {}

interface SourceMusicItemBase<SourceType extends string>
  extends MusicItemBase<"source"> {
  sourceType: SourceType;
}

interface MusicItemBase<
  ItemType extends string,
  RecordingStyle = "studio" | "live" | "concert"
> {
  itemId: number;
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
