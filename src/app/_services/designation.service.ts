import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HttpClientHelper} from '../_model/http-client-helper';

@Injectable({
    providedIn: 'root'
})
export class DesignationService {

    private baseUrl = HttpClientHelper.baseURL + '/designation';

    constructor(private http: HttpClient) {
    }

    get(id: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/${id}`);
    }

    save(product: Object): Observable<Object> {
        return this.http.post(`${this.baseUrl}`, product);
    }

    update(value: any): Observable<Object> {
        return this.http.put(`${this.baseUrl}`, value);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`, {responseType: 'text'});
    }

    getList(): Observable<any> {
        return this.http.get(this.baseUrl);
    }
}
