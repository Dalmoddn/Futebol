import UsersInterface from '../../Interfaces/Users.Interface';
import Users from '../models/Users.Model';

export default class UsersService {
  public static async getAllUsers(): Promise<UsersInterface[]> {
    return Users.findAll();
  }

  public static async getUserById(id: number): Promise<UsersInterface | null> {
    return Users.findByPk(id);
  }

  public static async createUser(user: UsersInterface): Promise<UsersInterface> {
    return Users.create(user);
  }

  public static async updateUser(id: number, user: UsersInterface): Promise<UsersInterface | null> {
    const foundUser = await Users.findByPk(id);
    if (foundUser) {
      await foundUser.update(user);
      return foundUser;
    }
    return null;
  }

  public static async deleteUser(id: number): Promise<number> {
    return Users.destroy({ where: { id } });
  }
}
