/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const post = await import(`./content.md`);
  
  return {
    content: post.default,
    meta: post.metadata
  };
}