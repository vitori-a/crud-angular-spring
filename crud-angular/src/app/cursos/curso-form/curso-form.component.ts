import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CursosService } from '../services/cursos.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Curso } from '../model/curso';

@Component({
  selector: 'app-curso-form',
  templateUrl: './curso-form.component.html',
  styleUrls: ['./curso-form.component.css']
})
export class CursoFormComponent {


    form = this.formBuilder.group({
      _id: [''],
      nome: [''],
      categoria: ['']
    });

    constructor(
      private formBuilder: NonNullableFormBuilder, //indica que não pode haver valores nulos
      private service: CursosService,
      private snackBar: MatSnackBar,
      private location: Location,
      private route: ActivatedRoute
      ){
        const curso: Curso = this.route.snapshot.data['curso'];
        this.form.setValue({
          _id: curso._id,
          nome: curso.nome,
          categoria: curso.categoria
        })
        //console.log(curso);
    }

    onSubmit(){
      //console.log('onSubmit'); //serve só pra ver se ta funcionanco a requisição
      this.service.save(this.form.value)
      .subscribe(result => this.onSuccess(), error => this.onError());
  }

  onCancel() {
    this.location.back();
  }

    // mensagem de sucesso
    private onSuccess(){
      this.snackBar.open('Curso salvo com sucesso!', '', {duration: 5000});
      this.onCancel();
    }

    // mensagem de erro
    private onError(){
      this.snackBar.open('Erro ao salvar curso.', '', {duration: 5000});
    }

  }

