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
    types = types.filter(type => type.name !== 'None');
    types.forEach(type => {
        let percent = type.nb / sum * 100;
        let color = getRandomColor();
        console.log(type.name + ' ' + percent + ' ' + color);
        const typeBar = document.createElement('div');
        typeBar.style.height = '50px';
        typeBar.style.width = percent * 20 + 'px';
        typeBar.style.backgroundColor = color;
        typeBar.textContent = type.name;
        bar.append(typeBar);
    })
}


request();