exports.generateOptions = function (currentOption) {
    const optionsEnum = [
        { key: 1, label: 'crypto-wallet', selected: false },
        { key: 2, label: 'credit-card', selected: false },
        { key: 3, label: 'debit-card', selected: false },
        { key: 4, label: 'paypal', selected: false },
    ];

    const result = optionsEnum.map(x => x.label === currentOption ? { ...x, selected: true } : x);

    return result;
}

exports.isOwner = (user, crypto) => {
    return crypto.owner == user._id;
}
