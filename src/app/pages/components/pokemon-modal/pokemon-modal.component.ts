import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { PokemonService} from '../../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-modal',
  templateUrl: './pokemon-modal.component.html',
  styleUrls: ['./pokemon-modal.component.scss']
})
export class PokemonModalComponent implements OnInit {
  @Input() description: string;

  constructor(public dialogRef: MatDialogRef<PokemonModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.description = data.description;
    }

  ngOnInit() {}

  close() {
    this.dialogRef.close();
  }

}
