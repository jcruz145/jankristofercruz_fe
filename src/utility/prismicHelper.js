export default {
  async getImageByPhotoID(prismic, uid) {
    const response = await prismic.client.query([
      prismic.Predicates.at("my.photo.uid", uid),
    ]);
    return await response.results[0].data.photo.url;
  },
  async getCoverImageInSeries(prismic, uid) {
    const response = await prismic.client.query([
      prismic.Predicates.at("my.photo_series.uid", uid),
    ]);
    return await this.getImageByPhotoID(
      prismic, response.results[0].data.cover_image.uid
    );
  }
};