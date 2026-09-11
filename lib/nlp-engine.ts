/**
 * Deterministic NLP & Grammatical Reflection Engine
 * Rule-based semantic tokenization, grammar reflection, and multilingual detection.
 */

export const REFLECTIONS: Record<string, string> = {
  "am": "are", "was": "were", "i": "you", "i'd": "you would",
  "i've": "you have", "i'll": "you will", "my": "your",
  "are": "am", "you've": "I have", "you'll": "I will",
  "your": "my", "yours": "mine", "you": "me", "me": "you",
  "myself": "yourself", "yourself": "myself", "we": "you",
  "our": "your", "ours": "yours", "us": "you"
};

/**
 * Reflects first-person perspective into second-person perspective for conversational parity.
 */
export function reflectPerspective(text: string): string {
  if (!text || typeof text !== "string") return "that trade";

  const cleaned = text.trim()
    .replace(/[?.!;,]+$/g, "")
    .replace(/^(that|because|and|so|that i|to|when i|after i)\s+/i, "");

  const words = cleaned.split(/\b/).map(word => {
    const lower = word.toLowerCase();
    return REFLECTIONS[lower] !== undefined ? REFLECTIONS[lower] : word;
  }).join("");

  const finalStr = words.trim();
  return finalStr.length > 0 ? finalStr : "that position";
}

/**
 * Detects non-English scripts and words to route confession to English.
 */
export function detectNonEnglishLanguage(text: string): { isNonEnglish: boolean; language?: string } {
  if (!text || typeof text !== "string") return { isNonEnglish: false };

  if (/[\u4e00-\u9fa5]/.test(text)) return { isNonEnglish: true, language: "Chinese" };
  if (/[\u3040-\u309F\u30A0-\u30FF]/.test(text)) return { isNonEnglish: true, language: "Japanese" };
  if (/[\uAC00-\uD7AF\u1100-\u11FF]/.test(text)) return { isNonEnglish: true, language: "Korean" };
  if (/[\u0400-\u04FF]/.test(text)) return { isNonEnglish: true, language: "Russian" };
  if (/[\u0600-\u06FF]/.test(text)) return { isNonEnglish: true, language: "Arabic" };

  const itWords = ["ciao", "salve", "buongiorno", "comprare", "tassa", "peccato", "venduto", "panico", "sacerdote"];
  if (itWords.some(w => new RegExp(`\\b${w}\\b`, "i").test(text))) {
    return { isNonEnglish: true, language: "Italian" };
  }

  const esWords = ["hola", "comprar", "pecado", "vendido", "perdido", "sacerdote", "gracias"];
  if (esWords.some(w => new RegExp(`\\b${w}\\b`, "i").test(text))) {
    return { isNonEnglish: true, language: "Spanish" };
  }

  return { isNonEnglish: false };
}

/**
 * Evaluates text against profanity boundaries.
 */
export function containsProfanity(text: string): boolean {
  const profanityRegex = /\b(fuck|shit|bitch|bastard|cunt|asshole|motherfuck|wtf|stfu|kys|faggot|retard|idiot|moron|stupid bot|dumb bot|piece of shit|bullshit|horseshit|prick|dickhead|dickface|ass|crap|piss)\b/i;
  return profanityRegex.test(text || "");
}
