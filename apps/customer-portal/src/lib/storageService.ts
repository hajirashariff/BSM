// Storage service for file handling and validation
export const FILE_VALIDATION = {
  TICKET_ATTACHMENTS_MAX_SIZE: 10 * 1024 * 1024, // 10MB
  TICKET_ATTACHMENTS_ALLOWED_TYPES: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ],
  MAX_FILES_PER_TICKET: 5
};

export const storageService = {
  // Format file size to human readable format
  formatFileSize: (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  // Create preview URL for file
  createPreviewUrl: (file: File): string => {
    return URL.createObjectURL(file);
  },

  // Revoke preview URL to free memory
  revokePreviewUrl: (url: string): void => {
    URL.revokeObjectURL(url);
  },

  // Validate file type
  validateFileType: (file: File): boolean => {
    return FILE_VALIDATION.TICKET_ATTACHMENTS_ALLOWED_TYPES.includes(file.type);
  },

  // Validate file size
  validateFileSize: (file: File): boolean => {
    return file.size <= FILE_VALIDATION.TICKET_ATTACHMENTS_MAX_SIZE;
  },

  // Validate file
  validateFile: (file: File): { valid: boolean; error?: string } => {
    if (!storageService.validateFileType(file)) {
      return {
        valid: false,
        error: `File type ${file.type} is not allowed. Allowed types: ${FILE_VALIDATION.TICKET_ATTACHMENTS_ALLOWED_TYPES.join(', ')}`
      };
    }

    if (!storageService.validateFileSize(file)) {
      return {
        valid: false,
        error: `File size ${storageService.formatFileSize(file.size)} exceeds maximum allowed size of ${storageService.formatFileSize(FILE_VALIDATION.TICKET_ATTACHMENTS_MAX_SIZE)}`
      };
    }

    return { valid: true };
  }
};
