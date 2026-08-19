import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';

import archiver from 'archiver';

@Injectable()
export class ImageService {
  private uploadDir = path.join(process.cwd(), 'uploads');
  private compressedDir = path.join(process.cwd(), 'compressed');

  constructor() {
    this.ensureDirectories();
  }

  private ensureDirectories() {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }

    if (!fs.existsSync(this.compressedDir)) {
      fs.mkdirSync(this.compressedDir, { recursive: true });
    }
  }

  async compressImages(files: Express.Multer.File[]) {
    const compressedFiles: string[] = [];

    for (const file of files) {
      const filename = `compressed-${Date.now()}-${file.originalname}`;
      const outputPath = path.join(this.compressedDir, filename);

      await sharp(file.path)
        .resize({ width: 1200 })
        .jpeg({ quality: 70 })
        .toFile(outputPath);

      compressedFiles.push(outputPath);
    }

    return compressedFiles;
  }

  async createZip(files: string[]): Promise<string> {
    const zipName = `images-${Date.now()}.zip`;
    const zipPath = path.join(this.compressedDir, zipName);

    return new Promise((resolve, reject) => {
      const output = fs.createWriteStream(zipPath);
      const archive = archiver('zip', {
        zlib: { level: 9 },
      });

      output.on('close', () => {
        resolve(zipPath);
      });

      archive.on('error', (err) => {
        reject(err);
      });

      archive.pipe(output);

      files.forEach((file) => {
        archive.file(file, {
          name: path.basename(file),
        });
      });

      archive.finalize();
    });
  }

  async streamZip(files: string[], res: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const output = fs.createWriteStream(__dirname + '/example.zip');
      const archive = archiver('zip', {
        zlib: { level: 9 }, // Sets the compression level.
      });

      output.on('close', function () {
        console.log(archive.pointer() + ' total bytes');
        console.log(
          'archiver has been finalized and the output file descriptor has closed.',
        );
      });

      // This event is fired when the data source is drained no matter what was the data source.
      // It is not part of this library but rather from the NodeJS Stream API.
      // @see: https://nodejs.org/api/stream.html#stream_event_end
      output.on('end', function () {
        console.log('Data has been drained');
      });

      archive.on('error', (err) => {
        reject(err);
      });

      archive.on('end', () => {
        resolve();
      });

      archive.pipe(res);

      files.forEach((file) => {
        archive.file(file, {
          name: path.basename(file),
        });
      });

      archive.finalize();
    });
  }
}
