import { Component, Input,inject, OnInit } from '@angular/core';
import { MainDataSource } from 'src/app/model/main.datasource.service';
import { repertoire, showformInput } from './showform.interface';
import { HttpClient } from '@angular/common/http';
import { Data } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs'
import { NonNullableFormBuilder } from '@angular/forms';
import { Film } from 'src/app/model/film.model';





const PROTOCOL = "http";
const PORT = 3000;

@Component({
  selector: 'app-showform',
  templateUrl: './showform.component.html',
  styleUrls: ['./showform.component.scss']
})



export class ShowformComponent implements OnInit{
  http = inject (HttpClient)
  formBuilder = inject (NonNullableFormBuilder)
@Input() data!: showformInput

repertoireForm = this.createRepertoireForm();

private createRepertoireForm(){
const form = this.formBuilder.group({
  hour: this.formBuilder.control('',[]),



  })
return form;
}

films$ !: Observable<Film[]>

baseUrl !: string;

constructor(){
  this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
}

getRepertoire () {
  return this.http.get<repertoire[]>(this.baseUrl+"repertoire")
}

getFilms (){
this.films$ = this.http.get<Film[]>(this.baseUrl+'films')
}

ngOnInit(): void {
  this.getFilms()
}
}

