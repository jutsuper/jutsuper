export { JutSuperPopup };


class JutSuperPopup {
  /**
   * @param {Document} doc 
   */
  constructor(doc) {
    this.LOCATION = JutSuperPopup.name;

    this.document = doc ? doc : document;
  }
}

window.jsuperPopup = new JutSuperPopup(document);
