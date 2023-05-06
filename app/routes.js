const { result } = require('lodash');

const ObjectId = require('mongodb').ObjectId
module.exports = function(app, passport, db) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
    //reads, gets all the logs
    app.get('/profile', isLoggedIn, function(req, res) {
        db.collection('studylog').find().toArray((err, result) => {
          if (err) 
          return console.log(err)
          res.render('profile.ejs', {
            user : req.user,
            studylogs: result
          })
        })
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout(() => {
          console.log('User has logged out!')
        });
        res.redirect('/');
    });

//  routes ===============================================================

//post of each entry/create adds new log
    app.post('/studylogs', (req, res) => {
      db.collection('studylog').save({
        date: req.body.date, 
        subject: req.body.subject, 
        time: req.body.time
      }, 
      (err, result) => {
        if (err) 
        return console.log(err)
        console.log('Entry inserted into database')
        res.redirect('/profile')
      })
    })

    app.put('/updateStudylogs', (req, res) => {
      const _id = ObjectId(req.body._id)
      const date = req.body.date
      const subject = req.body.subject
      const time = req.body.time
      db.collection('studylog')
      .findOneAndUpdate({
        _id: _id
      }, 
      {
        $set: {
          date: date, 
          subject: subject, 
          time: time
        }
      },
         (err, result) => {
        if (err) return res.send(err)
        res.send('Log updated')
      })
    })

    app.delete('/studylogs', (req, res) => {
      const _id = ObjectId(req.body._id)
      db.collection('studylog').findOneAndDelete({
        _id
      }, 
      (err, result) => {
        if (err) return res.send('Error deleting studylog from database', err)
        res.send('Studylog deleted from database')
      })
    })

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
