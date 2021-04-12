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

    /**
     * Returns the size of the words
     *
     * @static
     * @return {int} The size of the words 
     * @public
     */
    public size = () => {
        return this.words.length;
    }

    /**
     * Get the next word
     *
     * @static
     * @return {PeriodicElement} The next word
     * @public
     */
    public getNextWord = () => {
        return this.words.pop();
    }
}