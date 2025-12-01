import { json } from '@sveltejs/kit';

export async function GET({ url }) {
  const name = url.searchParams.get('name');
  if(!name){
    return json(await getDaily());
  }

	return json(await search(name));
}


async function getDaily() {
  const resp = await fetch('https://pan.sharehub.club/api/search?page_no=1&page_size=50');
  return await resp.json();
}

async function search(name:string) {
  const url = new URL('https://pan.sharehub.club/api/search');
  url.searchParams.append('page_no', '1');
  url.searchParams.append('page_size', '50');
  url.searchParams.append('title', name);

  const resp = await fetch(url);
  return await resp.json();
}