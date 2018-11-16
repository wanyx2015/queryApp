import { HomePage } from './../home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HTTP } from '@ionic-native/http';

import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

// import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { Subject } from 'rxjs/Subject';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';
// import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';


@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {

    username = 'user1';
    password = 'password1';

    user;
    count;

    constructor(public navCtrl: NavController, private http: HTTP) {
    }

    login() {

        console.log(this.username, this.password)

        let body = {
            username: this.username,
            password: this.password
        }

        this.http.post('http://121.199.20.195:81/auth/login', body, {})
            .then(data => {

                // let result = JSON.parse(data.data);
                // console.log('data', data)
                // console.log(result);

                console.log('\n' + data.status);
                console.log(data.data); // data received by server
                let token = JSON.parse(data.data).token;
                console.log("token", token);
                localStorage.setItem('access_token', token);


                let decodedToken = helper.decodeToken(token);
                console.log(JSON.stringify(decodedToken));
                console.log(decodedToken.user);
                console.log(decodedToken.count);

                this.user = decodedToken.user;
                this.count = decodedToken.count;

                localStorage.setItem('count', decodedToken.count);

                this.navCtrl.push(HomePage);


                console.log(data.headers);
            })
            .catch(error => {
                let result = JSON.parse(error.error);
                console.log(result.note);

                if (error.status == 401)
                    alert(result.note)

                console.log('\n' + error.status);
                console.log(error.error); // error message as string
                console.log(error.headers);
            });
    }

}
