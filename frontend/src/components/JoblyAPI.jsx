import axios from "axios";

// // const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
const BASE_URL = "http://localhost:3001";

// /** API Class.
//  *
//  * Static class tying together methods used to get/send to to the API.
//  * There shouldn't be any frontend-specific stuff here, and there shouldn't
//  * be any API-aware stuff elsewhere in the frontend.
//  *
//  */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    // console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? data : {};

    try {
      const response = await axios({ url, method, data, params, headers });
      return response.data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response?.data?.error?.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Auth routes
  static async login(data) {
    const res = await this.request("auth/token", data, "post");
    return res.token;
  }
  static async register(data) {
    const res = await this.request("auth/register", data, "post");
    return res.token;
  }

  // User API routes
  static async getUser(username) {
    const res = await this.request(`users/${username}`);
    return res.user;
  }

  // User API routes
  static async updateUser(username, data) {
    const res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  // Individual API routes
  static async getCompany(handle) {
    const res = await this.request(`companies/${handle}`);
    return res.company;
  }

  static async getCompanies() {
    const res = await this.request("companies");
    return res.companies;
  }

  static async getJobs() {
    const res = await this.request("jobs");
    return res.jobs;
  }

  static async getJob(id) {
    const res = await this.request(`jobs/${id}`);
    return res.job;
  }

  static async createCompany(data) {
    const res = await this.request("companies", data, "post");
    return res.company;
  }

  static async createJob(data) {
    const res = await this.request("jobs", data, "post");
    return res.job;
  }

  static async updateCompany(handle, data) {
    const res = await this.request(`companies/${handle}`, data, "patch");
    return res.company;
  }

  static async updateJob(id, data) {
    const res = await this.request(`jobs/${id}`, data, "patch");
    return res.job;
  }

  static async deleteCompany(handle) {
    const res = await this.request(`companies/${handle}`, {}, "delete");
    return res.message;
  }

  static async deleteJob(id) {
    const res = await this.request(`jobs/${id}`, {}, "delete");
    return res.message;
  }
}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;
