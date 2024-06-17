export interface DocumentData {
  apellidos: string;
  nombre: string;
  sexo: 'M' | 'F';
  nacionalidad: string;
  fechaDeNacimiento: Date;
  numSoport: string;
  validez: Date;
  dni: string;
}

export type DocuemntType = 'dni' | 'nie';

export class CrazyDniNie {
  constructor() {}

  public captureData(frontImage: string, backImage: string): DocumentData {
    return {
      apellidos: 'Mateo Rufián',
      nombre: 'Lucas',
      sexo: 'M',
      nacionalidad: 'ESP',
      fechaDeNacimiento: new Date('1976-12-11'),
      numSoport: 'ZDF123456',
      validez: new Date('2029-08-16'),
      dni: '44852154Z',
    };
  }

  public inferDocumentType(frontImage: string): DocuemntType {
    return 'dni';
  }

  public fakeProbability(
    frontImage: string,
    backImage: string,
    documentType: DocuemntType,
  ) {
    switch (documentType) {
      case 'dni':
        return this.dniFakeProbability(frontImage);
      case 'nie':
        return this.nieFakeProbability(frontImage);
    }
    return this.assertUnreachable(documentType);
  }

  private assertUnreachable(x: never): never {
    throw new Error("Didn't expecte to get here");
  }

  private dniFakeProbability(frontImage: string): number {
    return 30;
  }

  private nieFakeProbability(frontImage: string): number {
    return 30;
  }
}
