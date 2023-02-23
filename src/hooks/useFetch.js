import { useState, useEffect } from "react";

//4-Custom hook
export const useFetch = (url) => {
  const [data, setData] = useState(null);
  //refatorando POST
  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [itemId, setItemID] = useState(null);
  const httpConfig = (data, method) => {
    if (method === "POST") {
      setConfig({
        method,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setMethod(method);
    } else if (method === "DELETE") {
      setConfig({
        method,
        headers: {
          "Content-type": "application/json",
        },
      });
      setMethod(method);
      setItemID(data);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      //LOADING
      setLoading(true);
      try {
        const res = await fetch(url);
        const json = await res.json();
        setData(json);
      } catch (erro) {
        setError("Houve algum erro ao carregar os dados!");
      }
      setLoading(false);
    };
    fetchData();
  }, [url, callFetch]);
  //5- Refatorando post
  useEffect(() => {
    const httpRequest = async () => {
      let json;
      if (method === "POST") {
        let fetchOptions = [url, config];

        const res = await fetch(...fetchOptions);
        json = await res.json();
        setCallFetch(json);
      } else if (method === "DELETE") {
        const deleteURL = `${url}/${itemId}`;
        const res = await fetch(deleteURL, config);
        json = await res.json();
      }
      setCallFetch(json);
    };
    httpRequest();
  }, [config, method, url, itemId]);
  return { data, httpConfig, loading, error };
};
