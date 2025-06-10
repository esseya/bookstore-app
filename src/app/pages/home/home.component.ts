import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  username: string | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    const token = this.authService.getToken(); // Assuming your AuthService has a getToken() method

    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        // This is the key part from your old component
        this.username = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || null;
      } catch (err) {
        console.error('Invalid token:', err);
      }
    }
  }

  goToMyBooks() {
    this.router.navigate(['/books']);
  }

  goToAllBooks() {
    this.router.navigate(['/books/all']);
  }
}

