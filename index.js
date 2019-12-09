const fs = require('fs');
const path = require('path');

const { states } = require('./emergency-contacts.json');

console.log(states.map(({ state }) => `- [${state.toUpperCase()}](./vcf/${state}.vcf)`).join('\n'));

// const contacts = states.map(({ state, phones }) => {
//     return {
//         state,
//         content: `BEGIN:VCARD
// BDAY;VALUE=DATE:1960-10-01
// VERSION:3.0
// N:${state};Police;NG
// FN:${state} Police NG
// ORG:Police NG
// ${phones.map(phone => `TEL;TYPE=WORK,MSG:${phone}`).join('\n')}
// END:VCARD`
//     }
// });

// for (let contact of contacts)
// {
//     fs.writeFileSync(path.resolve(`./${contact.state}.vcf`), contact.content, { encoding: 'utf8' });
// }

// fs.writeFileSync(
//     path.resolve(`./nigeria.vcf`), 
//     contacts.map(contact => contact.content).join('\n'), 
//     { encoding: 'utf8' }
// );

// console.log(contacts)