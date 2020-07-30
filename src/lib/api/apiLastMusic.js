import { api_last_music } from "../apiConfig";

function apiLastMusic(callBack) {
  fetch(api_last_music, {
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

export default apiLastMusic;