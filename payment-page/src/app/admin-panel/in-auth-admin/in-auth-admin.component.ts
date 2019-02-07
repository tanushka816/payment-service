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

 onSubmitChangeSecure(key) {
    this.data[key].secure = !this.data[key].secure
    this.serverService.changeSecure(key, this.data[key].secure)
      .subscribe(
        (request) => console.log(request),
        (error) => console.log(error)
      );
  }

  onSubmit() {
    const field = this.myForm.value['field'];
    const filter = this.myForm.value['filter'];
    if (this.isRequestData) {
      this.serverService.getRequestPayment(field, filter)
      .subscribe(
        (data) => this.data = data,
        (error) => console.log(error)
      );
    }
    else {
      this.isCardData = true;
      this.serverService.getCardPayment(field, filter)
      .subscribe(
        (data) => this.data = data,
        (error) => console.log(error)
      );
    }
  }

  ngOnInit() {
  }

}
