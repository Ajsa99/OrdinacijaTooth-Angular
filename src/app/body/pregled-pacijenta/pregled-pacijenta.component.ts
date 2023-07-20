import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pregled } from 'src/app/model/pregled';
import { Termin } from 'src/app/model/termin';
import { PacijentService } from 'src/app/services/pacijent.service';
import { PregledService } from 'src/app/services/pregled.service';
import { TerminService } from 'src/app/services/termin.service';

@Component({
  selector: 'app-pregled-pacijenta',
  templateUrl: './pregled-pacijenta.component.html',
  styleUrls: ['./pregled-pacijenta.component.scss'],
})
export class PregledPacijentaComponent {
  termini!: any;
  terminId!: any;
  addForm!: FormGroup;

  userSubmitted!: boolean;

  constructor(
    private terminService: TerminService,
    private pregledService: PregledService,
    private fb: FormBuilder,
    private activateRoot: ActivatedRoute,
    private router: Router
  ) {
    this.userSubmitted = false;
  }

  ngOnInit(): void {
    this.terminId = Number(this.activateRoot.snapshot.paramMap.get('id'));

    this.terminService.getTerminPacijentId(this.terminId).subscribe((res) => {
      this.termini = res;
      console.log(this.termini);
    });

    this.AddForm();
  }

  pregled: Pregled = {
    brojZuba: 0,
    gronjaVilicaBr: 0,
    donjaVilicaBr: 0,
    gronjaVilicaStanje: '',
    donjaVilicaStanje: '',
    opis: '',
    terminId: 0,
  };

  userAny: any;

  AddForm() {
    this.addForm = this.fb.group({
      BrojZuba: [null, Validators.required],
      GronjaVilicaBr: [null, Validators.required],
      DonjaVilicaBr: [null, Validators.required],
      StanjeGorinjeVilica: [null, Validators.required],
      StanjeDonjaVilica: [null, Validators.required],
      Opis: [null, Validators.required],
    });
  }

  get BrojZuba() {
    return this.addForm.get('BrojZuba') as FormControl;
  }

  get GronjaVilicaBr() {
    return this.addForm.get('GronjaVilicaBr') as FormControl;
  }

  get DonjaVilicaBr() {
    return this.addForm.get('DonjaVilicaBr') as FormControl;
  }

  get StanjeGorinjeVilica() {
    return this.addForm.get('StanjeGorinjeVilica') as FormControl;
  }

  get StanjeDonjaVilica() {
    return this.addForm.get('StanjeDonjaVilica') as FormControl;
  }

  get Opis() {
    return this.addForm.get('Opis') as FormControl;
  }

  onSubmit() {
    this.userSubmitted = true;

    console.log(this.userData());

    if (this.addForm.valid) {
      const confirmed = confirm(
        'Da li ste sigurni da zelite da završite pregled?'
      );
      if (confirmed) {
        this.pregledService.addPregled(this.userData()).subscribe((x) => {
          this.userAny = x;
        });
        this.addForm.reset();
        this.userSubmitted = false;
        this.router.navigate(['/termini']);
      }
    }
  }

  userData(): Pregled {
    return (this.pregled = {
      brojZuba: this.BrojZuba.value,
      gronjaVilicaBr: this.GronjaVilicaBr.value,
      donjaVilicaBr: this.DonjaVilicaBr.value,
      gronjaVilicaStanje: this.StanjeGorinjeVilica.value,
      donjaVilicaStanje: this.StanjeDonjaVilica.value,
      opis: this.Opis.value,
      terminId: this.termini.id,
    });
  }
}
