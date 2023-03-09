import axios from "axios";

const config ={
    url: "/notifications"
}

export const getNotifications = () => {
    return axios.get(config.url)
        .then(res => res.data)
        .catch(err => console.log(err));
}