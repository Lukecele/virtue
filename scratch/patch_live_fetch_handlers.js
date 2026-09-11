const fs = require('fs');
const ROUTE = '/home/luca/Scrivania/virtue/app/api/absolution/route.ts';
let src = fs.readFileSync(ROUTE, 'utf8');

const contractAddress = "0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777";
const launchpadUrl = `https://flap.sh/token/${contractAddress}`;
const claimUrl = `https://flap.sh/bnb/${contractAddress}/taxinfo?lang=en`;

const liveHelpers = `
// ── LIVE WEB & SOCIAL FETCHING HELPERS ──────────────────────────────────────
async function fetchTweetDetails(tweetUrl: string): Promise<{ reply: string; penance: string } | null> {
  try {
    const oembedUrl = \`https://publish.twitter.com/oembed?url=\${encodeURIComponent(tweetUrl)}\`;
    const res = await fetch(oembedUrl, { signal: AbortSignal.timeout(4000) });
    if (!res.ok) return null;
    const data = await res.json();
    const author = data.author_name || "X User";
    const cleanText = (data.html || "")
      .replace(/<blockquote[^>]*>/i, "")
      .replace(/<\/blockquote>/i, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\\s+/g, " ")
      .trim();

    if (/forgiveness|virtue/i.test(cleanText)) {
      return {
        reply: \`📜 Live X Inspection: Tweet by \${author}: "\${cleanText}". This is central to the lore of $VIRTUE! 'Forgiveness is a virtue!' 🙏. In a market full of FUD, we hold spot and collect 3% BNB dividends.\`,
        penance: "Share the genesis tweet lore on X."
      };
    }

    return {
      reply: \`📜 Live X Inspection: Tweet by \${author}: "\${cleanText}". The High Priest has reviewed this post. While the timeline discusses this news, $VIRTUE continues to distribute 3% BNB dividends on-chain. Hold spot and stay SAFU! 🛡️\`,
      penance: "Stay SAFU and hold spot $VIRTUE."
    };
  } catch (err) {
    return null;
  }
}

async function fetchWebPageDetails(url: string): Promise<{ reply: string; penance: string } | null> {
  try {
    if (/flap\\.sh/i.test(url)) {
      return {
        reply: \`🌐 Official Flap.sh Page: \${url}. Verified $VIRTUE token page on BNB Chain. 100% fair launch, locked liquidity, 3% BNB dividends, single dev wallet ($40-$60 buy).\`,
        penance: "Verify liquidity lock on Flap.sh."
      };
    }

    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
      signal: AbortSignal.timeout(4000)
    });
    if (!res.ok) return null;
    const html = await res.text();
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\\/title>/i);
    const title = titleMatch ? titleMatch[1].replace(/\\s+/g, " ").trim() : "Web Page";

    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i) ||
                      html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["']/i) ||
                      html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i);
    const desc = descMatch ? descMatch[1].replace(/\\s+/g, " ").trim() : "";

    const summary = desc ? \`Title: "\${title}". Summary: "\${desc.substring(0, 180)}..."\` : \`Title: "\${title}"\`;

    return {
      reply: \`🌐 Live Web Inspection (\${url}): \${summary}. The High Priest has analyzed this link. Whatever market sentiment this page reports, remember that $VIRTUE's on-chain 3% BNB rewards accrue uninterrupted. Hold spot and stay SAFU! 🛡️\`,
      penance: "Verify on-chain contract data on BscScan."
    };
  } catch (err) {
    return null;
  }
}

async function fetchLiveCryptoPrice(symbol: string): Promise<{ reply: string; penance: string } | null> {
  try {
    const pair = symbol.toUpperCase() + "USDT";
    const res = await fetch(\`https://api.binance.com/api/v3/ticker/price?symbol=\${pair}\`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) return null;
    const data = await res.json();
    const rawPrice = parseFloat(data.price);
    const formattedPrice = rawPrice > 1 ? rawPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : rawPrice.toString();

    return {
      reply: \`📊 Live Market Feed: \${symbol.toUpperCase()} is currently trading at $\${formattedPrice} USDT on Binance. To check live prices and charts for $VIRTUE, visit our official Flap.sh page: \${launchpadUrl}. Remember: \${symbol.toUpperCase()} doesn't pay 3% BNB dividends to your wallet on every trade, but $VIRTUE does!\`,
      penance: "Hold spot $VIRTUE and collect continuous BNB dividends."
    };
  } catch (err) {
    return null;
  }
}
`;

src = src.replace('export function runElizaPriest', liveHelpers + '\nexport function runElizaPriest');

// Replace POST function to integrate live fetchers
const oldPost = `export async function POST(request: Request) {
  try {
    const { messages } = await request.json();
    const history = Array.isArray(messages) ? messages : [];
    const userMessages = history.filter((m: any) => m.role === "user");
    const latestUserConfession = userMessages[userMessages.length - 1]?.content || "";
    const result = runElizaPriest(latestUserConfession, history);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in NLP route:", error);
    return NextResponse.json({
      reply: "The High Priest is currently meditating in the blocks. Speak again, my child. 🙏",
      penance: "Wait a moment and try again."
    });
  }
}`;

const newPost = `export async function POST(request: Request) {
  try {
    const { messages } = await request.json();
    const history = Array.isArray(messages) ? messages : [];
    const userMessages = history.filter((m: any) => m.role === "user");
    const latestUserConfession = userMessages[userMessages.length - 1]?.content || "";
    const clean = latestUserConfession.trim().toLowerCase();

    // 1. Live X / Twitter URL Inspection
    const xUrlMatch = latestUserConfession.match(/(https?:\\/\\/(x|twitter)\\.com\\/[^\\s]+)/i);
    if (xUrlMatch) {
      const liveTweetResult = await fetchTweetDetails(xUrlMatch[1]);
      if (liveTweetResult) return NextResponse.json(liveTweetResult);
    }

    // 2. Live Web URL Inspection
    const webUrlMatch = latestUserConfession.match(/(https?:\\/\\/[^\\s]+)/i);
    if (webUrlMatch) {
      const liveWebResult = await fetchWebPageDetails(webUrlMatch[1]);
      if (liveWebResult) return NextResponse.json(liveWebResult);
    }

    // 3. Live Crypto Price Feed (Binance API)
    const cryptoPriceMatch = clean.match(/\\b(btc|bitcoin|eth|ethereum|sol|solana|doge|dogecoin|xrp|ada)\\s+(price|chart|market|cost|quote)\\b|\\b(price|chart|cost)\\s+of\\s+(btc|bitcoin|eth|ethereum|sol|solana|doge|dogecoin|xrp|ada)\\b/i);
    if (cryptoPriceMatch) {
      const rawSym = (cryptoPriceMatch[1] || cryptoPriceMatch[4] || "").toLowerCase();
      const sym = rawSym.replace("bitcoin", "btc").replace("ethereum", "eth").replace("solana", "sol").replace("dogecoin", "doge");
      if (sym) {
        const livePriceResult = await fetchLiveCryptoPrice(sym);
        if (livePriceResult) return NextResponse.json(livePriceResult);
      }
    }

    const result = runElizaPriest(latestUserConfession, history);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in NLP route:", error);
    return NextResponse.json({
      reply: "The High Priest is currently meditating in the blocks. Speak again, my child. 🙏",
      penance: "Wait a moment and try again."
    });
  }
}`;

src = src.replace(oldPost, newPost);

fs.writeFileSync(ROUTE, src, 'utf8');
console.log('✅ Live Web, X/Twitter Tweet oEmbed & Binance Price Fetcher integrated successfully into route.ts!');
