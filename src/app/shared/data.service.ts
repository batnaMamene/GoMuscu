import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DomSanitizer } from "@angular/platform-browser";


@Injectable({
    providedIn: 'root'
})
export class DataService {
    getDepense(arg0: string) {
      throw new Error('Method not implemented.');
    }

    constructor(private afs: AngularFirestore,private sanitizer:DomSanitizer) {}

    getData(url:string){
        let subject = new Subject<any>();
        let allData: unknown[] = [];
        this.afs.collection(url).get().subscribe(res => {
        res.docs.forEach(e => {
            let data: any = e.data();
            data.id = e.id;
            allData.push(data);
        });
        subject.next(allData);
        });
        return subject.asObservable();
    }

    getTodayData(url: string, date: string){
      let subject = new Subject<any>();
        let allData: unknown[] = [];
        this.afs.collection(url).get().subscribe(res => {
        res.docs.forEach(e => {
            let data: any = e.data();
            data.id = e.id;
            if(data.date != null && data.date === date) allData.push(data);
        });
        subject.next(allData);
        });
        return subject.asObservable();
    }

    getNameData(url: string, name: string){
      let subject = new Subject<any>();
        let allData: unknown[] = [];
        this.afs.collection(url).get().subscribe(res => {
        res.docs.forEach(e => {
            let data: any = e.data();
            if(data.name != null && data.name === name) allData.push(data);
        });
        subject.next(allData);
        });
        return subject.asObservable();
    }

    updateData(url: string, id: string, data: any){
      const toUpdate = this.afs.collection(url).doc(id);
      if(toUpdate != null)  toUpdate.update(data);
    }

    deleteData(url: string, id: string){
      const toDelete = this.afs.collection(url).doc(id);
      toDelete.delete().then(res => {
        return res;
      });
    }

    addData(url:string, data: any){
      this.afs.collection(url).add(data).then(res => {
        return res;
      });
    }
}