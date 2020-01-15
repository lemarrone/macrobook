import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Macro } from './model/macro';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MacroService {

  constructor(private http: HttpClient) { }

  getMacros(): Observable<Macro[]> {
    return this.http.get<Macro[]>(`${"http://localhost:4200/macros/getMacros"}`);
  }


}
