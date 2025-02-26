import User from 'src/users/domain/user';

export default class Community {
  image: string;
  name: string;
  state: string;
  city: string;
  description: string;
  owner: User;
  tags: string[];
  createdAt: Date;
}
