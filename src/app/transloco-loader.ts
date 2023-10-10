import { inject, Injectable } from "@angular/core";
import { Translation, TranslocoLoader } from "@ngneat/transloco";
import { HttpClient } from "@angular/common/http";
import { merge, NEVER, of, race, take, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
    private http = inject(HttpClient);
    private storageKey = 'translocoLang';
    private storage: Storage = localStorage;
    private translationPath = (lang: string) => `/assets/i18n/${lang}.json`;

    getTranslation(lang: string) {
        return merge(this.loadTranslation(lang), this.fetchTranslation(lang)).pipe(take(2));
    }

    private saveTranslation(lang: string, translation: Translation) {
        const storageKey = this.getTranslationKey(lang);
        this.storage.setItem(storageKey, JSON.stringify(translation));
    }

    private loadTranslation(lang: string) {
        const storageKey = this.getTranslationKey(lang);
        const translation = this.storage.getItem(storageKey);
        if (!translation) {
            return NEVER;
        }
        return of(JSON.parse(translation));
    }

    private fetchTranslation(lang: string) {
        return this.http.get<Translation>(this.translationPath(lang)).pipe(tap((translation) => this.saveTranslation(lang, translation)));
    }

    getTranslationKey(lang: string) {
        return `${this.storageKey}.${lang}`;
    }
}
