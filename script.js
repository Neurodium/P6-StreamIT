var url_best_movies = "http://localhost:8000/api/v1/titles?imdb_score_min=9&sort_by=-imdb_score";
var url_best_80s = "http://localhost:8000/api/v1/titles?min_year=1980&max_year=1989&sort_by=-imdb_score,-votes";
var url_best_comedy = "http://localhost:8000/api/v1/titles?genre=comedy&sort_by=-imdb_score,-votes&";
var url_best_voted = "http://localhost:8000/api/v1/titles?sort_by=-votes,-imdb_score"
var urls_best_movies = [];
var urls_best_80s = [];
var urls_best_comedy = [];
var urls_best_voted = [];
var titles_best_movies = [];
var titles_best_80s = [];
var titles_best_comedy = [];
var titles_best_voted = [];



async function get_movies(cat_url_start, urls, titles, className)
{
  for (let i = 0; i < 2; i++)
    { 
      const response = await fetch(cat_url_start);
      const cat_api = await response.json();
      urls.push(cat_url_start);
      cat_url_start = cat_api.next;
    }
  for (let url of urls)
    {
      const response = await fetch(url);
      const cat_api = await response.json();
      let cat_movies = cat_api.results;
      add_titles(cat_movies, titles);
    } 
  var section = document.getElementsByClassName(className);
  add_images(section, titles, className);
}

function add_titles(cat_movies, titles)
{
  for (let i = 0; i < cat_movies.length; i++)
  {
    titles.push(cat_movies[i].image_url);
  }
}

function add_images(section, titles, className)
{
  for (let img = 0; img < 7; img++)
    {
      section[img].innerHTML = "<a href=#" + className + img + "><img src=" + titles[img] + "></a>";
    }
}

async function get_best_movie(cat_url_start, urls, titles, className)
{
  const response = await fetch(cat_url_start);
  const cat_api = await response.json();
  let best_movie_img = cat_api.results[0].image_url

}



get_movies(url_best_80s, urls_best_80s, titles_best_80s, "best80s");
get_movies(url_best_movies, urls_best_movies, titles_best_movies, "bestMovies");
get_movies(url_best_comedy, urls_best_comedy, titles_best_comedy, "comedy");
get_movies(url_best_voted, urls_best_voted, titles_best_voted, "voted");

