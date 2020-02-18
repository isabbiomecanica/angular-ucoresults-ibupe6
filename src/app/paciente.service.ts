import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Paciente } from './paciente';

import { MessageService } from './message.service';


import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import 'rxjs/add/operator/map';
import 'firebase/firestore';


export const PACIENTES: Paciente[] = [
  { id: 11, name: 'Dr Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];


@Injectable({
  providedIn: 'root',
})
export class PacienteService {

  items: Observable<any[]>;
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;


  constructor(private messageService: MessageService, public afd: AngularFireDatabase) {
    this.itemsRef = afd.list('Usuarios');
    // Use snapshotChanges().map() to store the key
    console.log("Listado");
    this.items = this.itemsRef.snapshotChanges();
      for (let elemento in this.items)
      {
        console.log("Elemento");
        console.log(elemento);
      }
   }

  getPacientes(): Observable<Paciente[]> {
    // TODO: send the message _after_ fetching the heroes
    this.messageService.add('PacienteService: fetched pacientes');
    return of(PACIENTES);

  }

  getPaciente(id: number): Observable<Paciente> {
  // TODO: send the message _after_ fetching the hero
  this.messageService.add(`PacienteService: fetched paciente id=${id}`);
  return of(PACIENTES.find(paciente => paciente.id === id));
  }


}