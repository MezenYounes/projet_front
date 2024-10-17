import { Injectable } from '@angular/core';
import { camion } from '../model/camion.model';
import { Marque } from '../model/marque.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
  };


@Injectable({
  providedIn: 'root'
})

export class CamionService {
  apiURL: string = 'http://localhost:8080/camions/api';
  apiURLMar: string = 'http://localhost:8080/camions/api/mar';
  camions! : camion[];
  camion! : camion;
  marques!: Marque[];
  
  camionRecherche?: camion[];

  constructor(private http : HttpClient,
    private authService: AuthService
  ) {
    this.marques = [ {idmar : 1, nommar : "TOYOTA"},
    {idmar : 2, nommar : "RENAULT"},
    {idmar : 3, nommar : "chevrolet"},
    {idmar : 4, nommar : "FORD"}];
    this.camions = [
    {idcamion : 1, nomcamion : "F-150", prixcamion: 35000 , description : "Le Ford F-150 est un camion pick-up populaire et polyvalent", marque : {idmar : 4, nommar : "FORD"}},
    {idcamion : 2, nomcamion : "Tacoma", prixcamion :  45000, description : "Le Toyota Tacoma est un camion compact durable et fiable", marque : {idmar : 1, nommar : "TOYOTA"}},
    {idcamion : 3, nomcamion :"Silverado", prixcamion : 55000, description : "Le Chevrolet Silverado 2500HD est un camion lourd conçu pour les tâches les plus exigeantes", marque : {idmar : 3, nommar : "CHEVROLET"}}
     ];
    }
   listecamion(): Observable<camion[]>{
    
    return this.http.get<camion[]>(this.apiURL+"/all");
    }

ajoutercamion( cam: camion):Observable<camion>{
  let jwt = this.authService.getToken();
jwt = "Bearer "+jwt;
let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
  return this.http.post<camion>(this.apiURL+"/addcam", cam, {headers:httpHeaders});
  }
supprimercamion( id: number){
 
  const url = `${this.apiURL}/delcam/${id}`;

  let jwt = this.authService.getToken();
jwt = "Bearer "+jwt;
let httpHeaders = new HttpHeaders({"Authorization":jwt})
return this.http.delete(url, {headers:httpHeaders});
}

  consultercamion(id:number): Observable<camion> {
    const url = `${this.apiURL}/getbyid/${id}`;
    let jwt = this.authService.getToken();
jwt = "Bearer "+jwt;
let httpHeaders = new HttpHeaders({"Authorization":jwt})
return this.http.get<camion>(url,{headers:httpHeaders});
}

    
    triercamion(){
      this.camions = this.camions.sort((n1,n2) => {
      if (n1.idcamion! > n2.idcamion!) {
      return 1;
      }
      if (n1.idcamion! < n2.idcamion!) {
      return -1;
      }
      return 0;
      });
      }
      
    updatecamion(c:camion) : Observable<camion>
    {
      let jwt = this.authService.getToken();
jwt = "Bearer "+jwt;
let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.put<camion>(this.apiURL+"/updatecam",c, {headers:httpHeaders});
    }
listemarques():Observable<Marque[]>{
  return this.http.get<Marque[]>(this.apiURL+"/mar");
  }
  consultermarques(id:number): Marque{
    return this.marques.find(mar => mar.idmar == id)!;
    }
   /*  rechercheparmarque(idmarq: number): camion[] {
      const filtredcamion=this.camions.filter((camion) => camion.marque?.idmar == idmarq);
      return filtredcamion;
    } */
    rechercherparmarque(idmar: number):Observable< camion[]> {
      const url = `${this.apiURL}/CamionMarq/${idmar}`;
      return this.http.get<camion[]>(url);
      }
      ajoutermarrque( mar: Marque):Observable<Marque>{
        return this.http.post<Marque>(this.apiURLMar, mar, httpOptions);
        }
        
      
      

}