import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ]
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  // mandar un termino de busqueda en el observarble
  search(term: string): void {
    this.searchTerms.next(term);
  }


  ngOnInit(): void {

    this.heroes$ = this.searchTerms.pipe(
      // esperar 3 segundos  dsps d cada tecla para considerar la busqueda
      debounceTime(300),

      //  ignorar el nuevo termino de busqueda si coincide con el anterior
      distinctUntilChanged(),

      // cambiar a una busqeuda observarble cdo cambia el termino de busqueda anterior
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }






}
