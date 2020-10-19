import { MailtrapMailProvider } from '../../providers/implementations/MailtrapMailProvider';
import { PostgresUsersRepository } from '../../repositories/implementations/PostgresUsersRepository';
import { CreateUserUseCase } from './CreateUserUseCase';
import { CreateUserController } from './CreteUserController';

const mailtrapMailProvaider = new MailtrapMailProvider();
const postgresUserRepository = new PostgresUsersRepository();

const createUserUseCase = new CreateUserUseCase(
    postgresUserRepository,
    mailtrapMailProvaider
);

const createUserController = new CreateUserController(
    createUserUseCase
);

export { createUserUseCase, createUserController };