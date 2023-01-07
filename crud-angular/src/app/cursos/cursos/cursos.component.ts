import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';
import { Curso } from '../model/curso';
import { CursosService } from '../services/cursos.service';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent {

  cursos$: Observable<Curso[]> | null = null;

  //cursosService: CursosService;

  constructor(
    private cursosService: CursosService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.refresh();
  }

    onError(errorMsg: string) {
      this.dialog.open(ErrorDialogComponent, {
        data: errorMsg
      });
    }

    onAdd(){
      this.router.navigate(['new'], {relativeTo: this.route});
    }

    onEdit(curso: Curso){
      this.router.navigate(['edit', curso._id], {relativeTo: this.route});
    }

    refresh(){
      this.cursos$ = this.cursosService.list()
    .pipe( //tratamento de erros
      catchError(error => {
        this.onError('Erro ao carregar cursos.');
        return of([]) //retorna um array vazio
      })
    );
    }


    onDelete(curso: Curso){
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: 'Tem certeza que deseja remover esse curso?',
      });

      dialogRef.afterClosed()
      .subscribe((result: boolean) => {
        if (result) {
          this.cursosService.delete(curso._id)
          .subscribe(
            () => {
              this.refresh();
              this.snackBar.open('Curso removido com sucesso!', 'X', {
                duration: 5000,
                verticalPosition: 'top', //exemplo
                horizontalPosition: 'center'
              });
            },
            () => this.onError('Erro ao tentar remover curso.')
          );
        }
      });
    }

  }
