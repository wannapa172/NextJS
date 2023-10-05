declare module "next-auth" {
    interface Session {
      user: {
        id: number;
        email: string;
        name: string;
        accessToken: string;
      };
    }
  }
  