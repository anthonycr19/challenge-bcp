import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateAgentComponent } from '././features/create-agent/create-agent.component';
import { EditAgentComponent } from '././features/edit-agent/edit-agent.component';
import { ListAgentsComponent } from '././features/list-agents/list-agents.component';
import { DashboardComponent } from '././shared/dashboard/dashboard.component';

const routes: Routes = [
 
  { path: 'dashboard', component: DashboardComponent},
  { path: 'listAgents', component: ListAgentsComponent},
  { path: 'editAgent', component: EditAgentComponent},
  { path: 'createAgent', component: CreateAgentComponent},

  //{ path: '**', pathMatch: 'full', redirectTo: 'dashboard'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
