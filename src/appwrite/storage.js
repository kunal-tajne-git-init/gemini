import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage } from "appwrite";

export class storageService {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // file upload service

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file,
      );
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
      return false;
    }
  }

  async getFiles({ fileId }) {
    try {
      return await this.bucket.getFile(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.log("Appwrite serive :: getFiles :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId, 12, 12);
  }
}

const profileStorageService = new storageService();
export default profileStorageService;
