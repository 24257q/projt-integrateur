const normalizeString = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?'"]/g, " ");
};

const message = "Quelles sont les matières de (DWM) en S4 ?";
let messageMod = message;
messageMod = messageMod.replace(/\bs4\b/gi, 'semestre 4');
messageMod = messageMod.replace(/\bs1\b/gi, 'semestre 1');

const userWords = normalizeString(messageMod)
    .split(' ')
    .filter((w: string) => w.length > 1); // Ah! "4" has length 1! Filter > 1 removes it!

console.log("userWords:", userWords);
