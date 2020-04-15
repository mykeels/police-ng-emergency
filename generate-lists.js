const { states } = require('./emergency-contacts.json');

const hyphenate = name => name.toLowerCase()
    .replace(/ /g, '-')
    .replace(/^commander\-\'?\w\'?-/g, '');

const ROOT = 'https://mykeels.github.io/police-ng-emergency/vcf/states/';

const createLink = (name, href) => {
    return `<li class="list-group-item list-group-item-action" aria-label="${name}">
    <a href="${ROOT}${href}.vcf" download>${name}</a>
  </li>`
}

const createAreaLink = (state, name, divisions = [])  => {
    return `
    <li class="list-group-item list-group-item-action" id="${state}-${hyphenate(name)}" style="cursor: pointer;">
        <div data-toggle="collapse" data-target="#${state}-${hyphenate(name)}-Areas" aria-expanded="true" aria-controls="${state}-${hyphenate(name)}-Areas">
            <a
                href="${ROOT}${state}/${hyphenate(name)}.vcf"
                download
            >
                ${name.toUpperCase()}
                 
            </a>

            ${
                divisions.length ? `<small class="float-right">
                    <span class="d-none d-sm-inline">Click to expand </span>${divisions.length} Divisions
                </small>` : ''
            }
        </div>

        <div id="${state}-${hyphenate(name)}-Areas" class="collapse" style="padding-top: 15px" aria-label="${name} ${state} Divisions" data-parent="#${state}-${hyphenate(name)}">
            <ul class="list-group" aria-label="Commands">
                ${divisions.map(division => createLink(division.name, `${state}/${hyphenate(name)}/${hyphenate(division.name)}`)).join('\n')}
            </ul>
        </div>
    </li>
  `;
  }

const createStateLink = (name, commands = [], areas = [])  => {
    return `
    <li class="list-group-item list-group-item-action" id="${hyphenate(name)}" style="cursor: pointer;">
        <div data-toggle="collapse" data-target="#${hyphenate(name)}-Areas" aria-expanded="true" aria-controls="${hyphenate(name)}-Areas">
            <a
                href="${ROOT}${hyphenate(name)}.vcf"
                download
            >
                ${name.toUpperCase()}
            </a>

            ${
                (commands.length && areas.length) ? `<small class="float-right">
                    <span class="d-none d-sm-inline">Click to expand </span>${commands.length} Commands, ${areas.length} Areas
                </small>` : ''
            }
        </div>

        <div id="${hyphenate(name)}-Areas" class="collapse" style="padding-top: 15px" aria-label="${name} Commands and Areas" data-parent="#${hyphenate(name)}">
            <ul class="list-group" aria-label="Commands">
                ${commands.map(command => createLink(command.name, `${hyphenate(name)}/${hyphenate(command.name)}`)).join('\n')}
            </ul>
            <ul class="list-group" aria-label="Areas">
                ${areas.map(area => createAreaLink(name, area.name, area.divisions)).join('\n')}
            </ul>
        </div>
    </li>
  `;
  }

states.map(state => {
    console.log(createStateLink(state.state, state.commandControlRooms, state.areas));
});