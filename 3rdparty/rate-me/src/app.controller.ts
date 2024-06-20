import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AWSStorage } from './libs/AWSStorage';
import { AnyToPngConverter } from './libs/AnyToPngConverter';
import { DniAnalyzerLib } from './libs/DniAnalyzerLib';
import { User } from './types/user';
import { DocumentIdContentExtractorOcrAwesome } from './validation/infrastructure/DocumentIdContentExtractorOcrAwesome';
import { ValidateDniImages } from './validation/validateDniImages.service';
import { ValidateDocument } from './validation/validateDocument';
import { validateUser } from './validation/validateUser';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('user/add')
  addUser(@Body() body: any) {
    const newUser = { ...body } as User;
    if (!validateUser(newUser)) {
      throw new Error('Invalid user');
    }
    //TODO store user
    return {
      error: null,
      success: true,
      message: 'User saved',
    };
  }

  @Post('document/validate')
  validateDocumentId(@Body() body: any) {
    const pngConverter = new AnyToPngConverter();
    const contentExtractor = new DocumentIdContentExtractorOcrAwesome(
      pngConverter,
    );
    const dniAnalyzer = new DniAnalyzerLib(pngConverter, contentExtractor);
    const validateDniImages = new ValidateDniImages(dniAnalyzer);
    const validator = new ValidateDocument(pngConverter, validateDniImages);
    try {
      validator.validate(body);
      this.safelyStoreNewDocument(body);
      return {
        error: null,
        success: true,
        message: 'Document verified',
      };
    } catch (error) {
      return {
        error: error.message,
        success: false,
        message: 'Something failed verifying document',
      };
    }
  }

  private safelyStoreNewDocument(body: any): void {
    const storage = new AWSStorage();
    storage.store(body.frontImage);
    storage.store(body.backImage);
  }
}
