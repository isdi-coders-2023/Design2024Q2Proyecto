import { DocumentDto } from "./document.dto";

export const isValidDocumentDto = (document: any) : document is DocumentDto => {
    if(!('documentId' in document)) { 
      return false;
    }

    if(!('name' in document)) { 
      return false;
    }

    if(!('birthday' in document)) { 
      return false;
    }

    if(!('frontImage' in document) || document.frontImage === '') {
      return false;
    }

    if(!('backImage' in document) || document.backImage === '') {
      return  false;
    }

    if(!('surname' in document)) {
      return false 
    }

    return true;
}