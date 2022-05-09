import { Injectable } from '@angular/core';
import { GoogleAuthProvider, Auth, signOut, signInWithPopup,} from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  /*
  constructor(private auth: Auth) {

  }

  async login(){
    try{
    let provider = new GoogleAuthProvider();
    await signInWithPopup( this.auth , provider )
    alert('Loggin Success')
    this.loggedIn=true
    }catch{
      alert("Loggin Failed")
    }
  }

  async logout(){
    await signOut(this.auth)
    alert("Logout Success")
    this.loggedIn=false
  }
  */
}
