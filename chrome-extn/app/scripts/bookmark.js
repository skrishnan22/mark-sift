document.addEventListener('DOMContentLoaded', async () => {
  const bookmarkList = document.getElementById('bookmark-list');
  const prevPageButton = document.getElementById('prev-page');
  const nextPageButton = document.getElementById('next-page');

  const bookmarksPerPage = 3;
  let currentPage = 1;

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
        'duration-300'
      );

      const title = document.createElement('h2');
      title.textContent = bookmark.title;
      title.classList.add('text-xl', 'font-semibold', 'mb-2');

      const link = document.createElement('a');
      link.textContent = 'Visit Bookmark';
      link.href = bookmark.url;
      link.target = '_blank';
      link.classList.add('text-blue-600', 'hover:underline');

      listItem.appendChild(title);
      listItem.appendChild(link);

      bookmarkList.appendChild(listItem);
    });
  }

  async function fetchBookmarks(pageNumber, recordsPerPage) {
    let bookmarks = [];
    try {
      const response = await fetch(
        `http://localhost:5001/bookmark?pageNumber=${pageNumber}&recordsPerPage=${recordsPerPage}`
      );

      if (response.ok) {
        bookmarks = (await response.json()).data;
        console.log(bookmarks);
      }
    } catch (err) {
      console.log('Could not fetch bookmarks', err);
    } finally {
      return bookmarks;
    }
  }

  await renderBookmarks(currentPage, bookmarksPerPage);

  prevPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
      --currentPage;
      renderBookmarks(currentPage, bookmarksPerPage);
    }
  });

  nextPageButton.addEventListener('click', () => {
    ++currentPage;
    renderBookmarks(currentPage, bookmarksPerPage);
  });
});
