import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../_services/index';

@Component({
    selector: 'app-login',
    moduleId: module.id.toString(),
    templateUrl: 'login.component.html',
    styleUrls: ['login.css']
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    childMessage: string;
    message:string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
        this.authenticationService.currentMessage.subscribe(message => this.message = message)

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        console.log('**Inside the login method**');
        this.loading = true;
        // this.authenticationService.login(this.model.username, this.model.password)
        //     .subscribe(
        //         data => {
        //             this.router.navigate([this.returnUrl]);
        //         },
        //         error => {
        //             this.alertService.error(error);
        //             this.loading = false;
        //         });

      this.authenticationService.binservice(this.model.cardnumber, this.model.appName, this.model.country)
        .subscribe(
                data => {
                    this.authenticationService.changeMessage(data);
                    console.log('Response from cloud function:: '+data);
                    this.router.navigate(['/home']);
                },
                error => {
                    this.authenticationService.changeMessage("Platform not found");
                    console.log('Error Response:: '+error.message);
                    this.router.navigate(['/home']);
                    //this.alertService.error(error);
                    //this.loading = false;
                });

    }
}
