const api_all_music = "/api/all_music";
const api_last_music = "/api/last_music";
const api_music = (music_id) => { return "/api/music?id=" + music_id; };
const api_upload_music = "/api/upload_music";
const api_upload_music_image = "/api/upload_music_image";
const api_collect_list = "/api/collect_list";
const api_list = (list_id) => { return "/api/list?id=" + list_id; };
const api_status = (music_id) => { return "/api/status?id=" + music_id; };
const api_add = "/api/add";
const api_remove = "/api/remove";
const api_new_list = "/api/new_list";
const api_upload_list_image = "/api/upload_list_image";
const api_update_list_msg = "/api/update_list_msg";

const music_file_url = "/public/music";
const music_image_url = "/public/image";
const list_image_url = "/public/list";

export {
  api_all_music,
  api_last_music,
  api_music,
  api_upload_music,
  api_upload_music_image,
  api_collect_list,
  api_list,
  api_new_list,
  api_status,
  api_add,
  api_remove,
  api_upload_list_image,
  api_update_list_msg,
  music_file_url,
  music_image_url,
  list_image_url,
}