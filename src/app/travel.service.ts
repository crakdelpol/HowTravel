import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {BlaBlaCarTravel} from './BlaBlaCarTravel';
import {TrenitaliaTravel} from './TrenitaliaTravel';
import {AppSettings} from '../AppSettings';
import 'rxjs/add/operator/map';



@Injectable()
export class TravelService {

  constructor(private http: HttpClient) { }

  /**
   * metodo per ottenere i viaggi attraverso l'utilizzo delle API di blablacar
   * @param partenza luogo di partenza
   * @param arrivo luogo di arrivo
   * @param data data del viaggio
   * @param oraPartenza ora della partenza
   * @returns {Observable<BlaBlaCarTravel>}
   */
  getBlablacarTravels(partenza: string, arrivo: string, data: Date, oraPartenza: string, posti: string): Observable<BlaBlaCarTravel[]> {

    const dateBegin = data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear() + ' ' + oraPartenza + ':00';
    const dateEnd = data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();
    const key = AppSettings.TOKEN_BLABLACAR;
    const locale = 'it_IT';

    const url = AppSettings.URL_BLABLACAR + '/trips?key=' + key + '&fn=' + partenza + '&tn=' + arrivo + '&locale=' + locale + '&seats=' + posti + '&db=' + dateBegin + '&de=' + dateEnd;

    return this.http.get<BlaBlaCarTravel[]>(url)
      .pipe(catchError(this.handleError('getTravels', [])));

  }

  /**
   * metodo che cerca i risultati per trenitalia
   * @param partenza stazione di partenza
   * @param arrivo stazione di arrivo
   * @param data data di partenza
   * @param oraPartenza
   * @param posti
   * @returns {Observable<TrenitaliaTravel[]>}
   */
  getTrenitaliaTravels(partenza, arrivo, data: Date, oraPartenza: string, posti: string): Observable<TrenitaliaTravel[]> {

    const dataConverted = data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();
    const url =  AppSettings.URL_PROXY + AppSettings.URL_TRENITALIA + '?origin=' + partenza + '&destination=' + arrivo + '&arflag=A&adate=' + dataConverted + '&atime=' + oraPartenza + '&adultno=' + posti + '&childno=0&direction=A&frecce=false&onlyRegional=false';

    return this.http.get<TrenitaliaTravel[]>(url)
    .pipe(catchError(this.handleError('getTrenitaliaTravels', [])));

  }

  /**
   * Metodo che serve per recuperarsi il nome di una stazione
   * @param nome
   * @returns {Observable<Station[]>}
   */
  getStazione(term): Observable<Station[]> {

    const url =  AppSettings.URL_TRENITALIA_STAZIONI + '?name=' + term;
    const proxy = AppSettings.URL_PROXY;
    return this.http.get<Station[]>(proxy + url).pipe(catchError(this.handleError('getStazione', [])));

  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
