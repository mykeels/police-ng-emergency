const fs = require('fs');
const path = require('path');

const { states } = require('./emergency-contacts.json');

const countryVCFs = [];
const INDEPENDENCE_DATE = '1960-01-01'

const createVCF = (name, fullName, phones = [])  => {
  return `BEGIN:VCARD
BDAY;VALUE=DATE:${INDEPENDENCE_DATE}
VERSION:3.0
N:${name};Police;NG
FN:${fullName} Police NG
ORG:Police NG
${phones.map(phone => `TEL;TYPE=WORK,MSG:${phone}`).join('\n')}
END:VCARD`;
}

const createDirectory = (name) =>  {
  fs.mkdirSync(name, {
    recursive: true
  })
}

const createFile = (name, content) => {
  console.log('creating', name);
  fs.writeFileSync(path.resolve(`./${name}.vcf`), content, {
    encoding: 'utf8',
  });
}

const createDirAndFile = (subpaths, content) => {
  const dirSubPaths = subpaths.slice(0, -1);
  createDirectory(dirSubPaths.join('/'));
  createFile(subpaths.join('/'), content);
}

const hyphenate = name => name.toLowerCase().replace(/ /g, '-').replace(/^commander\-\'?\w\'?-/g, '');

states.map(({ state, phones, areas = [], commandControlRooms = [] }) => {
  const stateVCF = createVCF(state, state, phones);
  const stateVCFs = [stateVCF]
  countryVCFs.push(stateVCF);

  areas.map((area) => {
    const areaVCF = createVCF(area.name, `${area.name}, ${state.toUpperCase()}`, [area.phone]);
    const areaVCFs = [areaVCF];

    stateVCFs.push(areaVCF);
    countryVCFs.push(areaVCF);

    area.divisions.map(division => {
      const divisionVCF = createVCF(
        division.name, 
        `${division.name}, ${area.name}, ${state.toUpperCase()}`, 
        [division.phone]
      );

      areaVCFs.push(divisionVCF);
      stateVCFs.push(divisionVCF);
      countryVCFs.push(divisionVCF);

      createDirAndFile(
        ['vcf', 'states', state, area.name, division.name].map(hyphenate),
        divisionVCF
      );
    });

    createDirAndFile(
      ['vcf', 'states', state, area.name].map(hyphenate),
      areaVCFs.join('\n')
    );
  });

  createDirAndFile(
    ['vcf', 'states', state].map(hyphenate),
    stateVCFs.join('\n')
  );
});

createDirAndFile(
  ['vcf', 'nigeria'].map(hyphenate),
  countryVCFs.join('\n')
);
