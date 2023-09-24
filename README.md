# Mark Sift

Mark Sift is a powerful utility that enables users to search not only through the URLs and titles of their bookmarks but also the actual content of the bookmarked web pages. This tool consists of two main components:

1. **Chrome Extension**: This component listens to bookmark events in your Chrome browser and sends the bookmark data to the server. It also provides a user-friendly interface for searching through your bookmarks, including the content of the web pages.

2. **Web App Server**: The server component serves as the backend for the Chrome Extension. It exposes APIs for the extension to communicate with and runs a cron job to sync bookmark data to Typesense, a search engine that enables efficient searching and indexing of bookmarked content. This server can be easily set up using Docker Compose, simplifying the deployment process.

## Why Typesense?

Typesense is a powerful, open-source search engine designed for ease of use and high performance. It is particularly well-suited for implementing advanced search capabilities, making it the perfect choice for this tool. Here's why Typesense is useful for this project:

- **Full-Text Search**: Typesense allows users to perform full-text search on the content of bookmarked web pages, making it possible to find bookmarks based on specific keywords or phrases found within the pages.

- **Fast and Efficient**: Typesense is optimized for speed, enabling lightning-fast search queries, even with large datasets. This ensures a responsive user experience when searching through your bookmarks.


## Installation and Setup

### Chrome Extension

1. Clone the repository from GitHub:

   ```shell
   git clone https://github.com/skrishnan22/mark-sift.git
   ```

2. Open Google Chrome and navigate to `chrome://extensions/`.

3. Enable "Developer mode" by toggling the switch in the top-right corner.

4. Click on the "Load unpacked" button.

5. Select the `chrome-extn` directory from the cloned repository.

6. The Chrome Extension is now installed. You will see its icon in the browser toolbar.

### Web App Server and Docker Compose

1. Clone the repository from GitHub:

   ```shell
   git clone https://github.com/skrishnan22/mark-sift.git
   ```

2. Navigate to the project's app directory:

   ```shell
   cd app
   ```

3. Start the Docker Compose containers:

   ```shell
   docker-compose up -d
   ```

   This command will start the Web App Server, Typesense server, MongoDB, and the bookmark synchronization job in the background.

5. Access the Web App at [http://localhost:5001](http://localhost:5001). You can interact with the API through this interface and view the search results.

## Usage

1. Click on the Chrome Extension icon in the browser toolbar to open the tool.

2. Allow the extension to access your bookmarks when prompted.

3. Use the search bar to enter keywords or phrases you want to search for within your bookmarks.

4. The results will be displayed, including both bookmarked URLs and content from the bookmarked web pages.

## Contributing

We welcome contributions to this project. If you have ideas, bug reports, or feature requests, please create an issue on the GitHub repository.

## License

This project is licensed under the [MIT License](LICENSE).
