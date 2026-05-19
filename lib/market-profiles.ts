export type MarketProfile = {
  id: string;
  name: string;
  defaultLanguage: string;
  formattingRules: string[];
  tabooElements: string[];
  tone: string;
  preferredSections: string[];
};

export const marketProfiles: MarketProfile[] = [
  { id: 'US', name: 'United States', defaultLanguage: 'en', formattingRules: ['One or two pages', 'ATS-first layout', 'achievement-driven bullets'], tabooElements: ['photo', 'age', 'marital status'], tone: 'direct, metric-led, concise', preferredSections: ['Summary', 'Skills', 'Experience', 'Education'] },
  { id: 'UK', name: 'United Kingdom', defaultLanguage: 'en', formattingRules: ['CV wording is acceptable', 'concise professional profile', 'evidence-led achievements'], tabooElements: ['photo unless requested', 'irrelevant personal data'], tone: 'professional, slightly less sales-heavy than US', preferredSections: ['Profile', 'Key Skills', 'Experience', 'Education'] },
  { id: 'EU', name: 'European Union', defaultLanguage: 'en', formattingRules: ['Clear role chronology', 'company context can matter', 'language and work authorization can be useful'], tabooElements: ['unsupported claims', 'overly aggressive wording'], tone: 'structured, formal-neutral', preferredSections: ['Summary', 'Experience', 'Skills', 'Education', 'Languages'] },
  { id: 'DE', name: 'Germany', defaultLanguage: 'de', formattingRules: ['Precise dates', 'formal tone', 'certifications and education visible'], tabooElements: ['vague impact claims', 'casual tone'], tone: 'formal, precise, evidence-oriented', preferredSections: ['Profile', 'Experience', 'Education', 'Certifications', 'Languages'] },
  { id: 'RU', name: 'Russia/CIS', defaultLanguage: 'ru', formattingRules: ['Detailed experience', 'tools and responsibilities are important', 'HH-style keyword coverage'], tabooElements: ['empty buzzwords', 'unverifiable inflated metrics'], tone: 'direct, practical, skill-focused', preferredSections: ['Experience', 'Skills', 'Education', 'Certifications'] },
  { id: 'UAE', name: 'United Arab Emirates', defaultLanguage: 'en', formattingRules: ['International experience emphasis', 'clear availability and relocation context when relevant', 'polished executive tone'], tabooElements: ['informal phrasing', 'unsupported seniority'], tone: 'polished, internationally oriented', preferredSections: ['Summary', 'Experience', 'Key Skills', 'Education', 'Languages'] },
];

export function getMarketProfile(id = 'EU') {
  return marketProfiles.find((profile) => profile.id === id) || marketProfiles[2];
}
