import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule,ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  isLoggedIn: boolean = false;
  currentUser: User | null = null;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute)
   {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user: User | null) => {
      this.currentUser = user;
      console.log("User:",user);
      if (user) {
        console.log('User is logged in.');
        this.isLoggedIn = true;
      } else{
        return null;
      } 
    }
    );
  };

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.isLoggedIn = false;
  }
  
}