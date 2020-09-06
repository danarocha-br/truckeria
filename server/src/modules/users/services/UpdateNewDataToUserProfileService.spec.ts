import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProviders/fakes/FakeStorageProvider';

import UpdateExtraDataToUserProfileService from './UpdateExtraDataToUserProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;

let updateExtraDataToUserProfile: UpdateExtraDataToUserProfileService;

describe('UpdateExtraDataToUserProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateExtraDataToUserProfile = new UpdateExtraDataToUserProfileService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to update user avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Joe Doe',
      email: 'joe@doe.com',
      password: '123456',
      roles: ['admin', 'user'],
    });

    await updateExtraDataToUserProfile.execute({
      user_id: user.id,
      avatarURL: 'avatar.jpg',
      phone: 123456,
      city: '',
      state: '',
    });

    expect(user.avatarURL).toBe('avatar.jpg');
  });

  it('should be able to update additional profile data from non-existing user', async () => {
    expect(
      updateExtraDataToUserProfile.execute({
        user_id: 'non-existing',
        avatarURL: 'avatar.jpg',
        phone: 123456,
        city: '',
        state: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating to a new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateExtraDataToUserProfile = new UpdateExtraDataToUserProfileService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'Joe Doe',
      email: 'joe@doe.com',
      password: '123456',
      roles: ['admin', 'user'],
    });

    await updateExtraDataToUserProfile.execute({
      user_id: user.id,
      avatarURL: 'avatar.jpg',
      phone: 123456,
      city: '',
      state: '',
    });

    await updateExtraDataToUserProfile.execute({
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
