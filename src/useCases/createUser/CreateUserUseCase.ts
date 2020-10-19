import { IUsersRepository } from '../../repositories/IUsersRepository';
import { ICreateUserRequestDTO } from './CreateUserDTO';
import { User } from '../../entities/User';
import { IMainProvider } from '../../providers/IMailProvider';

export class CreateUserUseCase {

    constructor(
        // Utilizando o private o typescript interpreta que esse usersRepository é um prop da class
        private usersRepository: IUsersRepository,
        private mailProvider: IMainProvider
    ) { }

    async execute(data: ICreateUserRequestDTO) {
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

        if (userAlreadyExists) {
            throw new Error('User already existis.');
        }

        const user = new User(data);

        await this.usersRepository.save(user);

        await this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email
            },
            from: {
                name: 'Equipe do meu App',
                email: 'trocatti@gmail.com'
            },
            subject: 'Seja bem-vindo à plataforma',
            body: '<p>Você já pode fazer login em nossa plataforma.</p>'
        });

    }

}