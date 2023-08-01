
//Generate Options snippet
exports.generateOptions = function (currentOption) {
    const optionsEnum = [
        { key: 'estate', label: 'Real Estate', selected: false },
        { key: 'vehicles', label: 'Vehicles', selected: false },
        { key: 'furniture', label: 'Furniture', selected: false },
        { key: 'electronics', label: 'Electronics', selected: false },
        { key: 'other', label: 'Other', selected: false }
    ];

    const result = optionsEnum.map(x => x.key === currentOption ? { ...x, selected: true } : x);

    return result;
}

//Get Enum
exports.getEnum = function (currentOption) {
    const optionsEnum = [
        { key: 'estate', label: 'Real Estate'},
        { key: 'vehicles', label: 'Vehicles'},
        { key: 'furniture', label: 'Furniture'},
        { key: 'electronics', label: 'Electronics'},
        { key: 'other', label: 'Other'}
    ];
    
    const result = optionsEnum.find(x => x.key === currentOption)['label'];

    return result;
}


//Search snippet  
/**
exports.getSearch = async (req, res) => {

    try {
        const { searchTerm, paymentMethod } = req.query;

        let coins = await Crypto.find().lean();

        if (searchTerm) {
            coins = coins.filter(coin => coin.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));
        }

        if (paymentMethod) {
            coins = coins.filter(coin => coin.paymentMethod.toLocaleLowerCase().includes(paymentMethod.toLocaleLowerCase()));
        }

        res.render('search', { coins, searchTerm, options: generateOptions(paymentMethod) });
        console.log('Search Page rendered');
        
    } catch (error) {
        res.render('search', { error: getErrorMessage(error) });
    }
}
 */ 

//Get specifi profile info snipper
/**
  exports.getProfile = async (req, res) => {
    const profile = req.user;
    const userId = req.user._id;
    let wishList = await Book.find({ wishList: userId }).lean();
    res.render('profile', { profile, wishList });
}
 */