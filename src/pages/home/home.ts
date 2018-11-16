import { LoginPage } from './../login/login';
import { HTTP } from '@ionic-native/http';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


// import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { Subject } from 'rxjs/Subject';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';
// import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  name = '谢天浩';
  mobile = '15000639994';
  id = '342623198610025939';

  count;
  user;

  constructor(public navCtrl: NavController, private http: HTTP) {
    // this.getCount()
  }

  getCount() {
    let body = {
      token: localStorage.getItem("access_token"),
    }
    return this.http.post('http://121.199.20.195:81/query/getcount', body, {})
      .then(data => {
        console.log(data.status);
        console.log(data.url);
        console.log(data.data);
        console.log(typeof (data.data));

        let data1 = JSON.parse(data.data)
        console.log(data1.count);
        console.log(data1.user);

        localStorage.setItem('count', data1.count);
        this.count = data1.count;
        this.user = data1.user;
        alert('当前用户 ' + this.user + ' 的剩余查询次数：' + this.count);
      })
      .catch(error => {
        if (error.status == 403) {
          alert("账号超时，请重新登录！");
          this.navCtrl.push(LoginPage);
        }
        console.log(error);
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);

      });

  }
  submit() {
    // alert(this.name + this.mobile + this.id);

    // this.name = '谢天浩';
    // this.mobile = '15000639994';
    // this.id = '342623198610025939';
    // this.name = '孙亮';
    // this.mobile = '13771840756';
    // this.id = '32050219751108053x';

    if (!this.name || !this.id || !this.mobile) {
      alert('所有字段均需填写！');
      return;
    }

    if (this.id.length != 18 || this.mobile.length != 11) {
      alert('身份证位数，或手机号码位数不正确');
      return;
    }

    let body = {
      token: localStorage.getItem("access_token"),
      name: this.name,
      mobile: this.mobile,
      idcard: this.id
    }

    return this.http.post('http://121.199.20.195:81/query/type1', body, {})
      .then(data => {
        console.log(data.status);
        console.log(data.url);
        console.log(data.data);
        console.log(typeof (data.data));

        // data1: 完整的response数据，不包含header等信息
        let data1 = JSON.parse(data.data)
        console.log(data1.count);
        console.log(data1.data);

        // data2: 信息查询返回的数据
        let data2 = JSON.parse(data1.data)
        let message = data2.message + "\n";
        console.log(message);

        console.log(data2.message + "!!!");
        // alert(data2.message + " " + data1.count)

        // data3: 信息查询的返回结果：
        // 1，三要素一致
        // 2，手机号已实名，但是身份证和姓名均与实名信息不一致
        // 3，手机号已实名，手机号和证件号一致，姓名不一致
        // 4，手机号已实名，手机号和姓名一致，身份证不一致

        let data3 = JSON.parse(data2.data)
        console.log(message);

        console.log('data3', data3);
        if (data3 && data3.result == '1') message = '三要素一致';
        if (data3 && data3.result == '2') message = '手机号已实名，但是身份证和姓名均与实名信息不一致';
        if (data3 && data3.result == '3') message = '手机号已实名，手机号和证件号一致，姓名不一致';
        if (data3 && data3.result == '4') message = '手机号已实名，手机号和姓名一致，身份证不一致';

        alert(message);

        console.log(message);
        // alert(data2.message + " " + data1.count)

        // this.getCount()

        // this.count = localStorage.getItem('count');


        // let result = JSON.stringify(JSON.parse(data.data)).replace(/\\/g, '');
        // let result = data.data.replace(/\\/g, '');
        // let resultObj = JSON.parse(result);
      })
      .catch(error => {
        if (error.status == 403) {
          alert("账号超时，请重新登录！");
          this.navCtrl.push(LoginPage);
        }
        console.log(error);
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);

      });
  }

}
