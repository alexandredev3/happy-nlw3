import Image from "../app/models/Image"

export default {
  // retorna apenas um orfanato
  renderOne(image: Image) {
    const { 
      id,
      path
    } = image

    // este metodo vai pegar o orfanato e retornar ele para o meu frontend consumir.
    return {
      id,
      url: `${process.env.APP_URL}/uploads/${path}`
    }
  },

  // retorna varios orfanatos
  renderMany(images: Image[]) {
    return images.map(image => this.renderOne(image))
  }
}