import { Component, OnInit } from '@angular/core';
import { Films } from '../interfaces/films';
import { Search } from '../interfaces/search';
import { Detail } from '../interfaces/detail';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  private url : string = "https://omdbapi.com/?apikey=cda8e640"
  public id: string = ""
  public recherche: string = ""
  public search = {} as any;
  public rechercheTitre: string = "";
  public cles : string[] = [];

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.charger();
  }

  public charger() {
    let urlTemp = this.url+"&i="+this.id;
    this.http.get(urlTemp).subscribe((data) => {
      this.search = data as Detail;
      console.log(this.search);
      this.cles = Object.keys(this.search)
      console.log(this.cles)
    });
   
  }

}
