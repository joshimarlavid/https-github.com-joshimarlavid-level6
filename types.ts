export enum LessonSection {
  INTRO = 'intro',
  WARMUP = 'warmup',
  PRACTICE = 'practice',
  LANGUAGE = 'language',
  PERFORMANCE = 'performance',
  BRAND_BATTLE = 'brand_battle',
  ROLEPLAY = 'roleplay',
}

export interface VocabularyItem {
  term: string;
  definition: string;
  example: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface ComparisonRow {
  category: string;
  myCompany: string;
  competitor: string;
  notes: string;
  score: number; // 0 to 100, where 50 is equal, >50 is better, <50 is worse
}