const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

const port = 5000;

const catsDB = require('./cats.json');
const breedsDB = require('./breeds.json');

const homePage = require('./handlers/home');
const shelterPage = require('./handlers/shelter');
const addBreedPage = require('./handlers/addBreed');
const addCatPage = require('./handlers/addCat');
const editCatPage = require('./handlers/editCat');
const siteCss = require('./css/site.css');

const server = http.createServer((req, res) => {

    const urlObj = url.parse(req.url);
    const path = urlObj.pathname;

    res.writeHead(200, {
        'Content-Type': 'text/html'
    })

    if (path === '/') {
        const searchTerm = qs.parse(urlObj.query).search;

        if (searchTerm) {
            modifiedCatsDB = catsDB.filter(cat => {
                let currCatArray = Object.values(cat)
                    .filter(el =>
                        el.toString()
                            .toLocaleLowerCase()
                            .includes(searchTerm.toLocaleLowerCase()));

                return currCatArray.length > 0 ? true : false

            });

            res.write(homePage(modifiedCatsDB, searchTerm));
            console.log('Search perfomed, Home page loaded.')

        } else {
            console.log('Home page loaded.')
            res.write(homePage(catsDB))
        }

    } else if (path === '/css/site.css') {
        res.writeHead(200, {
            'Content-Type': 'text/css'
        })
        res.write(siteCss)

    } else if (/cats\/\d+\/shelter/.test(path)) {
        let catId = Number(path.split('/')[2]);
        const query = urlObj.query;

        if (req.method === 'GET' && query === '') {
            modifiedCatsDB = catsDB.filter(cat => cat.id !== catId);
            fs.writeFileSync('./cats.json', JSON.stringify(modifiedCatsDB), { encoding: 'utf-8' });
            res.write(homePage(modifiedCatsDB));
        } else {
            let cat = catsDB.find(cat => cat.id === catId);
            res.write(shelterPage(cat));
        }

    } else if (path === '/cats/add-breed') {
        const breed = qs.parse(urlObj.query).breed;

        if (breed && req.method === 'GET' && !breedsDB.includes(breed)) {
            breedsDB.push(breed);
            fs.writeFileSync('./breeds.json', JSON.stringify(breedsDB), { encoding: 'utf-8' });
            console.log('New breed added to breeds db')
            res.write(homePage(catsDB));
        } else {
            res.write(addBreedPage);
            console.log('Add breed page loaded.');
        }

    } else if (path === '/cats/add-cat') {

        const { name, description, imageUrl, breed } = qs.parse(urlObj.query);
        const id = catsDB.length + 1;

        if (name && description && imageUrl && breed && req.method === 'GET') {
            catsDB.push({ id, name, description, imageUrl, breed })
            fs.writeFileSync('./cats.json', JSON.stringify(catsDB), { encoding: 'utf-8' })
            console.log('New cat added to cat db')
            res.write(homePage(catsDB));
        } else {
            res.write(addCatPage(breedsDB));
            console.log('Add cat page loaded.');
        }

    } else if (/cats\/\d+\/edit/.test(path)) {

        let catId = Number(path.split('/')[2]);
        const { name, description, imageUrl, breed } = qs.parse(urlObj.query);

        if (name && description && imageUrl && breed && req.method === 'GET') {
            catsDB[catId - 1] = { id: catId, name, description, imageUrl, breed }
            fs.writeFileSync('./cats.json', JSON.stringify(catsDB), { encoding: 'utf-8' })
            res.write(homePage(catsDB));
            console.log(`Cat with index ${catId} edited.`);
        } else {
            let cat = catsDB.find(cat => cat.id === catId);
            res.write(editCatPage(cat));
            console.log('Edit cat page loaded.');
        }

    } else {
        res.write(`<h1>Error 404 - page not found</h1>`);

    };

    res.end();

})

server.listen(port);
console.log(`Server is running on port ${port}...`)