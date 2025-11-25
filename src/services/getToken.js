import fs from "fs/promises";

const CLIENT_ID = "";
const CLIENT_SECRET = "";

async function fetchToken() {
  const res = await fetch(`https://accounts.spotify.com/api/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
  });

  return res.json();
}

async function saveToken() {
  const tokenData = await fetchToken();

  await fs.writeFile(
    "token.json",
    JSON.stringify(tokenData, null, 2), // null,2 = formato legible
    "utf8",
  );
}

saveToken();

export default saveToken;
