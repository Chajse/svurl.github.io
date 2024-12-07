declare module 'qrcode' {
    export function toDataURL(
      text: string,
      options?: { errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H'; margin?: number; width?: number }
    ): Promise<string>;
  
    export function toString(
      text: string,
      options?: { type?: 'svg' | 'utf8'; errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H'; margin?: number }
    ): Promise<string>;
  
    export function toFile(
      path: string,
      text: string,
      options?: { errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H'; margin?: number; width?: number },
      callback?: (error: Error | null) => void
    ): void;
  
    export function toBuffer(
      text: string,
      options?: { errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H'; margin?: number; width?: number }
    ): Promise<Buffer>;
  }
  