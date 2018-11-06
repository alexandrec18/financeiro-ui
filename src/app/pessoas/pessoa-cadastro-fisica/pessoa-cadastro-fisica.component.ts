import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Pessoa } from './../../core/model';


@Component({
  selector: 'app-pessoa-cadastro-fisica',
  templateUrl: './pessoa-cadastro-fisica.component.html',
  styleUrls: ['./pessoa-cadastro-fisica.component.css']
})
export class PessoaCadastroFisicaComponent implements OnInit, OnChanges {

  @Input() pessoa: Pessoa;
  sexos: any[];

  @ViewChild('fisicaForm') myForm: NgForm;
  @Input() isReset = false;

  constructor() {
    this.sexos = [
      {label: 'Masculino', value: 'M'},
      {label: 'Feminino', value: 'F'}
    ];
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.isReset) {
       this.myForm.reset();
    }
  }
}
