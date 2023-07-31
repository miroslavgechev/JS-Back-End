const Book = require('../models/Book')
const { getErrorMessage } = require('../utils/getErrorMessage')
const { update, deleteElement } = require('../services/productService')

exports.getCatalog = async (req, res) => {
    const books = await Book.find({}).lean();

    res.render('catalog', { books });
    console.log('Catalog Page rendered');
}

exports.getCreate = async (req, res) => {
    res.render('create');
    console.log('Create Page rendered');
}

exports.postCreate = async (req, res) => {
    const { title, author, genre, stars, image, bookReview } = req.body;
    const owner = req.user._id;

    try {
        const book = new Book({ title, author, genre, stars, image, bookReview, owner });
        await book.save();

        res.redirect('/catalog');

    } catch (error) {
        return res.render('create', { error: getErrorMessage(error) });
    }

}

exports.getDetails = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).lean();
        const isAuthenticated = req.isAuthenticated;
        let isOwner = false;
        let hasWished = true;

        if (isAuthenticated) {
            isOwner = book.owner == req.user._id;
            hasWished = book.wishList?.some(x => x._id == req.user._id) ? true : false;
        }

        res.render('details', { book, isOwner, hasWished });
        console.log('Details Page rendered');

    }
    catch (error) {
        res.render('404', { error: getErrorMessage(error) });
    }
}

exports.getEdit = async (req, res) => {
    try {
        const bookId = req.params.id;
        const book = await Book.findById(bookId).lean();

        const isOwner = book.owner._id == req.user._id;

        if (!isOwner) {
            return res.render('404');
        }

        res.render('edit', { book });
        console.log('Edit Page rendered');
    } catch (error) {
        res.render('404', { error: getErrorMessage(error) });
    }
}

exports.postEdit = async (req, res) => {
    try {
        const { title, author, genre, stars, image, bookReview } = req.body;
        const bookId = req.params.id;

        await update(bookId, { title, author, genre, stars, image, bookReview });

        res.redirect(`/details/${bookId}`);

    } catch (error) {
        return res.render('404', { error: getErrorMessage(error) });
    }
}

exports.getWishBook = async (req, res) => {
    const bookId = req.params.id;
    const userId = req.user._id;

    try {
        await Book.findByIdAndUpdate(bookId, { $push: { wishList: userId } });
    }
    catch (error) {
        return res.render('details', { error: getErrorMessage(error) });
    }

    res.redirect(`/details/${bookId}`);

}

exports.getDelete = async (req, res) => {

    try {
        const bookId = req.params.id;
        const book = await Book.findById(bookId).lean();

        const isOwner = book.owner._id == req.user._id;

        if (!isOwner) {
            return res.render('404');
        }

        await deleteElement(bookId);

    } catch (error) {
        return res.render('404', { error: getErrorMessage(error) });
    }

    res.redirect('/catalog');

}

exports.getProfile = async (req, res) => {
    const profile = req.user;
    const userId = req.user._id;
    let wishList = await Book.find({ wishList: userId }).lean();
    res.render('profile', { profile, wishList });
}