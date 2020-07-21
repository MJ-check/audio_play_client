import { api_all_music } from "../apiConfig";

function apiAllMusic(callBack) {
  fetch(api_all_music, {
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

export default apiAllMusic;