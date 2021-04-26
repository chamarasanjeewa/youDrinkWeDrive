webpackJsonp([0],{

/***/ 114:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 114;

/***/ }),

/***/ 157:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 157;

/***/ }),

/***/ 320:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BookVehiclePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_call_number__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_storage__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_date_picker__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_native_geocoder__ = __webpack_require__(325);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_http__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_toast__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_diagnostic__ = __webpack_require__(449);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var promoCodeUrl = "http://youdrinkwedrive.lk/costcalc-api/?estimated_distance=25&client_promo_code=";
var dateTimeFormat = "YYYY-MM-DDTHH:mm";
var dateTimeDisplayFormat = " DD  | MMM | YYYY hh:mm A";
var pickupValidationMsg = "Pickup time should be at least 25 minutes from now.";
var calculateDistanceError = "Error occured in calculating distance, please retry!";
var fromToValidationError = "Empty field or incorrect entry";
var estimationErrorMessage = "Please estimate before reserve ";
var personalInfoValidationError = "Empty field or incorrect entry";
var thankYouMessage = "Thank you for submit your information.";
var sorryMessage = "Sorry, there have been an issue with our system. Please try again in a while.";
var closedMessage = "Sorry, our drivers are not available at the moment.";
var requiredMessage = "Please fill all required fields.";
var BookVehiclePage = /** @class */ (function () {
    function BookVehiclePage(menu, callNumber, datePicker, nativeStorage, geolocation, diagnostic, renderer, nativeGeocoder, platform, toast, elementRef, http) {
        this.menu = menu;
        this.callNumber = callNumber;
        this.datePicker = datePicker;
        this.nativeStorage = nativeStorage;
        this.geolocation = geolocation;
        this.diagnostic = diagnostic;
        this.renderer = renderer;
        this.nativeGeocoder = nativeGeocoder;
        this.platform = platform;
        this.toast = toast;
        this.elementRef = elementRef;
        this.http = http;
        this.spinnerParams = { isHidden: true, bgVisible: false };
        this.startDate = null;
        this.minDate = null;
        this.maxDate = null;
        this.defaultMinTime = null;
        this.callCenterNumber = "0777400040";
        this.addedMinutes = 25;
        this.promoCode = "PROMO.CODE";
        this.distanceCost = 0;
        this.distance = 0;
        this.validTime = true;
        this.displayDate = "";
        this.isShopOpened = true;
        this.defaultMinTime = __WEBPACK_IMPORTED_MODULE_8_moment___default()()
            .add(this.addedMinutes, "minutes")
            .format(dateTimeFormat);
        this.startDate = this.minDate = this.defaultMinTime;
        this.setDisplayDate();
        this.maxDate = __WEBPACK_IMPORTED_MODULE_8_moment___default()()
            .endOf("year")
            .format(dateTimeFormat);
        this.getLastDestination();
    }
    BookVehiclePage.prototype.setDisplayDate = function () {
        this.displayDate = __WEBPACK_IMPORTED_MODULE_8_moment___default()(this.startDate).format(dateTimeDisplayFormat);
        this.startDate = this.minDate = this.defaultMinTime;
        this.maxDate = __WEBPACK_IMPORTED_MODULE_8_moment___default()()
            .endOf("year")
            .format(dateTimeFormat);
        this.getLastDestination();
    };
    BookVehiclePage.prototype.ngOnInit = function () {
        var _this = this;
        this.showSpinner(true, false);
        this.isShopOpen().subscribe(function (response) {
            _this.showSpinner(false, false);
            _this.isShopOpened = response.result;
            if (!_this.isShopOpened) {
                _this.showToast(closedMessage);
            }
            else {
                _this.getCurrentPosition();
                _this.showPersonalDetails = true;
                _this.getPersonalInfo();
            }
        }, function (error) { }, function () {
            _this.showSpinner(false, false);
        });
    };
    BookVehiclePage.prototype.getNowAndAdd = function (nbDays, forceDate) {
        if (forceDate === void 0) { forceDate = false; }
        var date = new Date(new Date().getTime() + nbDays * 24 * 3600 * 1000);
        return this.platform.is("android") && !forceDate ? date.getTime() : date;
    };
    BookVehiclePage.prototype.openPicker = function () {
        var _this = this;
        this.datePicker
            .show({
            date: this.startDate,
            minDate: this.minDate,
            allowOldDates: false,
            mode: "datetime",
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT,
            minuteInterval: 15
        })
            .then(function (date) {
            _this.startDate = date;
            _this.setDisplayDate();
            _this.dateChanged(date);
            console.log("Got date: ", date);
        }, function (err) { return console.log("Error occurred while getting date: ", err); });
    };
    BookVehiclePage.prototype.timeChanged = function (event) { };
    BookVehiclePage.prototype.dateChanged = function (event) {
        this.clearEstimate();
        var newMinTime = __WEBPACK_IMPORTED_MODULE_8_moment___default()(event);
        if (newMinTime < __WEBPACK_IMPORTED_MODULE_8_moment___default()().add(this.addedMinutes, "minutes")) {
            this.showToast(pickupValidationMsg);
            this.validTime = false;
        }
        else {
            this.validTime = true;
        }
    };
    BookVehiclePage.prototype.validateEmail = function ($email) {
        var emailReg = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        return emailReg.test($email);
    };
    BookVehiclePage.prototype.validatePhone = function ($phone) {
        var phoneReg = /^\d{10}$/;
        return phoneReg.test($phone);
    };
    BookVehiclePage.prototype.isEstimatePossible = function () {
        if (this.isShopOpened) {
            if (this.isFieldAvailable(this.searchFrom) &&
                this.isFieldAvailable(this.searchTo)) {
                if (this.validTime) {
                    return true;
                }
                else {
                    this.showToast(pickupValidationMsg);
                }
            }
            else {
                this.showToast(personalInfoValidationError);
            }
        }
        else {
            this.showToast(closedMessage);
        }
        return false;
    };
    BookVehiclePage.prototype.getEstimate = function () {
        var _this = this;
        if (this.isEstimatePossible()) {
            this.showSpinner(true, true);
            var distanceUrl = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" +
                this.searchFrom +
                "&destinations=" +
                this.searchTo +
                "&departure_time=now&key=AIzaSyCDY5NB991GzLR9RMnH2usCDgpONPdq2Mo";
            this.http.get(distanceUrl).subscribe(function (response) {
                console.log(response);
                var distanceInfo = JSON.parse(response._body);
                if (distanceInfo != null && distanceInfo != undefined) {
                    _this.distance = distanceInfo.rows[0].elements[0].distance.text;
                    var url = " http://youdrinkwedrive.lk/costcalc-api/?estimated_distance=" +
                        _this.distance +
                        "&client_promo_code=" +
                        _this.promoCode;
                    _this.http.get(url).subscribe(function (response) {
                        console.log(response);
                        _this.distanceCost = JSON.parse(response._body).final_cost;
                    }, function (error) {
                        console.log(error);
                        _this.showToast(calculateDistanceError);
                        _this.showSpinner(false, false);
                    }, function () {
                        _this.showSpinner(false, false);
                    });
                }
                else {
                    _this.showSpinner(false, false);
                    _this.showToast(calculateDistanceError);
                }
            }, function (error) {
                console.log(error);
                _this.showToast(calculateDistanceError);
                _this.showSpinner(false, false);
            }, function () { });
        }
    };
    BookVehiclePage.prototype.reserveDriver = function () {
        var _this = this;
        this.showSpinner(true, true);
        this.isShopOpen().subscribe(function (response) {
            _this.showSpinner(false, false);
            _this.isShopOpened = response.result;
            if (!_this.isShopOpened) {
                _this.showToast(closedMessage);
            }
            else {
                if (_this.isReservable()) {
                    var pickedDate = new Date(_this.startDate);
                    var formattedDate = __WEBPACK_IMPORTED_MODULE_8_moment___default()(pickedDate).format("DD/MM/YYYY");
                    var formattedTime = __WEBPACK_IMPORTED_MODULE_8_moment___default()(pickedDate).format("hh:mm A");
                    var url = "http://youdrinkwedrive.lk/recordtrip-api/?client_name=" +
                        _this.name +
                        "&client_email=" +
                        _this.email +
                        "&client_phone_no=" +
                        _this.telNo +
                        "&pickup_location=" +
                        _this.searchFrom +
                        "&destination=" +
                        _this.searchTo +
                        "&pickup_date=" +
                        formattedDate +
                        "&pickup_time=" +
                        formattedTime +
                        "&estimated_cost=+" +
                        _this.distanceCost +
                        "&estimated_distance=" +
                        _this.distance +
                        "&client_promo_code=" +
                        _this.promoCode +
                        "&source=app_android";
                    _this.showSpinner(true, true);
                    _this.http.get(url).subscribe(function (response) {
                        console.log(response);
                        var result = JSON.parse(response._body);
                        _this.showMessage(result.result);
                        console.log("driver reserved");
                    }, function (error) {
                        console.log(error);
                        _this.showSpinner(false, false);
                        _this.toast
                            .show("Error occured!", "5000", "center")
                            .subscribe(function (toast) {
                            console.log(toast);
                        });
                    }, function () {
                        _this.showSpinner(false, false);
                    });
                }
            }
        }, function (error) { }, function () {
            _this.showSpinner(false, false);
        });
    };
    BookVehiclePage.prototype.isShopOpen = function () {
        var url = "http://youdrinkwedrive.lk/isonline";
        return this.http.get(url).map(function (response) { return response.json(); });
    };
    BookVehiclePage.prototype.showMessage = function (result) {
        var message = "";
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
        this.toast.show(message, "5000", "center").subscribe(function (toast) { });
    };
    BookVehiclePage.prototype.getPersonalInfo = function () {
        var _this = this;
        this.nativeStorage.getItem("name").then(function (data) {
            _this.name = data;
        });
        this.nativeStorage.getItem("telNo").then(function (data) { return (_this.telNo = data); });
        this.nativeStorage.getItem("email").then(function (data) {
            _this.email = data;
            _this.showPersonalDetails = !_this.isPersonalInfoAvailable();
        });
    };
    BookVehiclePage.prototype.isPersonalInfoAvailable = function () {
        if (this.isFieldAvailable(this.name) &&
            this.isFieldAvailable(this.telNo) &&
            this.isFieldAvailable(this.email) &&
            this.validateEmail(this.email) &&
            this.validatePhone(this.telNo)) {
            return true;
        }
        return false;
    };
    BookVehiclePage.prototype.getLastDestination = function () {
        var _this = this;
        var searchToObj = this.nativeStorage.getItem("searchTo");
        searchToObj.then(function (res) {
            _this.searchTo = searchToObj.__zone_symbol__value.description;
            _this.searchToGlobalObj = searchToObj.__zone_symbol__value;
        });
    };
    BookVehiclePage.prototype.setSearchFrom = function (data) {
        var _this = this;
        this.fromCordinates = {
            lat: data.coords.latitude,
            long: data.coords.longitude
        };
        console.log(this.fromCordinates);
        var distanceUrl = "https://maps.googleapis.com/maps/api/geocode/json?latlng= " +
            data.coords.latitude +
            "," +
            data.coords.longitude +
            "&key=AIzaSyCDY5NB991GzLR9RMnH2usCDgpONPdq2Mo";
        this.http.get(distanceUrl).subscribe(function (response) {
            console.log(response);
            var distanceInfo = JSON.parse(response._body);
            console.log(distanceInfo.results[0].formatted_address);
            _this.searchFrom = distanceInfo.results[0].formatted_address;
        }, function (error) {
            console.log(error);
            _this.showToast("Error occured in searching, please retry!");
            _this.showSpinner(false, false);
        }, function () { });
    };
    BookVehiclePage.prototype.getCurrentPosition = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.showSpinner(true, true);
            _this.diagnostic
                .isLocationEnabled()
                .then(function (isAvailable) {
                if (!isAvailable) {
                    _this.showSpinner(false, false);
                    _this.showToast("Please Make sure to switch on  gps");
                }
                else {
                    _this.geolocation
                        .getCurrentPosition({
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 0
                    })
                        .then(function (data) {
                        _this.setSearchFrom(data);
                        _this.showSpinner(false, false);
                    })
                        .catch(function (error) {
                        console.log("Error getting location", error);
                        _this.showSpinner(false, false);
                    });
                }
            })
                .catch(function (e) {
                _this.showSpinner(false, false);
            });
        });
    };
    BookVehiclePage.prototype.estimationDone = function () {
        if (this.isFieldAvailable(this.distanceCost) &&
            this.isFieldAvailable(this.distance)) {
            return true;
        }
        else {
            this.showToast(estimationErrorMessage);
        }
        return false;
    };
    BookVehiclePage.prototype.isReservable = function () {
        debugger;
        if (this.isEstimatePossible()) {
            if (this.estimationDone()) {
                if (this.isPersonalInfoAvailable()) {
                    return true;
                }
                else {
                    this.showToast(personalInfoValidationError);
                }
            }
        }
        return false;
    };
    BookVehiclePage.prototype.isFieldAvailable = function (field) {
        var available = field != null && field != undefined && field != "";
        return available;
    };
    BookVehiclePage.prototype.togglePersonal = function () {
        this.showPersonalDetails = !this.showPersonalDetails;
    };
    BookVehiclePage.prototype.from = function (event) {
        this.searchFrom = event.description;
        this.clearEstimate();
    };
    BookVehiclePage.prototype.to = function (event) {
        this.searchTo = event.description;
        this.saveToStorage("searchTo", event);
        this.clearEstimate();
    };
    BookVehiclePage.prototype.clearEstimate = function () {
        this.distance = "";
        this.distanceCost = "";
    };
    BookVehiclePage.prototype.CallNumber = function () {
        this.callNumber
            .callNumber(this.callCenterNumber, true)
            .then(function (res) { return console.log("Launched dialer!", res); })
            .catch(function (err) { return console.log("Error launching dialer", err); });
    };
    BookVehiclePage.prototype.saveToStorage = function (key, value) {
        this.nativeStorage.setItem(key, value);
    };
    BookVehiclePage.prototype.setName = function () {
        this.saveToStorage("name", this.name);
    };
    BookVehiclePage.prototype.setTel = function () {
        this.saveToStorage("telNo", this.telNo);
    };
    BookVehiclePage.prototype.setEmail = function () {
        this.saveToStorage("email", this.email);
    };
    BookVehiclePage.prototype.showSpinner = function (isVisible, bgVisible) {
        this.spinnerParams = { isHidden: !isVisible, isBackground: bgVisible };
    };
    BookVehiclePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var searchIcon = this.elementRef.nativeElement.querySelector(".searchbar-search-icon");
        if (searchIcon != null) {
            this.renderer.listen(searchIcon, "click", function (event) {
                _this.getCurrentPosition();
            });
        }
    };
    BookVehiclePage.prototype.showToast = function (message) {
        var _this = this;
        this.platform.ready().then(function () {
            _this.toast.show(message, "3000", "center").subscribe(function (toast) {
                console.log(toast);
            });
        });
    };
    BookVehiclePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"D:\champrojects\youdrinkwedrive\youDrinkWeDrive\src\pages\bookVehicle\bookVehicle.html"*/'<spinner [isRunning]="spinnerParams"></spinner>\n\n<ion-content class="main-view">\n\n	<div class="header">\n\n		<div class="border"></div>\n\n		<div class="logo">\n\n			<h1>you <span>drink</span> we <span>drive</span></h1>\n\n		</div>\n\n	</div>\n\n	<ion-row>\n\n		<ion-col col-11>\n\n			<autoComplete class="from" placeholder="From where?" [(ngModel)]="searchFrom" (callback)="from($event[0])" key="AIzaSyCDY5NB991GzLR9RMnH2usCDgpONPdq2Mo"></autoComplete>\n\n		</ion-col>\n\n		<ion-col col-1>\n\n			<div class="gps" (click)="getCurrentPosition()"></div>\n\n		</ion-col>\n\n	</ion-row>\n\n	<ion-row>\n\n		<ion-col col-12>\n\n			<autoComplete class="to" placeholder="Where to?" [(ngModel)]="searchTo" (callback)="to($event[0])" key="AIzaSyCDY5NB991GzLR9RMnH2usCDgpONPdq2Mo"></autoComplete>\n\n		</ion-col>\n\n	</ion-row>\n\n	<ion-row>\n\n		<ion-label class="pickup-time-label" label-ios-text-color="black">PICKUP TIME</ion-label>\n\n	</ion-row>\n\n	<ion-grid>\n\n		<ion-row>\n\n			<ion-col col-10>\n\n				<!-- <ion-datetime name="datep" (ionChange)="dateChanged($event)" class="pickup-time" min={{minDate}} max={{maxDate}} #picker displayFormat=" DD  | MMM | YYYY" [(ngModel)]="startDate"></ion-datetime> -->\n\n				<div (click)="openPicker()" class="pickup-time">{{displayDate}}</div>\n\n			</ion-col>\n\n			<ion-col col-2>\n\n				<div (click)="openPicker()" class="calendar" name="calendar">(Edit)</div>\n\n			</ion-col>\n\n			<!-- <ion-col col-4>\n\n				<ion-datetime name="timeP" (clicked)="timeChanged($event)" class="pickup-time"  minuteValues="0,15,30,45" #timepicker displayFormat="hh:mm A" [(ngModel)]="startDate"></ion-datetime>\n\n			</ion-col>\n\n			<ion-col col-1>\n\n				<div (click)="timepicker.open()" class="timePicker" name="calendar">(Edit)</div>\n\n			</ion-col> -->\n\n		</ion-row>\n\n	</ion-grid>\n\n	<ion-list class="promo-code">\n\n		<ion-item>\n\n			<ion-input  [(ngModel)]="promoCode" type="text" placeholder="Promo code (if any)"></ion-input>\n\n		</ion-item>\n\n	</ion-list>\n\n	<ion-grid>\n\n		<ion-row class="estimate">\n\n			<ion-col>\n\n				<button  ion-button (click)="getEstimate()">Estimate ></button>\n\n			</ion-col>\n\n			<ion-col *ngIf="distanceCost" >\n\n				<ion-label class="distance">{{distance}} / {{distanceCost}} Rs</ion-label>\n\n			</ion-col>\n\n		</ion-row>\n\n	</ion-grid>\n\n	<ion-row>\n\n		<div class="seperator" id="seperator"> </div>\n\n	</ion-row>\n\n\n\n	<ion-grid>\n\n		<ion-row>\n\n			<ion-col class="personal-details" (click)="togglePersonal()">\n\n				<ion-label class="label">PERSONAL DETAILS\n\n					<span class="plus" *ngIf="!showPersonalDetails">+</span>\n\n					<span class="plus" *ngIf="showPersonalDetails">-</span>\n\n				</ion-label>\n\n			</ion-col>\n\n		</ion-row>\n\n	</ion-grid>\n\n	<ion-list *ngIf="showPersonalDetails" class="personal">\n\n		<ion-item>\n\n			<ion-input placeholder="Name" [(ngModel)]="name" (ionChange)="setName()"></ion-input>\n\n		</ion-item>\n\n		<ion-item>\n\n			<ion-input type="tel" [(ngModel)]="telNo" placeholder="Phone number" (ionChange)="setTel()"></ion-input>\n\n		</ion-item>\n\n		<ion-item>\n\n			<ion-input type="email" [(ngModel)]="email" placeholder="Email address" (ionChange)="setEmail()"></ion-input>\n\n		</ion-item>\n\n	</ion-list>\n\n	<ion-grid class="reserve-driver">\n\n		<ion-row>\n\n			<ion-col align-self-start width-95>\n\n				<div>\n\n					<button  (click)="reserveDriver()" ion-button class="reserve-driver">Reserve your driver</button>\n\n				</div>\n\n			</ion-col>\n\n			<ion-col width-5>\n\n			</ion-col>\n\n		</ion-row>\n\n	</ion-grid>\n\n	<ion-grid>\n\n		<ion-row>\n\n			<ion-col width-95>\n\n				<div></div>\n\n			</ion-col>\n\n			<ion-col width-5>\n\n				<div class="call-driver" (click)="CallNumber()"></div>\n\n			</ion-col>\n\n		</ion-row>\n\n	</ion-grid>\n\n</ion-content>'/*ion-inline-end:"D:\champrojects\youdrinkwedrive\youDrinkWeDrive\src\pages\bookVehicle\bookVehicle.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_call_number__["a" /* CallNumber */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_date_picker__["a" /* DatePicker */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_storage__["a" /* NativeStorage */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_diagnostic__["a" /* Diagnostic */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Renderer */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_native_geocoder__["a" /* NativeGeocoder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_toast__["a" /* Toast */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */],
            __WEBPACK_IMPORTED_MODULE_7__angular_http__["a" /* Http */]])
    ], BookVehiclePage);
    return BookVehiclePage;
}());

//# sourceMappingURL=bookVehicle.js.map

/***/ }),

/***/ 450:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(451);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(468);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 468:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_animations__ = __webpack_require__(469);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(510);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(518);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_http__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_bookVehicle_bookVehicle__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__directives_googleAutoComplete_googleAutoComplete__ = __webpack_require__(533);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__directives_spinner__ = __webpack_require__(535);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_call_number__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_native_storage__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_geolocation__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_native_geocoder__ = __webpack_require__(325);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_network__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_diagnostic__ = __webpack_require__(449);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_toast__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_date_picker__ = __webpack_require__(324);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* BookVehicleApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_bookVehicle_bookVehicle__["a" /* BookVehiclePage */],
                __WEBPACK_IMPORTED_MODULE_9__directives_googleAutoComplete_googleAutoComplete__["a" /* GooglePlacesAutocompleteComponent */],
                __WEBPACK_IMPORTED_MODULE_10__directives_spinner__["a" /* SpinnerComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* BookVehicleApp */], {}, {
                    links: []
                })
            ],
            schemas: [__WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* CUSTOM_ELEMENTS_SCHEMA */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* BookVehicleApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_bookVehicle_bookVehicle__["a" /* BookVehiclePage */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_9__directives_googleAutoComplete_googleAutoComplete__["a" /* GooglePlacesAutocompleteComponent */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_call_number__["a" /* CallNumber */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_native_storage__["a" /* NativeStorage */],
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_native_geocoder__["a" /* NativeGeocoder */],
                __WEBPACK_IMPORTED_MODULE_15__ionic_native_network__["a" /* Network */],
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_diagnostic__["a" /* Diagnostic */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_toast__["a" /* Toast */],
                __WEBPACK_IMPORTED_MODULE_18__ionic_native_date_picker__["a" /* DatePicker */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 518:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BookVehicleApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_native__ = __webpack_require__(519);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_bookVehicle_bookVehicle__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_observable_timer__ = __webpack_require__(524);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_observable_timer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_observable_timer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_network__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_toast__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_http__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var internetMessage = "This app needs internet connection,Please switch on WIFI or mobile data!";
var closedMessage = "Sorry, our drivers are not available at the moment.";
var BookVehicleApp = /** @class */ (function () {
    function BookVehicleApp(platform, splashScreen, network, config, toast, http) {
        var _this = this;
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.network = network;
        this.config = config;
        this.toast = toast;
        this.http = http;
        this.showSplash = true; // <-- show animation
        this.spinnerParams = { isHidden: true, bgVisible: false };
        this.online = false;
        this.categoryList = [];
        this.initializeApp();
        document.addEventListener("resume", function () {
            _this.showSpinner(true, true);
            _this.isShopOpen().subscribe(function (x) {
                var isShopOpened = x.result;
                if (!isShopOpened) {
                    _this.platform.ready().then(function () {
                        _this.showSpinner(false, false);
                        _this.showToast(closedMessage);
                    });
                }
            }, function (error) { }, function () {
                _this.showSpinner(false, false);
            });
        }, false);
    }
    BookVehicleApp.prototype.isShopOpen = function () {
        var url = "http://youdrinkwedrive.lk/isonline";
        return this.http.get(url).map(function (response) { return response.json(); });
    };
    BookVehicleApp.prototype.exitApp = function () {
        this.platform.exitApp();
        navigator["app"].exitApp();
    };
    BookVehicleApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            __WEBPACK_IMPORTED_MODULE_2_ionic_native__["a" /* StatusBar */].styleDefault();
            _this.config.set("ios", "backButtonText", "");
            __WEBPACK_IMPORTED_MODULE_2_ionic_native__["a" /* StatusBar */].overlaysWebView(false);
            if (_this.platform.is("ios")) {
                __WEBPACK_IMPORTED_MODULE_2_ionic_native__["a" /* StatusBar */].backgroundColorByHexString("#00a0ff");
            }
            _this.splashScreen.hide();
            Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_observable_timer__["timer"])(200).subscribe(function () { return (_this.showSplash = false); });
            _this.viewBookingScreen();
            var type = _this.network.type;
            if (type == "unknown" || type == "none" || type == undefined) {
                _this.online = false;
                _this.showToast(internetMessage);
            }
            else {
                _this.online = true;
            }
            var disconnectSubscription = _this.network.onDisconnect().subscribe(function () {
                _this.showToast(internetMessage);
            });
        });
    };
    BookVehicleApp.prototype.showToast = function (message) {
        this.toast.show(message, "3000", "center").subscribe(function (toast) {
            console.log(toast);
        });
    };
    BookVehicleApp.prototype.showSpinner = function (isVisible, bgVisible) {
        this.spinnerParams = { isHidden: !isVisible, isBackground: bgVisible };
    };
    BookVehicleApp.prototype.viewBookingScreen = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_bookVehicle_bookVehicle__["a" /* BookVehiclePage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */])
    ], BookVehicleApp.prototype, "nav", void 0);
    BookVehicleApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"D:\champrojects\youdrinkwedrive\youDrinkWeDrive\src\app\app.html"*/'<div *ngIf="showSplash" class="splash">\n\n    <!-- <div class="spinner"></div> -->\n\n    <ion-spinner name="bubbles"></ion-spinner>\n\n  </div>\n\n<ion-nav [root]="rootPage" swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"D:\champrojects\youdrinkwedrive\youDrinkWeDrive\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_network__["a" /* Network */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* Config */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_toast__["a" /* Toast */],
            __WEBPACK_IMPORTED_MODULE_8__angular_http__["a" /* Http */]])
    ], BookVehicleApp);
    return BookVehicleApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 523:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 326,
	"./af.js": 326,
	"./ar": 327,
	"./ar-dz": 328,
	"./ar-dz.js": 328,
	"./ar-kw": 329,
	"./ar-kw.js": 329,
	"./ar-ly": 330,
	"./ar-ly.js": 330,
	"./ar-ma": 331,
	"./ar-ma.js": 331,
	"./ar-sa": 332,
	"./ar-sa.js": 332,
	"./ar-tn": 333,
	"./ar-tn.js": 333,
	"./ar.js": 327,
	"./az": 334,
	"./az.js": 334,
	"./be": 335,
	"./be.js": 335,
	"./bg": 336,
	"./bg.js": 336,
	"./bm": 337,
	"./bm.js": 337,
	"./bn": 338,
	"./bn.js": 338,
	"./bo": 339,
	"./bo.js": 339,
	"./br": 340,
	"./br.js": 340,
	"./bs": 341,
	"./bs.js": 341,
	"./ca": 342,
	"./ca.js": 342,
	"./cs": 343,
	"./cs.js": 343,
	"./cv": 344,
	"./cv.js": 344,
	"./cy": 345,
	"./cy.js": 345,
	"./da": 346,
	"./da.js": 346,
	"./de": 347,
	"./de-at": 348,
	"./de-at.js": 348,
	"./de-ch": 349,
	"./de-ch.js": 349,
	"./de.js": 347,
	"./dv": 350,
	"./dv.js": 350,
	"./el": 351,
	"./el.js": 351,
	"./en-au": 352,
	"./en-au.js": 352,
	"./en-ca": 353,
	"./en-ca.js": 353,
	"./en-gb": 354,
	"./en-gb.js": 354,
	"./en-ie": 355,
	"./en-ie.js": 355,
	"./en-il": 356,
	"./en-il.js": 356,
	"./en-nz": 357,
	"./en-nz.js": 357,
	"./eo": 358,
	"./eo.js": 358,
	"./es": 359,
	"./es-do": 360,
	"./es-do.js": 360,
	"./es-us": 361,
	"./es-us.js": 361,
	"./es.js": 359,
	"./et": 362,
	"./et.js": 362,
	"./eu": 363,
	"./eu.js": 363,
	"./fa": 364,
	"./fa.js": 364,
	"./fi": 365,
	"./fi.js": 365,
	"./fo": 366,
	"./fo.js": 366,
	"./fr": 367,
	"./fr-ca": 368,
	"./fr-ca.js": 368,
	"./fr-ch": 369,
	"./fr-ch.js": 369,
	"./fr.js": 367,
	"./fy": 370,
	"./fy.js": 370,
	"./gd": 371,
	"./gd.js": 371,
	"./gl": 372,
	"./gl.js": 372,
	"./gom-latn": 373,
	"./gom-latn.js": 373,
	"./gu": 374,
	"./gu.js": 374,
	"./he": 375,
	"./he.js": 375,
	"./hi": 376,
	"./hi.js": 376,
	"./hr": 377,
	"./hr.js": 377,
	"./hu": 378,
	"./hu.js": 378,
	"./hy-am": 379,
	"./hy-am.js": 379,
	"./id": 380,
	"./id.js": 380,
	"./is": 381,
	"./is.js": 381,
	"./it": 382,
	"./it.js": 382,
	"./ja": 383,
	"./ja.js": 383,
	"./jv": 384,
	"./jv.js": 384,
	"./ka": 385,
	"./ka.js": 385,
	"./kk": 386,
	"./kk.js": 386,
	"./km": 387,
	"./km.js": 387,
	"./kn": 388,
	"./kn.js": 388,
	"./ko": 389,
	"./ko.js": 389,
	"./ky": 390,
	"./ky.js": 390,
	"./lb": 391,
	"./lb.js": 391,
	"./lo": 392,
	"./lo.js": 392,
	"./lt": 393,
	"./lt.js": 393,
	"./lv": 394,
	"./lv.js": 394,
	"./me": 395,
	"./me.js": 395,
	"./mi": 396,
	"./mi.js": 396,
	"./mk": 397,
	"./mk.js": 397,
	"./ml": 398,
	"./ml.js": 398,
	"./mn": 399,
	"./mn.js": 399,
	"./mr": 400,
	"./mr.js": 400,
	"./ms": 401,
	"./ms-my": 402,
	"./ms-my.js": 402,
	"./ms.js": 401,
	"./mt": 403,
	"./mt.js": 403,
	"./my": 404,
	"./my.js": 404,
	"./nb": 405,
	"./nb.js": 405,
	"./ne": 406,
	"./ne.js": 406,
	"./nl": 407,
	"./nl-be": 408,
	"./nl-be.js": 408,
	"./nl.js": 407,
	"./nn": 409,
	"./nn.js": 409,
	"./pa-in": 410,
	"./pa-in.js": 410,
	"./pl": 411,
	"./pl.js": 411,
	"./pt": 412,
	"./pt-br": 413,
	"./pt-br.js": 413,
	"./pt.js": 412,
	"./ro": 414,
	"./ro.js": 414,
	"./ru": 415,
	"./ru.js": 415,
	"./sd": 416,
	"./sd.js": 416,
	"./se": 417,
	"./se.js": 417,
	"./si": 418,
	"./si.js": 418,
	"./sk": 419,
	"./sk.js": 419,
	"./sl": 420,
	"./sl.js": 420,
	"./sq": 421,
	"./sq.js": 421,
	"./sr": 422,
	"./sr-cyrl": 423,
	"./sr-cyrl.js": 423,
	"./sr.js": 422,
	"./ss": 424,
	"./ss.js": 424,
	"./sv": 425,
	"./sv.js": 425,
	"./sw": 426,
	"./sw.js": 426,
	"./ta": 427,
	"./ta.js": 427,
	"./te": 428,
	"./te.js": 428,
	"./tet": 429,
	"./tet.js": 429,
	"./tg": 430,
	"./tg.js": 430,
	"./th": 431,
	"./th.js": 431,
	"./tl-ph": 432,
	"./tl-ph.js": 432,
	"./tlh": 433,
	"./tlh.js": 433,
	"./tr": 434,
	"./tr.js": 434,
	"./tzl": 435,
	"./tzl.js": 435,
	"./tzm": 436,
	"./tzm-latn": 437,
	"./tzm-latn.js": 437,
	"./tzm.js": 436,
	"./ug-cn": 438,
	"./ug-cn.js": 438,
	"./uk": 439,
	"./uk.js": 439,
	"./ur": 440,
	"./ur.js": 440,
	"./uz": 441,
	"./uz-latn": 442,
	"./uz-latn.js": 442,
	"./uz.js": 441,
	"./vi": 443,
	"./vi.js": 443,
	"./x-pseudo": 444,
	"./x-pseudo.js": 444,
	"./yo": 445,
	"./yo.js": 445,
	"./zh-cn": 446,
	"./zh-cn.js": 446,
	"./zh-hk": 447,
	"./zh-hk.js": 447,
	"./zh-tw": 448,
	"./zh-tw.js": 448
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 523;

/***/ }),

/***/ 533:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GooglePlacesAutocompleteComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(534);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_network__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_toast__ = __webpack_require__(53);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var GOOGLE_API_URL = "https://maps.googleapis.com/maps/api/place/";


var internetMessage = "This app needs internet connection,Please switch on WIFI or mobile data!";
var GooglePlacesAutocompleteComponent = /** @class */ (function () {
    function GooglePlacesAutocompleteComponent(http, network, toast) {
        this.http = http;
        this.network = network;
        this.toast = toast;
        this.callback = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
        if (this.placeholder == null) {
            this.placeholder = "Search";
        }
    }
    GooglePlacesAutocompleteComponent.prototype.autocomplete = function (input) {
        this.checkNetwork();
        var typesParam = this.types != null ? ("&types=" + this.types) : "";
        var typeParam = this.type != null ? ("&type=" + this.type) : "";
        var offsetParam = this.offset != null ? ("&offset=" + this.offset) : "";
        var locationParam = this.location != null ? ("&location=" + this.location) : "";
        var radiusParam = this.radius != null ? ("&radius=" + this.radius) : "";
        var languageParam = this.language != null ? ("&language=" + this.language) : "";
        var componentsParam = "&components=" + 'country:LK';
        var strictboundsParam = this.strictbounds != null ? ("&strictbounds=" + this.strictbounds) : "";
        var params = typesParam + typeParam + offsetParam + locationParam + radiusParam + languageParam + componentsParam + strictboundsParam;
        return this.http.get(GOOGLE_API_URL + "autocomplete/json?input=" + input + "&key=" + this.key + params)
            .map(function (res) { return res.json(); });
    };
    GooglePlacesAutocompleteComponent.prototype.checkNetwork = function () {
        var type = this.network.type;
        if (type == "unknown" || type == "none" || type == undefined) {
            this.showToast(internetMessage);
        }
        else {
        }
    };
    GooglePlacesAutocompleteComponent.prototype.showToast = function (message) {
        this.toast.show(message, "3000", "center").subscribe(function (toast) {
            console.log(toast);
        });
    };
    GooglePlacesAutocompleteComponent.prototype.getLocals = function (ev) {
        var _this = this;
        var val = ev.target.value;
        if (val && val.trim().length > 3) {
            this.autocomplete(val)
                .subscribe(function (res) {
                _this.locals = res.predictions;
            });
        }
        else {
            this.locals = [];
        }
    };
    GooglePlacesAutocompleteComponent.prototype.currentLocationClicked = function () {
    };
    GooglePlacesAutocompleteComponent.prototype.clearText = function (ev) {
        ev.target.value = null;
    };
    GooglePlacesAutocompleteComponent.prototype.detail = function (item) {
        this.callback.emit([item]);
        this.locals = [];
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Output */])("callback"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */])
    ], GooglePlacesAutocompleteComponent.prototype, "callback", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])("placeholder"),
        __metadata("design:type", String)
    ], GooglePlacesAutocompleteComponent.prototype, "placeholder", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])("types"),
        __metadata("design:type", String)
    ], GooglePlacesAutocompleteComponent.prototype, "types", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])("type"),
        __metadata("design:type", String)
    ], GooglePlacesAutocompleteComponent.prototype, "type", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])("key"),
        __metadata("design:type", String)
    ], GooglePlacesAutocompleteComponent.prototype, "key", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])("offset"),
        __metadata("design:type", String)
    ], GooglePlacesAutocompleteComponent.prototype, "offset", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])("location"),
        __metadata("design:type", String)
    ], GooglePlacesAutocompleteComponent.prototype, "location", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])("radius"),
        __metadata("design:type", String)
    ], GooglePlacesAutocompleteComponent.prototype, "radius", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])("language"),
        __metadata("design:type", String)
    ], GooglePlacesAutocompleteComponent.prototype, "language", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])("components"),
        __metadata("design:type", String)
    ], GooglePlacesAutocompleteComponent.prototype, "components", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])("strictbounds"),
        __metadata("design:type", String)
    ], GooglePlacesAutocompleteComponent.prototype, "strictbounds", void 0);
    GooglePlacesAutocompleteComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'autoComplete',template:/*ion-inline-start:"D:\champrojects\youdrinkwedrive\youDrinkWeDrive\src\directives\googleAutoComplete\googleAutoComplete.html"*/'\n\n<ion-searchbar (click)="clearText($event)"  item-height="40px;-webkit-appearance: textfield;" (ionInput)="getLocals($event)" debounce="200" placeholder="{{placeholder}}"  [ngModelOptions]="{standalone: true}"></ion-searchbar>\n\n<ion-list>\n\n    <ion-item class="address-item"  *ngFor="let item of locals" (click)="detail(item)" class="auto-complete">{{item.description}}</ion-item>\n\n    <ion-item *ngIf="locals != null && locals.length > 0">\n\n    <img (click)=\'currentLocationClicked()\' class="google-icon"src="data:image/png;base64,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">\n\n</ion-item>\n\n</ion-list>'/*ion-inline-end:"D:\champrojects\youdrinkwedrive\youDrinkWeDrive\src\directives\googleAutoComplete\googleAutoComplete.html"*/
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_network__["a" /* Network */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_toast__["a" /* Toast */]])
    ], GooglePlacesAutocompleteComponent);
    return GooglePlacesAutocompleteComponent;
}());

//# sourceMappingURL=googleAutoComplete.js.map

/***/ }),

/***/ 535:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpinnerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SpinnerComponent = /** @class */ (function () {
    function SpinnerComponent() {
        this.isHidden = true;
        this.isBackground = true;
    }
    Object.defineProperty(SpinnerComponent.prototype, "isRunning", {
        set: function (value) {
            if (typeof (value) === 'object') {
                this.isHidden = value.isHidden;
                this.isBackground = value.isBackground;
            }
            else {
                this.isHidden = value;
                this.isBackground = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], SpinnerComponent.prototype, "isRunning", null);
    SpinnerComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'spinner',
            template: "\n    <ion-content class=\"panel-spinner\" [hidden]=\"isHidden\">\n      <div [ngClass]=\"isBackground ? 'spinner-bg' : 'spinner-no-bg'\"></div>\n      <ion-spinner name=\"bubbles\"></ion-spinner>\n    </ion-content>\n  "
        })
    ], SpinnerComponent);
    return SpinnerComponent;
}());

//# sourceMappingURL=spinner.js.map

/***/ })

},[450]);
//# sourceMappingURL=main.js.map