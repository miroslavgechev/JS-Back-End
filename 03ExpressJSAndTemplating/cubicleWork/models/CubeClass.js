const db = require('../config/database.json');
const fs = require('fs');
const path = require('path');

class Cube {
    constructor(name, description, imageUrl, difficultyLevel) {
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.difficultyLevel = difficultyLevel;
    }

    save() {
        this.id = db[db.length - 1].id + 1;
        db.push(this);
        const dbJSON = JSON.stringify(db, null, 2);
        fs.writeFileSync(path.resolve(__dirname, '../config/database.json'), dbJSON);
    }

}

module.exports = Cube