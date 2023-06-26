exports.generateDifficultyLevels = function (currentDifficultyLevel) {
    const difficultyLevelsEnum = [
        { key: 1, label: 'Very Easy', selected: false },
        { key: 2, label: 'Easy', selected: false },
        { key: 3, label: 'Medium (Standard 3x3)', selected: false },
        { key: 4, label: 'Intermediate', selected: false },
        { key: 5, label: 'Expert', selected: false },
        { key: 6, label: 'Hardcore', selected: false }
    ];

    const result = difficultyLevelsEnum.map(x => x.key === currentDifficultyLevel ? {...x, selected: true } : x);

    return result;
}

exports.isOwner = (user, cube) => {
    return cube.owner == user._id;
}
