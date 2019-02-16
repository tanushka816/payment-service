import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../server.service';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-in-auth-admin',
  templateUrl: './in-auth-admin.component.html',
  styleUrls: ['./in-auth-admin.component.css']
})
export class InAuthAdminComponent implements OnInit {

  myForm: FormGroup;
  data: Object;
  isCardData: boolean = false;
  isRequestData: boolean = false;
  constructor(private serverService: ServerService) {
    this.myForm = new FormGroup({
      "field": new FormControl(),
      "filter": new FormControl(),
      "sort": new FormControl()
    });
  }

  onGetCardPay() {
    this.isCardData = true;
    this.isRequestData = false;
    this.serverService.getCardPayment()
      .subscribe(
        (data) => this.data = data,
        (error) => console.log(error)
      );
  }

  onGetRequestPay() {
    this.isRequestData = true;
    this.isCardData = false;
    this.serverService.getRequestPayment()
      .subscribe(
        (data) => this.data = data,
        (error) => console.log(error)
      );
  }

  onSubmitChangeSecure(item) {
    item.secure = !item.secure
    this.serverService.changeSecure(item)
      .subscribe(
        (request) => console.log(request),
        (error) => console.log(error)
      );
  }

  onSubmit() {
    if (this.isRequestData) {
      this.serverService.getRequestPayment(this.myForm.value)
        .subscribe(
          (data) => this.data = data,
          (error) => console.log(error)
        );
    }
    else {
      this.isCardData = true;
      this.serverService.getCardPayment(this.myForm.value)
        .subscribe(
          (data) => this.data = data,
          (error) => console.log(error)
        );
    }
  }

  ngOnInit() {
  }
}
