import axios from 'axios'
const apiUrl = 'http://3298';//测试域名，自己改成自己的
// const apiUrl = 'http://xxoo';//线上域名，自己改成自己的
const get = (params) => {axios.get('http://localhost:6080/arcgis/rest/services/GSM/MapServer', {params})}
const post = (params) => {axios.post('', params)}

export default {
  get,
  post
}
