import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { User } from '../user/entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { CurrentAccount } from '~/auth/decorators/current-user.decorator';
import { UserRepository } from './repositories/user.repository';
import { LoggerService } from '~/common/logger/logger.service';
import { Account } from '~/auth/entities/account.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userRepository: UserRepository,
    private logger: LoggerService,
  ) {
    this.logger.setContext(UserResolver.name);
  }

  @Mutation(() => User)
  async createUser(
    @CurrentAccount() account: Account,
    @Args('input') input: CreateUserInput,
  ) {
    if (account?.user != null) return account.user;

    return this.userRepository.create({ username: input.username, account });
  }
}
