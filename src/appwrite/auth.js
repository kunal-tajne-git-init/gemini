/* eslint-disable no-useless-catch */
import conf from "../conf/conf.js";
import { Client, Account, ID, OAuthProvider } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  userName = "user";
  userEmail = "";

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );
      if (userAccount) {
        // call another method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login(user) {
    try {
      if (user)
        return await this.account.createEmailPasswordSession(
          user.email,
          user.password,
        );
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
    }

    return null;
  }

  async getUserDetails() {
    try {
      const user = await this.account.get();

      return { name: user.name, email: user.email };
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
      return true;
    } catch (error) {
      console.log("Appwrite serive :: logout :: error", error);
    }
  }

  // async googleLogin() {
  //   try {
  //     const res = await this.account.createOAuth2Session(
  //       OAuthProvider.Google,
  //       "http://localhost:5173",
  //       "http://localhost:5173",
  //       [
  //         "https://www.googleapis.com/auth/userinfo.email",
  //         "https://www.googleapis.com/auth/userinfo.profile",
  //         "openid",
  //       ],
  //     );

  //     const userInfo = JSON.parse(res);

  //     console.log("Appwrite serive :: googleLogin :: res", userInfo);
  //     console.log("Appwrite serive :: googleLogin :: res", res);

  //     return res;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  async googleLogin() {
    try {
      this.account.createOAuth2Session(
        OAuthProvider.Google,
        "https://geminibykunaltajne.vercel.app/",
        "https://geminibykunaltajne.vercel.app/loginfailed",
        [
          "https://www.googleapis.com/auth/userinfo.email",
          "https://www.googleapis.com/auth/userinfo.profile",
          "openid",
        ],
      );

      return true;
    } catch (error) {
      return false;
    }
  }

  async getGoogleUser() {
    try {
      const session = await this.account.getSession("current");

      const accessToken = session.providerAccessToken;
      const url =
        "https://www.googleapis.com/oauth2/v1/userinfo?access_token=" +
        accessToken +
        "";

      return fetch(url).then((response) => response.json());
    } catch (error) {
      console.log("Appwrite serive :: getGoogleUser :: error", error);
      return false;
    }
  }
}

const authService = new AuthService();

export default authService;
