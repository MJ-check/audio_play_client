import { api_upload_music } from "../apiConfig";

function apiUploadMusic(form_data, callBack) {
  if (!form_data || form_data.getAll("music_file").length !== 1) {
    callBack(null);
    return ;
  }
  fetch(api_upload_music, {
    method: "POST",
    body: form_data
  })
  .then(res => res.json())
  .then(res => {
    if (res.code === 100 && res.status === "success") {
      callBack(res.code);
    } else {
      console.error(res);
      callBack(null);
    }
  })
  .catch(err => {
    console.error(err);
    callBack(null);
  })
}

export default apiUploadMusic;