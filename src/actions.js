export const FILETEXT = 'FILETEXT';

export function receiveFileText(f) {
  return {

    type: FILETEXT,

    fileText: f,

  };
}
