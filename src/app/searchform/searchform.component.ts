import { Component, OnInit } from '@angular/core';
import {TravelService} from '../travel.service';
import {BlaBlaCarTravel} from '../BlaBlaCarTravel';
import {TrenitaliaTravel} from '../TrenitaliaTravel';
import {FormControl} from '@angular/forms';
import {APP_DATE_FORMATS, AppDateAdapter} from '../AppDateAdapter';
import {DateAdapter, MAT_DATE_FORMATS, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-searchform',
  templateUrl: './searchform.component.html',
  styleUrls: ['./searchform.component.css'],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})


export class SearchformComponent implements OnInit {

  partenza: FormControl = new FormControl();
  arrivo: FormControl = new FormControl();
  data: FormControl = new FormControl();
  searchResultPartenza = [];
  searchResultArrivo = [];
  dateNow: Date = new Date();
  oraPartenza: string;
  posti = '1';
  blablacarTravel: BlaBlaCarTravel[];
  trenitaliaTravel: TrenitaliaTravel[];

  displayedColumns = ['Partenza', 'Arrivo', 'DataPartenza', 'Prezzo', 'Detail'];
  dataSourceBlablacar = new MatTableDataSource();
  dataSourceTrenitalia = new MatTableDataSource();


  constructor(private travelService: TravelService) {

    this.partenza.valueChanges.subscribe( data => {
      if (data && data.length > 2) {
        this.travelService.getStazione(data).subscribe(response => {
          this.searchResultPartenza = response;
        });
      }
    });

    this.arrivo.valueChanges.subscribe( data => {
      if (data && data.length > 2) {
        this.travelService.getStazione(data).subscribe(response => {
          this.searchResultArrivo = response;
        });
      }
    });

  }

  ngOnInit() {
    this.data.setValue(this.dateNow);

    const ora = this.dateNow.getHours() < 10 ? '0' + this.dateNow.getHours() : this.dateNow.getHours();
    const minuti = this.dateNow.getMinutes() < 10 ? '0' + this.dateNow.getMinutes() : this.dateNow.getMinutes();
    this.oraPartenza =  ora + ':' + minuti;
  }

  /**
   * Metodo che valorizza i viaggi di ricerca.
   * Dovrebbe controllare quale sito e' attivo.
   */
  getTravels(): void {

    this.travelService.getBlablacarTravels(this.partenza.value, this.arrivo.value, this.data.value, this.oraPartenza, this.posti).subscribe( blablacarTravel => (
        this.blablacarTravel = blablacarTravel
        , this.dataSourceBlablacar = new MatTableDataSource(blablacarTravel['trips'])
      )
    );
    this.travelService.getTrenitaliaTravels(this.partenza.value, this.arrivo.value, this.data.value, this.oraPartenza, this.posti).subscribe(trenitaliaTravel => (
        this.trenitaliaTravel = trenitaliaTravel
        , this.dataSourceTrenitalia = new MatTableDataSource(trenitaliaTravel)
      )
    );

  }

  openDetail(url: string): void {
    window.open(url);
  }

  openDetailTrenitalia(idSolution: string): void {
    const url = 'https://www.lefrecce.it/msite/api/solutions/' + idSolution + '/details';
    return this.openDetail(url);
  }

  findTravels(): void {
    this.getTravels();
  }
}
