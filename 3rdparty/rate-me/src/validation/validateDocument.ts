import { isValidDocumentDto } from '../types/types.guards';
import { AnyToPngConverter } from '../libs/AnyToPngConverter';
import { DniAnalyzerLib } from '../libs/DniAnalyzerLib';
import { ValidateDniImages } from './validateDniImages.service';

export class ValidateDocument {
  private dniAnalyzer: DniAnalyzerLib;

  constructor(pngConverter: AnyToPngConverter, private validateDniImages: ValidateDniImages) {
    this.dniAnalyzer = new DniAnalyzerLib(pngConverter);
  }
  //NOTE siempre recibimos las imágenes como jpeg
  public validate(data: any): void {
    if (!isValidDocumentDto(data)) {
      throw new Error('Invalid data received');
    }


    if(this.validateDniImages.areImagesFake(data.frontImage, data.backImage)) {
      throw new Error('Las imágenes parecen falsas');
    }

    // usar la librería para extraer datos del DNI
    const dataExtracted = this.dniAnalyzer.extractContentFromDNI(
      data.frontImage,
      data.backImage,
    );

    // comparar los datos de la librería con los que recibimos
    if (data.name === dataExtracted.nombre) {
      if (data.surname === dataExtracted.apellidos) {
        if (data.documentId === dataExtracted.dni) {
          if (
            data.birthday ===
            dataExtracted.fechaDeNacimiento.replaceAll(' ', '-')
          ) {
            return;
          }
        }
      }
    }

    throw new Error('Algún dato no casa con el DNI');
  }
}
