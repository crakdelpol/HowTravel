import { Component, OnInit } from '@angular/core';
import { Travel } from '../Travel';
import {TravelService} from '../travel.service';
import {BlaBlaCarTravel} from '../BlaBlaCarTravel';
import {TrenitaliaTravel} from '../TrenitaliaTravel';

@Component({
  selector: 'app-searchform',
  templateUrl: './searchform.component.html',
  styleUrls: ['./searchform.component.css']
})
export class SearchformComponent implements OnInit {

  constructor(private travelService: TravelService) { }

  blablacarTravel: BlaBlaCarTravel[];
  trenitaliaTravel: TrenitaliaTravel[];

  travel: Travel = {
    data: '03/01/2018',
    partenza: 'Savona',
    arrivo: 'Brescia'
  };

  stazione: Station;

  ngOnInit() {
  }

  /**
   * Metodo che valorizza i viaggi di ricerca.
   * Dovrebbe controllare quale sito e' attivo.
   */
  getTravels(): void {


    this.travelService.getBlablacarTravels(this.travel.partenza, this.travel.arrivo, this.travel.data).subscribe(blablacarTravel => this.blablacarTravel = blablacarTravel);

    this.travelService.getTrenitaliaTravels(this.travel.partenza, this.travel.arrivo, this.travel.data).subscribe(trenitaliaTravel => this.trenitaliaTravel = trenitaliaTravel);

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
