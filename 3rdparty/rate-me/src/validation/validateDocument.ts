import { DniAnalyzerLib } from '../libs/DniAnalyzerLib';

export class ValidateDocument {
  private dniAnalyzer: DniAnalyzerLib;
  constructor() {
    this.dniAnalyzer = new DniAnalyzerLib();
  }
  //NOTE siempre recibimos las imágenes como jpeg
  public validate(data: any): void {
    let isValid;
    // validar que viene DNI
    if ('dni' in data) {
      // validar que viene nombre
      if ('nombre' in data) {
        // validar que viene fecha de nacimiento
        if ('fechaNacimiento' in data) {
          if ('apellidos' in data) {
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
    if ((isValid && !('frontImage' in data)) || data.frontImage === '') {
      isValid = false;
    }
    if ((isValid && !('backImage' in data)) || data.backImage === '') {
      isValid = false;
    }

    if (!isValid) {
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
    if (data.nombre === dataExtracted.nombre) {
      if (data.apellidos === dataExtracted.apellidos) {
        if (data.dni === dataExtracted.dni) {
          if (
            data.fechaDeNacimiento ===
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
