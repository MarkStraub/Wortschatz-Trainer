export interface PeriodicElement {
    id: string;
    de: string;
    en: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];

export class Words {
    public static ELEMENT_DATA = ELEMENT_DATA;

    /*****************************************************
     * Tab 1
     ****************************************************/
    public static add = (de: string, en: string) => {
        console.log(`Add words`);
        ELEMENT_DATA.push({ id: uuidv4(), de: de, en: en });
    }

    public static update = (id: string, de: string, en: string) => {
        console.log(`Update words`);
        ELEMENT_DATA.forEach(e => {
            if (id === e.id) {
                e.de = de;
                e.en = en;
            }
        });
    }

    public static remove = (id: string) => {
        console.log(`Remove words`);
        ELEMENT_DATA.forEach((e, i) => {
            if (id === e.id) {
                ELEMENT_DATA.splice(i, 1);
            }
        });
    }

    public static resetData = () => {
        console.log(`Reset data`);
        ELEMENT_DATA.splice(0, ELEMENT_DATA.length);
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