/**
 * translate zone
 */
import { translate } from 'bing-translate-api';
/**
 * translate content from from's language to to's language
 * @param {*} content 
 * @param {*} from 
 * @param {*} to 
 */
function vtranslate(content, from, to) {
  return new Promise(function(resolve,reject) {
    translate(content, from, to, true).then(res => {
      //console.log(res.translation);
      let result = res.translation;
      resolve(result);
    }).catch(err => {
      //console.error(err);
      reject(err);
    });
  });
}
//vtranslate('we are you', null, 'en');
export default vtranslate;