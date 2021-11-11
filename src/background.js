function redirect(requestDetails) {
  const paramPos = requestDetails.url.indexOf("?");
  const url =
    paramPos == -1 ? requestDetails.url : requestDetails.url.substring(0, paramPos);
  const protocol = url.substring(0, url.indexOf("/") - 1);
  const filename = url.substring(url.lastIndexOf("/") + 1);

  return {
    redirectUrl: `${protocol}://i.redd.it/${filename}`,
  };
}

chrome.webRequest.onBeforeRequest.addListener(
  redirect,
  // This should ensure that the redirect function only runs when a request to
  // Reddit's preview domain is sent for a main frame (i.e. as a top-level
  // document loaded into a tab). This way we avoid interfering with the
  // functionality of Reddit by rewriting its requests.
  { urls: ["*://preview.redd.it/*"], types: ["main_frame"] },
  // Make the listener synchronous and thereby allow requests to be modified.
  ["blocking"],
);
