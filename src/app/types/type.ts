 type Question = Readonly< {
    question: string;
    options: string[];
    correctAnswer: number;
    softSkill: string;
    definition: string;
  }>
  export type { Question };