const api_url = import.meta.env.VITE_API_URL;

async function loadBackEnd(mode, search) {
  let globalTopTracks = null;
  let searchTracks = null;

  if (mode == "topTracks") {
    const res = await fetch(`${api_url}/backend/new-releases`);
    globalTopTracks = await res.json();
    return globalTopTracks;
  }

  if (mode == "searchTracks" && search) {
    const res = await fetch(
      `${api_url}/backend/search-tracks?search=${search}`,
    );
    searchTracks = await res.json();
    return searchTracks;
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
