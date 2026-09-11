const fs = require('fs');
const path = '/home/luca/Scrivania/virtue/app/page.tsx';
let code = fs.readFileSync(path, 'utf8');

function patch(desc, target, replacement) {
  if (!code.includes(target)) {
    console.error(`❌ PATCH FAILED: ${desc}`);
    return false;
  }
  code = code.replace(target, replacement);
  console.log(`✅ PATCHED: ${desc}`);
  return true;
}

const officialLinksBar = `
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
              💰 Claim Dividends (Flap Tax Info)
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
          </div>`;

patch(
  'Add Official Verification Links Bar below CA in page.tsx',
  `              </button>
            </div>
          </div>
        </div>
      </section>`,
  `              </button>
            </div>
          </div>${officialLinksBar}
        </div>
      </section>`
);

fs.writeFileSync(path, code, 'utf8');
console.log("Official links bar added to page.tsx");
