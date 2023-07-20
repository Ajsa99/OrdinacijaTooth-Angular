import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PacijentService } from 'src/app/services/pacijent.service';
import { PregledService } from 'src/app/services/pregled.service';

@Component({
  selector: 'app-karton',
  templateUrl: './karton.component.html',
  styleUrls: ['./karton.component.scss'],
})
export class KartonComponent implements OnInit {
  pacijentId: any;
  pacijent: any = [];
  pregledi: any = [];

  showPregledi: boolean = false;

  constructor(
    private pacijentService: PacijentService,
    private preglediService: PregledService,
    private activateRoot: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.pacijentId = this.activateRoot.snapshot.paramMap.get('id');
    this.pacijentService.getPacijentId(this.pacijentId).subscribe((res) => {
      this.pacijent = res;
      console.log(this.pacijent);
    });

    this.preglediService
      .getTerminPregledId(this.pacijentId)
      .subscribe((res) => {
        this.pregledi = res;
        console.log(this.pregledi);
      });
  }
}
