import { api_list } from "../apiConfig";

function apiList(list_id, callBack) {
  if (!list_id) {
    callBack(null);
    return ;
  }
  fetch(api_list(list_id), {
    method: "GET",
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

export default apiList;