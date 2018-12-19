import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthenticationService {

    private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

    constructor(private http: HttpClient) { }

    changeMessage(message: string) {
        this.messageSource.next(message)
      }

    login(username: string, password: string) {
        return this.http.post<any>('/api/authenticate', { username: username, password: password })
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            });
    }

    binservice(cardnumber: string, appName: string, country: string) {
        console.log('cardnumber: ' +cardnumber + ' appName: '+appName+ ' country: '+country);
        return this.http.post<any>('https://us-central1-angular1-224619.cloudfunctions.net/binservice', {cardNumber:cardnumber, app:appName, country:country},
        {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        });
    
        //   .subscribe((data) => {
        //     // Display the result
        //     console.log('response2');
        //     console.log('TJ user data', data);
        //   });
          
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}