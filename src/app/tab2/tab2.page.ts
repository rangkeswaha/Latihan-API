import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    private http : HttpClient,
    private loadCtrl : LoadingController,
    private toastCtrl : ToastController,
    public router : Router
  ) {}

  dataPOST = [];
  post : any = {};
  loading : any;


  ionViewDidEnter(){
    this.getDataPost();
  }

  public async loaderPresent(): Promise<any> {

    const loading = await this.loadCtrl.create({
      message: "LOADING ...",
      backdropDismiss: true
    });
    await loading.present();

    return loading;
  }

  async getDataPost(){

    this.loading = await this.loaderPresent();

    this.http.get("https://reqres.in/api/users?page=2").subscribe((res : any) => {
      console.log(res.data);

      this.dataPOST = res.data;
      if (this.loading) {
        this.loading.dismiss();
      }
    });
  }

  next(){
    this.router.navigate(['tab3'])
  }

}
