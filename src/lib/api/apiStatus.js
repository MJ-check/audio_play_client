import { api_status } from "../apiConfig";

function apiStatus(music_id, callBack) {
  fetch(api_status(music_id), {
    method: "GET"
  })
  .then(res => res.json())
  .then(res => {
    if (res.code === 100 && res.status === "success") {
      callBack(res.data);
    } else {
      console.error(res);
      callBack(null);
    }
  })
  .catch(err => {
    console.error(err);
    callBack(null);
  });
}

export default apiStatus;