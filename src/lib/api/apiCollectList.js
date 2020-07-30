import { api_collect_list } from "../apiConfig";

function apiCollectList(callBack) {
  fetch(api_collect_list, {
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

export default apiCollectList;