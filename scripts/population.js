function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const request = async () => {
    const response = await fetch('../data/population.json');
    const data = await response.json();
    console.log(data);
    let sum = data.map(city => city.population).reduce((acc, current) => acc + current);
    console.log(sum);
    const bar = document.getElementById('bar');
    bar.style.height = '100px';
    bar.style.width = '1000px';
    data.forEach(city => {
        let percent = city.population / sum * 100;
        let color = getRandomColor();
        console.log(city.name + ' ' + percent + ' ' + color);
        const cityBar = document.createElement('div');
        cityBar.style.height = '100px';
        cityBar.style.width = percent * 10 + 'px';
        cityBar.style.backgroundColor = color;
        cityBar.textContent = city.name;
        bar.append(cityBar);
    })
}


request();
