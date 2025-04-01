async function load() {
  const post = await import("../../../chunks/content.js");
  return {
    content: post.default,
    meta: post.metadata
  };
}
export {
  load
};
