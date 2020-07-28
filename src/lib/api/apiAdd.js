import { api_add } from "../apiConfig";

function apiAdd(music_id, list_id, callBack) {
  fetch(api_add, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      music_id: music_id,
      list_id: list_id,
    }),
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
  });
}

export default apiAdd;