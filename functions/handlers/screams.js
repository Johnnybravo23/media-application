const db = require('../util/admin');


// getting all the screams
exports.getAllScreams = (req, res) => {
    db
    .collection('screams')
    .orderBy('createdAt', 'desc')
    .get()
    .then(data => {
        let screams = []; // initializing an arrays or screams
        data.forEach(doc => {
           screams.push({
               screamId: doc.id,
               body: doc.data().body,
               userHandle: doc.data().userHandle,
               commentCount: doc.data().commentCount,
               likeCount: doc.data().likeCount,
               createdAt: doc.data().createdAt
           });
        });
        return res.json(screams);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: err.code});
    })
}

// creating a route to post a scream
exports.postOneScream = (req, res) => {
    if (req.body.body.trim() === '') {
        return res.status(400).json({ body: 'Body must not be empty'});
    }
    const newScream = {
        body: req.body.body,
        userHandle: req.user.handle,
        createdAt: new Date().toISOString()
    };
        db.collection('screams')
         .add(newScream)
         .then(doc => {
             res.json({ message: `document ${doc.id} created successfully`});
         })
         .catch(err => {
             res.status(500).json({ error: 'Something went wrong'});
             console.log(err);
         })
 }