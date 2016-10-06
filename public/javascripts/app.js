$(document).ready(function() {
  'use strict';

  var selector = '.filtered-table'

  var filter = function(event) {
    var nameSearch = $(selector + ' #name').val();
    var status = $(selector + ' .statuses input[type=radio]:checked').val();

    updateTable(nameSearch, status);
  }

  var updateTable = function(nameSearch, status) {
    $(selector + ' table tbody tr').each(function(idx, row) {
      var $row = $(row);
      var rowDisplay = 'table-row';

      if (nameSearch) {
        if ($row.find('td')[0].innerText.toLowerCase().indexOf(nameSearch.toLowerCase()) === -1) {
          rowDisplay = 'none';
        }
      }
      if (rowDisplay !== 'none' && status && status !== 'all') {
        if ($row.find('td')[1].getAttribute('data-status') !== status) {
          rowDisplay = 'none';
        }
      }
      $row.css('display', rowDisplay);
    });
  }

  $('.filtered-table input[type=submit]').on('click', filter);


});
