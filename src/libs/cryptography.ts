import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

@Injectable()
export class Cryptography {

  private readonly ALGORITHM = 'aes-256-cbc';
  private readonly ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Must be 256 bits (32 characters)
  private readonly IV_LENGTH = 16; // For AES, this is always 16

  public encrypt(text: string){
    let iv = randomBytes(this.IV_LENGTH);
    let cipher = createCipheriv(this.ALGORITHM, Buffer.from(this.ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return {salt: iv.toString('hex'), text: encrypted.toString('hex')};
  }

  public decrypt(text: string) {
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = createDecipheriv(this.ALGORITHM, Buffer.from(this.ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }
}