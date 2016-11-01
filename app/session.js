module.exports = {

  initialDataSets: function () {
    return [
      {
        title: 'Price Paid Data',
        summary: 'Price Paid Data tracks the residential property sales in England and Wales that are lodged with Land Registry for registration.',
        url: 'http://prod.publicdata.landregistry.gov.uk.s3-website-eu-west-1.amazonaws.com/pp-monthly-update-new-version.csv',
        licence: 'Open Government Licence',
        otherLicence: '',
        themes: [ 'Crime and justice', 'Environment' ],
        geo: [ 'England' ],
        otherGeo: '',
        startDay: '1',
        startMonth: '1',
        startYear: '2016',
        frequency: 'month',
        status: 'published',
        notify: 'yes'
      },
      {
        title: 'INSPIRE View Service and Metadata',
        summary: 'Land Registry INSPIRE View Service is a Web Mapping Service (WMS) which provides map images of Land Registry\'s INSPIRE index polygons',
        url: 'http://inspire.landregistry.gov.uk/inspire/ows?Service=WMS&Request=Getcapabilities',
        licence: 'Open Government Licence',
        otherLicence: '',
        themes: [ 'Crime and justice', 'Environment' ],
        geo: [ 'England' ],
        otherGeo: '',
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
