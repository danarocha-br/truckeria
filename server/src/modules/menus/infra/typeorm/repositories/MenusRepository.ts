import { DeleteResult, getRepository, Repository } from 'typeorm';
import _ from 'lodash';

import IMenusRepository from '@modules/menus/repositories/IMenusRepository';
import ICreateMenuDTO from '@modules/menus/dtos/ICreateMenuDTO';

import Menu from '@modules/menus/infra/typeorm/entities/Menu';

class MenusRepository implements IMenusRepository {
  private ormRepository: Repository<Menu>;

  constructor() {
    this.ormRepository = getRepository(Menu);
  }

  /**
   * findAllMenus
   */
  // public async findAll(
  //   truck_id: string,
  // ): Promise<Menu[]> {
  //   const menus = await this.ormRepository.find({
  //     where: { truck_id },
  //     order: {
  //       title: "ASC"
  //     },
  //   });

  //   return _.orderBy(menus, ['type', 'title'], ['asc', 'asc']);
  // }

  public async findAll(
    truck_id: string,
  ): Promise<Menu[]> {
    const menus = await this.ormRepository.find({
      where: { truck_id },
      order: {
        title: "ASC"
      },
    });

    return _.orderBy(menus, ['type', 'title'], ['asc', 'asc']);
  }

    /**
   * findAllMenus
   */
  // public async findAll(
  //   truck_id: string,
  // ): Promise<Menu[]> {
  //   const menus = await this.ormRepository
  //     .createQueryBuilder('menu')
  //     .where("menu.truck_id = :truck_id", { truck_id })
  //     .groupBy("menu.type")
  //     .addGroupBy('menu.id')
  //     .getMany();

  //     return menus;
  // }

  /**
   * findById
   */
  public async findById(menu_id: string): Promise<Menu | undefined> {
    const findTruck = this.ormRepository.findOne({
      where: { id: menu_id },
    });
    return findTruck;
  }

   /**
   * findAllMenusbyType
   */
  public async findByType(
    truck_id: string,
    type: string
  ): Promise<Menu[]> {
    const menus = await this.ormRepository.find({
      where: { type, truck_id },
      order: {
        type: "ASC"
      },
      // relations: ['menus']
    });

    return menus;
  }

  /**
   * create
   */
  public async create(menuData: ICreateMenuDTO): Promise<Menu> {
    const menu = this.ormRepository.create(menuData);

    await this.ormRepository.save(menu);

    return menu;
  }

  /**
   * update
   */
  public async update(menuData: Menu): Promise<Menu> {
    return this.ormRepository.save(menuData);
  }

  /**
   * delete
   */
  public async delete(menu_id: string): Promise<DeleteResult | Menu[]> {
    return this.ormRepository.delete(menu_id);
  }
}

export default MenusRepository;
