import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Note } from '../services/note';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, FormsModule,MatIconModule,MatButtonModule],
  templateUrl: './notes.html',
  styleUrl: './notes.css'
})
export class Notes {
  // notes = [
  //     { _id: 1, Title: 'Shopping List', Data: 'Milk, Bread, Eggs, Butter' },
  //     { _id: 2, Title: 'Work Tasks', Data: 'Finish report, Review PRs' },
  //     { _id: 3, Title: 'Ideas', Data: 'Start a blog, Build side project' }
  //   ];
  notes: any = [];
  showForm = false;
  Title = '';
  Data = '';
  saveForm: boolean = true;
  _id: any;

  constructor(
    private noteService: Note,
  ) { }

  ngOnInit() {
    this.noteService.getNotes().subscribe((data) => {
      this.notes = data
      console.log(this.notes);
      
    },
      err => {
        console.error(err);
      }
    )
  }
  openForm() {
    this.showForm = true;
    this.saveForm = true;
  }
  editData(note: any) {
    this.showForm = true;
    this.saveForm = false;
    this._id=note._id;
    this.Title = note.Title;
    this.Data = note.Data;
  }

  closeForm() {
    this.showForm = false;
    this._id = undefined;
    this.Title = '';
    this.Data = '';
  }

  // Save note
  saveNote() {
    if (this.Title.trim() && this.Data.trim()) {
      const data = { '_id':this._id,'Title': this.Title, 'Data': this.Data }
      if (this.saveForm) {
        this.noteService.createNote(data).subscribe((data) => {
          // console.log("Done", data);
          this.notes = this.notes.concat(data.note)
        },
          err => {
            console.error(err.error.error);
          })
      } else {
        this.noteService.editNote(data).subscribe((data) => {
          this.notes = this.notes.map((ele: { _id: any; })=>ele._id == data.updatedNote._id?data.updatedNote:ele)
          console.log("Done", this.notes);
        },
          err => {
            console.error(err.error.error);
          })
      }
      this.closeForm();
    } else {
      alert('Please fill both fields!');
    }
  }
  deleteNote(_id:any){
    this.noteService.deleteNote(_id).subscribe((data)=>{
      this.notes = this.notes.filter((ele:any)=>ele._id != _id)
      console.log(this.notes);
      
    },
    err=>{
      console.log(err);
    })
  }
}