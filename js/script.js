'use strict';


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';
const optArticleTagsSelector = ' .post-tags .list';
const optArticleAuthorSelector =  '.post-author';
const optArticleSingleAuthorSelector = '.post-author a';
const optAuthorListElem = '.list.authors li a';
const optTagsListSelector = '.tags.list';
const optCloudClassCount = 5;
const optCloudClassPrefix = 'tag-size-';
const optAuthorListSelector = '.list.authors';
  



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

//TAGS GEN.
function generateTags() {


  /* [NEW] create a new variable allTags with an empty array */
  let allTags = {};

  /*[CHECK] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* [CHECK] START LOOP: for every article: */
  for (let article of articles) {

    /* [CHECK] find tags wrapper */
    const tagList = article.querySelector(optArticleTagsSelector);
    tagList.innerHTML = '';

    let html = '';

    const articleTags = article.getAttribute('data-tags');

    const articleTagsArray = articleTags.split(' ');

    /* [CHECK] START LOOP: for each tag */
    for(let tag of articleTagsArray){ //news sport  
      console.log(tag);

      /* [CHECK]generate HTML of the link */
      const tagHTMLData = '<li><a href="#' + tag + '"><span>' + tag + '</span></a></li>';


      /* [CHECK] add generated code to html variable */
      html = html + tagHTMLData;
      console.log(html);


      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]) { 
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1; //allTags['code'] = 1
      } else {
        allTags[tag]++;
      }

    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagList.innerHTML = html;

  }
  /* END LOOP: for every article: */

  /* [NEW] find list of tags in right column */
  //const tagList = document.querySelector('.tags');
  const tagList = document.querySelector(optTagsListSelector);
  console.log(allTags);

  /* [NEW] add html from allTags to tagList */

  /* [NEW]  create variable for all links HTML code*/
  let allTagsHTML = '';

  /* [NEW] Start Loop: for each tag in allTags: */
  for(let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */

    let className = '';
    if(allTags[tag] > 3) className = 'tag-size-big';
    else if(allTags[tag] > 2) className = 'tag-size-medium';
    else className = 'tag-size-small';

    const tagLinkHTML = '<li><a href="#tag-' + tag + '" class="' + className + '"><span>' + tag +'</span></a></li>';
    allTagsHTML += tagLinkHTML;

  }
  /* [NEW] End Loop: for each tag in allTags: */

  /* [NEW] add HTML from allTagsHTML to tagList*/
  tagList.innerHTML = allTagsHTML;

}

generateTags();





function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement  = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('clickedElement', clickedElement);


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
  /* [NEW] create a new variable allAuthors with an empty object */
  let allAuthors = {};

  const articles = document.querySelectorAll(optArticleSelector);


  for (let article of articles) {

    let author = article.getAttribute('data-author');
    console.log('author', author);
    /*find author wrapper*/
    const authorList = article.querySelector(optArticleAuthorSelector);

    let html = '';
    /* get author attribute */
    const articleAuthor = article.getAttribute('data-author');
    /* [NEW] check if this link is NOT already in allAuthors  */

    if (!allAuthors[articleAuthor]) {
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }


    /*let className = '';
    if(allAuthors[author] > 2) className = 'author-size-big';
    else if(allAuthors[author] > 1) className = 'author-size-medium';
    else className = 'author-size-small';*/

    const authorLinkHTML = '<li><a href="#author-' + articleAuthor + '" class="' + /*className*/ + '"><span>' + articleAuthor + '</span></a></li>';


    /* add generated code to html variable */
    html = html + authorLinkHTML;
    /* add html for each author wrapper */
    authorList.innerHTML = html;
  }

  let html = '';

  for (let author in allAuthors) {

    let className = '';
    if(allAuthors[author] > 2) className = 'author-target-big';
    else if(allAuthors[author] > 1) className = 'author-target-medium';
    else className = 'author-target-small';

    const allAuthorLinkHTML = '<li><a href="#author-' + author + '" class="' + className + '"><span>' + author + ' (' + allAuthors[author] + ')' + '</span></a></li>';
    console.log('',allAuthorLinkHTML);

    /* add generated code to html variable */
    html = html + allAuthorLinkHTML;
    /* add html for each author wrapper */
    allAuthorLinkHTML.innerHTML = html;



  }
}
generateAuthors();



function authorClickHandler(event) {
  event.preventDefault();

  const clickedElement = this;

  clickedElement.classList.add('active');
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');
  /* find all author links with class active */
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active author link */
  for (let activeAuthor of activeAuthors) {

    activeAuthor.classList.remove('active');
  }

  /* find all author links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href^="#author-' + author + '"]');

  /* START LOOP: for each found tag link */
  for (let authorLink of authorLinks) {
    authorLink.classList.add('active');
  }
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenerToAuthors() {

  /* find all links to authors */
  //const authorLinks = document.querySelectorAll(optArticleSingleAuthorSelector + ',' + optAuthorListElem); <- second option
  const authorLinks = document.querySelectorAll('a[href^="#author"]');
  /* START LOOP: for each link */
  for (let author of authorLinks) {
    /* add tagClickHandler as event listener for that link */
    author.addEventListener('click', authorClickHandler);
  
    /* END LOOP: for each link */
  }

}

addClickListenerToAuthors();