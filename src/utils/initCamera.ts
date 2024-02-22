export async function initCamera() {
  const video = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: {
      noiseSuppression: true,
      echoCancellation: true,
    }
  })

  return video
}