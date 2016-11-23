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
    $('#notify, #frequency-month, #frequency-year, #frequency-quarter, #frequency-week-start, #frequency-week-end').addClass('js-hidden');
    switch (e.target.value) {
      case 'none':
        $('#notify').addClass('js-hidden');
        break;
      case 'week':
        $('#notify, #frequency-week-start, #frequency-week-end').removeClass('js-hidden');
        break;
      case 'month':
        $('#notify, #frequency-month').removeClass('js-hidden');
        break;
      case 'quarter':
        $('#notify, #frequency-quarter').removeClass('js-hidden');
        break;
      case 'year':
        $('#notify, #frequency-year').removeClass('js-hidden');
        break;
      default:
        $('#notify').removeClass('js-hidden');
        break;
    }
  });

  $(".just-added").animate({
    opacity: 1
  }, 1000);


  $(".dashboard tr").each(function(position) {
    if ($(this).index()>=3) {
      $(this).hide();
    }
  });


  $(".dashboard .table-title a").on('click', function(e) {
    var a = $(this);
    var rows = $(this).parents('section').first().find('tr');
    a.toggleClass('expanded');

    if (a.hasClass('expanded')) {
      a.text('Close');
      rows.show();
    } else {
      a.text('Show all');
      rows.each(function(i) {
        if ($(this).index() >=3) $(this).hide();
      });
    }
  });


});
