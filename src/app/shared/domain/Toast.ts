export interface ToastOptions {
  showEasing?: 'swing' | 'linear'
  hideEasing?: 'swing' | 'linear'
  showMethod?: 'fadeIn' | 'fadeOut' | 'slideDown' | 'slideUp'
  hideMethod?: 'fadeIn' | 'fadeOut' | 'slideDown' | 'slideUp'
  closeButton?: boolean
  closeClass?: string
  closeOnHover?: boolean
  closeHtml?: string
  onCloseClick?: (event) => void
  tapToDismiss?: boolean
  toastClass?: string
  containerId?: string
  showDuration?: number
  onShown?: () => void
  hideDuration?: number
  onHidden?: () => void
  extendedTimeOut?: number
  positionClass?: 'toast-top-left' | 'toast-top-center' | 'toast-top-right' | 'toast-top-full-width'
    | 'toast-bottom-left' | 'toast-bottom-center' | 'toast-bottom-right' | 'toast-bottom-full-width'
  timeOut?: number
  titleClass?: string
  messageClass?: string
  newestOnTop?: boolean
  preventDuplicates?: boolean
  progressBar?: boolean
  progressClass?: string
  onclick?: (event) => void
  escapeHtml?: boolean
}

export interface Toast {
  message: string
  title?: string
  options?: ToastOptions
}
