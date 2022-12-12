import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rule } from 'src/app/interfaces/rule';

@Injectable({
  providedIn: 'root'
})
export class RuleService {

  url = 'https://localhost:7040/api/rule';
  constructor(private http: HttpClient) { }

  getAllRules(userId: string, filter:number[] = []): Observable<any[]> {
    return this.http.post<any[]>(this.url + "/" + userId, filter);
  }

  getRule(id: number): Observable<Rule> {
    return this.http.get<Rule>(this.url + "/" + id);
  }

  addRule(rule: FormData): Observable<Rule[]>{
    return this.http.post<Rule[]>(this.url, rule);
  }

  deleteRule(ruleId: number): Observable<Rule[]>{
    return this.http.delete<Rule[]>(this.url + "/" + ruleId);
  }

  updateRule(id: number, rule: FormData): Observable<Rule>{
    return this.http.put<Rule>(this.url + "/" + id, rule);
  }

  saveRule(rule: Rule){
    return this.http.post<Rule>(this.url + "/saveRule", rule);
  }

  removeRuleFromSaved(rule: Rule){
    return this.http.post<Rule>(this.url + "/removeRule", rule);
  }

}
