import { api_update_list_msg } from "../apiConfig";

function apiUpdateListMsg(list_id, list_new_msg, callBack) {
  fetch(api_update_list_msg, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      list_id: list_id,
      list_new_msg: list_new_msg
    })
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

export default apiUpdateListMsg;