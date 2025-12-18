
export enum UnitType {
  U2 = 'u2',
  U3 = 'u3',
  U4 = 'u4',
  U5 = 'u5',
  U6 = 'u6'
}

export enum GameState {
  INTRO = 'intro',
  FLASHCARDS = 'flashcards',
  GAME1 = 'game1',
  GAME2 = 'game2',
  GAME3 = 'game3',
  GAME4 = 'game4',
  COMPENDIUM = 'compendium',
  QUIZ = 'quiz',
  FINISHED = 'finished'
}

export interface Flashcard {
  id: string;
  term: string;
  def: string;
  type?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}
