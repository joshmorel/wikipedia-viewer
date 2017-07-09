// Example API w origin=*: /w/api.php?action=query&format=json&maxlag=4000&origin=*&prop=revisions&titles=Main+Page&rvprop=content

const wikipediaViewer =
  (function IIFE(document) {

    const baseUrl = 'https://en.wikipedia.org/w/api.php';

    function getRandom() {

    }

    function getSearchResults(search) {

    }

    return {
      getRandom: getRandom
      ,getSearchResults: getSearchResults
    }

  })(window.document);
