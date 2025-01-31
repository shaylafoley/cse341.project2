const passport = require('passport');
const router = require('express').Router();

// Swagger Documentation Route
router.use('/', require('./swagger'));

// API Routes
router.use('/contacts', require('./contacts'));
router.use('/books', require('./books'));

// GitHub Login Route
router.get('/login', passport.authenticate('github'));

// GitHub Authentication Callback
router.get('/github/callback', 
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
        console.log("GitHub Auth Success:", req.user); // Debugging log
        req.session.user = req.user; // Save user session
        res.redirect('/'); // Redirect to homepage or dashboard
    }
);

// Logout Route
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log("Error logging out:", err);
            return res.status(500).send("Failed to log out.");
        }
        res.redirect('/');
    });
});

module.exports = router;


// const passport = require('passport');

// const router = require('express').Router();

// router.use('/', require('./swagger'));

// // router.get('/', (req, res) => {
// //     //#swagger.tags=['Hello World']
// //     res.send('Hello World');
// // });


// router.use('/contacts', require('./contacts'));

// router.use('/books', require('./books'));

// router.get('/login', passport.authenticate('github'), (req, res) => {});



// router.get('/logout', function(req, res, next) {
//     req.logout(function(err) {
//         if (err) { return next(err); }
//             res.redirect('/');
//     });
// });

// module.exports = router;