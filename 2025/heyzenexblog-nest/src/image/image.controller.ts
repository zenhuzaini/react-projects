import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import type { Response } from 'express';
import { ImageService } from './image.service';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);

          callback(
            null,
            `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`,
          );
        },
      }),
    }),
  )
  async uploadAndCompress(
    @UploadedFiles() files: Express.Multer.File[],
    @Res() res: Response,
  ) {
    /**
     * Compress images first
     */
    const compressedFiles = await this.imageService.compressImages(files);

    /**
     * Stream ZIP directly to frontend
     */
    res.set({
      'Content-Type': 'application/zip',
      'Content-Disposition': 'attachment; filename="compressed-images.zip"',
    });

    await this.imageService.streamZip(compressedFiles, res);
  }
}
