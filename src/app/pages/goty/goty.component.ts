import { Component, OnInit } from '@angular/core';
import { GotyService } from 'src/app/services/goty.service';
import { Game } from 'src/app/interfaces/interfaces';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-goty',
  templateUrl: './goty.component.html',
  styleUrls: ['./goty.component.css']
})
export class GotyComponent implements OnInit {

  juegos: Game[] = [];
  constructor(private _gotyService: GotyService) { }

  ngOnInit() {

    this._gotyService.getNominados()
      .subscribe(data => {
        console.log(data);
        this.juegos = data;
      })

  }

  votarJuego(juego: Game) {
    // console.log(juego);
    this._gotyService.votarJuego(juego.id)
      .subscribe((resp: { ok: boolean, mensaje: string }) => {
        if (resp.ok) {
          Swal.fire('Gracias', resp.mensaje, 'success');
        }else{
          Swal.fire('Oops', resp.mensaje, 'error');

        }
      })
  }

}
