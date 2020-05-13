import http from "./httpService";
import { apiUrl } from "../config.json";

function getImages() {
  return http.get(apiUrl + "/api/images");
}

export { getImages };
