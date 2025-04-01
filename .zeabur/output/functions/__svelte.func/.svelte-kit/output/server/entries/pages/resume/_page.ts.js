async function load({ params, url }) {
  let mode = "web";
  if (url.searchParams.has("pdf")) {
    mode = "pdf";
  }
  return {
    mode,
    phone: url.searchParams.get("phone"),
    language: url.searchParams.get("lang") || "chinese_simplified"
  };
}
export {
  load
};
