import { uuid } from 'uuidv4';
import { DeleteResult } from 'typeorm';

import Menu from '../../infra/typeorm/entities/Menu';

import IMenusRepository from '@modules/menus/repositories/IMenusRepository';
import ICreateMenuDTO from '@modules/menus/dtos/ICreateMenuDTO';

class FakeMenusRepository implements IMenusRepository {
  private menus: Menu[] = [];

  /**
   * findAllMenus
   */
  public async findAll(
    truck_id: string,
  ): Promise<Menu[] | undefined> {
    let { menus } = this;

    if (!truck_id) {
      throw new Error('No id provided.');
    }

    menus = this.menus.filter(
      menu => menu.truck_id === truck_id,
    );
    return menus;
  }

  /**
   * findById
   */
  public async findById(menu_id: string): Promise<Menu | undefined> {
    if (!menu_id) {
      throw new Error('No id provided.');
    }

    const findMenuItem = this.menus.find(menu => menu.id === menu_id);

    return findMenuItem;
  }

  /**
   * findByType
   */
  public async findByType(type: string, truck_id: string): Promise<Menu[] | undefined> {
    let { menus } = this;

    if (!type) {
      throw new Error('No type provided.');
    }

    menus = this.menus.filter(
      menu => menu.type === type
    );
    return menus;
  }

  /**
   * create
   */
  public async create({
    user_id,
    truck_id,
    title,
    description,
    type,
    options,
    price,
    photo_filename,
  }: ICreateMenuDTO): Promise<Menu> {
    const newMenu = new Menu();

    Object.assign(newMenu, {
      id: uuid(),
      user_id,
      truck_id,
      title,
      description,
      type,
      options,
      price,
      photo_filename,
    });

    this.menus.push(newMenu);

    return newMenu;
  }

  /**
   * update
   */
  public async update(menuData: Menu): Promise<Menu> {
    const menuIndex = this.menus.findIndex(
      findMenu => findMenu.id === menuData.id,
    );

    this.menus[menuIndex] = menuData;

    return menuData;
  }

  /**
   * delete
   */
  public async delete(
    menu_id: string,
  ): Promise<Menu[] | DeleteResult> {
    const findMenu = this.menus.filter(
      menu => menu.id === menu_id,
    );

    return findMenu;
  }
}

export default FakeMenusRepository;
