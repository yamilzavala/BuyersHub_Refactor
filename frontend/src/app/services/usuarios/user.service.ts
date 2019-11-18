import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url: string;
  public identity;
  public token;
  

  constructor( private _http: HttpClient ) {
    this.url = URL_SERVICIOS;
   }

   signUp(user_to_login, gethash = null){

     if (gethash != null) {
      user_to_login.gethash = gethash;
     }

     let userJson = JSON.stringify(user_to_login);
     let headersUser = new HttpHeaders({'Content-Type':'application/json'});

     return this._http.post(this.url+'/api/users/login', userJson, {headers: headersUser});
                    // .pipe(
                    //   map((res:any) =>  res.json())
                    // );
   }

   register(user_to_register){
    let userJson = JSON.stringify(user_to_register);
    let headersUser = new HttpHeaders({'Content-Type':'application/json'});

    return this._http.post(this.url+'/api/users/save-user', userJson, {headers: headersUser});
                   // .pipe(
                   //   map((res:any) =>  res.json())
                   // );
  }


   getIdenity(){
    let identyLocal = JSON.parse(localStorage.getItem('identity'));
    if (identyLocal !== undefined) {
        this.identity = identyLocal;
    } else {
        this.identity = null;
    }
    return this.identity;
  }

  getToken(){
    let tokenLocal = localStorage.getItem('token');
    if (tokenLocal !== undefined) {
        this.token = tokenLocal;
    } else {
        this.token = null;
    }
    return this.token;
  }



}
