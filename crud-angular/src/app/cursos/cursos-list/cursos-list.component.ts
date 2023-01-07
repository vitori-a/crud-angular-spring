import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from '../model/curso';

@Component({
  selector: 'app-cursos-list',
  templateUrl: './cursos-list.component.html',
  styleUrls: ['./cursos-list.component.css']
})
export class CursosListComponent {

  @Input() cursos: Curso[] = [];
  @Output() add = new EventEmitter(false)
  @Output() edit = new EventEmitter(false)
  @Output() delete = new EventEmitter(false)

  readonly displayedColumns = ['nome', 'categoria', 'acoes']; //mostra as colunas que serão mostradas - html

  constructor(
    private router: Router,
    private route: ActivatedRoute){

    }

    onAdd(){
       this.add.emit(true)
     }

     onEdit(curso: Curso){
      this.edit.emit(curso);
     }


    onDelete(curso: Curso){
      this.delete.emit(curso);
    }
}
