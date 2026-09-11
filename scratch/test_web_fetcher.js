async function testWebFetch() {
  try {
    const res = await fetch("https://bscscan.com/token/0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777", {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" }
    });
    const html = await res.text();
    const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
    console.log("TITLE:", titleMatch ? titleMatch[1].trim() : "N/A");
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

testWebFetch();
