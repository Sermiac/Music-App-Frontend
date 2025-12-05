const api_url = import.meta.env.VITE_API_URL;

async function loadBackEnd(mode, search) {
  if (mode == "topTracks") {
    const res = await fetch(`${api_url}/backend/new-releases`);
    let globalTopTracks = await res.json();
    return globalTopTracks;
  }

  if (mode == "searchTracks" && search) {
    const res = await fetch(
      `${api_url}/backend/search-tracks?search=${search}`,
    );
    let searchTracks = await res.json();
    return searchTracks;
  }

  if (mode == "basicLogin") {
    const res = await fetch(`${api_url}/backend/basic-login`);
    let loginData = await res.json();
    return loginData;
  }

  if (mode == "userTop") {
    const res = await fetch(`${api_url}/backend/user-top-tracks`);
    let userTop = await res.json();
    return userTop;
  }
}

export async function fetchTracks() {
  const data = await loadBackEnd("topTracks");
  return data.map((album) => ({
    id: album.id,
    title: album.name,
    url: album.images[0]?.url,
    release_date: album.release_date,
    artist: album.artists[0]?.name,
    track: album.external_urls?.spotify,
  }));
}

export async function searchTracks(search) {
  const data = await loadBackEnd("searchTracks", search);
  return data.map((album) => ({
    id: album.id,
    title: album.name,
    url: album.images[0]?.url,
    release_date: album.release_date,
    artist: album.artists[0]?.name,
    track: album.external_urls?.spotify,
  }));
}

export async function redirectLogin() {
  window.location.href = `${api_url}/backend/login`;
}

export async function basicLogin() {
  const data = await loadBackEnd("basicLogin");
  return data;
}

export async function fetchUserTopTracks() {
  const data = await loadBackEnd("userTop");
  return data.items.map((item) => ({
    id: item.id,
    title: item.name,
    url: item.album.images[0]?.url,
    release_date: item.album.release_date,
    artist: item.album.artists[0]?.name,
    track: item.album.external_urls?.spotify,
  }));
}
