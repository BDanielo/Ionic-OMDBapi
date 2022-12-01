import { Component, OnInit } from '@angular/core';
import { Films } from '../interfaces/films';
import { HttpClient } from '@angular/common/http';
import { Search } from '../interfaces/search';

@Component({
  selector: 'app-films',
  templateUrl: './films.page.html',
  styleUrls: ['./films.page.scss'],
})
export class FilmsPage implements OnInit {
  private url : string = "https://omdbapi.com/?apikey=cda8e640"
  public recherche: string = ""
  public films : Films[] = [];
  public search = {} as Search;
  public rechercheTitre: string = "";

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  public chargerFilms() {
    let urlTemp = this.url+"&s="+this.rechercheTitre+"&type=movie&page=1";
    this.http.get(urlTemp).subscribe((data) => {
      this.search = data as Search;
      this.films = this.search.Search;
      console.log(this.films);
      console.log(this.search);
    });

  }

}
