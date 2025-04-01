async function load({ params, url }) {
  let mode = "web";
  if (url.searchParams.has("pdf")) {
    mode = "pdf";
  }
  return {
    mode
  };
}
export {
  load
};
