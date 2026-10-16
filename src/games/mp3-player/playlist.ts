export interface Song {
  /** Shown in the list: the file name without its ".mp3" extension. */
  name: string;
  /** Object URL for the file; revoke it once the song is gone. */
  url: string;
}

/** True for .mp3 files, ignoring anything in a sub-folder of a picked folder. */
function isMp3(file: File): boolean {
  // Hand-picked files have no relative path; a folder pick looks like "folder/name.mp3".
  const directlyInPickedFolder = file.webkitRelativePath.split("/").length <= 2;
  return directlyInPickedFolder && file.name.toLowerCase().endsWith(".mp3");
}

/** Turns picked files, whether a whole folder or a hand-picked selection, into songs ordered by name. */
export function toSongs(files: File[]): Song[] {
  return files
    .filter(isMp3)
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((file) => ({ name: file.name.replace(/\.mp3$/i, ""), url: URL.createObjectURL(file) }));
}

/** Frees the browser memory held by a set of songs. */
export function releaseSongs(songs: Song[]): void {
  songs.forEach((song) => URL.revokeObjectURL(song.url));
}
