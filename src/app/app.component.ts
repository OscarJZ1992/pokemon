import { ROUTES } from './models/routes';
import { Component, OnInit } from '@angular/core';
import { ServicesService } from './services/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  title = 'pokemon_app';
  routes: ROUTES[]=[]

  constructor(private service: ServicesService){}

  getRoutes(){
    this.routes = this.service.getRoutes()
    console.log(this.routes)
  }

  ngOnInit(): void {
    this.getRoutes()
  }
}
