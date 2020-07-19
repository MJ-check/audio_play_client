const api_all_music = "/api/all_music";
const api_last_music = "/api/last_music";
const api_music = (music_id) => { return "/api/music?id=" + music_id; };
const api_upload_music = "/api/upload_music";
const api_collect_list = "/api/collect_list";
const api_list = "/api/list";
const api_new_list = "/api/new_list";
const api_status = (music_id) => { return "/api/status?id=" + music_id; };
const api_add = "/api/add";
const api_remove = "/api/remove";
const api_update_music_image = "/api/update_music_image";
const api_update_list_image = "/api/update_list_image";

const music_file_url = "/public/music";
const music_image_url = "/public/image";
const list_image_url = "/public/list";

export {
  api_all_music,
  api_last_music,
  api_music,
  api_upload_music,
  api_collect_list,
  api_list,
  api_new_list,
  api_status,
  api_add,
  api_remove,
  api_update_music_image,
  api_update_list_image,
  music_file_url,
  music_image_url,
  list_image_url,
}