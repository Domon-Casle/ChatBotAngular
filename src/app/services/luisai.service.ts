import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class LuisaiService {

  private key: string = "KEY";
  private baseURL: string = "URL";
  
  constructor(private http: Http) { 
  }

  public getResponse(query: string) {
    var queryURL = this.baseURL + query;

    return this.http
      .get(queryURL, {headers: this.getHeaders()});
  }

  private getHeaders() {
    let headers = new Headers();
    headers.append('Ocp-Apim-Subscription-Key', this.key);
    return headers;
  }
}
