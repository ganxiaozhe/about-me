import { j as json } from "../../../../chunks/index.js";
async function GET({ url }) {
  const name = url.searchParams.get("name");
  if (!name) {
    return json(await getDaily());
  }
  return json(await search(name));
}
async function getDaily() {
  const resp = await fetch("https://ys.110t.cn/api/ajax.php?act=yingshilist");
  return await resp.json();
}
async function search(name) {
  const url = new URL("https://ys.110t.cn/api/ajax.php");
  url.searchParams.append("act", "search");
  url.searchParams.append("name", name);
  const resp = await fetch(url);
  return await resp.json();
}
export {
  GET
};
