document.addEventListener('DOMContentLoaded', async () => {
  const bookmarkList = document.getElementById('bookmark-list');
  const prevPageButton = document.getElementById('prev-page');
  const nextPageButton = document.getElementById('next-page');
  const pageNumberElement = document.getElementById('page-number');
  const searchInput = document.getElementById('search-input');

  const bookmarksPerPage = 9;
  let currentPage = 1;
  let searchText = '';
  /**
   * Get bookmark list from server and inject list items on the html container
   * @param {Number} pageNumber 
   * @param {Number} recordsPerPage 
   */
  async function renderBookmarks(pageNumber, recordsPerPage) {
    bookmarkList.innerHTML = '';
    const bookmarksToDisplay = await fetchBookmarks(pageNumber, recordsPerPage);
    bookmarksToDisplay.forEach(bookmark => {
      const listItem = document.createElement('li');
      listItem.classList.add(
        'bg-white',
        'p-4',
        'rounded',
        'shadow-md',
        'hover:shadow-lg',
        'transition',
        'duration-300',
        'card'
      );

      const title = document.createElement('h2');
      title.innerHTML = bookmark?.hit?.title ? bookmark.hit.title : bookmark.title;
      title.classList.add('text-xl', 'font-semibold', 'mb-2');

      const excerpt = document.createElement('p');
      excerpt.innerHTML = bookmark?.hit?.content ? bookmark.hit.content : bookmark.excerpt;
      excerpt.classList.add('text-s', 'mb-2', 'overflow-hidden');

      const link = document.createElement('a');
      link.textContent = 'Visit Bookmark';
      link.href = bookmark.url;
      link.target = '_blank';
      link.classList.add('text-blue-600', 'hover:underline');

      listItem.appendChild(title);
      listItem.appendChild(excerpt);
      listItem.appendChild(link);

      bookmarkList.appendChild(listItem);
      pageNumberElement.textContent = currentPage;
    });
  }

  /**
   * Wrapper function to make API call to fetch  paginated bookmarks
   * @param {*} pageNumber 
   * @param {*} recordsPerPage 
   * @returns bookmarks - array of bookmark objects
   */
  async function fetchBookmarks(pageNumber, recordsPerPage) {
    let bookmarks = [];
    try {
      const response = await fetch(
        `http://localhost:5001/bookmark?pageNumber=${pageNumber}&recordsPerPage=${recordsPerPage}&searchText=${searchText}`
      );

      if (response.ok) {
        bookmarks = (await response.json()).data;
      }
    } catch (err) {
      console.log('Could not fetch bookmarks', err);
    } finally {
      return bookmarks;
    }
  }

  await renderBookmarks(currentPage, bookmarksPerPage);

  prevPageButton.addEventListener('click', async () => {
    if (currentPage > 1) {
      --currentPage;
      await renderBookmarks(currentPage, bookmarksPerPage);
    }
  });

  nextPageButton.addEventListener('click', async () => {
    ++currentPage;
    await renderBookmarks(currentPage, bookmarksPerPage);
  });
  // Debounce function to delay search input
  function debounce(func, delay) {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), delay);
    };
  }

  const debouncedSearch = debounce(async () => {
    const searchTerm = searchInput.value.trim();
    searchText = searchTerm;
    currentPage = 1;

    await renderBookmarks(currentPage, bookmarksPerPage);
  }, 300);
  searchInput.addEventListener('input', debouncedSearch);
});
