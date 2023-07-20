import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pacijent } from 'src/app/model/pacijent';
import { PacijentService } from 'src/app/services/pacijent.service';

@Component({
  selector: 'app-izmeni-pacijenta',
  templateUrl: './izmeni-pacijenta.component.html',
  styleUrls: ['./izmeni-pacijenta.component.scss'],
})
export class IzmeniPacijentaComponent implements OnInit {
  pacijentId!: any;
  pacijent!: any;
  isLoading: boolean = false;

  constructor(
    private activateRoot: ActivatedRoute,
    private router: Router,
    private pacijentService: PacijentService
  ) {}

  ngOnInit(): void {
    this.pacijentId = Number(this.activateRoot.snapshot.paramMap.get('id'));
    this.getPacijent();
  }

  getPacijent(): void {
    this.pacijentId = this.activateRoot.snapshot.paramMap.get('id');
    this.isLoading = true;
    this.pacijentService.getPacijentId(this.pacijentId).subscribe(
      (res) => {
        this.pacijent = res;
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  onSubmit(): void {
    this.isLoading = true;
    this.pacijentService
      .updatePacijent(this.pacijentId, this.pacijent)
      .subscribe(
        (res) => {
          console.log('Pacijent je uspešno ažuriran.');
          this.isLoading = false;
          this.router.navigate(['/karton/' + this.pacijentId]);
        },
        (error) => {
          console.log('Došlo je do greške prilikom ažuriranja pacijenta.');
          console.log(error);
          this.isLoading = false;
        }
      );
  }
}
