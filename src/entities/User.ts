import { uuid } from 'uuidv4';

export class User {
    public readonly id: string;

    public name: string;
    public email: string;
    public password: string;

    /**
     * O Omit está fazendo com que a prop ID seja omitida quando fizer um new
     * @param props Todas as props da class
     * @param id O ? significa que essa prop ID é opcional
     */
    constructor(props: Omit<User, 'id'>, id?: string) {
        Object.assign(this, props);

        if (!id) {
            this.id = uuid();
        }
    }
}