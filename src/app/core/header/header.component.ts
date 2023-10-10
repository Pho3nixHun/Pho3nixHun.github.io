import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { DropdownComponent } from 'src/app/shared/dropdown/dropdown.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslocoModule, DropdownComponent, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private faIconLibrary = inject(FaIconLibrary)
  public icons = this.faIconLibrary.addIcons(
    faLanguage
  );
  public links = [
    {
      'label': 'HEADER.HOME',
      'path': '/'
    },
    {
      'label': 'HEADER.ABOUT',
      'path': '/about'
    },
    {
      label: 'HEADER.SERVICES',
      'path': '/services'
    },
    {
      'label': 'HEADER.CONTACT',
      'path': '/contact'
    }
  ]
  private translocoService = inject(TranslocoService);
  public changeLanguage(lang: string) {
    if (this.translocoService.isLang(lang)) {
      this.translocoService.setActiveLang(lang);
    }
  }
  public activeLang = this.translocoService.langChanges$;
}
