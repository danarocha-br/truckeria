import { ObjectID } from 'mongodb';

import Notification from '../../infra/typeorm/schemas/Notification';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

class FakeNotificationsRepository implements INotificationsRepository {
  private notifications: Notification[] = [];

  /**
   * create
   */
  public async create({
    truck_id,
    user_id,
    content,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, {
      id: new ObjectID(),
      truck_id,
      user_id,
      content,
    });

    this.notifications.push(notification);

    return notification;
  }
}

export default FakeNotificationsRepository;
