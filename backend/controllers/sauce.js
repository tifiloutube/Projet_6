const Thing = require('../models/thing');

exports.createThing = (req, res, next) => {
    const thingObject = JSON.parse(req.body.sauce);
    delete thingObject._id;
    const thing = new Thing({
        ...thingObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        userLikes: [],
        userDislikes: []
    });
    thing.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneThing = (req, res, next) => {
    Thing.findOne({
        _id: req.params.id
    }).then(
        (thing) => {
            res.status(200).json(thing);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.modifyThing = (req, res, next) => {
    const thingObject = req.file ?
        {
            ...JSON.parse(req.body.thing),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifié !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteThing = (req, res, next) => {
    Thing.deleteOne({_id: req.params.id}).then(
        () => {
            res.status(200).json({
                message: 'Deleted!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.getAllStuff = (req, res, next) => {
    Thing.find().then(
        (things) => {
            res.status(200).json(things);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.likesDislikes = (req, res, next) => {
    let like = req.body.like;
    let userId = req.body.userId;
    let sauceId = req.params.id;

    if (like === 1) {
        Thing.updateOne({
            _id: sauceId
        }, {
            $push: {
                usersLiked: userId
            },
            $inc: {
                likes: +1
            },
        })
        .then(() => res.status(200).json({ message : 'like ajouté !'}))
        .catch((error) => res.status(400).json({ error }))
    }
    if (like === -1) {
        Thing.updateOne({
            _id: sauceId
        }, {
            $push: {
                usersDisliked: userId
            },
            $inc: {
                dislike: +1
            },
        })
        .then(() => res.status(200).json({ message : 'dislike ajouté !'}))
        .catch((error) => res.status(400).json({ error }))
    }
    if (like === 0) {
        Thing.findOne({
            _id: sauceId
        })
            .then((sauce) => {
                if (sauce.userLikes.includes(userId)) {
                    Thing.updateOne({
                        _id: sauceId
                    }, {
                        $push: {
                            usersLiked: userId
                        },
                        $inc: {
                            likes: -1
                        },
                    })
                    .then(() => res.status(200).json({ message : 'like retiré !'}))
                    .catch((error) => res.status(400).json({ error }))
                }
            })
        if (sauce.userDislikes.includes(userId)) {
            Thing.updateOne({
                _id: sauceId
            }, {
                $push: {
                    usersDisliked: userId
                },
                $inc: {
                    dislikes: -1
                },
            })
                .then(() => res.status(200).json({ message : 'dislike retiré !'}))
                .catch((error) => res.status(400).json({ error }))
        }
    }
}
