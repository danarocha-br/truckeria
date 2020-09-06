import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import ShowUserProfileService from './ShowUserProfileService';

let fakeUsersRepository: FakeUsersRepository;

let showUserProfile: ShowUserProfileService;

describe('ShowUserProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showUserProfile = new ShowUserProfileService(fakeUsersRepository);
  });

  it('should be able to show user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Joe Doe',
      email: 'joe@doe.com',
      password: '123456',
      roles: ['admin', 'user'],
    });

    const userProfile = await showUserProfile.execute({
      user_id: user.id,
    });

    expect(userProfile.email).toBe('joe@doe.com');
  });

  it('should not be able to show user profile from non-existing user', async () => {
    await expect(
      showUserProfile.execute({
        user_id: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
