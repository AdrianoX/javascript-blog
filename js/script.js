const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';
const optArticleTagsSelector = ' .post-tags .list';
const optArticleAuthorSelector = '.post-author';
const optArticleSingleAuthorSelector = '.post-author a';
const optAuthorListElem = '.list.authors li a';





const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  
  /* [DONE] remove class 'active' from all article links */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts .active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active'); 
  } 

  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = this.getAttribute('href');
  console.log('', articleSelector);

  /* [DONE]find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);

  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active');
  console.log(targetArticle);
};

const links = document.querySelectorAll('.titles a');
console.log(links);

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}



function generateTitleLinks(customSelector = '') {

  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* [DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log(customSelector);
  
  /* [DONE] find all the articles and save them to variable: articles */

  let html = '';

  for (let article of articles) {
    /* [DONE]get the article id */
    const articleId = article.getAttribute('id');
    //console.log("id", articleId);

    /* [DONE]find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    //console.log("articleTitle:", articleTitle);

    /* [?] get the title from the title element */

    /* [DONE] create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    //console.log(linkHTML);

    /* [DONE]insert link into html variable */
    /*   ->> insertAdjacentHTML <-- */
    html = html + linkHTML;
    //console.log(html);
  }
  
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  for ( let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();


function generateTags() {
  /*[CHECK] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* [CHECK] START LOOP: for every article: */
  for (let article of articles) {

    /* [CHECK] find tags wrapper */
    const tagList = article.querySelector(optArticleTagsSelector);
    tagList.innerHTML = '';
    console.log(tagList);

    /* [CHECK] make html variable with empty string */
    let html = '';
    //console.log('', html);

    /* [CHECK] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    //console.log('get tags', articleTags);

    /* [CHECK] split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log('', articleTagsArray);

    /* [CHECK] START LOOP: for each tag */
    for(let tag of articleTagsArray){
      console.log(tag);

      /* [CHECK]generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag  + '</a></li>';

      console.log(linkHTML);


      /* [CHECK] add generated code to html variable */
      html = html + linkHTML;
      console.log(html);

    /* END LOOP: for each tag */
    }

    tagList.innerHTML = html;
  }
  /* insert HTML of all the links into the tags wrapper */

  /* END LOOP: for every article: */
}

generateTags();




function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement  = this;
  const additional = clickedElement.querySelector('a');
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  //const href = clickedElement.getAttribute('href');
  //console.log('clickedElement', clickedElement);
  const href = additional.getAttribute('href');
  console.log('href: ', href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags) {

    /* remove class active */
    activeTag.classList.remove('active');

  /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const TagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for (let tagLink of TagLinks)

  /* add class active */
    tagLink.classList.add('active');

  /* END LOOP: for each found tag link */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}
/* execute function "generateTitleLinks" with article selector as argument */


function addClickListenersToTags(){
  /* find all links to tags */
  const allTagLinks = document.querySelectorAll('a[href^="#tag"]');

  /* START LOOP: for each link */
  for (let tag of allTagLinks) {
  /* add tagClickHandler as event listener for that link */
    tag.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
  }

}
addClickListenersToTags();



function generateAuthors() {

  /* let find all authorss */

  const authors = document.querySelectorAll(optArticleSelector);
  console.log('authors', authors);

  /* Start loop for every author: */
  for (let author of authors) {

    /* Find author wrapper */

    const authorList = author.querySelector(optArticleAuthorSelector);
    //console.log('Authors List', authorList);

    /* make html variiable with emnpty string */

    let html = '';

    /* get author from datta-author attribute */

    const articleAuthor = author.getAttribute('data-author');
    //console.log('Authors', articleAuthor);

    /* Generate HTMl of the link */

    const linkHTML = '<li><a href="#author-' + articleAuthor + '">' + articleAuthor + '</a></li>';
    //console.log(linkHTML);

    /* Add generated code to HTML variablle */

    html = html + linkHTML;

    /* Add/insert HTML of all the links to the author wrappper */

    authorList.innerHTML = html;
    //console.log(html);

    /* End loop for every article: */

  }
}

generateAuthors();


const authorClickHandler = function (event) {

  console.log('Link was clicked');
  console.log(event);

  /* Prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" adn give it value of "this" */
  const clickedElement = this;

  /* make new constant "href" and read te attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  //console.log('href');

  /* make new constant "Author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');
  console.log('Author:', author);

  /* find all authors links with class active */
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  /* Start loop for each acvtive tag link */
  for (let activeAuthor of activeAuthors) {
    
    /* remove class active */
    activeAuthor.classList.remove('active');
    
    /* End loop for each active tag link */
  }

  /* fint all author links with "href" attribute equal to the "href" constant */

  const targetAuthor = document.querySelectorAll('a[href^="#author-' + author + '"]');

  /* Start loop for each found tag link */

  for (let authorLink of targetAuthor) {

    /* add class active */
    authorLink.classList.add('active');

    /* END LOOP: for each found tag link */
  }

  generateTitleLinks('[data-author="' + author + '"]');

};


function addClickListenerToAuthors() {

  /* find all links to authors */
  const authorLinks = document.querySelectorAll(optArticleSingleAuthorSelector + ',' + optAuthorListElem);

  /* START LOOP: for each link */
  for (let author of authorLinks) {
    /* add tagClickHandler as event listener for that link */
    author.addEventListener('click', authorClickHandler);

    /* END LOOP: for each link */
  }
}

addClickListenerToAuthors();