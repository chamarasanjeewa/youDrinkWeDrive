import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicApp, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BookVehicleApp } from './app.component';
import { HttpModule } from '@angular/http';
import { BookVehiclePage } from './../pages/bookVehicle/bookVehicle';
import { GooglePlacesAutocompleteComponent } from './../directives/googleAutoComplete/googleAutoComplete';
import { SpinnerComponent } from './../directives/spinner';
import { CallNumber } from '@ionic-native/call-number';
import { NativeStorage } from '@ionic-native/native-storage';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { Network } from '@ionic-native/network';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Toast } from '@ionic-native/toast';
import { DatePicker } from '@ionic-native/date-picker';


@NgModule({
  declarations: [
    BookVehicleApp, 
    BookVehiclePage,
    GooglePlacesAutocompleteComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(BookVehicleApp)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [IonicApp],
  entryComponents: [
    BookVehicleApp,
    BookVehiclePage,
 
  
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GooglePlacesAutocompleteComponent,
    CallNumber,
    Geolocation,
    NativeStorage,
    NativeGeocoder,
    Network,
    Diagnostic,
    Toast,
    DatePicker
    
  ]
})
export class AppModule { }
