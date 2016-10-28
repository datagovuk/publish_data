var express = require('express');
var router = express.Router();
var session = require('./session');

router.use(function (req, res, next) {

  // Store common vars
  res.locals.data = {};

  // expose session data to templates
  res.locals.data = req.session.data;
  res.locals.query = req.query


  //console.log('query', req.query);
  //console.log('headers', req.headers);

  if (req.session.data && req.session.data.userName) {
    console.log(req.session.data);
    next();
  } else {
    if (req.originalUrl.match(/^\/login$/) ||
        req.originalUrl.match(/^\/send-login$/) ||
        req.originalUrl.match(/^\/$/) ||
        req.originalUrl.match(/^\/create_account/)) {
      next();
    } else {
      res.redirect('/login');
    }
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
//    res.redirect("/create_account/search_for_existing_account" + res.locals.formQuery);

  } else {

    // if users is does NOT have account
    res.render('create_account/enter_details.html');

  }

});


router.get(
  '/manage_data/upload_new_dataset',
  function (req, res) {
    req.session.data.newSet = {};
    res.redirect('upload_new_dataset/title_summary');
  }
);


router.post('/manage_data/upload_new_dataset/file_upload', function (req, res) {

  req.session.data.newSet.title = req.body['title-dataset'];
  req.session.data.newSet.summary = req.body['summary-dataset'];

  res.render('manage_data/upload_new_dataset/file_upload.html');
});


router.post('/manage_data/upload_new_dataset/themes_auto', function (req, res) {
  req.session.data.newSet.licence = req.body['licence'];
  req.session.data.newSet.otherLicence = req.body['other-licence'];
  req.session.data.newSet.themes = ['Business and economy', 'Environment'];
  res.render('manage_data/upload_new_dataset/themes_auto.html');
});

router.post('/manage_data/upload_new_dataset/geo', function (req, res) {
  var themes = req.body['themes'];
  req.session.data.newSet.themes = typeof themes === 'string' ? [themes] : themes;
  res.render('manage_data/upload_new_dataset/geo.html');
});

router.post('/manage_data/upload_new_dataset/start_date', function (req, res) {
  var geo = req.body['geo'];
  req.session.data.newSet.geo = typeof geo === 'string' ? [geo] : geo;
  req.session.data.newSet.otherGeo = req.body['other-geo'];
  res.render('manage_data/upload_new_dataset/start_date.html');
});

router.post(
  '/manage_data/upload_new_dataset/update_frequency',
  function (req, res) {
    req.session.data.newSet.startDay = req.body['start-day'];
    req.session.data.newSet.startMonth = req.body['start-month'];
    req.session.data.newSet.startYear = req.body['start-year'];
    res.render('manage_data/upload_new_dataset/update_frequency.html');
  }
);

router.post('/manage_data/upload_new_dataset/end_date', function (req, res) {
  req.session.data.newSet.frequency = req.body['frequency'];
  res.render('manage_data/upload_new_dataset/end_date.html');
});

router.post('/manage_data/upload_new_dataset/check', function (req, res) {

  // we might be coming back from a modify page, in which case there is
  // extra post data
  if (req.body['title-dataset']) {
    req.session.data.newSet.title = req.body['title-dataset'];
  }
  if (req.body['summary-dataset']) {
    req.session.data.newSet.summary = req.body['summary-dataset'];
  }
  if (req.body['url']) {
    req.session.data.newSet.url = req.body['url'];
    // we should also re-check for errors if the URL has changed
  }
  if (req.body['licence']) {
    req.session.data.newSet.licence = req.body['licence'];
  }
  if (req.body['other-licence']) {
    req.session.data.newSet.otherLicence = req.body['other-licence'];
  }
  if (req.body['themes']) {
    var themes = req.body['themes'];
    req.session.data.newSet.themes = typeof themes === 'string' ? [themes] : themes;
  }
  if (req.body['geo']) {
    var geo = req.body['geo'];
    req.session.data.newSet.geo = typeof geo === 'string' ? [geo] : geo;
  }
  if (req.body['other-geo']) {
    req.session.data.newSet.otherGeo = req.body['other-geo'];
  }
  if (req.body['start-day']) {
    req.session.data.newSet.startDay = req.body['start-day'];
  }
  if (req.body['start-month']) {
    req.session.data.newSet.startMonth = req.body['start-month'];
  }
  if (req.body['start-year']) {
    req.session.data.newSet.startYear = req.body['start-year'];
  }
  if (req.body['end-day']) {
    req.session.data.newSet.endDay = req.body['end-day'];
  }
  if (req.body['end-month']) {
    req.session.data.newSet.endMonth = req.body['end-month'];
  }
  if (req.body['end-year']) {
    req.session.data.newSet.endYear = req.body['end-year'];
  }
  if (req.body['frequency']) {
    req.session.data.newSet.frequency = req.body['frequency'];
  }



  res.render('manage_data/upload_new_dataset/check.html');
});


router.get('/datasets/edit/:index', function (req, res) {
  console.log(req.params.index, req.session.data.sets[req.params.index]);

  req.session.data.newSet = req.session.data.sets.splice(req.params.index, 1)[0];

  res.redirect('/manage_data/upload_new_dataset/check?edit=1');
});


router.get('/datasets', function (req, res) {
  res.render('datasets/index.html', { query: req.query });
});



// Check if we've got to this page but user actually selected harvest
router.get('/menu', function (req, res) {
  res.redirect(req.query.goto);
});

router.post('/manage_data/upload_new_dataset/licence', function (req, res) {
  req.session.data.newSet.url = req.body['dataset-url'];
  if (req.body['dataset-url'] === 'http://justice.gov.uk/test-data') {
    res.redirect('/manage_data/upload_new_dataset/file_upload?error=1')
  } else {
    res.render('manage_data/upload_new_dataset/licence.html');
  }
});


router.get('/manage_data/upload_new_dataset/publish_submit',
  function (req, res) {
    req.session.data.sets.unshift(req.session.data.newSet);
    req.session.data.newSet = {};
    latestSet = req.session.data.sets[0];
    switch(req.query['status']) {
      case 'now':
        latestSet.status = 'published';
        res.redirect('/manage_data/upload_new_dataset/want_notifications');
        break;
      case 'draft':
        latestSet.status = 'draft';
        res.redirect('/datasets?status=draft');
        break;
      case 'schedule':
        latestSet.status = 'scheduled';
        res.redirect('/manage_data/upload_new_dataset/publish_date');
        break;
      default:
        console.log('Error: unhandled status value: ' + req.query.status);
        res.render('manage_data/upload_new_dataset/want_notifications.html');
        break;
    }
  }
);


router.post('/send-login', function (req, res) {
  if (req.body.email == 'a@b.c' && req.body.password == 'foobar') {
    req.session.data = { userName: req.body.email };
    req.session.data.sets = session.initialDataSets();
    res.redirect('/dashboard');
  }
});


router.get('/logout', function (req, res) {
  req.session.destroy(function(err) {
    res.redirect('/');
  });
})


module.exports = router;
