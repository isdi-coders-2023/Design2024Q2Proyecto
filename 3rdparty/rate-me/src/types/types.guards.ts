import { DocumentDto } from "./document.dto";

export const isValidDocumentDto = (document: any) : document is DocumentDto => {

    let isValid;
    // validar que viene DNI
    if ('documentId' in document) {
      // validar que viene nombre
      if ('name' in document) {
        // validar que viene fecha de nacimiento
        if ('birthday' in document) {
          if ('surname' in document) {
            isValid = true;
          } else {
            isValid = false;
          }
        } else {
          isValid = false;
        }
      } else {
        isValid = false;
      }
    } else {
      isValid = false;
    }
    // validar que viene la imagen, front y back
    if ((isValid && !('frontImage' in document)) || document.frontImage === '') {
      isValid = false;
    }
    if ((isValid && !('backImage' in document)) || document.backImage === '') {
      isValid = false;
    }

    return isValid;

}