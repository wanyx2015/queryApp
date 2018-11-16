// import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from './../login/login';
import { HTTP } from '@ionic-native/http';
import { Component } from '@angular/core';
// import { NavController } from 'ionic-angular';
// import { getCount } from '../lib';


/**
 * Generated class for the PersonalInvPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personal-inv',
  templateUrl: 'personal-inv.html',
})
export class PersonalInvPage {

  name;
  id;

  count;
  user;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HTTP) {
    // this.getCount();
    this.name = '谢天浩';
    this.id = '342623198610025939';

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalInvPage');
  }

  submit() {


    if (!this.name || !this.id) {
      alert('所有字段均需填写！');
      return;
    }

    if (this.id.length != 18) {
      alert('身份证位数，或手机号码位数不正确');
      return;
    }

    let body = {
      token: localStorage.getItem("access_token"),
      name: this.name,
      idcard: this.id
    }

    return this.http.post('http://121.199.20.195:81/query/type2001001', body, {})
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
        // console.log(JSON.stringify(data2));
        // console.log(JSON.stringify(data2.pubAnsInfo));
        console.log((data2.pubAnsInfo.resMsg));

        let message = data2.pubAnsInfo.resMsg;

        alert(message);

        console.log(message);

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
}
