const token = '$2b$10$KjA6bzM7uur9YFhXy99TUO9CTPHcHTGmhWx8h89B1OHt0uavJT2iW';
const headers = {
  'X-Master-Key': token,
  'X-BIN-META': false
};
const url = 'https://api.jsonbin.io/v3/b/6160da3caa02be1d4456c67c/';

const read = () => {
  return fetch(url, {
    method: 'get',
    headers
  });
};

const write = (data) => {
  return fetch(url, {
    method: 'put',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

const PARTICIPANTS = [
  'Andi',
  'Andika',
  'Anita',
  'Attila',
  'Dorka',
  'Kristóf',
  'Laci',
  'Lacika',
  'Tibi'
];
const FORBIDDEN_PAIRS = [
  ['Andika', 'Attila'],
  ['Anita', 'Laci'],
  ['Lacika', 'Dorka']
];
const isCombinationForbidden = (name1, name2) =>
  FORBIDDEN_PAIRS.filter((pair) => pair.includes(name1)).some((pair) =>
    pair.includes(name2)
  );
const main = async () => {
  const wBody = {
    names: PARTICIPANTS.reduce(
      (acc, name) => ({
        ...acc,
        [name]: PARTICIPANTS.filter(
          (name2) => name !== name2 && !isCombinationForbidden(name, name2)
        )
      }),
      {}
    ),
    taken: {}
  };
  const wRes = await write(wBody);
  const rRes = await read();
  const rBody = await rRes.json();
  if (JSON.stringify(wBody) === JSON.stringify(rBody)) {
    //console.log('Reset complete', JSON.stringify(wBody, null, 4));
    console.log('Reset successful');
  } else {
    console.log('Reset incomplete', JSON.stringify(rBody, null, 4));
    console.log('Reset failed');
  }
};

main();
