const axios = require('axios')
const { Readability } = require('@mozilla/readability');
const { JSDOM } = require('jsdom');
const fs = require('fs');
const arrayLinks = ['https://articles.microservices.com/nodejs-microservices-from-zero-to-hero-pt1-279548cb4080', 
'https://www.mongodb.com/docs/manual/faq/concurrency/', 
'https://stackoverflow.com/questions/52587999/sinon…thod,out%20with%20simple%20javascript%20examples.', 
'http://cs109.joeong.com/', 
'http://rogerdudler.github.io/git-guide/', 
'http://sebastianraschka.com/Articles/2014_sqlite_in_python_tutorial.html',
 'http://askubuntu.com/questions/6317/how-can-i-install-windows-after-ive-installed-ubuntu',
 'https://github.com/getify/You-Dont-Know-JS#notification-settings', 
 'https://jeffknupp.com/blog/2014/03/03/what-is-a-web-framework/', 
 'https://medium.com/@rchang/learning-how-to-build-a-web-application-c5499bd15c8f#.xbumevuqp', 
 'http://cs109.github.io/2015/pages/videos.html', 
 'https://git-scm.com/',
  'https://discuss.codechef.com/questions/48877/data-structures-and-algorithms', 
  'https://www.typing.com/student/lessons/359/j-f-and-space', 
  'https://www.linkedin.com/pulse/5-strategies-helped-me-career-life-sachin-tendulkar',
   'https://github.com/siwalikm/Prep-for-Full-Stack-JS/blob/master/README.md', 
   'https://dev.to/timber/creating-a-real-world-cli-ap…al&utm_campaign=timber_boosted&booster_org=timber',
    'http://jstherightway.org/', 
    'https://dev.to/abiodunjames/build-a-todo-app-with-nodejs-expressjs-mongodb-and-vuejs--part-1--29n7',
     'https://vanillajstoolkit.com/code-snippets/#selectors', 
     'https://medium.freecodecamp.org/the-definitive-node-js-handbook-6912378afc6e',
      'https://www.udemy.com/apache-kafka/?couponCode=KAFKAQUORA10', 
      'https://v8.dev/blog/elements-kinds', 
      'https://firstround.com/review/how-superhuman-built-an-engine-to-find-product-market-fit/', 
      'https://dev.to/unseenwizzard/learn-git-concepts-not-commands-4gjc', 
      'https://www.joelonsoftware.com/', 
      'https://www.freecodecamp.org/news/how-javascript-p…s-actually-work-from-the-inside-out-76698bb7210b/',
       'https://www.geeksforgeeks.org/10-projects-that-every-developer-should-lay-their-hands-on/', 
       'https://waitbutwhy.com/', 
       'https://thenextweb.com/working-from-home/2020/03/2…traction-tech-relief-for-you-a-human-in-lockdown/', 
       'https://www.pixeltrue.com/illustrations?ref=launchingnext',
        'https://the-ken.com/story/no-rapid-results-for-rap…ry&utm_medium=email&utm_campaign=recap_newsletter', 
        'https://www.skillshare.com/site/join?teacherRef=49…ographic-Video-Data-Visualisation.&sku=1411469263', 
        'https://www.vindhyac.com/reads/', 
        'https://untools.co/', 
        'https://github.com/lydiahallie/javascript-questions/blob/master/README.md',
         'https://www.paperflite.com/blogs/sales-and-marketing-movies', 
         'https://blog.logrocket.com/a-deep-dive-into-queues-in-node-js/', 
         'https://roadmap.sh/',
          'https://www.digitalocean.com/community/tutorials/u…nx-server-and-location-block-selection-algorithms', 
          'https://blush.design/', 
          'https://manassaloi.com/2020/01/21/aristos-pm-coaching.html', 
          'https://www.pm.prismo.net/courses-and-tutorials', 
          'https://thelist.space/explore', 
          'https://dev.to/lydiahallie/javascript-visualized-promises-async-await-5gke',
           'http://cavaliercoder.com/blog/webops-postmortem.html',
            'https://dev.to/adrinlol/javascript-guide-2coa', 
            'https://keycombiner.com/collections/vscode/winlinux/', 
            'https://screenotate.com/', 
            'https://github.com/igorbrigadir/twitter-advanced-search', 
            'https://frontend.horse/', 
            'https://www.freecodecamp.org/news/learn-the-basics-of-amazon-web-services/', 
            'https://hpbn.co/', 
            'https://github.com/eatonphil/notes.eatonphil.com/blob/master/posts/books-developers-should-read.html',
             'https://github.com/searchableguy/awesome-illustrated-guides',
              'https://www.joincolossus.com/episodes?prod-episode…%5D%5BpodcastName%5D%5B0%5D=Business%20Breakdowns', 
              'https://www.firehose.vc/p/firehose-194-operating-leverage-', 
              'https://slack.engineering/how-we-design-our-apis-at-slack/', 
              'https://github.com/ryanmcdermott/clean-code-javascript',
               'https://github.com/trimstray/the-book-of-secret-knowledge#systemsservices-toc', 'https://github.com/trekhleb/javascript-algorithms', 'https://overreacted.io/goodbye-clean-code/', 'https://moretothat.com/travel-is-no-cure-for-the-mind/', 'https://gist.github.com/Neo23x0/e4c8b03ff8cdf1fa63b7d15db6e3860b', 'https://blog.jez.io/cli-code-review/', 'https://github.com/obsidiandynamics/kafdrop', 'https://danluu.com/writing-non-advice/', 'https://www.yanda.com/negotiation', 'https://hirok.io/posts/avoid-npm-link', 'https://messwithdns.net/', 'https://www.digitalocean.com/community/tutorials/how-to-use-multithreading-in-node-js', 'https://webkit.org/blog/12967/understanding-gc-in-jsc-from-scratch/?ck_subscriber_id=1652260200', 'https://www.classcentral.com/report/best-chess-courses/']

// const arraySubset = arrayLinks.splice(0, 5);
const Typesense = require('typesense')
const client = new Typesense.Client({
    'nodes': [{'host': 'localhost', 'port': '8108', 'protocol': 'http'}],
    'apiKey': 'xyz'
})

const schema = {
    "name": "bookmarks",
    "fields": [
      {"name": "title", "type": "string"},
      {"name": "content", "type": "string"},
      {"name": "sitename", "type": "string"},
      {"name": "url", "type": "string"},
  
    ]
  }
  
               
async function run(){
    const documents = []
    for(const [index,url] of arrayLinks.entries()){
        console.log('********',url);
        try{
            const article = await extractContentFromURL(url);
            console.log(article.siteName);
            documents.push({
                title: article.title,
                content: article.textContent,
                sitename: article?.siteName || '',
                url
            })
            //fs.writeFileSync(`content/${index}.txt`, article.textContent);
        }catch(err){
            console.log(`Could not parse content of ${url}`);
            //fs.writeFileSync(`content/${index}.txt`, `${url} -------- ${err}`);

        }

    }

    //await client.collections().create(schema);
    
    
    await client.collections('bookmarks').documents().import(documents)
    
}

async function extractContentFromURL(url){

    const response =await axios.get(url)
    const htmlContent = response.data;

    const doc = new JSDOM(htmlContent, {
        url,
        contentType: 'text/html',
      });

      const reader = new Readability(doc.window.document);
      const article = reader.parse();
      return article;
}

run().then(() => console.log('done')).catch(err => console.log(err));