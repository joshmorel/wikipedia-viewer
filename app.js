// Example API w origin=*: /w/api.php?action=query&format=json&maxlag=4000&origin=*&prop=revisions&titles=Main+Page&rvprop=content

const wikipediaViewer =
  (function IIFE(document) {

    const baseEndpoint = 'https://en.wikipedia.org/w/api.php';

    function getSearchResults() {
      //pass search to api
      const searchTextInput = document.querySelector('.search > input[name=query]');
      const searchText = searchTextInput.value;

      if (searchText === "") {
        searchTextInput.focus();
        return;
      }

      let fetchHeaders = new Headers();
      fetchHeaders.append('Origin','*');

      const fetchInit = { method: 'GET',
        headers: fetchHeaders,
        mode: 'cors',
        cache: 'default'
      };

      // want redirect resolve - otherwise no description and title may confuse (e.g. "Javascript 2" = "Comment (computer programming)")
      // limitation is link is to main page instead of search-related anchor, but tradeoff is worth it
      const endpoint = `${baseEndpoint}?origin=*&action=opensearch&redirects=resolve&format=json&limit=20&search=${searchText}`;

      fetch(endpoint)
        .then((blob) => blob.json())
        .then((data) => showSearchResults(data))
        .catch((err) => console.log(err.message));
    }

    function showSearchResults(results) {
      //opensearch returns array of length 4 with following items
      //string = query, array = titles, array = descriptions, array = links
      const [, titles, descriptions, links] = results;

      const resultList = document.querySelector('.result-list');
      // remove children for re-search
      while (resultList.hasChildNodes()) {
        resultList.removeChild(resultList.lastChild);
      }

      function appendResultItem(title,description,link) {
        const resultItem = document.createElement("div");
        resultItem.setAttribute('class','result-item');
        resultItem.innerHTML = `<a href="${link}" target="_blank" rel ="noopener noreferrer"><div class="title">${title}</div><div class="description">${description}</div></a>`;

        resultList.appendChild(resultItem);
      }

      titles.map((title, i) => setTimeout(() => appendResultItem(title, descriptions[i], links[i]), i * 50));

      // set minimum height
      // to prevent from shrinking upon new search
      resultList.style.minHeight = '100vh';
    }

    return {
      getSearchResults: getSearchResults
    }

  })(window.document);
