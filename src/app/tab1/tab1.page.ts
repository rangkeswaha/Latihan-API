import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private http : HttpClient,
    private loadCtrl : LoadingController,
    private toastCtrl : ToastController
  ) {}

  dataPOST = [];
  post : any = {};
  loading : any;

  public async loaderPresent(): Promise<any> {

    const loading = await this.loadCtrl.create({
      message: "LOADING ...",
      backdropDismiss: true
    });
    await loading.present();

    return loading;
  }

  ionViewDidEnter(){
    this.getDataPost();
  }

  submit(){
    this.http.post("http://jsonplaceholder.typicode.com/posts", this.post).subscribe((res:any) => {
      console.log(res);
      this.toastCtrl.create({
        duration : 3000,
        message : "ID for new Item is " + res.id
      }).then(l => l.present())
      
    });
  }

  async getDataPost(){

    this.loading = await this.loaderPresent();

    this.http.get("http://jsonplaceholder.typicode.com/posts").subscribe((res : any) => {
      console.log(res);

      this.dataPOST = res;
      if (this.loading) {
        this.loading.dismiss();
      }
    });
  }

}
