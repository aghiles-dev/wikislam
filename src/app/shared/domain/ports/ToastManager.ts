import { Toast } from '../Toast'

export interface ToastManager {
  showSuccess(toast: Toast): void

  showError(toast: Toast): void
}
