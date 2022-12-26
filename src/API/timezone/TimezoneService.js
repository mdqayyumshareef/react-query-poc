import { api } from "..";

class TimezoneService {
  constructor() {}

  getTimezone() {
    return api.get("/timezone");
  }

  /**
   * @param {{timezone: string}} payload
   * @returns
   */
  updateTimezone(payload) {
    return api.put("/timezone/1", payload);
  }
}

export const timezoneService = new TimezoneService();
