export interface MusicCurationsPageState {
  pageIndex: number;
  sortOrder:
    | "titleAscending"
    | "titleDescending"
    | "artistAscending"
    | "artistDescending"
    | "yearAscending"
    | "yearDescending";
  searchQuery: string;
}

export type MusicItem = ClippedMusicItem | WholeMusicItem;

interface ClippedMusicItem
  extends MusicItemBase<"clip">,
    Pick<SongMusicItem | MixMusicItem, "sourceType"> {}

type WholeMusicItem = SongMusicItem | CollectionMusicItem | MixMusicItem;

interface SongMusicItem extends SourceMusicItemBase<"track"> {}

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

interface MusicItemBase<MusicItemType extends string> {
  musicId: number;
  musicType: MusicItemType;
  musicThumbnailHref: string;
  musicTitle: string;
  musicYear: string;
  musicArtist: ArrayOfAtLeastOne<string>;
  musicStyles: ArrayOfAtLeastOne<string>;
  recordingContext: ArrayOfAtLeastOne<"studio" | "live" | "concert">;
  externalLinks: ArrayOfAtLeastOne<{
    linkLabel: string;
    linkHref: string;
  }>;
}

type ArrayOfAtLeastOne<T> = [T, ...Array<T>];
