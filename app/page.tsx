"use client";

import { useState, useEffect, useRef } from "react";

// Declare window.ethereum for TypeScript
declare global {
  interface Window {
    ethereum?: unknown;
  }
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  penance?: string;
}

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Web3 Connection State
  const [bnbPrice, setBnbPrice] = useState(600); // Default fallback, updated via API

  // Token Launch Info
  const contractAddress = "0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777";
  const launchpadUrl = `https://flap.sh/bnb/${contractAddress}`; 
  const totalMaxSupply = 1000000000; // 1 Billion

  // Fetch real-time BNB price from Binance API on mount
  useEffect(() => {
    const fetchBnbPrice = async () => {
      try {
        const response = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT");
        const data = await response.json();
        if (data && data.price) {
          setBnbPrice(parseFloat(data.price));
        }
      } catch (error) {
        console.error("Failed to fetch live BNB price:", error);
      }
    };

    fetchBnbPrice();
    const interval = setInterval(fetchBnbPrice, 60000);
    return () => clearInterval(interval);
  }, []);

  // Calculator State
  const [calcInputMode, setCalcInputMode] = useState<'tokens' | 'percent'>('tokens');
  const [holdingsTokens, setHoldingsTokens] = useState<number>(10000000); // Default: 10M tokens (1.0%)
  const [holdingsPercent, setHoldingsPercent] = useState<number>(1.0); // Default: 1.0%
  const [dailyVolumeUsd, setDailyVolumeUsd] = useState<number>(100000); // Default: $100,000 daily volume
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Minimum holding threshold = 10,000 $VIRTUE
  const minDividendTokens = 10000;

  // Sync token amount and percent
  const handleTokenChange = (tokens: number) => {
    const validTokens = Math.max(minDividendTokens, tokens);
    setHoldingsTokens(validTokens);
    setHoldingsPercent(parseFloat(((validTokens / totalMaxSupply) * 100).toFixed(4)));
  };

  const handlePercentChange = (pct: number) => {
    const minPct = (minDividendTokens / totalMaxSupply) * 100;
    const validPct = Math.max(minPct, pct);
    setHoldingsPercent(parseFloat(validPct.toFixed(4)));
    setHoldingsTokens(Math.round((validPct / 100) * totalMaxSupply));
  };

  // Convert volume USD to BNB using live Binance BNB price
  const dailyVolumeBnb = bnbPrice > 0 ? dailyVolumeUsd / bnbPrice : 0;

  const handleCopySummary = () => {
    const text = `$VIRTUE Reflection Projections:\n💰 Holdings: ${holdingsTokens.toLocaleString()} $VIRTUE (${holdingsPercent}% of supply)\n📊 Daily Volume: $${dailyVolumeUsd.toLocaleString()} USD (${dailyVolumeBnb.toFixed(1)} BNB)\n💵 Daily Rewards: +${dailyRewardsUserBnb.toFixed(4)} WBNB/BNB (~$${dailyRewardsUserUsd.toFixed(2)} USD)\n📈 Yearly Rewards: +${yearlyRewardsUserBnb.toFixed(2)} WBNB/BNB (~$${yearlyRewardsUserUsd.toFixed(0)} USD)\n⚡ Payout: Auto WBNB above $4 / Choice of WBNB or BNB on Flap Tax Info page\n🔗 Calculate yours: https://virtue-ecru.vercel.app/#calculator`;
    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  // Tokenomics parameters
  const dividendTaxRate = 0.03; // 3% buy/sell fee distributed 100% as BNB/WBNB reflections

  // Reflection Calculations
  const calculatedHoldingsTokens = holdingsTokens;
  const userPoolShare = holdingsTokens / totalMaxSupply;
  
  const dailyRewardsPoolUsd = dailyVolumeUsd * dividendTaxRate;
  const dailyRewardsUserUsd = userPoolShare * dailyRewardsPoolUsd;
  const dailyRewardsUserBnb = bnbPrice > 0 ? dailyRewardsUserUsd / bnbPrice : 0;

  const monthlyRewardsUserUsd = dailyRewardsUserUsd * 30;
  const monthlyRewardsUserBnb = bnbPrice > 0 ? monthlyRewardsUserUsd / bnbPrice : 0;

  const yearlyRewardsUserUsd = dailyRewardsUserUsd * 365;
  const yearlyRewardsUserBnb = bnbPrice > 0 ? yearlyRewardsUserUsd / bnbPrice : 0;

  // Conversational Chat Bot State
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Greetings, traveler. I am the High Priest of Virtue. What crypto sins or paper-hand regrets weigh heavy on your wallet today? Confess, and let the blocks cleanse you."
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Voluntary Custom Tweet Composer Modal State
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [customTweetText, setCustomTweetText] = useState(
    `Confessed my crypto journey at the $VIRTUE Forgiveness Booth! 🙏\n\n"Forgiveness is a virtue!" - @cz_binance\n\nContract: ${contractAddress}\nSwap on Flap: ${launchpadUrl}`
  );

  // Auto-scroll to bottom of chat window
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isTyping) return;

    const userText = chatInput.trim();
    setChatInput("");

    const updatedMessages = [...chatMessages, { role: "user" as const, content: userText }];
    setChatMessages(updatedMessages);
    setIsTyping(true);

    try {
      const response = await fetch("/api/absolution", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await response.json();

      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply,
          penance: data.penance,
        },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "The High Priest is meditating in the blocks. Speak again, my child. 🙏",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const sendDirectCommand = async (commandText: string) => {
    if (isTyping) return;
    const updatedMessages = [...chatMessages, { role: "user" as const, content: commandText }];
    setChatMessages(updatedMessages);
    setIsTyping(true);

    try {
      const response = await fetch("/api/absolution", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });
      const data = await response.json();
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply, penance: data.penance },
      ]);
    } catch (error) {
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: "The High Priest is meditating in the blocks. Speak again, my child. 🙏" },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const resetChat = () => {
    setChatInput("");
    setChatMessages([
      {
        role: "assistant",
        content: "Greetings, traveler. I am the High Priest of Virtue. What crypto sins or paper-hand regrets weigh heavy on your wallet today? Confess, and let the blocks cleanse you."
      }
    ]);
  };

  const openImproveModelTweet = () => {
    const tweetText = `Suggestion to improve $VIRTUE AI High Priest model: 💡\n\n[ Write your idea/suggestion here ]\n\nCA: ${contractAddress}\n\nBuy on Flap.sh: ${launchpadUrl}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`, "_blank");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Header/Navbar */}
      <header className="navbar">
        <div className="container nav-container">
          <div className="logo-group" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img 
              src="/virtue.jpg" 
              alt="Virtue Logo" 
              className="logo-icon" 
            />
            <span className="logo-text">Virtue</span>
          </div>
          
          <nav className="nav-links">
            <a href="#about" className="nav-link">About</a>
            <a href="#lore" className="nav-link">Lore</a>
            <a href="#tokenomics" className="nav-link">Tokenomics</a>
            <a href="#calculator" className="nav-link">Reflection Calc</a>
            <a href="#booth" className="nav-link">Forgiveness Booth</a>
          </nav>

          <div className="nav-actions-desktop" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <a 
              href={launchpadUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="nav-btn"
              id="nav-buy-btn"
            >
              Buy on Flap
            </a>
          </div>

          {/* Hamburger Menu Toggle (Mobile) */}
          <button 
            className="mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-nav-overlay">
          <nav className="mobile-nav-links">
            <a href="#about" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#lore" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Lore</a>
            <a href="#tokenomics" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Tokenomics</a>
            <a href="#calculator" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Reflection Calc</a>
            <a href="#booth" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Forgiveness Booth</a>
            
            <a 
              href={launchpadUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-primary"
              style={{ width: "100%", textAlign: "center", textDecoration: "none", color: "#000", fontWeight: "bold", marginTop: "10px" }}
              onClick={() => setMobileMenuOpen(false)}
              id="mobile-buy-btn"
            >
              Buy on Flap
            </a>
          </nav>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="hero-tagline-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ marginRight: "6px", verticalAlign: "middle" }}>
                <path d="M12 2L2 22h20L12 2z" fill="var(--accent-gold)" stroke="var(--accent-gold)"/>
              </svg>
              BNB CHAIN LIVE
            </div>
            <h1 className="hero-title">
              Forgiveness is a Virtue. <span className="text-glow-gold">Keep Building.</span>
            </h1>
            <p className="hero-description">
              Inspired by CZ’s iconic tweet, <strong>$VIRTUE</strong> is the ultimate community-driven token on BNB Chain. 
              In a space filled with FUD, betrayal, and paper hands, we stand for the rarest quality in crypto: the ability 
              to forgive, buy the dip, and keep building. We do not cancel. We forgive... and we collect 100% BNB reflections.
            </p>
            
            <div className="hero-actions">
              <a 
                href={launchpadUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-primary"
                id="hero-buy-btn"
              >
                Buy on Flap.sh
              </a>
              <a 
                href="#booth" 
                className="btn-secondary"
                id="hero-confess-btn"
              >
                Confess Sins
              </a>
            </div>
            
            <div className="hero-stats">
              <div className="stat-item">
                <h4>3%</h4>
                <p>Buy & Sell Tax</p>
              </div>
              <div className="stat-item">
                <h4>100%</h4>
                <p>Reflections in BNB</p>
              </div>
              <div className="stat-item">
                <h4>1B</h4>
                <p>Fixed Supply</p>
              </div>
            </div>
          </div>

          <div className="hero-image-container">
            <div className="hero-glow-under"></div>
            <div className="hero-token-art">
              <img 
                src="/virtue.jpg" 
                alt="Virtue Token Logo" 
                className="hero-token-image" 
              />
            </div>
          </div>
        </div>
      </section>



      {/* Lore Section & Tweet Mock */}
      <section className="section" id="lore" style={{ background: "rgba(255, 255, 255, 0.01)" }}>
        <div className="container">
          <h2 className="section-title">The Lore of <span className="text-glow-gold">$VIRTUE</span></h2>
          <p className="section-subtitle">How a simple 4-word tweet from CZ inspired a movement of builders.</p>
          
          <div className="lore-grid">
            {/* Authentic Twitter/X Mockup */}
            <div className="tweet-card">
              <div className="tweet-header">
                <div className="tweet-author">
                  <div className="tweet-avatar">
                    <img 
                      src="/virtue.jpg" 
                      alt="CZ Avatar" 
                      className="tweet-avatar-cz" 
                    />
                  </div>
                  <div className="tweet-meta">
                    <span className="tweet-name">
                      CZ 🔶 BNB
                      <span className="tweet-verified-badge">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                      </span>
                    </span>
                    <span className="tweet-handle">@cz_binance</span>
                  </div>
                </div>
                <div className="tweet-logo-x">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
              </div>
              <div className="tweet-content">
                <span className="tweet-content-emphasis">Forgiveness is a virtue!</span> 🙏
              </div>
              <div className="tweet-timestamp">
                9:23 PM · Sep 23, 2025 · <a href="https://x.com/cz_binance/status/1970358398760952106" target="_blank" rel="noopener noreferrer" style={{ color: "#1d9bf0", textDecoration: "none", fontWeight: "bold" }}>View on X</a>
              </div>
            </div>

            {/* Lore Content */}
            <div className="lore-content" id="about">
              <h3>Rising Above the FUD</h3>
              <p>
                On September 23, 2025, during a period of high volatility and market fear, accusations and anger filled the timeline. 
                Instead of defending himself or firing back, CZ chose a different path. He posted a simple, 4-word reminder to the world: 
                <strong> “Forgiveness is a virtue!”</strong>
              </p>
              <div className="lore-highlight">
                “In a space full of rugs, betrayal, and paper hands, the rarest quality is the ability to forgive, move on, and keep building.”
              </div>
              <p>
                From that ethos, $VIRTUE was born. We are the token of the builders, the resilient, and the believers. 
                When paper hands sell, we do not cancel them. We forgive them, buy their dip, and continue building the future. 
                Because forgiveness is not weakness—it is the ultimate power move.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section className="section" id="tokenomics">
        <div className="container">
          <h2 className="section-title">Tokenomics & <span className="text-glow-gold">BNB Rewards</span></h2>
          <p className="section-subtitle">Earn BNB automatically while holding the token of ultimate virtue.</p>
          
          <div className="tokenomics-grid">
            {/* Card 1 */}
            <div className="glass-card tok-card">
              <div className="tok-icon-wrapper">3%</div>
              <h3>Buy & Sell Fees</h3>
              <p>
                A minimal 3% fee is applied to every buy and sell transaction. 
                This low-fee structure ensures healthy trading volume while feeding our reflection pool.
              </p>
            </div>

            {/* Card 2 */}
            <div className="glass-card tok-card">
              <div className="tok-icon-wrapper" style={{ color: "var(--accent-purple)", borderColor: "rgba(157, 78, 221, 0.15)" }}>100%</div>
              <h3>BNB & WBNB Reflections</h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.6" }}>
                100% of transaction fees are converted to rewards for holders with at least <strong>10,000 $VIRTUE</strong>. 
                Daily rewards over <strong>$4</strong> are auto-distributed in <strong>WBNB</strong>. Below $4, claim manually anytime 
                on the <a href="https://flap.sh/bnb/0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777/taxinfo?lang=en" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-gold)", textDecoration: "underline" }}>Flap Tax Info page</a> with your choice of <strong>WBNB or BNB</strong>.
              </p>
            </div>

            {/* Card 3 */}
            <div className="glass-card tok-card">
              <div className="tok-icon-wrapper">Flap</div>
              <h3>Fair Launch on Flap</h3>
              <p>
                Launched on Flap.sh (BSC), a fully secure launchpad ensuring 100% fair distribution, locked liquidity, 
                and no rug pulls. Your virtue is protected by design.
              </p>
            </div>

            {/* Card 4 */}
            <div className="glass-card tok-card">
              <div className="tok-icon-wrapper" style={{ color: "#00ba7c", borderColor: "rgba(0, 186, 124, 0.2)" }}>100%</div>
              <h3>Zero Bundles & Honest Dev Entry</h3>
              <p>
                No insider snipers, no pre-mined team tokens, and no hidden phishing wallets. The single developer 
                wallet bought only <strong>~$40–$60 worth</strong> on the open market at launch — aligning 100% with the community.
              </p>
            </div>
          </div>

          {/* Quick Rules Banner */}
          <div style={{ marginTop: "24px", padding: "16px 20px", borderRadius: "14px", background: "rgba(243, 186, 47, 0.05)", border: "1px dashed rgba(243, 186, 47, 0.25)", textAlign: "center", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
            ⚡ <strong>Reflection Mechanics:</strong> Minimum holding: <strong>10,000 $VIRTUE</strong> (0.001%) • Auto-payouts: <strong>WBNB</strong> ($4+ threshold) • Manual claims: Choice of <strong>WBNB or BNB</strong> on <a href="https://flap.sh/bnb/0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777/taxinfo?lang=en" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-gold)", textDecoration: "underline" }}>Flap Tax Info page</a>.
          </div>

          {/* Real Contract Address Display */}
          <div className="ca-container">
            <div className="ca-card" style={{ border: "1px dashed var(--accent-gold)", background: "rgba(243, 186, 47, 0.05)" }}>
              <div className="ca-info" style={{ width: "100%" }}>
                <span className="ca-label" style={{ color: "var(--accent-gold)" }}>VIRTUE SMART CONTRACT (BSC)</span>
                <span className="ca-value" style={{ color: "#fff", fontFamily: "monospace" }}>
                  {contractAddress}
                </span>
              </div>
              <button 
                className={`ca-copy-btn ${copied ? "copied" : ""}`} 
                onClick={() => copyToClipboard(contractAddress)}
                id="copy-ca-btn"
              >
                {copied ? "Copied!" : "Copy CA"}
              </button>
            </div>
          </div>
          {/* Official Verification Links Bar */}
          <div style={{ marginTop: "16px", display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
            <a 
              href={launchpadUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-secondary"
              style={{ fontSize: "0.85rem", padding: "8px 16px", display: "inline-flex", alignItems: "center", gap: "6px" }}
            >
              🚀 Trade on Flap.sh
            </a>
            <a 
              href="https://flap.sh/bnb/0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777/taxinfo?lang=en" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-secondary"
              style={{ fontSize: "0.85rem", padding: "8px 16px", display: "inline-flex", alignItems: "center", gap: "6px", borderColor: "rgba(243, 186, 47, 0.4)", color: "var(--accent-gold)" }}
            >
              💰 Claim Reflections (Flap Tax Info)
            </a>
            <a 
              href="https://bscscan.com/token/0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-secondary"
              style={{ fontSize: "0.85rem", padding: "8px 16px", display: "inline-flex", alignItems: "center", gap: "6px" }}
            >
              🔍 BscScan Verified Contract
            </a>
            <a 
              href="https://dexscreener.com/bsc/0x0dd4ea60ca4482196cd1bdd6903f2741f2067777" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-secondary"
              style={{ fontSize: "0.85rem", padding: "8px 16px", display: "inline-flex", alignItems: "center", gap: "6px" }}
            >
              📈 DexScreener Live Chart
            </a>
          </div>
        </div>
      </section>

      {/* Interactive Reflection Calculator */}
      <section className="section" id="calculator" style={{ background: "rgba(255, 255, 255, 0.01)" }}>
        <div className="container">
          <h2 className="section-title">BNB Reflection <span className="text-glow-gold">Calculator</span></h2>
          <p className="section-subtitle">Calculate real distributions based on contract specifications & live market feeds.</p>
          
          <div className="glass-card calc-card">
            <div className="calc-grid">
              <div className="calc-inputs">
                {/* Input Mode Toggle */}
                <div className="input-group">
                  <div className="input-header">
                    <span className="input-label">Holdings Input Mode</span>
                    <div className="calc-mode-toggle">
                      <button 
                        className={`calc-mode-btn ${calcInputMode === 'tokens' ? 'active' : ''}`}
                        onClick={() => setCalcInputMode('tokens')}
                        type="button"
                      >
                        Token Amount
                      </button>
                      <button 
                        className={`calc-mode-btn ${calcInputMode === 'percent' ? 'active' : ''}`}
                        onClick={() => setCalcInputMode('percent')}
                        type="button"
                      >
                        Supply %
                      </button>
                    </div>
                  </div>

                  {calcInputMode === 'tokens' ? (
                    <>
                      <div className="input-header" style={{ marginTop: "4px" }}>
                        <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>Tokens Amount (Min: 10,000 $VIRTUE)</span>
                        <span className="input-display">{holdingsTokens.toLocaleString()} $VIRTUE ({holdingsPercent}%)</span>
                      </div>
                      <input 
                        type="range" 
                        min="10000" 
                        max="100000000" 
                        step="10000"
                        value={holdingsTokens} 
                        onChange={(e) => handleTokenChange(Number(e.target.value))}
                        className="calc-slider"
                        id="calc-tokens-slider"
                      />
                      {/* Token Presets */}
                      <div className="calc-presets-row">
                        {[
                          { label: "10K (0.001%)", val: 10000 },
                          { label: "100K (0.01%)", val: 100000 },
                          { label: "1M (0.1%)", val: 1000000 },
                          { label: "5M (0.5%)", val: 5000000 },
                          { label: "10M (1%)", val: 10000000 },
                          { label: "50M (5%)", val: 50000000 },
                          { label: "100M (10%)", val: 100000000 }
                        ].map((p) => (
                          <button
                            key={p.val}
                            type="button"
                            className={`calc-preset-pill ${holdingsTokens === p.val ? 'active' : ''}`}
                            onClick={() => handleTokenChange(p.val)}
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="input-header" style={{ marginTop: "4px" }}>
                        <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>Percentage of Pool (Min: 0.001%)</span>
                        <span className="input-display">{holdingsPercent}% ({holdingsTokens.toLocaleString()} tokens)</span>
                      </div>
                      <input 
                        type="range" 
                        min="0.001" 
                        max="10" 
                        step="0.01"
                        value={holdingsPercent} 
                        onChange={(e) => handlePercentChange(parseFloat(e.target.value))}
                        className="calc-slider"
                        id="calc-holdings-slider"
                      />
                      {/* Percent Presets */}
                      <div className="calc-presets-row">
                        {[0.001, 0.01, 0.1, 0.5, 1.0, 5.0, 10.0].map((pct) => (
                          <button
                            key={pct}
                            type="button"
                            className={`calc-preset-pill ${holdingsPercent === pct ? 'active' : ''}`}
                            onClick={() => handlePercentChange(pct)}
                          >
                            {pct}%
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Trading Volume Slider ($ USD) & Presets */}
                <div className="input-group">
                  <div className="input-header">
                    <span className="input-label">Daily Trading Volume ($ USD)</span>
                    <span className="input-display">${dailyVolumeUsd.toLocaleString()} USD (≈ {dailyVolumeBnb.toFixed(1)} BNB)</span>
                  </div>
                  <input 
                    type="range" 
                    min="5000" 
                    max="5000000" 
                    step="5000"
                    value={dailyVolumeUsd} 
                    onChange={(e) => setDailyVolumeUsd(Number(e.target.value))}
                    className="calc-slider"
                    id="calc-volume-slider"
                  />
                  {/* Volume Presets in USD */}
                  <div className="calc-presets-row">
                    {[
                      { label: "$10K", val: 10000 },
                      { label: "$50K", val: 50000 },
                      { label: "$100K", val: 100000 },
                      { label: "$500K", val: 500000 },
                      { label: "$1M", val: 1000000 },
                      { label: "$5M", val: 5000000 }
                    ].map((vp) => (
                      <button
                        key={vp.val}
                        type="button"
                        className={`calc-preset-pill ${dailyVolumeUsd === vp.val ? 'active' : ''}`}
                        onClick={() => setDailyVolumeUsd(vp.val)}
                      >
                        {vp.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Formula display */}
                <div style={{ background: "rgba(0,0,0,0.3)", padding: "14px", borderRadius: "10px", fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: "1.4" }}>
                  <span style={{ fontWeight: "700", color: "var(--accent-gold)", display: "block", marginBottom: "4px" }}>REWARDS FORMULA (Min 10k $VIRTUE):</span>
                  <code>Your Rewards = (Your Holdings / 1,000,000,000) × Daily Volume USD × 3% Tax</code>
                  <div style={{ marginTop: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: "#00ba7c", boxShadow: "0 0 6px #00ba7c" }}></span>
                    Binance Live BNB Feed: <strong style={{ color: "#fff" }}>${bnbPrice.toFixed(2)} USD</strong>
                  </div>
                </div>
              </div>

              {/* Calculator Results */}
              <div className="calc-results">
                <span className="result-title">Real Reflections Output</span>
                
                <div style={{ margin: "10px 0" }}>
                  <div className="result-value-bnb">+{dailyRewardsUserBnb.toFixed(4)} WBNB / BNB</div>
                  <div className="result-value-usd">≈ ${dailyRewardsUserUsd.toFixed(2)} USD / day</div>
                </div>

                {/* Auto-Distribution Threshold Status */}
                {dailyRewardsUserUsd >= 4.00 ? (
                  <div className="threshold-badge auto">
                    🟢 Auto WBNB Daily ($4+ Threshold Met)
                  </div>
                ) : (
                  <div className="threshold-badge manual">
                    🟡 Manual Claim Below $4 (Choose WBNB or BNB on Flap)
                  </div>
                )}
                
                <div className="result-divider"></div>
                
                <div className="result-meta-item">
                  <span className="result-meta-label">Monthly Reflections</span>
                  <span className="result-meta-value text-glow-gold">
                    +{monthlyRewardsUserBnb.toFixed(2)} BNB (${monthlyRewardsUserUsd.toFixed(0)})
                  </span>
                </div>
                <div className="result-meta-item">
                  <span className="result-meta-label">Yearly Projection</span>
                  <span className="result-meta-value text-glow-purple">
                    +{yearlyRewardsUserBnb.toFixed(2)} BNB (${yearlyRewardsUserUsd.toFixed(0)})
                  </span>
                </div>
                <div className="result-meta-item" style={{ marginTop: "10px" }}>
                  <span className="result-meta-label">Tokens Held (Min 10k)</span>
                  <span className="result-meta-value" style={{ color: "var(--accent-gold)" }}>
                    {calculatedHoldingsTokens.toLocaleString()} $VIRTUE
                  </span>
                </div>

                {/* Copy / Share Projection Summary */}
                <button 
                  onClick={handleCopySummary}
                  className="calc-share-btn"
                  type="button"
                >
                  {copiedSummary ? "✓ Projections Copied!" : "📋 Copy Reflection Summary"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Forgiveness Booth (Conversational Chat Bot) */}
      <section className="section" id="booth">
        <div className="container">
          <h2 className="section-title">The <span className="text-glow-gold">Forgiveness Booth</span></h2>
          <p className="section-subtitle">Interactive Conversational Agent powered by an in-house deterministic NLP engine &amp; live crypto oracles.</p>
          
          <div className="glass-card booth-card">
            <div className="chat-header-actions">
              <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "0.95rem", color: "var(--text-secondary)", fontWeight: 600 }}>
                  Status: <span style={{ color: "#00ba7c" }}>Online (Custom NLP Agent)</span>
                </span>
                <button 
                  onClick={() => sendDirectCommand("/help")}
                  style={{ 
                    padding: "3px 10px", 
                    borderRadius: "20px", 
                    background: "rgba(243, 186, 47, 0.15)", 
                    border: "1px solid var(--accent-gold)", 
                    color: "var(--accent-gold)", 
                    fontSize: "0.78rem", 
                    fontWeight: 700, 
                    cursor: "pointer" 
                  }}
                  type="button"
                >
                  📜 /help
                </button>
                <button 
                  onClick={() => setIsShareModalOpen(true)}
                  style={{ 
                    padding: "3px 10px", 
                    borderRadius: "20px", 
                    background: "rgba(29, 155, 240, 0.15)", 
                    border: "1px solid #1d9bf0", 
                    color: "#1d9bf0", 
                    fontSize: "0.78rem", 
                    fontWeight: 700, 
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px"
                  }}
                  type="button"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Share on X
                </button>
              </div>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <button 
                  type="button"
                  onClick={openImproveModelTweet} 
                  className="chat-improve-btn" 
                  id="chat-improve-btn"
                  title="Post suggestions on X to improve the AI model"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  💡 Improve Model
                </button>
                <button onClick={resetChat} className="chat-reset-btn" id="chat-reset-btn">
                  Reset Conversation
                </button>
              </div>
            </div>

            <div className="chat-window">
              {/* Chat Message List */}
              <div className="chat-messages-list">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`chat-bubble-container ${msg.role === "user" ? "user" : "priest"}`}>
                    {msg.role === "assistant" && (
                      <div className="chat-avatar-wrapper">
                        <img src="/virtue.jpg" alt="Priest Avatar" className="chat-avatar-img" />
                      </div>
                    )}
                    
                    <div className={`chat-bubble ${msg.role === "user" ? "user" : "priest"}`}>
                      <div>{msg.content}</div>
                      
                      {msg.penance && (
                        <div className="chat-penance-area">
                          <div className="chat-penance-title">✨ Divine Penance Issued</div>
                          <div className="chat-penance-text">&ldquo;{msg.penance}&rdquo;</div>
                          <div style={{ display: "flex", gap: "8px", marginTop: "8px", flexWrap: "wrap" }}>
                            <button 
                              onClick={() => {
                                // Sharing custom penance and direct link under 280 characters
                                const tweetText = `Confessed my crypto sins at the $VIRTUE Forgiveness Booth! 🙏\n\nPenance: ${msg.penance}\nCA: ${contractAddress}\n\nBuy on Flap.sh: ${launchpadUrl}`;
                                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`, "_blank");
                              }}
                              className="chat-share-btn"
                            >
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                              </svg>
                              Share Penance
                            </button>
                            <button 
                              onClick={openImproveModelTweet}
                              className="chat-improve-btn"
                              type="button"
                              title="Post suggestions on X to improve the AI model"
                            >
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                              </svg>
                              💡 Improve Model
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="chat-typing-indicator">
                    <div className="chat-avatar-wrapper">
                      <img src="/virtue.jpg" alt="Priest Avatar" className="chat-avatar-img" />
                    </div>
                    <div className="chat-bubble priest" style={{ display: "flex", gap: "6px", padding: "12px 16px" }}>
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                    </div>
                  </div>
                )}
                
                <div ref={chatEndRef} />
              </div>

              {/* Quick Suggestion Chips */}
              <div style={{ display: "flex", gap: "6px", padding: "6px 10px", overflowX: "auto", background: "rgba(0,0,0,0.25)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                {[
                  { label: "📜 /help", cmd: "/help" },
                  { label: "💡 Improve Model", action: openImproveModelTweet },
                  { label: "📋 Contract", cmd: "ca" },
                  { label: "💰 Reflections", cmd: "how do reflections work?" },
                  { label: "4️⃣ Rule 4", cmd: "4" },
                  { label: "📊 BNB Price", cmd: "bnb price" },
                  { label: "📊 BTC Price", cmd: "btc price" },
                  { label: "👁️ Dev Wallet", cmd: "who is the dev?" }
                ].map((chip, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => chip.action ? chip.action() : sendDirectCommand(chip.cmd!)}
                    disabled={isTyping}
                    style={{
                      padding: "4px 10px",
                      borderRadius: "14px",
                      background: chip.action ? "rgba(243, 186, 47, 0.15)" : "rgba(255, 255, 255, 0.05)",
                      border: chip.action ? "1px solid rgba(243, 186, 47, 0.4)" : "1px solid rgba(255, 255, 255, 0.1)",
                      color: chip.action ? "var(--accent-gold)" : "var(--text-secondary)",
                      fontSize: "0.76rem",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleSendMessage} className="chat-input-wrapper">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Confess a sin, or ask the High Priest anything..."
                  className="chat-text-input"
                  disabled={isTyping}
                  required
                  id="chat-message-input"
                />
                <button 
                  type="submit" 
                  className="chat-send-btn" 
                  disabled={isTyping || !chatInput.trim()}
                  id="chat-send-btn"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid" style={{ gridTemplateColumns: "1.5fr 1fr" }}>
            <div>
              <div className="footer-logo">
                <img 
                  src="/virtue.jpg" 
                  alt="Virtue Logo" 
                  style={{ width: "32px", height: "32px", borderRadius: "50%", border: "1px solid var(--accent-gold)" }} 
                />
                <span className="logo-text" style={{ fontSize: "1.3rem" }}>Virtue</span>
              </div>
              <p className="footer-description">
                Inspired by CZ&apos;s legendary advice. Forgiveness is not weakness. It&apos;s the ultimate power move to buy the dip and keep building.
              </p>
            </div>
            
            <div className="footer-flap-container" style={{ textAlign: "right" }}>
              <div className="footer-title">Launchpad Channel</div>
              <p style={{ fontSize: "0.95rem", marginBottom: "15px", color: "var(--text-secondary)" }}>
                Get the latest pools and status updates directly.
              </p>
              <a 
                href={launchpadUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="nav-btn"
                style={{ display: "inline-block" }}
                id="footer-flap-btn"
              >
                Go to Flap.sh
              </a>
            </div>
          </div>
          
          <div className="footer-copyright">
            &copy; {new Date().getFullYear()} Virtue. Inspired by @cz_binance.
            <div className="footer-disclaimer">
              Disclaimer: $VIRTUE is a community meme token for entertainment purposes only and has no official affiliation with Changpeng Zhao (CZ) or Binance. 
              Smart contract fee reflections in BNB are distributed autonomously on-chain from trading volume. Crypto-assets involve substantial risk of loss. 
              This interface and deterministic NLP conversational engine are free, open-source software (MIT License) developed for research and educational purposes. Not financial advice.
            </div>
          </div>
        </div>
      </footer>

      {/* Voluntary Custom Tweet Composer Modal */}
      {isShareModalOpen && (
        <div style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          background: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px"
        }}>
          <div style={{
            background: "rgba(20, 20, 30, 0.95)",
            border: "1px solid rgba(243, 186, 47, 0.3)",
            borderRadius: "20px",
            padding: "24px",
            maxWidth: "500px",
            width: "100%",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "1.2rem", color: "var(--accent-gold)", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Compose & Share Tweet on X
              </h3>
              <button 
                type="button"
                onClick={() => setIsShareModalOpen(false)}
                style={{ background: "none", border: "none", color: "var(--text-secondary)", fontSize: "1.4rem", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "8px" }}>
              Choose a promo template or write your own custom post to spread $VIRTUE on X:
            </p>

            {/* Pre-compiled Tweet Presets */}
            <div style={{ display: "flex", gap: "6px", marginBottom: "12px", overflowX: "auto", paddingBottom: "4px" }}>
              {[
                {
                  title: "📢 Official Promo",
                  text: `Earn continuous 3% BNB reflections on BSC with $VIRTUE! 💎\n\nInspired by @cz_binance: "Forgiveness is a virtue!" 🙏\n\nLocked Liquidity • Fair Launch on Flap.sh\nCA: ${contractAddress}\nSwap: ${launchpadUrl}`
                },
                {
                  title: "🕊️ Lore & Absolution",
                  text: `Confessed my worst crypto trades at the $VIRTUE Forgiveness Booth! 🙏\n\nWhen paper hands sell, we forgive the dip and collect 3% BNB reflections.\n\nCA: ${contractAddress}\nFlap: ${launchpadUrl}`
                },
                {
                  title: "💰 Reflection Rewards",
                  text: `Why hold plain tokens when you can earn passive BNB? $VIRTUE distributes 100% of 3% tax back to holders! 🚀\n\nCheck projections & swap on Flap.sh:\nCA: ${contractAddress}\n${launchpadUrl}`
                },
                {
                  title: "✏️ Blank Slate",
                  text: ""
                }
              ].map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCustomTweetText(preset.text)}
                  style={{
                    padding: "4px 10px",
                    borderRadius: "12px",
                    background: "rgba(243, 186, 47, 0.1)",
                    border: "1px solid rgba(243, 186, 47, 0.25)",
                    color: "var(--accent-gold)",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    cursor: "pointer"
                  }}
                >
                  {preset.title}
                </button>
              ))}
            </div>

            <textarea
              value={customTweetText}
              onChange={(e) => setCustomTweetText(e.target.value)}
              rows={6}
              style={{
                width: "100%",
                background: "rgba(0, 0, 0, 0.4)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: "12px",
                padding: "12px",
                color: "#fff",
                fontSize: "0.92rem",
                fontFamily: "inherit",
                resize: "none",
                marginBottom: "8px",
                outline: "none"
              }}
            />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <span style={{ fontSize: "0.8rem", color: customTweetText.length > 280 ? "#ff4d4d" : "var(--text-secondary)" }}>
                {customTweetText.length} / 280 characters
              </span>
              {customTweetText.length > 280 && (
                <span style={{ fontSize: "0.78rem", color: "#ff4d4d" }}>Over 280 char limit!</span>
              )}
            </div>

            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={() => setIsShareModalOpen(false)}
                style={{
                  padding: "10px 18px",
                  borderRadius: "12px",
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "none",
                  color: "#fff",
                  fontSize: "0.9rem",
                  cursor: "pointer"
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(customTweetText)}`, "_blank");
                  setIsShareModalOpen(false);
                }}
                disabled={!customTweetText.trim()}
                style={{
                  padding: "10px 20px",
                  borderRadius: "12px",
                  background: "#1d9bf0",
                  border: "none",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Post on X
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
