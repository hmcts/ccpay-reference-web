$(document).ready(function () {
  var initPostcodeSearchWidget = function (postcodeSearchHtmlElement) {
    var parentElement = $(postcodeSearchHtmlElement)
    var searchButton = parentElement.find('a.postcode-search-button')
    var searchInput = parentElement.find('input.postcode-search-input')
    var searchResult = parentElement.find('select.postcode-search-result')
    var addressInput = $('textarea[name="' + parentElement.attr('data-postcode-search-target') + '"]')

    var performPostcodeSearch = function () {
      $.ajax({
        url: '/postcode',
        data: { postcode: searchInput.val() }
      }).done(function (data) {
        searchResult.html(data)
        show(searchResult)
      })
      return false
    }

    var updateAddressInput = function () {
      addressInput.val(searchResult.val())
    }

    var updateElementsVisibilty = function () {
      hide(searchResult)
      show(postcodeSearchHtmlElement)
    }

    var show = function (element) {
      $(element).removeClass('visually-hidden')
      $(element).removeAttr('tabindex')
    }

    var hide = function (element) {
      $(element).addClass('visually-hidden')
      $(element).attr('tabindex', '-1')
    }

    searchButton.click(performPostcodeSearch)
    searchResult.change(updateAddressInput)
    updateElementsVisibilty()
  }

  $('div.postcode-search').each(function () {
    initPostcodeSearchWidget(this)
  })
})
