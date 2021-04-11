import { PeriodicElement, Words } from "./words";

export interface AnswerElement {
    word: string;
    solution: string;
    answer: string;
    correct: boolean;
}

export const ANSWER_DATA: AnswerElement[] = [];

export class Exam {
    started = false;
    private words !: PeriodicElement[];

    constructor() {
        this.words = [...Words.ELEMENT_DATA];
        console.log(this.words);

        // Shuffle array
        for (let i = this.words.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.words[i], this.words[j]] = [this.words[j], this.words[i]];
        }
    }

    public size = () => {
        return this.words.length;
    }

    public getNextWord = () => {
        return this.words.pop();
    }
}