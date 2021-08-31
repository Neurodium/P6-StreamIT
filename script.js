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


async function get_movies(start_value, cat_url_start, urls, urls_full, titles, className, modal_start)
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
  var modal = document.getElementsByClassName("modal_content");
  add_modal_info(modal_start, modal, titles);
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
  for (let i = 0; i < 7; i++)
    {
      section[i].innerHTML = "<a href=#" + className + i + "><img src=" + titles[i].image + "></a>";
    }
}

function add_modal_info(modal_start, modal, titles)
{
  for (let i = 0; i < 7; i++)
  {
    modal[i + modal_start].innerHTML = ` <h1>${titles[i].title}</h1>
                                          <img src="${titles[i].image}">
                                            <p>Category: ${titles[i].genres}<br> 
                                               Date Published: ${titles[i].date_published}<br>
                                               Rated: ${titles[i].rated}<br>
                                               Imdb score: ${titles[i].imdb_score}<br>
                                               Directors: ${titles[i].directors}<br>
                                               Actors: ${titles[i].actors}<br>
                                               Duration: ${titles[i].duration} min<br>
                                               Countries: ${titles[i].countries}<br>
                                               Box Office Results: ${titles[i].worldwide_gross_income} $<br>
                                               Summary: ${titles[i].long_description}</p> 
                                            <a href="#" class="modal_close">&times;</a>`
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
  var herosection = document.getElementsByClassName("BestMovie");
  herosection[0].innerHTML = "<a href=#bestMovieModal><img src=" + best_movie_img + "></a>";
  herosection[1].innerHTML = "<p><em>Summary:</em> " + movie_details.long_description + "</p>"
  var modalHeroSection = document.getElementsByClassName("modal_content");
  modalHeroSection[0].innerHTML = ` <h1>${movie_details.original_title}</h1>
                                      <img src=${movie_details.image_url}>
                                      <p>Category: ${movie_details.genres}<br> 
                                         Date Published: ${movie_details.date_published}<br>
                                         Rated: ${movie_details.rated}<br>
                                         Imdb score: ${movie_details.imdb_score}<br>
                                         Directors: ${movie_details.directors}<br>
                                         Actors: ${movie_details.actors}<br>
                                         Duration: ${movie_details.duration} min<br>
                                         Countries: ${movie_details.countries}<br>
                                         Box Office Results: ${movie_details.worldwide_gross_income} $<br>
                                         Summary: ${movie_details.long_description}</p> 
                                         <a href="#" class="modal_close">&times;</a>`
}


get_best_movie(url_best_movies);
get_movies(1, url_best_movies, urls_best_movies, urls_full_best_movies, titles_best_movies, "bestMovies", 1);
get_movies(0, url_best_80s, urls_best_80s, urls_full_80s, titles_best_80s, "best80s", 8);
get_movies(0, url_best_comedy, urls_best_comedy, urls_full_comedy, titles_best_comedy, "comedy", 15);
get_movies(0, url_best_thriller, urls_best_thriller, urls_full_thriller, titles_best_thriller, "thriller", 22);

