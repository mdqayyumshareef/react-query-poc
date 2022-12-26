import { api } from "..";

class ProfileService {
  constructor() {}

  /**
   * @param {number} page
   * @param {number} limit
   * @returns
   */
  getProfiles(page = 0, limit = 10, filter = {}) {
    const queryParams = {
      _page: page,
      _limit: limit,
      ...(Object.keys(filter).length > 0 && filter),
    };
    return api.get("/profile", { params: queryParams });
  }
}

export const profileService = new ProfileService();
