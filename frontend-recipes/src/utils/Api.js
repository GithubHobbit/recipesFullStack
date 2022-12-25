export async function client(url, { body, method, headers }) {
  const config = {
    method,
    headers: {
      ...headers,
    },
  };

  url = process.env.REACT_APP_API_URL + url;
  if (method === 'GET') {
    if (body) {
      url = new URL(url);
      Object.keys(body)
        .forEach(key => 
          url.searchParams.append(key, body[key]))
    }
  }
  else if (body) {
    body instanceof FormData || (body = JSON.stringify(body));
    config.body = body;
  }
  console.log(url);
  const res = await fetch(url, config);
  const data = await res.json();

  if (!res.ok) {
    throw Error(data.message);
  }

  return {
    status: res.status,
    data,
    headers: res.headers,
    url: res.url,
  };
}

client.get = function (url, body = {}, headers = {}) {
  headers["Content-Type"] = "application/json";
  return client(url, { body, method: "GET", headers });
};

client.post = function (url, body, headers = {}) {
  headers["Content-Type"] = "application/json";
  return client(url, { body, method: "POST", headers });
};

client.formData = function (url, body, headers = {}) {
  return client(url, { body, method: "POST", headers });
};
