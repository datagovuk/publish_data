var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {

 // Store common vars

 res.locals.formData = "";
 res.locals.formQuery = "?";
 res.locals.data = {};
 res.locals.userName = req.session.userName;

 for (var name in req.query) {
   var value = req.query[name];
   res.locals.formData += '<input type="hidden" name="'+name+'" value="' + value + '">\n';
   res.locals.formQuery += name + "=" + value + "&";
   res.locals.data[name] = value;
 }

 res.locals.formQuery = res.locals.formQuery.slice(0,-1);

 if (!req.session.userName &&
     !req.originalUrl.match(/^\/login/) &&
     !req.originalUrl.match(/^\/send-login/)  &&
     !req.originalUrl.match(/^\//) &&
     !req.originalUrl.startsWith('/create_account') ) {
   res.redirect('/login');
 } else {
   next();
 }

});

router.get('/', function (req, res) {
  req.session.regenerate(function(err) {
    req.session.query = req.query;
    res.render('index');
  });
});


// Branching

// Question for questions/eligibility/index.html
router.get('/create_account/enter_details', function (req, res) {

  // get the answer from the query string (eg. ?existing_account="yes")
  var existing_account = req.query.existing_account;

  if (existing_account == "yes" ){

    // if users is DOES have account
    res.redirect("/create_account/search_for_existing_account" + res.locals.formQuery);

  } else {

    // if users is does NOT have account
    res.render('create_account/enter_details.html');

  }

});

router.get('/manage_data/upload_new_dataset/file_upload', function (req, res) {
  res.render(
    'manage_data/upload_new_dataset/file_upload.html',
    { query: req.query }
  );
});


// router.post('/manage_data/upload_new_dataset/preview', function (req, res) {
//   if (req.body['file-input'].startsWith('bad')) {
//     res.redirect('/manage_data/upload_new_dataset/file_upload?error=1')
//   } else {
//     res.render('manage_data/upload_new_dataset/preview.html');
//   }
// });


// Check if we've got to this page but user actually selected harvest
router.get('/menu', function (req, res) {
  res.redirect(req.query.goto);
});

// router.get('/manage_data/upload_new_dataset/licence', function (req, res) {
//   console.log(req.session.query);
//   res.render('manage_data/upload_new_dataset/licence.html', req.session.query);
// });


router.post('/send-login', function (req, res) {
  if (req.body.email == 'a@b.c' && req.body.password == 'foobar') {
    req.session.userName = req.body.email;
    res.redirect('/dashboard');
  }
});

router.get('/logout', function (req, res) {
  req.session.destroy(function(err) {
    res.redirect('/');
  });
})


module.exports = router;
