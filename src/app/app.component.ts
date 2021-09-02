import { Component } from '@angular/core';
import { AgentsService } from '@core/services/agents.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Agent } from 'src/app/core/interfaces/agent';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reto-bcp';
  activeloadingfull = true;
  constructor(private agentService: AgentsService, public dialog: MatDialog, private router: Router,){

  }
  ngOnInit(): void {
    this.initData()
  }

  initData(){
    setTimeout(() => {
      this.activeloadingfull = false;
    }, 2000);
    this.agentService.getAgents().subscribe(agents=>{
      let count = 0;
      agents.forEach(agent=> {
        agent.id = count;
        count++;
      });
      
      localStorage.setItem('agents', JSON.stringify(agents) );
    })
  }

}
