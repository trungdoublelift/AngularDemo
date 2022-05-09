import { Injectable } from '@angular/core';
import { Firestore ,collection, setDoc,doc} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private db:Firestore) {}
  private collectMessages = collection(this.db,"/chatting");

  public add(messages: string){
    let now = Date.now();
    setDoc(doc(this.db, `${this.collectMessages.path}/${now}`),{
      message: messages,
      timestamp: now,
    })
  }
}
