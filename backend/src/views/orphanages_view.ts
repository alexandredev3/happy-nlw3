import Orphanage from "../app/models/Orphanage"
import imagesView from "./images_view"

export default {
  // retorna apenas um orfanato
  renderOne(orphanage: Orphanage) {
    const { 
      id, 
      name,
      whatsapp,
      latitude, 
      longitude, 
      about, 
      instructions, 
      open_on_weekends, 
      opening_hours,
      images 
    } = orphanage

    // este metodo vai pegar o orfanato e retornar ele para o meu frontend consumir.
    return {
      id,
      name,
      whatsapp,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images: imagesView.renderMany(images)
    }
  },

  // retorna varios orfanatos
  renderMany(orphanages: Orphanage[]) {
    return orphanages.map(orphanage => this.renderOne(orphanage))
  }
}