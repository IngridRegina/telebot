import { ref } from 'vue'

export default function useSnackbar() {
  const isSnackbarVisible = ref(false)
  const snackbarMessage = ref('')
  const snackbarColor = ref('')

  const showSnackbar = (message, color) => {
    snackbarMessage.value = message
    snackbarColor.value = color
    isSnackbarVisible.value = true
  }

  return {
    showSnackbar,
    isSnackbarVisible,
    snackbarMessage,
    snackbarColor,
  }
}
