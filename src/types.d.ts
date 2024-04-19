import { Profile } from "@node-saml/passport-saml";

declare module "express-serve-static-core" {
  interface Request {
    user: Profile;
    samlLogoutRequest?: Profile;
  }
}
