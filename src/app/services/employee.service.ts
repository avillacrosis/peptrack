import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Employee } from '../models/employee.model';
import { map } from 'rxjs/operators';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeesCollection: AngularFirestoreCollection<Employee>;

  constructor(private db: AngularFirestore) {
    this.employeesCollection = db.collection<Employee>('employees');
  }

  /**
   * Return list of employees
   * @returns Observable object
   */
  getEmployees() {
    return this.employeesCollection.snapshotChanges().pipe(
      map(items => {
        return items.map( item => {
          const id = item.payload.doc.id;
          const data = item.payload.doc.data();
          return {id, ...data};
        });
      })
    );
  }

  getEmployee(id) {
    return this.db.collection('employees').doc(id).snapshotChanges().pipe(
      map(item => {
        const id = item.payload.id;
        const data: any = item.payload.data();
        return {id, ...data};
      })
    );
  }

  /**
   * add Employee to Firebase
   * @param data Employee object
   */
  addEmployee(data) {
    const roleRef = this.db.doc('/roles/' + data.role).ref;
    const securityGroupRef = this.db.doc('/securityGroups/' + data.securityGroup).ref;
    const studioRef = this.db.doc('/studio/' + data.studio).ref;

    data.role = roleRef;
    data.securityGroup = securityGroupRef;
    data.studio = studioRef;
    data.dateCreated = new Date().toString();

    this.employeesCollection.add(data);
  }

  /**
   * update Employee from Firebase
   * @param data Employee object
   */
  editEmployee(data) {
    console.log(data);
    
    const roleRef = this.db.doc('/roles/' + data.role).ref;
    const securityGroupRef = this.db.doc('/securityGroups/' + data.securityGroup).ref;
    const studioRef = this.db.doc('/studio/' + data.studio).ref;

    data.role = roleRef;
    data.securityGroup = securityGroupRef;
    data.studio = studioRef;
    data.dateModified = new Date().toString();

    this.db.doc('/employees/' + data.id).update(data);
  }
}
