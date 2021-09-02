import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Agent } from 'src/app/core/interfaces/agent';


@Component({
  selector: 'app-create-agent',
  templateUrl: './create-agent.component.html',
  styleUrls: ['./create-agent.component.css']
})
export class CreateAgentComponent implements OnInit {
  //Variables
  registerAgentForm: FormGroup;
  dataAgents: Array<Agent> = []
  
  @ViewChild('formDirective') private formDirective: NgForm;
  constructor() { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {

    this.registerAgentForm = new FormGroup({
      agentForm: new FormControl('', [
        Validators.required
      ]),
      locationForm: new FormControl('', [
        Validators.required
      ]),
      districtForm: new FormControl('', [
        Validators.required
      ]),
      provinceForm: new FormControl('', [
        Validators.required
      ]),
      deparmentForm: new FormControl('', [
        Validators.required
      ]),
      latitudeForm: new FormControl('', [
        Validators.required,
      ]),
      lenghtForm: new FormControl('', [
        Validators.required
      ]),
    });
  }

  clearForm(): void{
    this.formDirective.resetForm();
  }

  onSubmitAgent(){
    // Verificamos si el formulario es válido
    if(this.registerAgentForm.valid){
      // Obtenemos la data de local storage
      let tempDataAgent = localStorage.getItem('agents')

      this.dataAgents = JSON.parse(tempDataAgent)

      // Inicializamos una variable temporal con la información del formulario
      let tempData: Agent = {
        id: this.dataAgents.length + 1,
        agencia: this.registerAgentForm.controls['agentForm'].value,
        direccion: this.registerAgentForm.controls['locationForm'].value,
        distrito: this.registerAgentForm.controls['districtForm'].value,
        provincia: this.registerAgentForm.controls['provinceForm'].value,
        departamento: this.registerAgentForm.controls['deparmentForm'].value,
        lat: this.registerAgentForm.controls['latitudeForm'].value,
        lon: this.registerAgentForm.controls['lenghtForm'].value,
      };

      // Pusheamos la información en el arreglo declarado previamente
      this.dataAgents.push(tempData);
      localStorage.setItem('agents', JSON.stringify(this.dataAgents));
        // Finalmente, limpiamos el formulario

      this.clearForm();
      
    }else{
      console.log("no valido");
    }
  }
}
