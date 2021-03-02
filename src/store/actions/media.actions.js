import Media from "../services/Media/media";

export const getMedia = () => {
  return Media.getMedia()
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      console.log(e.response.data);
      return e.response.data;
    });
};

export const addMedia = (body) => {
  return Media.addMedia(body)
    .then((response) => {
      console.log("the response after adding media", response)
      return response.data;
    })
    .catch((e) => {
      console.log(e);
      return e
    });
};
