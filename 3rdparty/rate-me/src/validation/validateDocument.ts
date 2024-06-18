import { isValidDocumentDto } from '../types/types.guards';
import { AnyToPngConverter } from '../libs/AnyToPngConverter';
import { DniAnalyzerLib } from '../libs/DniAnalyzerLib';

export class ValidateDocument {
  private dniAnalyzer: DniAnalyzerLib;
  private pngConverter:AnyToPngConverter;
  constructor(pngConverter: AnyToPngConverter) {
    this.dniAnalyzer = new DniAnalyzerLib(pngConverter);
    this.pngConverter = pngConverter;
  }
  //NOTE siempre recibimos las imágenes como jpeg
  public validate(data: any): void {
   
    if (!isValidDocumentDto(data)) {
      throw new Error('Invalid data received');
    }
    // usar la librería para analizar si la imagen es un DNI válido
    const rate = this.dniAnalyzer.validateDNI(data.frontImage, data.backImage);
    if (rate < 50) {
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
