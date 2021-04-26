import { Component } from "@angular/core";
import { MenuController, Platform } from "ionic-angular";
import { NgZone, ElementRef, Renderer } from "@angular/core";
import { CallNumber } from "@ionic-native/call-number";
import { NativeStorage } from "@ionic-native/native-storage";
import { Geolocation } from "@ionic-native/geolocation";
import { DatePicker } from "@ionic-native/date-picker";
import {
  NativeGeocoder,
  NativeGeocoderReverseResult
} from "@ionic-native/native-geocoder";
import { Http } from "@angular/http";
import moment from "moment";
import { Toast } from "@ionic-native/toast";
import { Diagnostic } from "@ionic-native/diagnostic";
const promoCodeUrl: string =
  "http://youdrinkwedrive.lk/costcalc-api/?estimated_distance=25&client_promo_code=";
const dateTimeFormat: string = "YYYY-MM-DDTHH:mm";
const dateTimeDisplayFormat: string = " DD  | MMM | YYYY hh:mm A";
const pickupValidationMsg =
  "Pickup time should be at least 25 minutes from now.";
const calculateDistanceError =
  "Error occured in calculating distance, please retry!";
const fromToValidationError = "Empty field or incorrect entry";
const estimationErrorMessage = "Please estimate before reserve ";
const personalInfoValidationError = "Empty field or incorrect entry";
const thankYouMessage = "Thank you for submit your information.";
const sorryMessage =
  "Sorry, there have been an issue with our system. Please try again in a while.";
const closedMessage = "Sorry, our drivers are not available at the moment.";
const requiredMessage = "Please fill all required fields.";
@Component({
  templateUrl: "bookVehicle.html"
})
export class BookVehiclePage {
  zone: NgZone;
  protected spinnerParams: Object = { isHidden: true, bgVisible: false };
  private searchFrom: string;
  private searchFromObj: any;
  private searchToGlobalObj: any;
  private searchTo: string;
  private showPersonalDetails: boolean;
  public showNavbar: boolean;
  private name: string;
  private telNo: string;
  private email: string;
  private acceptedLicence: boolean;
  private startDate: any = null;
  private minDate: any = null;
  private maxDate: any = null;
  private defaultMinTime: any = null;
  private callCenterNumber: string = "0777400040";
  private addedMinutes: any = 25;
  private fromCordinates: any;
  private promoCode: string = "PROMO.CODE";
  private distanceCost: any = 0;
  private distance: any = 0;
  private validTime: boolean = true;
  private displayDate: string = "";
  private isShopOpened: boolean = true;
  constructor(
    private menu: MenuController,
    private callNumber: CallNumber,
    private datePicker: DatePicker,
    public nativeStorage: NativeStorage,
    private geolocation: Geolocation,
    private diagnostic: Diagnostic,
    private renderer: Renderer,
    private nativeGeocoder: NativeGeocoder,
    public platform: Platform,
    private toast: Toast,
    private elementRef: ElementRef,
    public http: Http
  ) {
    this.defaultMinTime = moment()
      .add(this.addedMinutes, "minutes")
      .format(dateTimeFormat);

    this.startDate = this.minDate = this.defaultMinTime;
    this.setDisplayDate();
    this.maxDate = moment()
      .endOf("year")
      .format(dateTimeFormat);

    this.getLastDestination();
  }

  setDisplayDate() {
    this.displayDate = moment(this.startDate).format(dateTimeDisplayFormat);
    this.startDate = this.minDate = this.defaultMinTime;
    this.maxDate = moment()
      .endOf("year")
      .format(dateTimeFormat);

    this.getLastDestination();
  }

  ngOnInit(): void {
    this.showSpinner(true, false);
    this.isShopOpen().subscribe(
      (response: any) => {
        this.showSpinner(false, false);
        this.isShopOpened = response.result;
        if (!this.isShopOpened) {
          this.showToast(closedMessage);
        } else {
          this.getCurrentPosition();
          this.showPersonalDetails = true;
          this.getPersonalInfo();
        }
      },
      error => {},
      () => {
        this.showSpinner(false, false);
      }
    );
  }

  private getNowAndAdd(nbDays, forceDate = false): any {
    var date = new Date(new Date().getTime() + nbDays * 24 * 3600 * 1000);

    return this.platform.is("android") && !forceDate ? date.getTime() : date;
  }

  public openPicker() {
    this.datePicker
      .show({
        date: this.startDate,
        minDate: this.minDate,
        allowOldDates: false,
        mode: "datetime",
        androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT,
        minuteInterval: 15
      })
      .then(
        date => {
          this.startDate = date;
          this.setDisplayDate();
          this.dateChanged(date);
          console.log("Got date: ", date);
        },
        err => console.log("Error occurred while getting date: ", err)
      );
  }

  public timeChanged(event: any) {}

  public dateChanged(event: any) {
    this.clearEstimate();
    let newMinTime = moment(event);

    if (newMinTime < moment().add(this.addedMinutes, "minutes")) {
      this.showToast(pickupValidationMsg);

      this.validTime = false;
    } else {
      this.validTime = true;
    }
  }

  validateEmail($email) {
    var emailReg = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return emailReg.test($email);
  }

  validatePhone($phone) {
    var phoneReg = /^\d{10}$/;
    return phoneReg.test($phone);
  }

  public isEstimatePossible(): boolean {
    if (this.isShopOpened) {
      if (
        this.isFieldAvailable(this.searchFrom) &&
        this.isFieldAvailable(this.searchTo)
      ) {
        if (this.validTime) {
          return true;
        } else {
          this.showToast(pickupValidationMsg);
        }
      } else {
        this.showToast(personalInfoValidationError);
      }
    } else {
      this.showToast(closedMessage);
    }
    return false;
  }

  public getEstimate() {
    if (this.isEstimatePossible()) {
      this.showSpinner(true, true);
      let distanceUrl =
        "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" +
        this.searchFrom +
        "&destinations=" +
        this.searchTo +
        "&departure_time=now&key=AIzaSyCDY5NB991GzLR9RMnH2usCDgpONPdq2Mo";
      this.http.get(distanceUrl).subscribe(
        (response: any) => {
          console.log(response);
          let distanceInfo = JSON.parse(response._body);
          if (distanceInfo != null && distanceInfo != undefined) {
            this.distance = distanceInfo.rows[0].elements[0].distance.text;
            let url =
              " http://youdrinkwedrive.lk/costcalc-api/?estimated_distance=" +
              this.distance +
              "&client_promo_code=" +
              this.promoCode;
            this.http.get(url).subscribe(
              (response: any) => {
                console.log(response);
                this.distanceCost = JSON.parse(response._body).final_cost;
              },
              error => {
                console.log(error);
                this.showToast(calculateDistanceError);
                this.showSpinner(false, false);
              },
              () => {
                this.showSpinner(false, false);
              }
            );
          } else {
            this.showSpinner(false, false);
            this.showToast(calculateDistanceError);
          }
        },
        error => {
          console.log(error);
          this.showToast(calculateDistanceError);
          this.showSpinner(false, false);
        },
        () => {}
      );
    }
  }

  public reserveDriver() {
    this.showSpinner(true, true);
    this.isShopOpen().subscribe(
      (response: any) => {
        this.showSpinner(false, false);
        this.isShopOpened = response.result;
        if (!this.isShopOpened) {
          this.showToast(closedMessage);
        } else {
          if (this.isReservable()) {
            let pickedDate = new Date(this.startDate);
            let formattedDate = moment(pickedDate).format("DD/MM/YYYY");
            let formattedTime = moment(pickedDate).format("hh:mm A");

            let url =
              "http://youdrinkwedrive.lk/recordtrip-api/?client_name=" +
              this.name +
              "&client_email=" +
              this.email +
              "&client_phone_no=" +
              this.telNo +
              "&pickup_location=" +
              this.searchFrom +
              "&destination=" +
              this.searchTo +
              "&pickup_date=" +
              formattedDate +
              "&pickup_time=" +
              formattedTime +
              "&estimated_cost=+" +
              this.distanceCost +
              "&estimated_distance=" +
              this.distance +
              "&client_promo_code=" +
              this.promoCode +
              "&source=app_android";
            this.showSpinner(true, true);
            this.http.get(url).subscribe(
              (response: any) => {
                console.log(response);
                let result = JSON.parse(response._body);
                this.showMessage(result.result);

                console.log("driver reserved");
              },
              error => {
                console.log(error);
                this.showSpinner(false, false);
                this.toast
                  .show("Error occured!", "5000", "center")
                  .subscribe(toast => {
                    console.log(toast);
                  });
              },
              () => {
                this.showSpinner(false, false);
              }
            );
          }
        }
      },
      error => {},
      () => {
        this.showSpinner(false, false);
      }
    );
  }

  private isShopOpen() {
    let url = "http://youdrinkwedrive.lk/isonline";
    return this.http.get(url).map(response => response.json());
  }

  private showMessage(result) {
    let message = "";
    switch (result) {
      case 0:
        message = thankYouMessage;
        break;
      case 1:
        message = sorryMessage;
        break;
      case 2:
        message = requiredMessage;
        break;
      case 3:
        // We need to add another error message when user click submit button :
        // If the respond you get is 3, then please show this message :
        // "We are sorry, we are closed now!"

        message = closedMessage;
        break;
    }
    this.toast.show(message, "5000", "center").subscribe(toast => {});
  }

  public getPersonalInfo() {
    this.nativeStorage.getItem("name").then(data => {
      this.name = data;
    });
    this.nativeStorage.getItem("telNo").then(data => (this.telNo = data));
    this.nativeStorage.getItem("email").then(data => {
      this.email = data;
      this.showPersonalDetails = !this.isPersonalInfoAvailable();
    });
  }

  isPersonalInfoAvailable(): boolean {
    if (
      this.isFieldAvailable(this.name) &&
      this.isFieldAvailable(this.telNo) &&
      this.isFieldAvailable(this.email) &&
      this.validateEmail(this.email) &&
      this.validatePhone(this.telNo)
    ) {
      return true;
    }
    return false;
  }

  public getLastDestination() {
    let searchToObj: any = this.nativeStorage.getItem("searchTo");
    searchToObj.then(res => {
      this.searchTo = searchToObj.__zone_symbol__value.description;
      this.searchToGlobalObj = searchToObj.__zone_symbol__value;
    });
  }

  private setSearchFrom(data: any) {
    this.fromCordinates = {
      lat: data.coords.latitude,
      long: data.coords.longitude
    };
    console.log(this.fromCordinates);

    let distanceUrl =
      "https://maps.googleapis.com/maps/api/geocode/json?latlng= " +
      data.coords.latitude +
      "," +
      data.coords.longitude +
      "&key=AIzaSyCDY5NB991GzLR9RMnH2usCDgpONPdq2Mo";
    this.http.get(distanceUrl).subscribe(
      (response: any) => {
        console.log(response);
        let distanceInfo = JSON.parse(response._body);
        console.log(distanceInfo.results[0].formatted_address);
        this.searchFrom = distanceInfo.results[0].formatted_address;
      },
      error => {
        console.log(error);
        this.showToast("Error occured in searching, please retry!");
        this.showSpinner(false, false);
      },
      () => {}
    );
  }

  public getCurrentPosition() {
    this.platform.ready().then(() => {
      this.showSpinner(true, true);
      this.diagnostic
        .isLocationEnabled()
        .then(isAvailable => {
          if (!isAvailable) {
            this.showSpinner(false, false);
            this.showToast("Please Make sure to switch on  gps");
          } else {
            this.geolocation
              .getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
              })
              .then(data => {
                this.setSearchFrom(data);
                this.showSpinner(false, false);
              })
              .catch(error => {
                console.log("Error getting location", error);
                this.showSpinner(false, false);
              });
          }
        })
        .catch(e => {
          this.showSpinner(false, false);
        });
    });
  }

  public estimationDone(): boolean {
    if (
      this.isFieldAvailable(this.distanceCost) &&
      this.isFieldAvailable(this.distance)
    ) {
      return true;
    } else {
      this.showToast(estimationErrorMessage);
    }
    return false;
  }

  public isReservable(): boolean {
    debugger;
    if (this.isEstimatePossible()) {
      if (this.estimationDone()) {
        if (this.isPersonalInfoAvailable()) {
          return true;
        } else {
          this.showToast(personalInfoValidationError);
        }
      }
    }

    return false;
  }

  public isFieldAvailable(field: any): boolean {
    let available = field != null && field != undefined && field != "";

    return available;
  }

  public togglePersonal() {
    this.showPersonalDetails = !this.showPersonalDetails;
  }

  public from(event: any) {
    this.searchFrom = event.description;
    this.clearEstimate();
  }

  public to(event: any) {
    this.searchTo = event.description;
    this.saveToStorage("searchTo", event);
    this.clearEstimate();
  }

  private clearEstimate() {
    this.distance = "";
    this.distanceCost = "";
  }

  public CallNumber() {
    this.callNumber
      .callNumber(this.callCenterNumber, true)
      .then(res => console.log("Launched dialer!", res))
      .catch(err => console.log("Error launching dialer", err));
  }

  public saveToStorage(key: string, value: string) {
    this.nativeStorage.setItem(key, value);
  }

  public setName() {
    this.saveToStorage("name", this.name);
  }

  public setTel() {
    this.saveToStorage("telNo", this.telNo);
  }

  public setEmail() {
    this.saveToStorage("email", this.email);
  }

  public showSpinner(isVisible: boolean, bgVisible: boolean): void {
    this.spinnerParams = { isHidden: !isVisible, isBackground: bgVisible };
  }

  public ionViewDidLoad() {
    let searchIcon = this.elementRef.nativeElement.querySelector(
      ".searchbar-search-icon"
    );
    if (searchIcon != null) {
      this.renderer.listen(searchIcon, "click", event => {
        this.getCurrentPosition();
      });
    }
  }

  showToast(message) {
    this.platform.ready().then(() => {
      this.toast.show(message, "3000", "center").subscribe(toast => {
        console.log(toast);
      });
    });
  }
}
