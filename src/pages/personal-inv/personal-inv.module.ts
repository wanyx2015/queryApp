import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonalInvPage } from './personal-inv';

@NgModule({
  declarations: [
    PersonalInvPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonalInvPage),
  ],
})
export class PersonalInvPageModule {}
