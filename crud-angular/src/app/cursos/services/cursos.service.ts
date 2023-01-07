import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, tap } from 'rxjs';
import { Curso } from '../model/curso';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = 'api/cursos';
  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Curso[]>(this.API)
    .pipe(
      first(),
      //delay(5000), //segundos, apos esses segundos, ai exibe os cursos
      tap(cursos => console.log(cursos))
    );
  }

  save(record: Partial<Curso>){
    //erro no if na outra pagina
    if (record._id) {
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<Curso>){
    return this.httpClient.post<Curso>(this.API, record);
  }

  private update(record: Partial<Curso>){
    return this.httpClient.put<Curso>(`${this.API}/${record._id}`, record);
  }

  loadById(id: string){
    return this.httpClient.get<Curso>(`${this.API}/${id}`);
  }


  delete(id: string){
    return this.httpClient.delete(`${this.API}/${id}`);
  }

}
