/*
 * @Author: fatetoper
 * @Date: 2020-07-18 11:10:49
 * @LastEditors: fatetoper
 * @LastEditTime: 2020-07-19 10:58:18
 * @Modultype: Component
 * @Usage: import/global/prototype
 * @Description: Do not edit
 * @FilePath: \ant\src\components\Uploader\vc-upload\src\attr-accept.js
 */
function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

export default (file, acceptedFiles) => {
  if (file && acceptedFiles) {
    const acceptedFilesArray = Array.isArray(acceptedFiles)
      ? acceptedFiles
      : acceptedFiles.split(',');
    const fileName = file.name || '';
    const mimeType = file.type || '';
    const baseMimeType = mimeType.replace(/\/.*$/, '');

    return acceptedFilesArray.some(type => {
      const validType = type.trim();
      if (validType.charAt(0) === '.') {
        return endsWith(fileName.toLowerCase(), validType.toLowerCase());
      } else if (/\/\*$/.test(validType)) {
        // This is something like a image/* mime type
        return baseMimeType === validType.replace(/\/.*$/, '');
      }
      return mimeType === validType;
    });
  }
  return true;
};
