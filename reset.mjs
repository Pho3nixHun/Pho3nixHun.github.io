import fetch from 'node-fetch';

const token = '$2b$10$KjA6bzM7uur9YFhXy99TUO9CTPHcHTGmhWx8h89B1OHt0uavJT2iW';
const headers = {
    'X-Master-Key': token,
    'X-BIN-META': false,
};
const url = 'https://api.jsonbin.io/v3/b/6160da3caa02be1d4456c67c/';

const read = () => {
    return fetch(url, {
        method: 'get',
        headers
    })
}

const write = (data) => {
    return fetch(url, {
        method: 'put',
        headers: {
            ...headers, 
            'Content-Type': 'application/json'
        },
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