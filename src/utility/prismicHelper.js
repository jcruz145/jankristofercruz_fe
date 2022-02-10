export default {
  async getImageByPhotoID(prismic, uid) {
    try {
      const response = await prismic.client.query([
        prismic.Predicates.at("my.photo.uid", uid),
      ]);
      return response.results[0].data.photo.url;
    } catch (error) {
      throw error;
    }
  },
  async getCoverImageInSeries(prismic, uid) {
    try {
      const response = await prismic.client.query([
        prismic.Predicates.at("my.photo_series.uid", uid),
      ]);
      return await this.getImageByPhotoID(
        prismic, response.results[0].data.cover_image.uid
      );
      
    } catch (error) {
      throw error;
    }
  },
  async getPhotoObject(prismic, uid) {
    try {
      const response = await prismic.client.query([
        prismic.Predicates.at("my.photo.uid", uid),
      ]);
      return response.results[0].data;
    } catch (error) {
      throw error
    }
    
  },
  async getCoverPhotoObjectInSeries(prismic, uid) {
    try {
      const response = await prismic.client.query([
        prismic.Predicates.at("my.photo_series.uid", uid),
      ]);
      return await this.getPhotoObject(
        prismic, response.results[0].data.cover_image.uid
      );
      
    } catch (error) {
      throw error
    }
  }
};