import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  userlist = 0;
  constructor(
    private UserService: UserService,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.UserService.getUsers().subscribe(users => {
      console.log(users);
      this.userlist = users.length;
    });
  }
}