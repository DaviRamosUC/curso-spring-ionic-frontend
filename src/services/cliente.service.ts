import { StorageService } from './storage.service';
import { API_CONFIG } from './../config/api.config';
import { Observable } from 'rxjs/Rx';
import { clienteDTO } from './../models/cliente.dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ClienteService {

    constructor(
        public http: HttpClient,
        public storage: StorageService) {
    }

    findByEmail(email: string): Observable<clienteDTO> {

        let token = this.storage.getLocalUser().token;

        let authHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + token })

        return this.http.get<clienteDTO>(
            `${API_CONFIG.baseUrl}/clientes/email?value=${email}`,
            { 'headers': authHeader })
    }

    getImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType: 'blob'});
    }
}