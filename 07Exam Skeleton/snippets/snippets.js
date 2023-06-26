// Search
exports.getHomePage = async (req, res) => {

    const { search, from: difficultyFrom, to: difficultyTo } = req.query;

    let cubes = await Cube.find().lean();

    if (search) {
        cubes = cubes.filter(cube => cube.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
    }

    if (difficultyFrom) {
        cubes = cubes.filter(cube => cube.difficultyLevel >= difficultyFrom);
    }

    if (difficultyTo) {
        cubes = cubes.filter(cube => cube.difficultyLevel <= difficultyTo);
    }

    res.render('index', { cubes, search, difficultyFrom, difficultyTo });
    console.log('Index Page rendered');
}

//Generate Options List
exports.generateDifficultyLevels = function (currentDifficultyLevel) {
    const difficultyLevelsEnum = [
        { key: 1, label: 'Very Easy', selected: false },
        { key: 2, label: 'Easy', selected: false },
        { key: 3, label: 'Medium (Standard 3x3)', selected: false },
        { key: 4, label: 'Intermediate', selected: false },
        { key: 5, label: 'Expert', selected: false },
        { key: 6, label: 'Hardcore', selected: false }
    ];

    const result = difficultyLevelsEnum.map(x => x.key === currentDifficultyLevel ? { ...x, selected: true } : x);

    return result;
}

//Is Owner
exports.isOwner = (user, cube) => {
    return cube.owner == user._id;
}
