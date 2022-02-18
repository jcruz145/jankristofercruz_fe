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
  },
  async getCollectionItems(prismic, collectionId) {
    let collection = {}, exect=[];
    collection = await prismic.client.getByUID('photo_collection', collectionId);

    collection.data.photos.forEach((item, i) => {
      exect.push((async () => {
        switch (item.photo.type) {
          case "photo_series":
            collection.data.photos[i].photo.photo_object =
              await this.getCoverPhotoObjectInSeries(
                prismic,
                item.photo.uid
              );
            break;

          case "photo":
            collection.data.photos[i].photo.photo_object =
              await this.getPhotoObject(prismic, item.photo.uid);
            break;
          
          case "photo_collection":
            collection.data.photos[i].photo.photo_object =
              await this.getCollectionItems(prismic, item.photo.uid);
            break;

          default:
            break;
        }
      })());
    });

    await Promise.all(exect);

    return collection;
  },
  async getAggregateItems(prismic, aggregateId) {
    let aggregate=[], exect = [];

    try {
      let response = await prismic.client.query([
        prismic.Predicates.at("my.photo_aggregate.uid", aggregateId),
      ]);

      response.results[0].data.photos_and_series.forEach((item) => {
        aggregate.push({ ...item.item });
      });

      aggregate.forEach((item, i) => {
        exect.push((async () => {
          switch (item.type) {
            case "photo_series":
              aggregate[i].photo_object =
                await this.getCoverPhotoObjectInSeries(
                  prismic,
                  item.uid
                );
              break;

            case "photo":
              aggregate[i].photo_object =
                await this.getPhotoObject(prismic, item.uid);
              break;

            default:
              break;
          }
        })());
      });

      await Promise.all(exect);

      return aggregate;

    } catch (error) {
      throw error
    }
  }
};