import { LoginPage } from './login/login';
import { HTTP } from '@ionic-native/http';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

export function getCount() {
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