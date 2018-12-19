import { Component, OnInit, ViewChild } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';

import { AlertService, AuthenticationService } from '../_services/index';

@Component({
    selector: 'app-home',
    moduleId: module.id.toString(),
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit  {
    currentUser: User;
    users: User[] = [];
    parentMessage = "message from parent";
    message:string;

    constructor(private userService: UserService, private authenticationService: AuthenticationService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
        this.authenticationService.currentMessage.subscribe(message => this.message = message)
    }

    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }
}