  
import axios from "axios";


const baseURL =
  process.env.NODE_ENV === "production"
    ? "/api/v1/user"
    : "http://localhost:3006/api/v1/user";

export default axios.create({
  baseURL,
});
