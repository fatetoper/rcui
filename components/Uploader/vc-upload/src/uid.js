/*
 * @Author: fatetoper
 * @Date: 2020-07-18 11:10:49
 * @LastEditors: fatetoper
 * @LastEditTime: 2020-07-19 10:58:57
 * @Modultype: Component
 * @Usage: import/global/prototype
 * @Description: Do not edit
 * @FilePath: \ant\src\components\Uploader\vc-upload\src\uid.js
 */
const now = +new Date();
let index = 0;

export default function uid() {
  return `vc-upload-${now}-${++index}`;
}
