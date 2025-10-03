import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Note {
  constructor(private http:HttpClient){}

  private api="http://127.0.0.1:3000"

  getNotes():Observable<any>{
    return this.http.get(`${this.api}/notes`)
  }
  createNote(data:any):Observable<any>{
    return this.http.post(`${this.api}/notes`,data)
  }
  editNote(data:any):Observable<any>{
    return this.http.put(`${this.api}/notes/${data.id}`,data)
  }
  deleteNote(id:any):Observable<any>{
    return this.http.delete(`${this.api}/notes/${id}`)
  }
}
