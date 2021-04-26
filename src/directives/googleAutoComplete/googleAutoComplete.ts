import { Component, Input, Output, EventEmitter, Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
const GOOGLE_API_URL = "https://maps.googleapis.com/maps/api/place/";
import { Network } from '@ionic-native/network';
import { Toast } from '@ionic-native/toast';
const internetMessage:string="This app needs internet connection,Please switch on WIFI or mobile data!";
@Component({
  selector: 'autoComplete',
  templateUrl: './googleAutoComplete.html'
})
export class GooglePlacesAutocompleteComponent {

  @Output("callback") callback : EventEmitter<any> = new EventEmitter();

  @Input("placeholder") placeholder : string;

  @Input("types") types : string;

  @Input("type") type : string;

  @Input("key") key : string;

  @Input("offset") offset : string;

  @Input("location") location : string;

  @Input("radius") radius : string;

  @Input("language") language : string;

  @Input("components") components : string;

  @Input("strictbounds") strictbounds : string;

  locals: any[];

  constructor(@Inject(Http) public http: Http,public network:Network,private toast:Toast) {
       if (this.placeholder == null) {
      this.placeholder = "Search";
    }
  }

  public autocomplete(input: string) {
    this.checkNetwork();
    let typesParam: string = this.types != null ? ("&types=" + this.types) : "";
    let typeParam: string = this.type != null ? ("&type=" + this.type) : "";
    let offsetParam: string = this.offset != null ? ("&offset=" + this.offset) : "";
    let locationParam: string = this.location != null ? ("&location=" + this.location) : "";
    let radiusParam: string = this.radius != null ? ("&radius=" + this.radius) : "";
    let languageParam: string = this.language != null ? ("&language=" + this.language) : "";
    let componentsParam: string = "&components=" + 'country:LK';
    let strictboundsParam: string = this.strictbounds != null ? ("&strictbounds=" + this.strictbounds) : "";
    let params = typesParam + typeParam + offsetParam + locationParam + radiusParam + languageParam + componentsParam + strictboundsParam;

    return this.http.get(GOOGLE_API_URL + "autocomplete/json?input="+input+"&key="+this.key+params)
    .map(res => res.json());
  }

  private checkNetwork(){
    let type = this.network.type;
    if(type == "unknown" || type == "none" || type == undefined){
      this.showToast(internetMessage);
    }else{
     
    }
  }

  showToast(message){
    this.toast.show(message,"3000","center").subscribe(
      toast => {
          console.log(toast);
      }
    );
  }

  getLocals(ev: any) {
    let val = ev.target.value;
    if (val && val.trim().length > 3) {
      this.autocomplete(val)
      .subscribe(res => {
        this.locals = res.predictions;
      });
    } else {
      this.locals = [];
    }
  }

  public currentLocationClicked(){

  }

 public clearText(ev: any){
   
    ev.target.value=null;
  }

  detail(item) {
    this.callback.emit([item]);
    this.locals = [];
  }
}