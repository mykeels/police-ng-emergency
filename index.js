const fs = require('fs');
const path = require('path');

const states = require('./lagos.json');

const contacts = ({ state, phones, areas, commandControlRooms }) => {
  const main = `BEGIN:VCARD
BDAY;VALUE=DATE:1960-10-01
VERSION:3.0
N:${state};Police;NG
FN:${state} Police NG
ORG:Police NG
${phones.map(phone => `TEL;TYPE=WORK,MSG:${phone}`).join('\n')}
END:VCARD`;

  const contactResolver = ({ name, phone }) => {
    content = `BEGIN:VCARD
BDAY;VALUE=DATE:1960-10-01
VERSION:3.0
N:${name};Police;NG
FN:${(name, state)} Police NG
ORG:Police NG
TEL;TYPE=WORK,MSG:${phone}
END:VCARD`;

    fs.writeFileSync(path.resolve(`./${name.toLowerCase()}.vcf`), content, {
      encoding: 'utf8',
    });
  };

  const area = areas.map(area => contactResolver(area));

  const divisions = areas.map(({ divisions }) =>
    divisions.map(division => contactResolver(division))
  );

  const commandControl = commandControlRooms.map(room => contactResolver(room));

  return {
    main,
    area,
    divisions,
    commandControl,
  };
};

const final = contacts(states);

// console.log(
//   states
//     .map(
//       ({ state }) =>
//         `- [${state.toUpperCase()}](https://raw.githubusercontent.com/mykeels/police-ng-emergency/master/vcf/${state}.vcf)`
//     )
//     .join('\n')
// );

// const contacts = states.map(({ state, phones }) => {
//     return {
//         state,
// content: `BEGIN:VCARD
// BDAY;VALUE=DATE:1960-10-01
// VERSION:3.0
// N:${state};Police;NG
// FN:${state} Police NG
// ORG:Police NG
// ${phones.map(phone => `TEL;TYPE=WORK,MSG:${phone}`).join('\n')}
// END:VCARD`;
//     }
// });

// for (let contact of contacts) {
//   fs.writeFileSync(path.resolve(`./${contact.state}.vcf`), contact.content, {
//     encoding: 'utf8',
//   });
// }

// fs.writeFileSync(
//   path.resolve(`./lagos-new.vcf`),
//   final.area.map(contact => contact).join('\n'),
//   { encoding: 'utf8' }
// );
