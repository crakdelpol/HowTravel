class Train {
  'trainidentifier': string;
  'trainacronym': string;
  'traintype': string;
  'pricetype': string;
}

export class TrenitaliaTravel {
  'idsolution': string;
  'origin': string;
  'destination': string;
  'direction': string;
  'departuretime': number;
  'arrivaltime': number;
  'minprice': number;
  'optionaltext': string;
  'duration': string;
  'changesno': number;
  'trainlist': Array<Train>;
  'bookable': boolean;
  'saleable': boolean;
  'onlycustom': boolean;
  'extraInfo': Array<Object>;
  'showSeat': boolean;
  'happyDay': string;
}

