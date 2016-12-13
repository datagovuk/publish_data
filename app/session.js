var allSets = [
  { title: "Police workforce, England and Wales" },
  { title: "Stop and Search" },
  { title: "Immigration Statistics: citizenship" },
  { title: "Local police recorded crime data" },
  { title: "Police Force Boundaries - England and Wales" },
  { title: "Hate crimes England and Wales" },

  { title: "Anti-social behaviour order statistics, England and Wales" },
  { title: "Statistics of mentally disordered offenders, England" },
  { title: "Court locations" },
  { title: "Prison population projections" },
  { title: "Race and the Criminal Justice System" },
  { title: "Re-offending rates" },

  { title: "Local Authority Collected Waste Management Statistics" },
  { title: "Farming Statistics" },
  { title: "Fruit and vegetable wholesale prices" },
  { title: "Average temperature and total rainfall in England and Wales" },
  { title: "The UK Renewable Energy Planning Database" },
  { title: "Single-use plastic carrier bags charge England data" },

  {
    title: 'Price Paid Data',
    summary: 'Price Paid Data tracks the residential property sales in England and Wales that are lodged with Land Registry for registration.',
    links: [{
      url: 'http://prod.publicdata.landregistry.gov.uk.s3-website-eu-west-1.amazonaws.com/pp-monthly-update-new-version.csv',
      title: 'November 2016'
    },{
      url: 'http://prod.publicdata.landregistry.gov.uk.s3-website-eu-west-1.amazonaws.com/pp-monthly-update-new-version.csv',
      title: 'December 2016'
    }
    ],
    licence: 'Open Government Licence',
    otherLicence: '',
    geo: [ 'england' ],
    periodMonth: '1',
    periodYear: '2016',
    frequency: 'month',
    status: 'published',
    notify: 'yes'
  },
  {
    title: 'INSPIRE View Service and Metadata',
    summary: 'Land Registry INSPIRE View Service is a Web Mapping Service (WMS) which provides map images of Land Registry\'s INSPIRE index polygons',
    links: [{
      url: 'http://inspire.landregistry.gov.uk/inspire/ows?Service=WMS&Request=Getcapabilities',
      title: 'November 2016'
    },{
      url: 'http://prod.publicdata.landregistry.gov.uk.s3-website-eu-west-1.amazonaws.com/pp-monthly-update-new-version.csv',
      title: 'December 2016'
    }
    ],
    links: [],
    licence: 'Open Government Licence',
    otherLicence: '',
    geo: [ 'england' ],
    startDay: '1',
    startMonth: '1',
    startYear: '2016',
    frequency: 'week',
    status: 'published',
    notify: 'no'
  }
];


module.exports = {

  users: [
    {
      email: "a@b.c",
      department: "Home Office",
      datasets: allSets.slice(0, 6)
    },
    {
      email: "user@homeoffice.gsi.gov.uk",
      department: "Home Office",
      datasets: allSets.slice(0, 6)
    },
    {
      email: "user@justice.gsi.gov.uk",
      department: "Ministry of Justice",
      datasets: allSets.slice(6, 12)
    },
    {
      email: "user@defra.gsi.gov.uk",
      department: "DEFRA",
      datasets: allSets.slice(12, 18)
    }
  ],

  initialDataSets: function (indexes) {
    var sets=[];
    indexes.forEach(function(i) {
      sets.push(allSets[i]);
    });
  }

}
