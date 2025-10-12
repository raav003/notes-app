import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Note {
  constructor(private http:HttpClient){}

  // private api="http://127.0.0.1:3000"
  private api="http://127.0.0.1:4000"

  getNotes(pageNo:any,limit:any):Observable<any>{
    return this.http.get(`${this.api}/notes?pageNo=${pageNo}&limit=${limit}`)
  }
  getNotesAfterSkip(skip:any,pageNo:any,limit:any):Observable<any>{
    return this.http.get(`${this.api}/notes?skip=${skip}&pageNo=${pageNo}&limit=${limit}`)
  }
  createNote(data:any):Observable<any>{
    return this.http.post(`${this.api}/notes`,data)
  }
  editNote(data:any):Observable<any>{
    return this.http.put(`${this.api}/notes/${data._id}`,data)
  }
  deleteNote(_id:any):Observable<any>{
    return this.http.delete(`${this.api}/notes/${_id}`)
  }
}
