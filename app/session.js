module.exports = {

  initialDataSets: function () {
    return [
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
  }
};
