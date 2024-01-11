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
});
