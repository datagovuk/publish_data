var express = require('express');
var router = express.Router();
var session = require('./session');


var helmet = require('helmet');
router.use(helmet());
router.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'"],
    scriptSrc: ["'self'", "'sha256-+6WnXIl4mbFTCARd8N3COQmT3bJJmo32N8q8ZSQAIcU='"],
    fontSrc: ['data:']
  }
}));


router.use(function (req, res, next) {

  // Store common vars
  res.locals.data = {};

  // expose session data to templates
  res.locals.data = req.session.data;
  res.locals.query = req.query

  //console.log('query', req.query);
  //console.log('headers', req.headers);

  if (req.session.data && req.session.data.userName) {
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
  req.session.data.newSet = collectFormData(req, req.session.data.newSet);
  res.render('manage_data/upload_new_dataset/file_upload.html');
});


router.post('/manage_data/upload_new_dataset/themes_auto', function (req, res) {
  req.session.data.newSet = collectFormData(req, req.session.data.newSet);
  req.session.data.newSet.themes = ['Business and economy', 'Environment'];
  res.render('manage_data/upload_new_dataset/themes_auto.html');
});


router.post('/manage_data/upload_new_dataset/themes_confirm',
  function (req, res) {
    req.session.data.newSet = collectFormData(req, req.session.data.newSet);
    res.render('manage_data/upload_new_dataset/themes_confirm.html');
  }
);


router.post('/manage_data/upload_new_dataset/geo', function (req, res) {
  req.session.data.newSet = collectFormData(req, req.session.data.newSet);
  res.render('manage_data/upload_new_dataset/geo.html');
});

router.post(
  '/manage_data/upload_new_dataset/update_frequency',
  function (req, res) {
    req.session.data.newSet = collectFormData(req, req.session.data.newSet);
    res.render('manage_data/upload_new_dataset/update_frequency.html');
  }
);

router.post('/manage_data/upload_new_dataset/check', function (req, res) {
  req.session.data.newSet = collectFormData(req, req.session.data.newSet);
  res.render('manage_data/upload_new_dataset/check.html');
});

/* === Dataset management === */

router.get('/datasets/edit/:index', function (req, res) {
  var datasetToEdit = req.session.data.sets[req.params.index];
  res.render(
    'manage_data/edit_dataset/index.html',
    { index: req.params.index, dataset: datasetToEdit }
  );
});

router.get('/datasets/delete/:index', function (req, res) {
  req.session.data.sets.splice(req.params.index, 1);
  res.redirect('/datasets?deleted=1');
});

router.post('/datasets', function (req, res) {
  req.session.data.newSet = collectFormData(req, req.session.data.newSet);
  req.session.data.sets.unshift(req.session.data.newSet);
  req.session.data.newSet = {};
  latestSet = req.session.data.sets[0];

  res.render(
    'datasets/index.html',
    { query: req.query, status: latestSet.status }
  );
});

/* === Data file management === */

router.post('/manage_data/upload_new_dataset/datafiles', function (req, res) {
  if (req.body['file-url'].indexOf('invalid') !== -1) {
    res.redirect('/manage_data/upload_new_dataset/file_upload?error=1')
  } else {
    req.session.data.newSet = collectFormData(req, req.session.data.newSet);
    res.render('manage_data/upload_new_dataset/datafiles.html');
  }
});

router.get(
  '/manage_data/upload_new_dataset/datafiles/edit/:index',
  function (req, res) {
    var datasetFile = req.session.data.newSet.files[req.params.index];
    res.render('manage_data/upload_new_dataset/file_upload.html');
  }
);

router.get(
  '/manage_data/upload_new_dataset/datafiles/delete/:index',
  function (req, res) {
    req.session.data.newSet.files.splice(req.params.index, 1);
    res.redirect('/manage_data/upload_new_dataset/datafiles');
  }
);


/* ============================ */

// Check if we've got to this page but user actually selected harvest
router.get('/menu', function (req, res) {
  res.redirect(req.query.goto);
});

router.post('/manage_data/upload_new_dataset/licence', function (req, res) {
  req.session.data.newSet = collectFormData(req, req.session.data.newSet);
  res.render('manage_data/upload_new_dataset/licence.html');
});

router.post('/manage_data/upload_new_dataset/publish', function (req, res) {
  req.session.data.newSet = collectFormData(req, req.session.data.newSet);
  res.redirect(307, '/datasets?newset=1');
});

router.post(
  '/manage_data/upload_new_dataset/want_notifications',
  function (req, res) {
    delete req.session.data.newSet.notify;
    req.session.data.newSet = collectFormData(req, req.session.data.newSet);
    if (req.session.data.newSet.frequency !== 'none'
        && !req.session.data.newSet.notify) {
      res.redirect('/manage_data/upload_new_dataset/want_notifications');
    } else {
      res.redirect('/manage_data/upload_new_dataset/check');
    }
  }
);

router.post('/manage_data/upload_new_dataset/frequency_routing',
  function(req, res) {
    req.session.data.newSet = collectFormData(req, req.session.data.newSet);
    queryString = req.query.change ? '?change=1' : '';
    switch (req.session.data.newSet.frequency) {
      case 'week':
        res.redirect('/manage_data/upload_new_dataset/period_week' + queryString);
        break;
      case 'month':
        res.redirect('/manage_data/upload_new_dataset/period_month' + queryString);
        break;
      case 'quarter':
        res.redirect('/manage_data/upload_new_dataset/period_quarter' + queryString);
        break;
      case 'year':
        res.redirect('/manage_data/upload_new_dataset/period_year' + queryString);
        break;
      default:
        if (req.query.change) {
          res.redirect('/manage_data/upload_new_dataset/check');
        } else {
          res.redirect('/manage_data/upload_new_dataset/file_upload');
        }
        break;
    }
  }
);


router.post('/datasets/edit/edit_submit', function(req, res) {
  req.session.data.sets[req.body.index] = collectFormData(req, {});
  res.redirect('/datasets?modified=1');
});



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
});

module.exports = router;


function collectFormData(req, dataset) {

  if (req.body['title-dataset']) {
    dataset.title = req.body['title-dataset'];
  }
  if (req.body['summary-dataset']) {
    dataset.summary = req.body['summary-dataset'];
  }
  var titles = req.body['file-title'];
  var urls = req.body['file-url'];
  if (titles) {
    if (!dataset.files) dataset.files = [];
    if (titles.length === undefined) titles = [titles];
    if (urls.length === undefined) urls = [urls];
    for (var i=0; i<titles.length; i++) {
      dataset.files.push({
        title: titles[i],
        url: urls[i]
      });
    }
  }
  if (req.body['licence']) {
    dataset.licence = req.body['licence'];
  }
  if (req.body['other-licence']) {
    dataset.otherLicence = req.body['other-licence'];
  }
  if (req.body['themes']) {
    var themes = req.body['themes'];
    dataset.themes = typeof themes === 'string' ? [themes] : themes;
  }
  if (req.body['geo']) {
    var geo = req.body['geo'];
    dataset.geo = typeof geo === 'string' ? [geo] : geo;
  }
  if (req.body['other-geo']) {
    dataset.otherGeo = req.body['other-geo'];
  }
  if (req.body['frequency']) {
    dataset.frequency = req.body['frequency'];
  }
  if (req.body['start-day']) {
    dataset.startDay = req.body['start-day'];
  }
  if (req.body['start-month']) {
    dataset.startMonth = req.body['start-month'];
  }
  if (req.body['start-year']) {
    dataset.startYear = req.body['start-year'];
  }
  if (req.body['end-day']) {
    dataset.endDay = req.body['end-day'];
  }
  if (req.body['end-month']) {
    dataset.endMonth = req.body['end-month'];
  }
  if (req.body['end-year']) {
    dataset.endYear = req.body['end-year'];
  }
  if (req.body['period-month']) {
    dataset.periodMonth = req.body['period-month'];
  }
  if (req.body['period-year']) {
    dataset.periodYear = req.body['period-year'];
  }
  if (req.body['period-quarter']) {
    dataset.periodQuarter = req.body['period-quarter'];
  }
  if (req.body['notify']) {
    dataset.notify = req.body['notify'];
  }
  if (req.body['status']) {
    dataset.status = req.body['status'];
  }

  console.log(dataset);

  return dataset;
}
