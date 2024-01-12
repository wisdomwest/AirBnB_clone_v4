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
  $.get('http://127.0.0.1:5001/api/v1/status/', function (data, Status) {
    if (Status === 'success') {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    }
  });
  $.ajax({
    type: 'POST',
    url: 'http://127.0.0.1:5001/api/v1/places_search',
    data: JSON.stringify({}),
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        const place = data[i];
        $('.places').append(
          '<article>' +
            '<div class="title_box">' +
              '<h2>' + place.name + '</h2>' +
              '<div class="price_by_night">$' + place.price_by_night + '</div>' +
            '</div>' +
            '<div class="information">' +
              '<div class="max_guest">' + place.max_guest + '</div>' +
              '<div class="number_rooms">' + place.number_rooms + '</div>' +
              '<div class="number_bathrooms">' + place.number_bathrooms + '</div>' +
            '</div>' +
            '<div class="description">' + place.description + '</div>' +
          '</article>'
        );
      }
    },
    error: function (error) {
      console.log('Error:', error);
    }
  });
});
