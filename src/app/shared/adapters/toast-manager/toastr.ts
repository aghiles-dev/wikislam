import { ToastManager } from '../../domain/ports/ToastManager'
import { Toast, ToastOptions } from '../../domain/Toast'

export class Toastr implements ToastManager {
  private readonly DEFAULT_TIMEOUT = 5000
  private readonly DEFAULT_ANIMATION_DURATION = 300

  private readonly DEFAULT_TOAST_OPTIONS: ToastOptions = {
    closeButton: true,
    newestOnTop: true,
    progressBar: true,
    preventDuplicates: false,
    showDuration: this.DEFAULT_ANIMATION_DURATION,
    hideDuration: this.DEFAULT_ANIMATION_DURATION,
    timeOut: this.DEFAULT_TIMEOUT,
    extendedTimeOut: this.DEFAULT_TIMEOUT
  }

  constructor(private toaster) {
    this.toaster.options = this.DEFAULT_TOAST_OPTIONS
  }

  showError(toast: Toast): void {
    this.toaster.error(toast.message, toast.title || '', toast.options || {})
  }

  showSuccess(toast: Toast): void {
    this.toaster.success(toast.message, toast.title || '', toast.options || {})
  }
}
