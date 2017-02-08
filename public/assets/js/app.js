$(document).foundation()

$('select.paginator').change(function () {
  var page = $(this).val()

  window.location = updateQueryStringParameter(window.location.href, 'page', page)
})


function updateQueryStringParameter(uri, key, value) {
  var re = new RegExp("([?&])" + key + "=.*?(&|#|$)", "i");
  
  if (value === undefined) {
    if (uri.match(re)) {
        return uri.replace(re, '$1$2');
    }
    
    return uri;
  }
  
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + "=" + value + '$2');
  }
  
  var hash =  '';
  
  if (uri.indexOf('#') !== -1) {
    hash = uri.replace(/.*#/, '#');
    uri = uri.replace(/#.*/, '');
  }
  
  var separator = uri.indexOf('?') !== -1 ? "&" : "?";    
  return uri + separator + key + "=" + value + hash;  
}
