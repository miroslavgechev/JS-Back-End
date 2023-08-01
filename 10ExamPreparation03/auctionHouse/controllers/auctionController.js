const Auction = require('../models/Auction');
const { getEnum, generateOptions } = require('../utils/utils');

exports.getCreate = (req, res) => {
    res.render('create');
    console.log('Create Page rendered');
}

exports.postCreate = async (req, res) => {
    const { title, description, imageUrl, price, category } = req.body;
    const author = req.user._id;

    try {
        const auction = new Auction({ title, description, imageUrl, price, category, author });
        await auction.save();

    } catch (error) {
        return res.render('create', { error: error.message });
    }

    res.redirect('/browse');
}

exports.getBrowse = async (req, res) => {
    const auctions = await Auction.find({ closed: false }).lean();

    res.render('browse', { auctions });
    console.log('Browse Page rendered');
}

exports.getDetails = async (req, res) => {

    try {
        const auction = await Auction.findOne({_id: req.params.id, closed: false}).populate('author').populate('bidder').lean();

        if(!auction) {
            return res.render('404', { error: 'Auction not found!' });
        }

        const isAuthenticated = req.isAuthenticated;
        let isAuthor = false;
        let currentBidder = '';
        let isHighestBidder = false;
        const category = getEnum(auction.category);

        if (isAuthenticated) {
            isAuthor = auction.author._id == req.user._id;
        }

        if (isAuthor && auction.bidder) {
            currentBidder = auction.bidder.firstName + ' ' + auction.bidder.lastName;
        }

        if (!isAuthor && auction.bidder) {
            isHighestBidder = auction.bidder._id == req.user._id;
        }

        res.render('details', { auction, category, isAuthor, currentBidder, isHighestBidder });
        console.log('Details Page rendered');

    } catch (error) {
        res.render('404', { error: error.message });
    }
}

exports.postBid = async (req, res) => {
    const auction = await Auction.findById(req.params.id).populate('author').populate('bidder').lean();
    const bidderId = req.user._id;
    const bidPrice = Number(req.body.bid);

    if (auction.author._id == bidderId) {
        return res.render('details', { auction, error: 'You cannot bid on your own auction!' });
    }

    if (auction.bidder?._id == bidderId) {
        return res.render('details', { auction, error: 'You are already the highest bidder!' });
    }

    if (auction.price < bidPrice) {
        await Auction.findByIdAndUpdate(req.params.id, { bidder: bidderId, price: bidPrice });
        return res.redirect(`/details/${req.params.id}`);
    } else {
        return res.render('details', { auction, error: 'Your bid should be higher than the current price!' });
    }

}

exports.getEdit = async (req, res) => {

    const auction = await Auction.findById(req.params.id).populate('author').populate('bidder').lean();
    const user = req.user;
    const categories = generateOptions(auction.category)

    if (user._id != auction.author._id) {
        res.redirect(`/details/${req.params.id}`);
        throw new Error('You are not authorized to edit this auction!');
    }

    const hasBidder = auction.bidder ? true : false;

    res.render('edit', { auction, hasBidder, categories });
    console.log('Edit Page rendered');
}

exports.postEdit = async (req, res) => {
    const auction = await Auction.findById(req.params.id).populate('author').populate('bidder').lean();
    const { title, description, imageUrl, price, category } = req.body;
    const author = req.user._id;
    const hasBidder = auction.bidder ? true : false;

    if (price !== auction.price && hasBidder) {
        res.redirect(`/details/${req.params.id}`);
        throw new Error('You are not authorized to edit the price of an auction with a bidder!');
    }


    if (author != auction.author._id) {
        res.redirect(`/details/${req.params.id}`);
        throw new Error('You are not authorized to edit this auction!');
    }

    try {
        await Auction.findByIdAndUpdate(req.params.id, { title, description, imageUrl, price, category });
    } catch (error) {
        return res.render('edit', { error: error.message, auction, hasBidder });
    }

    res.redirect(`/details/${req.params.id}`);
}

exports.getDelete = async (req, res) => {
    const auction = await Auction.findById(req.params.id).populate('author').populate('bidder').lean();
    const user = req.user;

    if (user._id != auction.author._id) {
        res.redirect(`/details/${req.params.id}`);
        throw new Error('You are not authorized to delete this auction!');
    }

    try {
        await Auction.findByIdAndDelete(req.params.id);
        res.redirect('/browse');
        console.log('Item deleted');

    } catch (error) {
        res.render(`404`, { error: error.message });
        throw new Error(error.message);
    }

}

exports.getClose = async (req, res) => {
    try {
        await Auction.findByIdAndUpdate(req.params.id, { closed: true });
        res.redirect('/closed-auctions');
    } catch (error) {
        res.render(`404`, { error: error.message });
    }

}

exports.getProfile = async (req, res) => {
    const auctions = await Auction.find({ closed: true, author: req.user._id }).populate('bidder').lean();

    res.render('profile', { auctions });
    console.log('Profile Page rendered');
}