import { json } from '@sveltejs/kit';

export async function GET({ url }) {
  const name = url.searchParams.get('name');
  if(!name){
    return json(await getDaily());
  }

	return json(await search(name));
}


async function getDaily() {
  const resp = await fetch('https://ys.110t.cn/api/ajax.php?act=Daily');
  return await resp.json();
}

// yingshilist
async function search(name:string) {
  let url = new URL('https://ys.110t.cn/api/ajax.php');
  url.searchParams.append('act', 'search');
  url.searchParams.append('name', name);

  const resp = await fetch(url);
  return await resp.json();
}