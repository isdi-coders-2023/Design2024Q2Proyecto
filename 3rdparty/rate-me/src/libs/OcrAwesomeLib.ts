export class OcrAwesomeLib {
  constructor() {}

  public extractText(
    pngBase64: string,
    granularity: number,
    difussion: number,
    aiAssistant: boolean,
    lookForTextOutboundAreas: boolean,
    referenceImageWithAreas: string | null,
  ): any {
        // There should be some complex OCR code here
    if(pngBase64 === 'fake-image-2'){
      return {
        apellidos: 'Mateo Rufiánder',
        nombre: 'Lucas',
        sexo: 'M',
        nacionalidad: 'ESP',
        fechaDeNacimiento: '11 12 1976',
        numSoport: 'ZDF123456',
        validez: '16 08 2029',
        dni: '44852154Z',
      };
    }
    return {
      apellidos: 'Mateo Rufián',
      nombre: 'Lucas',
      sexo: 'M',
      nacionalidad: 'ESP',
      fechaDeNacimiento: '11 12 1976',
      numSoport: 'ZDF123456',
      validez: '16 08 2029',
      dni: '44852154Z',
    };
  }
}
