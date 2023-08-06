import { beforeEach } from "mocha";
import { Authorization } from "../../utils/api-request";
describe("Automation testing with API in authenticate", () => {
  beforeEach(() => {
    Authorization.loginUser();
  });
  describe("Authorized with token successfully", () => {
    it("Generate token after login successfully", () => {
      Authorization.getToken();
    });
    it("Authorized successfully", () => {
      Authorization.getAuthorized();
    });
    it("Get detail user", () => {
      Authorization.getUserDetail();
    });
  });

  describe("Authorized with token unsuccessfully", () => {
    it("Generate token with invalid username and password", () => {
      Authorization.generateTokenUnauthorized();
    });

    it("Generate Token with null authorization(username and password)", () => {
      Authorization.generateTokenNullValue();
    });

    it("Generate Token with bad request method", () => {
      Authorization.generateTokenBadRequestMethod();
    });
  });
});
