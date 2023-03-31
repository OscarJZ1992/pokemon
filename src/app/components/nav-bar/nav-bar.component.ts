import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES } from './../../models/routes';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.sass']
})
export class NavBarComponent {
  @Input() routes: ROUTES[] = []
  routeSelected: ROUTES = {
    title: "",
    route: "Home"
  }

  constructor(private router: Router) { }
  getRouteSelected(route: ROUTES): void {
    this.routeSelected = route
    this.router.navigate([`${this.routeSelected.route}`])
  }


}
