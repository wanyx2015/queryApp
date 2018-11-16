import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from './../login/login';
import { HTTP } from '@ionic-native/http';
import { Component } from '@angular/core';



@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {

  mobile;
  city;

  count;
  user;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HTTP) {
    // this.getCount();
    this.mobile = '15000639994';
    this.city = '310000';

  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad PersonalInvPage');
  // }

  submit() {


    if (!this.mobile || !this.city) {
      alert('手机号或城市不能为空');
      return;
    }

    if (this.mobile.length != 11) {
      alert('手机号码位数不正确');
      return;
    }

    let body = {
      token: localStorage.getItem("access_token"),
      name: this.mobile,
      idcard: this.city
    }
    console.log(JSON.stringify(body));

    return this.http.post('http://121.199.20.195:81/query/type3001001', body, {})
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

  cities = [{ display: "北京", value: "110000" },
  { display: "天津", value: "120000" },

  { display: "石家庄市", value: "130100" },

  { display: "太原市", value: "140100" },

  { display: "赤峰市", value: "150400" },
  { display: "鄂尔多斯市", value: "150600" },

  { display: "鞍山市", value: "210300" },
  { display: "本溪市", value: "210500" },
  { display: "朝阳市", value: "211300" },
  { display: "大连市", value: "210200" },
  { display: "丹东市", value: "210600" },
  { display: "抚顺市", value: "210400" },
  { display: "阜新市", value: "210900" },
  { display: "葫芦岛市", value: "211400" },
  { display: "锦州市", value: "210700" },
  { display: "辽阳市", value: "211000" },
  { display: "盘锦市", value: "211100" },
  { display: "沈阳市", value: "210100" },
  { display: "铁岭市", value: "211200" },
  { display: "营口市", value: "210800" },
  { display: "白城市", value: "220800" },
  { display: "白山市", value: "220600" },
  { display: "吉林市", value: "220200" },
  { display: "辽源市", value: "220400" },
  { display: "四平市", value: "220300" },
  { display: "松原市", value: "220700" },
  { display: "通化市", value: "220500" },

  { display: "哈尔滨市", value: "230100" },
  { display: "鹤岗市", value: "230400" },
  { display: "黑河市", value: "231100" },

  { display: "上海市", value: "310000" },
  { display: "常州市", value: "320400" },
  { display: "淮安市", value: "320800" },
  { display: "连云港市", value: "320700" },
  { display: "南京市", value: "320100" },
  { display: "南通市", value: "320600" },
  { display: "苏州市", value: "320500" },
  { display: "泰州市", value: "321200" },
  { display: "无锡市", value: "320200" },
  { display: "宿迁市", value: "321300" },
  { display: "徐州市", value: "320300" },
  { display: "盐城市", value: "320900" },
  { display: "扬州市", value: "321000" },
  { display: "镇江市", value: "321100" },
  { display: "杭州市", value: "330100" },
  { display: "湖州市", value: "330500" },
  { display: "嘉兴市", value: "330400" },
  { display: "金华市", value: "330700" },
  { display: "丽水市", value: "331100" },
  { display: "宁波市", value: "330200" },
  { display: "衢州市", value: "330800" },
  { display: "绍兴市", value: "330600" },
  { display: "台州市", value: "331000" },
  { display: "温州市", value: "330300" },
  { display: "舟山市", value: "330900" },
  { display: "安庆市", value: "340800" },
  { display: "蚌埠市", value: "340300" },

  { display: "莆田市", value: "350300" },
  { display: "泉州市", value: "350500" },
  { display: "三明市", value: "350400" },
  { display: "厦门市", value: "350200" },
  { display: "漳州市", value: "350600" },

  { display: "济南市", value: "370100" },
  { display: "济宁市", value: "370800" },

  { display: "伊犁哈萨克自治州", value: "654000" }]


  // cities = [{ display: "北京", value: "110000" },
  // { display: "天津", value: "120000" },
  // { display: "保定市", value: "130600" },
  // { display: "沧州市", value: "130900" },
  // { display: "承德市", value: "130800" },
  // { display: "邯郸市", value: "130400" },
  // { display: "衡水市", value: "131100" },
  // { display: "廊坊市", value: "131000" },
  // { display: "秦皇岛市", value: "130300" },
  // { display: "石家庄市", value: "130100" },
  // { display: "唐山市", value: "130200" },
  // { display: "邢台市", value: "130500" },
  // { display: "张家口市", value: "130700" },
  // { display: "大同市", value: "140200" },
  // { display: "晋城市", value: "140500" },
  // { display: "晋中市", value: "140700" },
  // { display: "临汾市", value: "141000" },
  // { display: "吕梁市", value: "141100" },
  // { display: "朔州市", value: "140600" },
  // { display: "太原市", value: "140100" },
  // { display: "忻州市", value: "140900" },
  // { display: "阳泉市", value: "140300" },
  // { display: "运城市", value: "140800" },
  // { display: "长治市", value: "140400" },
  // { display: "阿拉善盟", value: "152900" },
  // { display: "巴彦淖尔市", value: "150800" },
  // { display: "包头市", value: "150200" },
  // { display: "赤峰市", value: "150400" },
  // { display: "鄂尔多斯市", value: "150600" },
  // { display: "呼和浩特市", value: "150100" },
  // { display: "呼伦贝尔市", value: "150700" },
  // { display: "通辽市", value: "150500" },
  // { display: "乌海市", value: "150300" },
  // { display: "乌兰察布市", value: "150900" },
  // { display: "锡林郭勒盟", value: "152500" },
  // { display: "兴安盟", value: "152200" },
  // { display: "鞍山市", value: "210300" },
  // { display: "本溪市", value: "210500" },
  // { display: "朝阳市", value: "211300" },
  // { display: "大连市", value: "210200" },
  // { display: "丹东市", value: "210600" },
  // { display: "抚顺市", value: "210400" },
  // { display: "阜新市", value: "210900" },
  // { display: "葫芦岛市", value: "211400" },
  // { display: "锦州市", value: "210700" },
  // { display: "辽阳市", value: "211000" },
  // { display: "盘锦市", value: "211100" },
  // { display: "沈阳市", value: "210100" },
  // { display: "铁岭市", value: "211200" },
  // { display: "营口市", value: "210800" },
  // { display: "白城市", value: "220800" },
  // { display: "白山市", value: "220600" },
  // { display: "吉林市", value: "220200" },
  // { display: "辽源市", value: "220400" },
  // { display: "四平市", value: "220300" },
  // { display: "松原市", value: "220700" },
  // { display: "通化市", value: "220500" },
  // { display: "延边朝鲜族自治州", value: "222400" },
  // { display: "长春市", value: "220100" },
  // { display: "大庆市", value: "230600" },
  // { display: "大兴安岭地区", value: "232700" },
  // { display: "哈尔滨市", value: "230100" },
  // { display: "鹤岗市", value: "230400" },
  // { display: "黑河市", value: "231100" },
  // { display: "鸡西市", value: "230300" },
  // { display: "佳木斯市", value: "230800" },
  // { display: "牡丹江市", value: "231000" },
  // { display: "七台河市", value: "230900" },
  // { display: "齐齐哈尔市", value: "230200" },
  // { display: "双鸭山市", value: "230500" },
  // { display: "绥化市", value: "231200" },
  // { display: "伊春市", value: "230700" },
  // { display: "上海市", value: "310000" },
  // { display: "常州市", value: "320400" },
  // { display: "淮安市", value: "320800" },
  // { display: "连云港市", value: "320700" },
  // { display: "南京市", value: "320100" },
  // { display: "南通市", value: "320600" },
  // { display: "苏州市", value: "320500" },
  // { display: "泰州市", value: "321200" },
  // { display: "无锡市", value: "320200" },
  // { display: "宿迁市", value: "321300" },
  // { display: "徐州市", value: "320300" },
  // { display: "盐城市", value: "320900" },
  // { display: "扬州市", value: "321000" },
  // { display: "镇江市", value: "321100" },
  // { display: "杭州市", value: "330100" },
  // { display: "湖州市", value: "330500" },
  // { display: "嘉兴市", value: "330400" },
  // { display: "金华市", value: "330700" },
  // { display: "丽水市", value: "331100" },
  // { display: "宁波市", value: "330200" },
  // { display: "衢州市", value: "330800" },
  // { display: "绍兴市", value: "330600" },
  // { display: "台州市", value: "331000" },
  // { display: "温州市", value: "330300" },
  // { display: "舟山市", value: "330900" },
  // { display: "安庆市", value: "340800" },
  // { display: "蚌埠市", value: "340300" },
  // { display: "亳州市", value: "341600" },
  // { display: "池州市", value: "341700" },
  // { display: "滁州市", value: "341100" },
  // { display: "阜阳市", value: "341200" },
  // { display: "合肥市", value: "340100" },
  // { display: "淮北市", value: "340600" },
  // { display: "淮南市", value: "340400" },
  // { display: "黄山市", value: "341000" },
  // { display: "六安市", value: "341500" },
  // { display: "马鞍山市", value: "340500" },
  // { display: "铜陵市", value: "340700" },
  // { display: "芜湖市", value: "340200" },
  // { display: "宿州市", value: "341300" },
  // { display: "宣城市", value: "341800" },
  // { display: "福州市", value: "350100" },
  // { display: "龙岩市", value: "350800" },
  // { display: "南平市", value: "350700" },
  // { display: "宁德市", value: "350900" },
  // { display: "莆田市", value: "350300" },
  // { display: "泉州市", value: "350500" },
  // { display: "三明市", value: "350400" },
  // { display: "厦门市", value: "350200" },
  // { display: "漳州市", value: "350600" },
  // { display: "抚州市", value: "361000" },
  // { display: "赣州市", value: "360700" },
  // { display: "吉安市", value: "360800" },
  // { display: "景德镇市", value: "360200" },
  // { display: "九江市", value: "360400" },
  // { display: "南昌市", value: "360100" },
  // { display: "萍乡市", value: "360300" },
  // { display: "上饶市", value: "361100" },
  // { display: "新余市", value: "360500" },
  // { display: "宜春市", value: "360900" },
  // { display: "鹰潭市", value: "360600" },
  // { display: "滨州市", value: "371600" },
  // { display: "德州市", value: "371400" },
  // { display: "东营市", value: "370500" },
  // { display: "菏泽市", value: "371700" },
  // { display: "济南市", value: "370100" },
  // { display: "济宁市", value: "370800" },
  // { display: "莱芜市", value: "371200" },
  // { display: "聊城市", value: "371500" },
  // { display: "临沂市", value: "371300" },
  // { display: "青岛市", value: "370200" },
  // { display: "日照市", value: "371100" },
  // { display: "泰安市", value: "370900" },
  // { display: "威海市", value: "371000" },
  // { display: "潍坊市", value: "370700" },
  // { display: "烟台市", value: "370600" },
  // { display: "枣庄市", value: "370400" },
  // { display: "淄博市", value: "370300" },
  // { display: "安阳市", value: "410500" },
  // { display: "鹤壁市", value: "410600" },
  // { display: "焦作市", value: "410800" },
  // { display: "开封市", value: "410200" },
  // { display: "洛阳市", value: "410300" },
  // { display: "漯河市", value: "411100" },
  // { display: "南阳市", value: "411300" },
  // { display: "平顶山市", value: "410400" },
  // { display: "濮阳市", value: "410900" },
  // { display: "三门峡市", value: "411200" },
  // { display: "商丘市", value: "411400" },
  // { display: "新乡市", value: "410700" },
  // { display: "信阳市", value: "411500" },
  // { display: "许昌市", value: "411000" },
  // { display: "郑州市", value: "410100" },
  // { display: "周口市", value: "411600" },
  // { display: "驻马店市", value: "411700" },
  // { display: "鄂州市", value: "420700" },
  // { display: "恩施土家族苗族自治州", value: "422800" },
  // { display: "黄冈市", value: "421100" },
  // { display: "黄石市", value: "420200" },
  // { display: "荆门市", value: "420800" },
  // { display: "荆州市", value: "421000" },
  // { display: "十堰市", value: "420300" },
  // { display: "随州市", value: "421300" },
  // { display: "武汉市", value: "420100" },
  // { display: "咸宁市", value: "421200" },
  // { display: "襄阳市", value: "421400" },
  // { display: "孝感市", value: "420900" },
  // { display: "宜昌市", value: "420500" },
  // { display: "常德市", value: "430700" },
  // { display: "郴州市", value: "431000" },
  // { display: "衡阳市", value: "430400" },
  // { display: "怀化市", value: "431200" },
  // { display: "娄底市", value: "431300" },
  // { display: "邵阳市", value: "430500" },
  // { display: "湘潭市", value: "430300" },
  // { display: "湘西土家族苗族自治州", value: "433100" },
  // { display: "益阳市", value: "430900" },
  // { display: "永州市", value: "431100" },
  // { display: "岳阳市", value: "430600" },
  // { display: "张家界市", value: "430800" },
  // { display: "长沙市", value: "430100" },
  // { display: "株洲市", value: "430200" },
  // { display: "潮州市", value: "445100" },
  // { display: "东莞市", value: "441900" },
  // { display: "佛山市", value: "440600" },
  // { display: "广州市", value: "440100" },
  // { display: "河源市", value: "441600" },
  // { display: "惠州市", value: "441300" },
  // { display: "江门市", value: "440700" },
  // { display: "揭阳市", value: "445200" },
  // { display: "茂名市", value: "440900" },
  // { display: "梅州市", value: "441400" },
  // { display: "清远市", value: "441800" },
  // { display: "汕头市", value: "440500" },
  // { display: "汕尾市", value: "441500" },
  // { display: "韶关市", value: "440200" },
  // { display: "深圳市", value: "440300" },
  // { display: "阳江市", value: "441700" },
  // { display: "云浮市", value: "445300" },
  // { display: "湛江市", value: "440800" },
  // { display: "肇庆市", value: "441200" },
  // { display: "中山市", value: "442000" },
  // { display: "珠海市", value: "440400" },
  // { display: "百色市", value: "451000" },
  // { display: "北海市", value: "450500" },
  // { display: "防城港市", value: "450600" },
  // { display: "贵港市", value: "450800" },
  // { display: "桂林市", value: "450300" },
  // { display: "河池市", value: "451200" },
  // { display: "柳州市", value: "450200" },
  // { display: "南宁市", value: "450100" },
  // { display: "钦州市", value: "450700" },
  // { display: "梧州市", value: "450400" },
  // { display: "玉林市", value: "450900" },
  // { display: "来宾市", value: "451300" },
  // { display: "儋州市", value: "469000" },
  // { display: "海口市", value: "460100" },
  // { display: "三亚市", value: "460200" },
  // { display: "重庆市", value: "500000" },
  // { display: "阿坝藏族羌族自治州", value: "513200" },
  // { display: "巴中市", value: "511900" },
  // { display: "成都市", value: "510100" },
  // { display: "达州市", value: "511700" },
  // { display: "德阳市", value: "510600" },
  // { display: "甘孜藏族自治州", value: "513300" },
  // { display: "广安市", value: "511600" },
  // { display: "广元市", value: "510800" },
  // { display: "乐山市", value: "511100" },
  // { display: "凉山彝族自治州", value: "513400" },
  // { display: "泸州市", value: "510500" },
  // { display: "眉山市", value: "511400" },
  // { display: "绵阳市", value: "510700" },
  // { display: "南充市", value: "511300" },
  // { display: "内江市", value: "511000" },
  // { display: "攀枝花市", value: "510400" },
  // { display: "遂宁市", value: "510900" },
  // { display: "雅安市", value: "511800" },
  // { display: "宜宾市", value: "511500" },
  // { display: "资阳市", value: "512000" },
  // { display: "自贡市", value: "510300" },
  // { display: "安顺市", value: "520400" },
  // { display: "毕节市", value: "522400" },
  // { display: "贵阳市", value: "520100" },
  // { display: "六盘水市", value: "520200" },
  // { display: "黔东南苗族侗族自治州", value: "522600" },
  // { display: "黔南布依族苗族自治州", value: "522700" },
  // { display: "黔西南布依族苗族自治州", value: "522300" },
  // { display: "铜仁市", value: "522200" },
  // { display: "遵义市", value: "520300" },
  // { display: "保山市", value: "530500" },
  // { display: "楚雄彝族自治州", value: "532300" },
  // { display: "大理白族自治州", value: "532900" },
  // { display: "德宏傣族景颇族自治州", value: "533100" },
  // { display: "迪庆藏族自治州", value: "533400" },
  // { display: "红河哈尼族彝族自治州", value: "532500" },
  // { display: "昆明市", value: "530100" },
  // { display: "丽江市", value: "530700" },
  // { display: "临沧市", value: "530900" },
  // { display: "怒江傈僳族自治州", value: "533300" },
  // { display: "普洱市", value: "530800" },
  // { display: "曲靖市", value: "530300" },
  // { display: "文山壮族苗族自治州", value: "532600" },
  // { display: "西双版纳傣族自治州", value: "532800" },
  // { display: "玉溪市", value: "530400" },
  // { display: "昭通市", value: "530600" },
  // { display: "阿里地区", value: "542500" },
  // { display: "昌都地区", value: "542100" },
  // { display: "拉萨市", value: "540100" },
  // { display: "林芝地区", value: "542600" },
  // { display: "那曲地区", value: "542400" },
  // { display: "日喀则地区", value: "542300" },
  // { display: "山南地区", value: "542200" },
  // { display: "安康市", value: "610900" },
  // { display: "宝鸡市", value: "610300" },
  // { display: "汉中市", value: "610700" },
  // { display: "商洛市", value: "611000" },
  // { display: "铜川市", value: "610200" },
  // { display: "渭南市", value: "610500" },
  // { display: "西安市", value: "610100" },
  // { display: "咸阳市", value: "610400" },
  // { display: "延安市", value: "610600" },
  // { display: "榆林市", value: "610800" },
  // { display: "白银市", value: "620400" },
  // { display: "定西市", value: "621100" },
  // { display: "甘南藏族自治州", value: "623000" },
  // { display: "酒泉市", value: "620900" },
  // { display: "兰州市", value: "620100" },
  // { display: "临夏回族自治州", value: "622900" },
  // { display: "陇南市", value: "621200" },
  // { display: "平凉市", value: "620800" },
  // { display: "庆阳市", value: "621000" },
  // { display: "天水市", value: "620500" },
  // { display: "武威市", value: "620600" },
  // { display: "张掖市", value: "620700" },
  // { display: "果洛藏族自治州", value: "632600" },
  // { display: "海北藏族自治州", value: "632200" },
  // { display: "海东地区", value: "632100" },
  // { display: "海南藏族自治州", value: "632500" },
  // { display: "海西蒙古族藏族自治州", value: "632800" },
  // { display: "黄南藏族自治州", value: "632300" },
  // { display: "西宁市", value: "630100" },
  // { display: "玉树藏族自治州", value: "632700" },
  // { display: "固原市", value: "640400" },
  // { display: "石嘴山市", value: "640200" },
  // { display: "吴忠市", value: "640300" },
  // { display: "银川市", value: "640100" },
  // { display: "中卫市", value: "640500" },
  // { display: "阿克苏地区", value: "652900" },
  // { display: "阿勒泰地区", value: "654300" },
  // { display: "巴音郭楞蒙古自治州", value: "652800" },
  // { display: "博尔塔拉蒙古自治州", value: "652700" },
  // { display: "昌吉回族自治州", value: "652300" },
  // { display: "哈密地区", value: "652200" },
  // { display: "和田地区", value: "653200" },
  // { display: "喀什地区", value: "653100" },
  // { display: "克拉玛依市", value: "650200" },
  // { display: "克孜勒苏柯尔克孜自治州", value: "653000" },
  // { display: "石河子", value: "659001" },
  // { display: "塔城地区", value: "654200" },
  // { display: "吐鲁番地区", value: "652100" },
  // { display: "乌鲁木齐市", value: "650100" },
  // { display: "伊犁哈萨克自治州", value: "654000" }]
}
