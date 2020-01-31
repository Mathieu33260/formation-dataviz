function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const request = async () => {
    const response = await fetch('https://raw.githubusercontent.com/iOiurson/formation-dataviz/master/data/pokedex.json');
    const data = await response.json();
    console.log(data);
    let types = [];
    data.forEach(pokemon => {
        let type1 = types.find(type => type.name === pokemon['Type 1']);
        let type2 = types.find(type => type.name === pokemon['Type 2']);
        if (type1) {
            type1.nb++;
        } else {
            types.push({name: pokemon['Type 1'], nb: 1})
        }
        if (type2) {
            type2.nb++;
        } else {
            types.push({name: pokemon['Type 2'], nb: 1})
        }
    });

    console.log('types', types);
    let sum = types.map(type => type.nb).reduce((acc, current) => acc + current);

    const bar = document.getElementById('container');
    bar.style.height = '50px';
    bar.style.width = '2000px';
    types = types.filter(type => type.name !== 'None').sort((type1, type2) => type1.nb > type2.nb ? -1 : 1);
    data.forEach(type => {
        let color = getRandomColor();
        const typeBar = document.createElement('div');
        typeBar.style.height = type['Speed'] + 'px';
        typeBar.style.width = type['Speed'] + 'px';
        typeBar.style.borderRadius = '50%';
        typeBar.style.position = "absolute";
        typeBar.style.left = type['Height (m)'] * 100 +'px';
        typeBar.style.top = type['Weight (kg)'] +'px';
        typeBar.style.backgroundColor = color;
        typeBar.addEventListener('mouseover', () => {
            typeBar.textContent = type['Name'];
        });
        typeBar.addEventListener('mouseout', () => {
            typeBar.textContent = '';
        });
        bar.append(typeBar);
    })
}


request();