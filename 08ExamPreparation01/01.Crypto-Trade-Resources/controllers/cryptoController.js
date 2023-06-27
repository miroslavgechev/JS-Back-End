const Crypto = require('../models/Crypto');
const { update, deleteElement } = require('../services/cryptoService');
const { getErrorMessage } = require('../utils/getErrorMessage');
const { generateOptions } = require('../utils/cryptoUtils');

exports.getCreate = (req, res) => {

    res.render('create', {});
    console.log('Create Page rendered');

}

exports.postCreate = async (req, res) => {
    const { name, image, price, description, paymentMethod } = req.body;
    const owner = req.user._id;

    try {
        const coin = new Crypto({ name, image, price, description, paymentMethod, owner });
        await coin.save();

    } catch (error) {
        return res.render('create', { error: getErrorMessage(error) });
    }

    res.redirect('/catalog');
}

exports.getCatalog = async (req, res) => {
    const coins = await Crypto.find({}).lean();

    res.render('catalog', { coins });
    console.log('Catalog Page rendered');
}

exports.getDetails = async (req, res) => {

    try {
        const coin = await Crypto.findById(req.params.id).populate('owner').populate('buyer').lean();

        const isAuthenticated = req.isAuthenticated;
        let isOwner = false;
        let hasBought = true;

        if (isAuthenticated) {
            isOwner = coin.owner._id == req.user._id;
            hasBought = coin.buyer.some(x => x._id == req.user._id) ? true : false;
        }

        res.render('details', { coin, isOwner, hasBought });
        console.log('Details Page rendered');

    } catch (error) {
        res.render('404', { error: getErrorMessage(error) });
    }
}

exports.getBuyCoin = async (req, res) => {
    const coinId = req.params.id;
    const userId = req.user._id;

    try {
        await update(coinId, { buyer: userId })

    } catch (error) {
        return res.render('details', { error: getErrorMessage(error) });
    }

    res.redirect(`/details/${coinId}`);
}

exports.getEdit = async (req, res) => {
    try {
        const coin = await Crypto.findById(req.params.id).lean();
        const options = generateOptions(coin.paymentMethod);
        const isOwner = coin.owner._id == req.user._id;

        if (!isOwner) {
            return res.render('404');
        }

        res.render('edit', { coin, options });
        console.log('Edit Page rendered');
    } catch (error) {

        res.redirect(`/details/${req.params.id}`, { error: getErrorMessage(error) });
    }
}

exports.postEdit = async (req, res) => {
    try {
        const { name, image, price, description, paymentMethod } = req.body;
        const coinId = req.params.id;

        await update(coinId, { name, image, price, description, paymentMethod });

        res.redirect(`/details/${req.params.id}`);

    } catch (error) {
        res.redirect(`/details/${req.params.id}`, { error: getErrorMessage(error) });
    }
}

exports.getDelete = async (req, res) => {

    try {
        const coinId = req.params.id;
        const coin = await Crypto.findById(coinId).lean();

        const isOwner = coin.owner._id == req.user._id;
        if (!isOwner) {
            return res.render('404');
        }

        await deleteElement(coinId);

        redirect('/catalog')

    } catch (error) {
        res.render(`details`, { error: getErrorMessage(error) });
    }
}

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