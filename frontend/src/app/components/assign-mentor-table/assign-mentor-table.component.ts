import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-assign-mentor-table',
  templateUrl: './assign-mentor-table.component.html',
  styleUrls: ['./assign-mentor-table.component.css']
})
export class AssignMentorTableComponent implements OnInit{
  users: any = [];
  searchText: string = "";
  siteId: string = "";

  filterByRoles() {
    this.users = this.users.filter((user: any) => {
      return !user.role.includes("MENTOR") && !user.role.includes("JUDGE") && !user.role.includes("LOCALORGANIZER");
    });
  }
  

  ngOnInit(): void {
    const siteId: string | null = this.actibeRute.snapshot.paramMap.get('id');
    console.log(siteId);
    this.userService.getAllUsers().subscribe(
      res => {
        this.users = res;
        this.filterByRoles();
      },
      err => console.log(err)
    )
    console.log(this.users);
  }
  constructor(private userService: AuthService, private actibeRute: ActivatedRoute) { }

  searchUser() {
    console.log(this.searchText);
    this.users = this.users.filter((user: any) => user.nombre === this.searchText || user.email === this.searchText);
  }

  asingRole(id: string,role: string, siteId: string)  {
    this.userService.updateRole(id, role, siteId).subscribe(
      res => {
        console.log(res);
      }
    )
    this.filterByRoles();
    location.reload();
    }

  
}