export interface Reply {
  locale: string;
  utterance: string;
  languageGuessed: boolean;
  localeIso2: string;
  language: string;
  explanation: Explanation[];
  classifications: Classification[];
  intent: string;
  score: number;
  domain: string;
  entities: any[];
  sourceEntities: any[];
  answers: Answer[];
  answer: string;
  actions: any[];
  sentiment: Sentiment;
}

export interface Answer {
  answer: string;
}

export interface Classification {
  intent: string;
  score: number;
}

export interface Explanation {
  token: string;
  stem: string;
  weight: number;
}

export interface Sentiment {
  score: number;
  numWords: number;
  numHits: number;
  average: number;
  locale: string;
  vote: string;
}
