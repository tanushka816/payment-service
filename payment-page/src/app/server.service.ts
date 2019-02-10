import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ServerService {
    // private address = "https://webproject-ca196.firebaseio.com/"
    private address = "http://localhost:4201/"
    constructor(private http: HttpClient) { }

    auth(data) {
        return this.http.post(this.address + "auth", data);
    }

    storeCardPayment(data) { // pay from any
        return this.http.post(this.address + "card-payment", data, 
            {observe: "response", responseType: "text"})
    }

    storeRequestPayment(data) {  // get payment
        return this.http.post(this.address + "request-payment", data, 
            {observe: "response", responseType: "text"})
    }

    storeAndDownloadFromMy(data) {  // pay from my
        return this.http.post(this.address + "download", data,
            {observe: "response", responseType: "text"})
    }

    getCardPayment(field?: string, filter?: string) {
        if (filter) filter = "filter=" + filter;
        if (field) field = "field=" + field;
        const query = `?${field}&${filter}`;
        console.log(query);
        return this.http.get(this.address + "card-payment" + query)
    }

    getRequestPayment(field?: string, filter?: string) {
        if (filter) filter = "filter=" + filter;
        if (field) field = "field=" + field;
        const query = `?${field}&${filter}`;
        console.log(query);
        return this.http.get(this.address + "request-payment" + query)
    }

    changeSecure(data) {
        return this.http.patch(this.address + "change-secure", data, 
            {observe: 'response', responseType: 'text'})
    }


    // storeCardPayment(data) { // pay from any
    //     return this.http.post(this.address + "get_card_data.json", data)
    // }

    // storeRequestPayment(data) {  // get payment
    //     return this.http.post(this.address + "req_data.json", data)
    // }

    // getCardPayment() {
    //     return this.http.get(this.address + "any_card_data.json")
    // }


    // getRequestPayment() {
    //     return this.http.get(this.address + "req_data.json")
    // }


    // changeSecure(id, val){
    //     const body = {}
    //     body[id + "/secure"] = val
    //     return this.http.patch(this.address + "any_card_data.json", body)
    // }
}