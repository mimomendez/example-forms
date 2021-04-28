import { PaisService } from './../../services/pais.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: 'Nicolas',
    apellido: 'Mendez',
    correo: 'test@test.com',
    pais: 'CRI',
    genero: 'M'
  };

  paises: any[] = [];

  constructor( private paisService: PaisService) { }

  ngOnInit(): void {
    this.paisService.getPaises()
      .subscribe(paises => {
        this.paises = paises;
        this.paises.unshift({
          nombre: '[Seleccione Pais]',
          codigo: ''
        })
      });
  }

  guardar = ( forma:NgForm ) => {
    if (forma.invalid){
      return Object.values(forma.controls).forEach( control => {
        control.markAsTouched();
      });
    }
  };

}
