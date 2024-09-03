import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Item from '../interface/Item';
import { Observable } from 'rxjs';
import { environment } from '../environment';


@Injectable({
    providedIn: 'root'
})
export class ItemService {
    private apiUrl: string | undefined

    constructor(private http: HttpClient) {
        this.apiUrl = environment.apiUrl
    }

    getAll(): Observable<Item[]> {
        return this.http.get<Item[]>(this.apiUrl!);
    }

}
