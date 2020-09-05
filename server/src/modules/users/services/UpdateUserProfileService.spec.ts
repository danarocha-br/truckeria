import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProviders/fakes/FakeStorageProvider';

import UpdateUserProfileService from './UpdateUserProfileService';

describe('UpdateUserProfile', () => {
  it('should be able to update user avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserProfile = new UpdateUserProfileService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'Joe Doe',
      email: 'joe@doe.com',
      password: '123456',
      roles: ['admin', 'user'],
    });

    await updateUserProfile.execute({
      user_id: user.id,
      avatarURL: 'avatar.jpg',
      phone: 123456,
      city: '',
      state: '',
    });

    expect(user.avatarURL).toBe('avatar.jpg');
  });

  it('should be able to update additional profile data from non-existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserProfile = new UpdateUserProfileService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    expect(
      updateUserProfile.execute({
        user_id: 'non-existing',
        avatarURL: 'avatar.jpg',
        phone: 123456,
        city: '',
        state: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating to a new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserProfile = new UpdateUserProfileService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'Joe Doe',
      email: 'joe@doe.com',
      password: '123456',
      roles: ['admin', 'user'],
    });

    await updateUserProfile.execute({
      user_id: user.id,
      avatarURL: 'avatar.jpg',
      phone: 123456,
      city: '',
      state: '',
    });

    await updateUserProfile.execute({
      user_id: user.id,
      avatarURL: 'avatar2.jpg',
      phone: 123456,
      city: '',
      state: '',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');

    expect(user.avatarURL).toBe('avatar2.jpg');
  });
});
