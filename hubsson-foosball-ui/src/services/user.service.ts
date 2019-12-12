import { User } from '../models/user';

class UserService {

	async getAllUser(): Promise<User[]> {
		const response = await fetch('https://us-central1-hubsson-foosball-eur3.cloudfunctions.net/users');
		const content = await response.json();
        
        return content.users;
	}
}

const service = new UserService();
export default service;
