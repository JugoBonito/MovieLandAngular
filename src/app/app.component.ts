import { Component } from '@angular/core';

const API_URL = 'https://omdbapi.com/?apikey=575beaf2';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  movies = [];
  searchTerm = '';

  async SearchMovies(title: any) {
    const response = await fetch(API_URL + '&s=' + title);
    const data = await response.json();
    this.movies = data.Search;
    console.log(this.movies);
    //this.movies(data.Search);
  }

}
