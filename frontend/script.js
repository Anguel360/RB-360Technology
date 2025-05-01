async function uploadImage() {
    const input = document.getElementById('imageInput');
    if (input.files.length === 0) {
      alert('Por favor selecciona una imagen');
      return;
    }
  
    const formData = new FormData();
    formData.append('image', input.files[0]);
  
    try {
      const response = await fetch('http://localhost:5000/remove-background', {
        method: 'POST',
        body: formData
      });
  
      if (!response.ok) {
        throw new Error('Error al procesar la imagen');
      }
  
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      document.getElementById('resultImage').src = imageUrl;
    } catch (error) {
      console.error(error);
      alert('Hubo un error al eliminar el fondo');
    }
  }
  