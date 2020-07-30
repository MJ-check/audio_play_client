import { api_upload_list_image } from "../apiConfig";

function apiUploadListImage(form_data, callBack) {
  fetch(api_upload_list_image, {
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

export default apiUploadListImage;