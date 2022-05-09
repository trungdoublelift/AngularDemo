import { Component } from '@angular/core';

import {
  addDoc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  collectionChanges,
  Firestore,
  doc,
} from '@angular/fire/firestore';
import{ GoogleAuthProvider, getAuth, provideAuth, Auth, signInWithPopup, signOut, authState,} from '@angular/fire/auth'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'DemoChatRT';
  loggedIn=false
  userInfo:any
  constructor(public db: Firestore, private auth: Auth){
    authState(this.auth).subscribe(async (user)=>{
      if(user){
        this.loggedIn=true
        console.log(user)
        this.userInfo=user
        if(await this.userFirstLogin()==false){
          await setDoc(doc(this.db, "user", this.userInfo.uid),{
            userID: this.userInfo.uid,
            userName: this.userInfo.displayName,
            userEmail: this.userInfo.email,
            userPhoto: this.userInfo.photoURL
          })
        }
      }else{
        this.loggedIn=false
        console.log('Error !')
        this.userInfo=null
      }
    })
  }

  async userFirstLogin(){
    if(!this.userInfo){

      return false
    }else{

      let  yesOrNo= await getDoc(doc(this.db, "user",  this.userInfo.uid))
      return yesOrNo.exists();
    }
  }

  ngOnInit(): void {
  }

  async login(){
    let provider = new GoogleAuthProvider();
    try{
    await signInWithPopup( this.auth , provider )


    alert('Loggin Success')

    }catch(e){
      alert(e)
    }
  }

  async logout(){
    await signOut(this.auth)
    alert("Logout Success")
    this.loggedIn=false
    this.userInfo=null;
  }

  messages="";
  async clicked(){
    let time=Date.now().toString();
    await setDoc(doc(this.db, "chatting", time), {String: this.messages});

    this.messages=""
  }

}
