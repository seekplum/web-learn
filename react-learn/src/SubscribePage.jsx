/** @format */

import React from "react";
import { Fetch } from "react-subscribe";

function SomeComponent({ data, loading, error, reload, statusCode }) {
  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return (
      <div>
        Error: {error.message}{" "}
        <a href="#" onClick={reload}>
          Reload
        </a>
      </div>
    );
  }
  return (
    <div>
      <p>Status Code: {statusCode}</p>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}

const FETCH_OPTION = {
  method: "POST",
  headers: {
    "X-AccessToken": "some_token",
  },
  credentials: "include", // Default credentials is 'same-origin' in `Fetch`
};

export default function SomePage(props) {
  return (
    <div>
      <Fetch url={`http://httpbin.org/get`} type="json" option={FETCH_OPTION}>
        <SomeComponent />
      </Fetch>
    </div>
  );
}
