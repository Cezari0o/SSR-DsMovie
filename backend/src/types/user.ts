interface User {
  id: number;

  name: String;
  email: String;

  passwordHash?: string;

  createdAt: Date;
  updatedAt: Date;
}

export default User;
