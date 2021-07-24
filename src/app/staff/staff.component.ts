import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../_services/authentication.service';
import { StaffService } from '../_services/staff.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  staffs: any;
  credentials: any = {};

  constructor(private staffService: StaffService, private authenticationService: AuthenticationService, private modalService: NgbModal) { }

  ngOnInit() {
    this.onGetStaffs();
  }

  onGetStaffs() {
    this.staffService
      .getStaffs()
      .subscribe(response => {
        console.log(response);
        this.staffs = response;
      }, err => {
        console.log(err);
      });
  }

  onDeleteStaff(staffId: string) {
    console.log(staffId);

    this.staffService
      .deleteStaff(staffId)
      .subscribe(response => {
        console.log(response);
        this.onGetStaffs();
      }, err => {
        console.log(err);
      });
  }

  onRegisterStaff() {
    console.log(this.credentials);

    this.authenticationService
      .register(this.credentials)
      .subscribe(response => {
        console.log(response);
        this.onGetStaffs();
      }, err => {
        console.log(err);
      });

  }

  onOpenModal(content) {
    return this.modalService
      .open(content);
  }


}
