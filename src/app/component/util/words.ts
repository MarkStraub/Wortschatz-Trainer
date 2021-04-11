export interface PeriodicElement {
    id: string;
    de: string;
    en: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];

export class Words {
    public static ELEMENT_DATA = ELEMENT_DATA;

    /**
     * Loads the data from local storage
     * 
     * @public
     */
    public static load = () => {
        console.log(`Load data from loacl storage`);
        var data = localStorage.getItem(`words`);
        if (data !== null) {
            var savedWords = JSON.parse(data);
            ELEMENT_DATA.push(...savedWords);
            console.log(ELEMENT_DATA);
        }
    }

    /**
     * Saves the data to local storage
     * 
     * @public
     */
    public static save = () => {
        console.log(`Save data to loacl storage`);
        localStorage.setItem(`words`, JSON.stringify(ELEMENT_DATA));
    }

    /*****************************************************
     * Tab 1
     ****************************************************/
    /**
     * Merges an array of buffers into a new buffer.
     *
     * @param {Buffer[]} list The array of buffers to concat
     * @param {Number} totalLength The total length of buffers in the list
     * @return {Buffer} The resulting buffer
     * @public
     */
    public static add = (de: string, en: string) => {
        console.log(`Add words`);
        ELEMENT_DATA.push({ id: uuidv4(), de: de, en: en });

        Words.save();
    }

    public static update = (id: string, de: string, en: string) => {
        console.log(`Update words`);
        ELEMENT_DATA.forEach(e => {
            if (id === e.id) {
                e.de = de;
                e.en = en;
            }
        });

        Words.save();
    }

    public static remove = (id: string) => {
        console.log(`Remove words`);
        ELEMENT_DATA.forEach((e, i) => {
            if (id === e.id) {
                ELEMENT_DATA.splice(i, 1);
            }
        });

        Words.save();
    }

    public static resetData = () => {
        console.log(`Reset data`);
        ELEMENT_DATA.splice(0, ELEMENT_DATA.length);

        localStorage.removeItem(`words`);
    }

    public static addExampleData = () => {
        console.log(`Add example data`);
        ELEMENT_DATA.splice(0, ELEMENT_DATA.length);
        ELEMENT_DATA.push(
            { id: uuidv4(), de: 'Bruder', en: `brother` },
            { id: uuidv4(), de: 'Eltern', en: `parents` },
            { id: uuidv4(), de: 'Garten', en: `garden` },
            { id: uuidv4(), de: 'haben', en: `have` },
            { id: uuidv4(), de: 'Haus', en: `house` },
            { id: uuidv4(), de: 'Huhn', en: `chicken` },
            { id: uuidv4(), de: 'Katze', en: `cat` },
            { id: uuidv4(), de: 'kommen', en: `come` },
            { id: uuidv4(), de: 'Kuh', en: `cow` },
            { id: uuidv4(), de: 'Maus', en: `mouse` },
            { id: uuidv4(), de: 'sein', en: `be` },
            { id: uuidv4(), de: 'Tochter', en: `daughter` },
            { id: uuidv4(), de: 'Vogel', en: `bird` },
        );

        Words.save();
    }

    /*****************************************************
     * Tab 2
     ****************************************************/
    public static getRandomWord = () => {
        let i = Math.floor(Math.random() * ELEMENT_DATA.length);
        return ELEMENT_DATA[i];
    }
}

// https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
var uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}