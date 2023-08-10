const Creature = require('../models/creature');
const { getErrorMessage } = require('../utils/getErrorMessage');


exports.getCreate = (req, res) => {
    res.render('create');
    console.log('Create page rendered');
}

exports.postCreate = async (req, res) => {
    const { name, species, skinColor, eyeColor, imageUrl, description } = req.body;
    const owner = req.user._id;

    try {
        const creature = new Creature({ name, species, skinColor, eyeColor, imageUrl, description, owner });
        await creature.save();
        console.log('Creature created');

    } catch (error) {
        return res.render('create', { error: getErrorMessage(error) });
    }

    res.redirect('/catalog');
}

exports.getCatalog = async (req, res) => {
    const creatures = await Creature.find({}).lean();

    res.render('catalog', { creatures });
    console.log('Catalog page rendered');
}

exports.getDetails = async (req, res) => {

    try {
        const creatureId = req.params.id;
        const creature = await Creature.findById(creatureId).lean().populate('owner').populate('votes');
        const creatureAuthor = `${creature.owner.firstName} ${creature.owner.lastName}`

        const userId = req.user?._id;
        const isAuthenticated = req.isAuthenticated;
        const hasVotes = creature.votes.length > 0 ? true : false;

        let isOwner = false;
        let hasVoted = false;
        let voters = '';
        const votesCount = hasVotes ? creature.votes.length : 0;

        if (isAuthenticated) {
            isOwner = userId == creature.owner._id;
            hasVoted = creature.votes.some(x => x._id == userId);
        }

        if (votesCount > 0) {
            voters = creature.votes.map(voter => `${voter.email}`).join(', ');
        }

        res.render('details', { creature, creatureAuthor, isOwner, hasVoted, hasVotes, votesCount, voters });
        console.log('Details page rendered');
    } catch (error) {
        res.render('404', { error: getErrorMessage(error) });
    }
}

exports.getVote = async (req, res) => {
    const creatureId = req.params.id;
    const userId = req.user._id;

    try {
        const creature = await Creature.findById(creatureId).populate('votes').lean();

        if (userId == creature.owner._id) {
            throw new Error('You cannot vote for your own creature');
        }

        if (creature.votes.some(x => x._id == userId)) {
            throw new Error('You have already voted for this creature');
        }

    } catch (error) {
        return res.render('404', { error: getErrorMessage(error) });
    }

    try {
        await Creature.findByIdAndUpdate(creatureId, { $push: { votes: userId } });

        res.redirect(`/details/${creatureId}`);
        console.log('Creature voted');

    } catch (error) {
        res.render('details', { error: getErrorMessage(error) });
    }
}

exports.getEdit = async (req, res) => {
    const creatureId = req.params.id;

    try {
        const creature = await Creature.findById(creatureId).lean();

        const isOwner = creature.owner._id == req.user._id;
        if (!isOwner) {
            return res.render('404', { error: 'You cannot edit this creature' });
        }

        res.render('edit', { creature });
        console.log('Edit page rendered');

    } catch (error) {
        res.render('404', { error: getErrorMessage(error) });
    }
}

exports.postEdit = async (req, res) => {
    const creatureId = req.params.id;

    const { name, species, skinColor, eyeColor, imageUrl, description } = req.body;

    try {
        const creature = await Creature.findById(creatureId).lean();
        const isOwner = creature.owner._id == req.user._id;

        if (!isOwner) {
            throw new Error('You cannot edit this creature');
        }
    } catch (error) {
        return res.render('404', { error: getErrorMessage(error) });
    }

    try {
        await Creature.findByIdAndUpdate(creatureId, { name, species, skinColor, eyeColor, imageUrl, description }, { runValidators: true });

        res.redirect(`/details/${creatureId}`);
        console.log('Creature edited');

    } catch (error) {
        try {
            const creature = await Creature.findById(creatureId).lean();
            res.render('edit', { creature, error: getErrorMessage(error) });
        } catch (error) {
            res.render('404', { error: getErrorMessage(error) });
        }
    }
}