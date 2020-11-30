const fetch = require('node-fetch');

const headers = {
    authorization: 'token c10943af-ec4b-4028-90e0-5de0972c3cd8'
};
const url = 'https://jsonbin.org/pho3nixhun';

const read = () => {
    return fetch(url, {
        method: 'get',
        headers
    })
}

const write = (data) => {
    return fetch(url, {
        method: 'post',
        headers,
        body: JSON.stringify(data)
    })
}


const main = async() => {
    const wRes = await write({
        names: {
            'Andi': ['Lacika', 'Tibi', 'Zsófi', 'Anita', 'Andika', 'Attila'],
            'Andika': ['Andi', 'Lacika', 'Tibi', 'Zsófi', 'Anita'],
            'Anita': ['Andi', 'Lacika', 'Tibi', 'Zsófi', 'Andika', 'Attila'],
            'Attila': ['Andi', 'Lacika', 'Tibi', 'Zsófi', 'Anita'],
            'Lacika': ['Andi', 'Tibi', 'Zsófi', 'Anita', 'Andika', 'Attila'],
            'Tibi': ['Andi', 'Lacika', 'Anita', 'Andika', 'Attila'],
            'Zsófi': ['Andi', 'Lacika', 'Anita', 'Andika', 'Attila']
        },
        taken: {

        }
    });
    const rRes = await read();
    const rBody = await rRes.json();
    console.log('Reset complete', JSON.stringify(rBody, null, 4));
}

main();