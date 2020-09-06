import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import UpdateUserProfileService from './UpdateUserProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let updateUserProfile: UpdateUserProfileService;

describe('UpdateUserProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateUserProfile = new UpdateUserProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Joe Doe',
      email: 'joe@doe.com',
      password: '123456',
      roles: ['admin', 'user'],
    });

    const updatedUser = await updateUserProfile.execute({
      user_id: user.id,
      name: 'Mary Doe',
      email: 'mary@doe.com',
    });

    expect(user.name).toBe('Mary Doe');
    expect(user.email).toBe('mary@doe.com');
  });

  it('should be able to update user profile with another existing email', async () => {
    await fakeUsersRepository.create({
      name: 'Joe Doe',
      email: 'joe@doe.com',
      password: '123456',
      roles: ['admin', 'user'],
    });

    const user = await fakeUsersRepository.create({
      name: 'Mary Doe',
      email: 'mary@doe.com',
      password: '123456',
      roles: ['admin', 'user'],
    });

    await expect(
      updateUserProfile.execute({
        user_id: user.id,
        name: 'Mary Doe',
        email: 'joe@doe.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update user password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Joe Doe',
      email: 'joe@doe.com',
      password: '123456',
      roles: ['admin', 'user'],
    });

    const updatedUser = await updateUserProfile.execute({
      user_id: user.id,
      name: 'Mary Doe',
      email: 'mary@doe.com',
      old_password: '123456',
      password: '123123',
    });

    expect(user.password).toBe('123123');
  });

  it('should not be able to update user password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Joe Doe',
      email: 'joe@doe.com',
      password: '123456',
      roles: ['admin', 'user'],
    });

    await expect(
      updateUserProfile.execute({
        user_id: user.id,
        name: 'Mary Doe',
        email: 'mary@doe.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update user password without wrong password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Joe Doe',
      email: 'joe@doe.com',
      password: '123456',
      roles: ['admin', 'user'],
    });

    await expect(
      updateUserProfile.execute({
        user_id: user.id,
        name: 'Mary Doe',
        email: 'mary@doe.com',
        password: '123123',
        old_password: '123457',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update user profile from non-existing user', async () => {
    await expect(
      updateUserProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'Joe Doe',
        email: 'joe@doe.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
