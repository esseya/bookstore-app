import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  isDarkMode = false;
  constructor(public authService: AuthService) {}
    

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    const newTheme = this.isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-bs-theme', newTheme);
  }
  logout() {
    this.authService.logout();
  }
}
