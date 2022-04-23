/**
 * detect zone
 */
//import { franc } from 'franc';
const detect = require('franc');
const { builtinModules } = require('module');
/**
 * 
 * @param {the content to detect} content 
 */
function vdetect(content) {
    let lang = detect(content);
    //console.log(lang);
    return lang;
}
//console.log(detect('Instead change the require of index.js'));
//export default vdetect;
module.exports = {vdetect}
