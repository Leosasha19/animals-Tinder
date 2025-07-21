import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Animal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Animal.init(
    {
      urlimg: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      commentary: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      iscat: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      like: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Animal',
    }
  );
  return Animal;
};
