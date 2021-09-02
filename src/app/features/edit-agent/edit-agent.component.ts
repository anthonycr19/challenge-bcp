import { Component, OnInit, ViewChild } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Agent } from 'src/app/core/interfaces/agent';

@Component({
  selector: 'app-edit-agent',
  templateUrl: './edit-agent.component.html',
  styleUrls: ['./edit-agent.component.css']
})
export class EditAgentComponent implements OnInit {

  dataAgents: Array<Agent> = []
  registerAgentForm: FormGroup;

  @ViewChild('formDirective') private formDirective: NgForm;

  constructor(private route: ActivatedRoute, private router: Router,) { }

  idAgent: number;  
  editAgent: Array<Agent> = []

  ngOnInit(): void {
    this.initForm();
    //let agencia = this.route.queryParamMap.subscribe();

    let tempDataAgent = localStorage.getItem('agents')

    this.dataAgents = JSON.parse(tempDataAgent)

    this.route.queryParams
      .subscribe((params) => {
        this.idAgent = params['id'];
      }
    );

    this.dataAgents.forEach(agent=>{
      
      if(agent.id == this.idAgent){       
        this.registerAgentForm.controls['agentForm'].setValue(agent.agencia);
        this.registerAgentForm.controls['locationForm'].setValue(agent.direccion);
        this.registerAgentForm.controls['deparmentForm'].setValue(agent.departamento);
        this.registerAgentForm.controls['provinceForm'].setValue(agent.provincia);
        this.registerAgentForm.controls['districtForm'].setValue(agent.distrito);
        this.registerAgentForm.controls['latitudeForm'].setValue(agent.lat);
        this.registerAgentForm.controls['lenghtForm'].setValue(agent.lon);
      } 
    })
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
    console.log(this.registerAgentForm)
    if(this.registerAgentForm.valid){
      // Inicializamos una variable temporal con la información del formulario
      let tempData: Agent = {
        id: this.idAgent,
        agencia: this.registerAgentForm.controls['agentForm'].value,
        direccion: this.registerAgentForm.controls['locationForm'].value,
        distrito: this.registerAgentForm.controls['districtForm'].value,
        provincia: this.registerAgentForm.controls['provinceForm'].value,
        departamento: this.registerAgentForm.controls['deparmentForm'].value,
        lat: this.registerAgentForm.controls['latitudeForm'].value,
        lon: this.registerAgentForm.controls['lenghtForm'].value,
      };

      this.dataAgents.forEach((agent, index)=>{

        if(agent.id == this.idAgent){
        this.dataAgents[index] = tempData;
          console.log('data guardada:',agent)
        } 
      })
      console.log('data guardada:', this.dataAgents)
      // Pusheamos la información en el arreglo declarado previamente
      localStorage.removeItem('agents');
      localStorage.setItem('agents', JSON.stringify(this.dataAgents));
        // Finalmente, limpiamos el formulario

      
      this.router.navigate(['/listAgents'])
      
    }else{
      console.log("no valido");
    }
  } 
}
