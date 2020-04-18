function router() {
  let routes = {};

  function get(path, callback) {
    routes[path] = callback;
  }

  function navigate(url) {
    const parsedUrl = new URL(url);
    const callback = routes[parsedUrl.pathname] || routes.default;
    window.history.pushState(null, null, parsedUrl.href);
    callback(parsedUrl);
  }

  function handleClick(event) {
    if (
      "external" in event.target.dataset ||
      event.button !== 0 ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey ||
      event.ctrlKey
    )
      return;
    if (event.target.tagName === "A") {
      event.preventDefault();
      navigate(event.target.href);
    }
  }

  function handlePop() {
    navigate(window.location);
  }

  function listen() {
    window.addEventListener("click", handleClick);
    window.addEventListener("popstate", handlePop);
    navigate(window.location);
  }

  function close() {
    window.removeEventListener("click", handleClick);
    window.removeEventListener("popstate", handlePop);
  }

  return { get, listen, close };
}

export default router;