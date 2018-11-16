import { LocationPage } from './../location/location';
import { PersonalInvPage } from './../personal-inv/personal-inv';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = PersonalInvPage;
  tab3Root = ContactPage;
  tab4Root = LocationPage;
  tab5Root = LoginPage;
  // tab5Root = LoginPage;
  // tab6Root = LoginPage;

  constructor() {

  }
}
