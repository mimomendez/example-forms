import { ValidadoresService } from './../../services/validadores.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma!: FormGroup;

  constructor( private fb:FormBuilder, private validadores:ValidadoresService) {
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  get pasatiempos(){
    return this.forma.get('pasatiempos') as FormArray;
  }

  get nombreNoValido(){
    return this.forma.get('nombre')?.invalid && this.forma.get('nombre')?.touched;
  };

  get apellidoNoValido(){
    return this.forma.get('apellido')?.invalid && this.forma.get('apellido')?.touched;
  };

  get correoNoValido(){
    return this.forma.get('correo')?.invalid && this.forma.get('correo')?.touched;
  };

  get usuarioNoValido(){
    return this.forma.get('usuario')?.invalid && this.forma.get('usuario')?.touched;
  };

  get distritoNoValido(){
    return this.forma.get('direccion.distrito')?.invalid && this.forma.get('direccion.distrito')?.touched;
  };

  get ciudadNoValido(){
    return this.forma.get('direccion.ciudad')?.invalid && this.forma.get('direccion.ciudad')?.touched;
  };

  get pass1NoValido(){
    return this.forma.get('pass1')?.invalid && this.forma.get('pass1')?.touched;
  };

  get pass2NoValido(){
    const pass1 = this.forma.get('pass1')?.value;
    const pass2 = this.forma.get('pass2')?.value;

    return ( pass1 === pass2 ) ? false : true;
  };

  crearFormulario = () => {
    this.forma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, Validators.minLength(5), this.validadores.noMendez]],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      usuario: ['', , this.validadores.existeUsuario],
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
      direccion: this.fb.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required]
      }),
      pasatiempos: this.fb.array([])
    },{
      validators: this.validadores.passwordsIguales('pass1','pass2')
    });
  };

  crearListeners = () => {
    // any changes in form
    this.forma.valueChanges.subscribe( valor => {
      console.log(valor);
    });
    // also async changes
    this.forma.statusChanges.subscribe( status => {console.log(status);});
    // just a control changes
    this.forma.get('nombre')?.valueChanges.subscribe( valor => {
      console.log(valor);
    });
  };

  cargarDataAlFormulario = () => {
    this.forma.reset(
      {
        nombre: 'Nicolas',
        apellido: 'Mendez1',
        correo: 'notengomail@gamil.com',
        usuario: 'thisUser',
        pass1: '1234567',
        pass2: '1234567',
        direccion: {
          distrito: 'Tandil',
          ciudad: 'Tandil'
        }
      });
      this.agregarPasatiempo();
  };

  agregarPasatiempo = () => {
    this.pasatiempos.push( this.fb.control('Nuevo pasatiempo'));
  };

  borrarPasatiempo = ( i:number ) => {
    this.pasatiempos.removeAt(i);
  };

  guardar = () => {
    let total = this.pasatiempos.length;
    if (this.forma.invalid){
      return Object.values(this.forma.controls).forEach( control => {
        if (control instanceof FormGroup){
          Object.values(control.controls).forEach( control => control.markAsTouched())
        } else {
          control.markAsTouched();
        }
      });
    }
    console.log('Save info...');
    this.forma.reset();
    for (let index = 0; index < total; index++) {
      this.borrarPasatiempo(0);     
    }
  };

}
