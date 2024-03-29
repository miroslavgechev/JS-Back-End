
//Generate Options snippet
/**
exports.generateOptions = function (currentOption) {
    const optionsEnum = [
        { key: 'crypto-wallet', label: 'Crypto Wallet', selected: false },
        { key: 'credit-card', label: 'Credit Card', selected: false },
        { key: 'debit-card', label: 'Debit Card', selected: false },
        { key: 'paypal', label: 'PayPal', selected: false },
    ];

    const result = optionsEnum.map(x => x.key === currentOption ? { ...x, selected: true } : x);

    return result;
} 
*/

//Get Enum snippet
/**
const categories = {
    estate: 'Real Estate',
    vehicles: 'Vehicles',
    furniture: 'Furniture',
    electronics: 'Electronics',
    other: 'Other'
};
// auction.category = categories[auction.category];

}
 */

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