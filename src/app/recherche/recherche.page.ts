import { Component, OnInit } from '@angular/core';
import { Films } from '../interfaces/films';
import { Search } from '../interfaces/search';
import { HttpClient } from '@angular/common/http';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.page.html',
  styleUrls: ['./recherche.page.scss'],
})
export class RecherchePage implements OnInit {
  private url : string = "https://omdbapi.com/?apikey=cda8e640"
  public recherche: string = "batman"
  public films : Films[] = [];
  public search = {} as Search;
  public rechercheTitre: string = "";
  public page: number = 1;
  public type:string="";
  public typeFr:string="";

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  public charger() {
    let urlTemp = this.url+"&s="+this.rechercheTitre+"&type="+this.type+"&page="+this.page;
    this.http.get(urlTemp).subscribe((data) => {
      this.search = data as Search;
      this.films = this.search.Search;
      console.log(this.films);
      console.log(this.search);
    });

  }

  public chargerFilm() {
    this.type="movie";
    this.typeFr="films";
    this.charger();
  }

  public chargerSerie() {
    this.type="series";
    this.typeFr="séries";
    this.charger();
  }

  public ajouter() {
    let urlTemp = this.url+"&s="+this.rechercheTitre+"&type="+this.type+"&page="+this.page;
    this.http.get(urlTemp).subscribe((data) => {
      this.search = data as Search;
      this.films = this.films.concat(this.search.Search);
      console.log(this.films);
      console.log(this.search);
    });

  }

  onIonInfinite(ev:Event) {
    this.page++;
    this.ajouter();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
}
