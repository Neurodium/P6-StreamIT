var url_best_movies = "http://localhost:8000/api/v1/titles?sort_by=-imdb_score&sort_by=-votes";
var url_best_80s = "http://localhost:8000/api/v1/titles?min_year=1980&max_year=1989&sort_by=-imdb_score&sort_by=-votes";
var url_best_comedy = "http://localhost:8000/api/v1/titles?genre=comedy&sort_by=-imdb_score&sort_by=-votes";
var url_best_thriller = "http://localhost:8000/api/v1/titles?genre=thriller&sort_by=-imdb_score&sort_by=-votes";
var urls_best_movies = [];
var urls_best_80s = [];
var urls_best_comedy = [];
var urls_best_thriller = [];
var urls_full_best_movies = [];
var urls_full_80s = [];
var urls_full_comedy = [];
var urls_full_thriller = [];
var titles_best_movies = [];
var titles_best_80s = [];
var titles_best_comedy = [];
var titles_best_thriller = [];


async function get_movies(start_value, cat_url_start, urls, urls_full, titles, className)
{
  for (let i = 0; i < 2; i++)
    { 
      const response = await fetch(cat_url_start);
      const movie = await response.json();
      urls.push(cat_url_start);
      cat_url_start = movie.next;
    }
  for (let url of urls)
    {
      const response = await fetch(url);
      const movie = await response.json();
      let cat_movies = movie.results;
      for (let i = start_value; i < cat_movies.length; i++)
      {
        urls_full.push(cat_movies[i].url);
      }   
    }
    for (let url_full of urls_full)
    {
      const response = await fetch(url_full);
      const movie = await response.json();
      add_titles(movie, titles);
    }   
  var section = document.getElementsByClassName(className);
  add_images(section, titles, className);
}



function add_titles(movie, titles)
{
    titles.push(
      {
      image: movie.image_url,
      title: movie.original_title,
      genres: movie.genres, 
      date_published: movie.date_published,
      rated: movie.rated,
      imdb_score: movie.imdb_score,
      directors: movie.directors,
      actors: movie.actors,
      duration: movie.duration,
      countries: movie.countries,
      worldwide_gross_income: movie.worldwide_gross_income,
      long_description: movie.long_description,
      });

}

function add_images(section, titles, className)
{
  for (let img = 0; img < 7; img++)
    {
      section[img].innerHTML = "<a href=#" + className + img + "><img src=" + titles[img].image + "></a>";
    }
}

async function get_best_movie(cat_url_start)
{
  const response = await fetch(cat_url_start);
  const movie = await response.json();
  const movie_api = movie.results[0].url;
  const best_movie = await fetch(movie_api);
  const movie_details = await best_movie.json();
  let best_movie_img = movie_details.image_url;
  var herosection = document.getElementById("bestMovie");
  herosection.innerHTML = "<img src=" + best_movie_img + ">";
}


get_best_movie(url_best_movies);
get_movies(1, url_best_movies, urls_best_movies, urls_full_best_movies, titles_best_movies, "bestMovies");
get_movies(0, url_best_80s, urls_best_80s, urls_full_80s, titles_best_80s, "best80s");
get_movies(0, url_best_comedy, urls_best_comedy, urls_full_comedy, titles_best_comedy, "comedy");
get_movies(0, url_best_thriller, urls_best_thriller, urls_full_thriller, titles_best_thriller, "thriller");

