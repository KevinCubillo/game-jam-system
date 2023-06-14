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

  ngOnInit(): void {
    const siteId: string | null = this.actibeRute.snapshot.paramMap.get('id');
    this.userService.getAllUsers().subscribe(
      res => {
        this.users = res.filter((user: any) => !user.role.includes('MENTOR'|| 'ADMIN'|| 'JUDGE'|| 'LOCAL_ORGANIZER'));
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

  asingMentorRole(id: string)  {
    this.userService.updateRole(id, 'MENTOR').subscribe(
      res => {
        console.log(res);
      }
    )
    this.users = this.users.filter((user: any) => !user.role.includes('MENTOR'|| 'ADMIN'|| 'JUDGE'|| 'LOCAL_ORGANIZER'));
    location.reload();
    }
}
