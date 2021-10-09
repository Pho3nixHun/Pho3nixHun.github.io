import fetch from 'node-fetch';

const headers = {
    'X-Master-Key': '$2b$10$5b9AlJCQ5sOxj0noLuz2EezEocWqxTZTudxG24cCmGN1wOw9XzULa'
};
const url = 'https://api.jsonbin.io/b/6160d6bc4a82881d6c5d83ec/latest';

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
            'Andi': ['Lacika', 'Tibi', 'Laci', 'Anita', 'Andika', 'Attila'],
            'Andika': ['Andi', 'Lacika', 'Tibi', 'Laci', 'Anita'],
            'Anita': ['Andi', 'Lacika', 'Tibi', 'Laci', 'Andika', 'Attila'],
            'Attila': ['Andi', 'Lacika', 'Tibi', 'Laci', 'Anita'],
            'Lacika': ['Andi', 'Tibi', 'Laci', 'Anita', 'Andika', 'Attila'],
            'Tibi': ['Andi', 'Lacika', 'Anita', 'Andika', 'Attila'],
            'Laci': ['Andi', 'Lacika', 'Anita', 'Andika', 'Attila']
        },
        taken: {

        }
    });
    const rRes = await read();
    const rBody = await rRes.json();
    console.log('Reset complete', JSON.stringify(rBody, null, 4));
}

main();