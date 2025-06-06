import {html} from 'lit'

import {GrampsjsViewObject} from './GrampsjsViewObject.js'
import '../components/GrampsjsRepository.js'

export class GrampsjsViewRepository extends GrampsjsViewObject {
  constructor() {
    super()
    this._className = 'repository'
  }

  getUrl() {
    return `/api/repositories/?gramps_id=${this.grampsId}&locale=${
      this.appState.i18n.lang || 'en'
    }&profile=all&backlinks=true&extend=all`
  }

  renderElement() {
    return html`
      <grampsjs-repository
        .data=${this._data}
        .appState="${this.appState}"
        ?edit="${this.edit}"
        ?canEdit="${this.canEdit}"
      ></grampsjs-repository>
    `
  }
}

window.customElements.define('grampsjs-view-repository', GrampsjsViewRepository)
