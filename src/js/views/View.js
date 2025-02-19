import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  /**
   * Render the receved object to the DOM
   * @param {Object | Object[]} data The data to be renderded (e.g. receipe)
   * @param {boolean} render = true if flase , creat markup string instead of rendering to the DOM
   * @returns {undefined | string } Amarkup string is returend if render = false
   * @this {object} View instance
   * @auther Jalal Bakir
   * @todo finsh implementation
   */
  render(data, render = true) {
    // Check if data is falsy (null, undefined, etc.) or an empty array.
    // If so, call the renderError() method and return early.
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    // Debugging statement (commented out) to log the data being passed.
    // console.log('data', data);

    // Store the provided data in the instance variable _data.
    this._data = data;

    // Generate the HTML markup based on the data.
    const markup = this._generateMarkup();

    // If render is set to false, return the markup instead of rendering it.
    if (!render) return markup;

    // Clear the existing content of the parent element.
    this._clear();

    // Insert the newly generated markup into the DOM at the beginning of the parent element.
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      // Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('💥', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      // Updates changed ATTRIBUES
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `<div class="spinner">
             <svg>
               <use href="${icons}#icon-loader"></use>
             </svg>
           </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
             <div>
               <svg>
                 <use href="${icons}#icon-alert-triangle"></use>
               </svg>
             </div>
             <p>${message}</p>
           </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `<div class="message">
             <div>
               <svg>
                 <use href="${icons}#icon-smile"></use>
               </svg>
             </div>
             <p>${message}</p>
           </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
