import { Component } from '@angular/core';
import { User } from '../model/user';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = new User();
  

  constructor(private authService : AuthService,
    private router: Router) { }
    err:number = 0;

    onLoggedin()
    {
    this.authService.login(this.user).subscribe((data)=> {
    let jwToken = data.headers.get('Authorization')!;
    this.authService.saveToken(jwToken);
    this.router.navigate(['/']);
    },(erreur)=>{ this.err = 1;
    });
    }
    
      

}
