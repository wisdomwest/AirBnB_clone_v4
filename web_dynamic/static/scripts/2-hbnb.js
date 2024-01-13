$(document).ready(function () {
  const amenities = {};

  $(document).on('change', "input[type='checkbox']", function () {
    const id = $(this).data('id');
    const name = $(this).data('name');

    if (this.checked) {
      amenities[id] = name;
    } else {
      delete amenities[id];
    }

    const list = Object.values(amenities);
    if (list.length > 0) {
      $('div.amenities > h4').text(Object.values(amenities).join(', '));
    } else {
      $('div.amenities > h4').html('&nbsp;');
    }
  });
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, Status) {
    if (Status === 'success') {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    }
  });
});
