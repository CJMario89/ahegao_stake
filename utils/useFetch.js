const useFetch = ({ url, body }) => {
  return {
    post: fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    }),
    get: fetch(url, {
      method: "GET",
    }),
  };
};
