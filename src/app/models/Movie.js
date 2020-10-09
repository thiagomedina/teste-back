import Sequelize, { Model } from 'sequelize';

class Movie extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        director: Sequelize.STRING,
        genre:Sequelize.STRING,
        movie_note: Sequelize.INTEGER,
        vote_quantity: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

 
    return this;
  }



  static associate(models){
      this.belongsTo(models.User,{foreignKey: 'admin_id'});
  }
}

export default Movie;
