$(document).ready(function() {
  'use strict';

  var selector = '.filtered-table'

  var filter = function(event) {
    var nameSearch = $(selector + ' #name').val();
    var status = $(selector + ' .statuses select option:checked').val();

    updateTable(nameSearch, status);
  }

  var updateTable = function(nameSearch, status) {
    $(selector + ' table tbody tr').each(function(idx, row) {
      var $row = $(row);
      var rowDisplay = 'table-row';

      if (nameSearch) {
        if ($row.find('td.name')[0].innerText.toLowerCase().indexOf(nameSearch.toLowerCase()) === -1) {
          rowDisplay = 'none';
        }
      }
      if (rowDisplay !== 'none' && status && status !== 'all') {
        if ($row.find('td[data-status]')[0].getAttribute('data-status') !== status) {
          rowDisplay = 'none';
        }
      }
      $row.css('display', rowDisplay);
    });
  }

  $('.filtered-table input').on('click keyup', filter)
  $('.filtered-table select').on('change', filter)


  $('select[name=status]').on('change', function(e) {
    if ($(e.target).find(':selected').val() === 'scheduled') {
      $('#scheduled-date').removeClass('js-hidden');
    } else {
      $('#scheduled-date').addClass('js-hidden');
    }
  });

  $('input[name=frequency]').on('click', function(e) {
    if (e.target.value === 'none') {
      $('#notify').addClass('js-hidden');
    } else {
      $('#notify').removeClass('js-hidden');
    }
  });

});
