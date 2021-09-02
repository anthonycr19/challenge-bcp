import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
 
import { map } from 'rxjs/operators'

import { Agent } from '../interfaces/agent';

@Injectable({
  providedIn: 'root'
})
export class AgentsService {

  constructor(private http: HttpClient) { }

  getAgents(): Observable<any>{
    let url = 'http://localhost:4200/assets/agents.json';
    console.log(url)
    return this.http.get(url);
  }
}

