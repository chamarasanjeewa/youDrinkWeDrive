import { Component, ViewChild } from "@angular/core";
import { Platform, Nav, Config } from "ionic-angular";
import { StatusBar } from "ionic-native";
import { SplashScreen } from "@ionic-native/splash-screen";
import { BookVehiclePage } from "./../pages/bookVehicle/bookVehicle";

import { timer } from "rxjs/observable/timer";
import { Network } from "@ionic-native/network";
import { Toast } from "@ionic-native/toast";
import { Http } from "@angular/http";
const internetMessage: string =
  "This app needs internet connection,Please switch on WIFI or mobile data!";
const closedMessage = "Sorry, our drivers are not available at the moment.";
@Component({
  templateUrl: "app.html"
})
export class BookVehicleApp {
  @ViewChild(Nav)
  nav: Nav;
  showSplash = true; // <-- show animation
  protected spinnerParams: Object = { isHidden: true, bgVisible: false };
  private online: boolean = false;
  categoryList: any = [];
  constructor(
    public platform: Platform,
    private splashScreen: SplashScreen,
    private network: Network,
    private config: Config,
    private toast: Toast,
    private http: Http

  ) {
    this.initializeApp();

    document.addEventListener(
      "resume",
      () => {
        this.showSpinner(true, true);
        this.isShopOpen().subscribe(x => {
          let isShopOpened = x.result;
          if (!isShopOpened) {
          this.platform.ready().then(() => {
            this.showSpinner(false, false);
            this.showToast(closedMessage)
          });
        }
        },
        error => {},
        () => {
          this.showSpinner(false, false);
        });
      },
      false
    );
  }

  private isShopOpen() {
    let url = "http://youdrinkwedrive.lk/isonline";
    return this.http.get(url).map(response => response.json());
  }

  private exitApp(): void {
    this.platform.exitApp();
    navigator["app"].exitApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();

      this.config.set("ios", "backButtonText", "");
      StatusBar.overlaysWebView(false);
      if (this.platform.is("ios")) {
        StatusBar.backgroundColorByHexString("#00a0ff");
      }
      this.splashScreen.hide();
      timer(200).subscribe(() => (this.showSplash = false));
      this.viewBookingScreen();

      let type = this.network.type;
      if (type == "unknown" || type == "none" || type == undefined) {
        this.online = false;
        this.showToast(internetMessage);
      } else {
        this.online = true;
      }

      let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
        this.showToast(internetMessage);
      });
    });
  }

  showToast(message) {
    this.toast.show(message, "3000", "center").subscribe(toast => {
      console.log(toast);
    });
  }
  public showSpinner(isVisible: boolean, bgVisible: boolean): void {
    this.spinnerParams = { isHidden: !isVisible, isBackground: bgVisible };
  }

  private viewBookingScreen() {
    this.nav.setRoot(BookVehiclePage);
  }
}
