import { NgForm } from '@angular/forms';
import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';

import { Pessoa } from './../../core/model';

@Component({
  selector: 'app-pessoa-cadastro-juridica',
  templateUrl: './pessoa-cadastro-juridica.component.html',
  styleUrls: ['./pessoa-cadastro-juridica.component.css']
})
export class PessoaCadastroJuridicaComponent implements OnInit, OnChanges {

  @Input() pessoa: Pessoa;

  @ViewChild('juridicaForm') myForm: NgForm;
  @Input() isReset = false;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.isReset) {
       this.myForm.reset();
    }
  }

}
