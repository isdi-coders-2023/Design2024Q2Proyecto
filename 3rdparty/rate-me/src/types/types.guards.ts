import { DocumentDto } from "./document.dto";

export const isValidDocumentDto = (document: any) : document is DocumentDto => {

    let isValid = false;
    // validar que viene DNI
    if ('dni' in document) {
      // validar que viene nombre
      if ('nombre' in document) {
        // validar que viene fecha de nacimiento
        if ('fechaNacimiento' in document) {
          if ('apellidos' in document) {
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