import fs from "fs";
import path from "path";

const samlConfig = {
  entryPoint: "https://idp.example.com/login",
  issuer: "your-app",
  callbackUrl: "http://localhost:3000/auth/login/callback",
  cert: fs.readFileSync(path.join(__dirname, "../../certs/cert.pem"), "utf-8"),
  privateCert: fs.readFileSync(
    path.join(__dirname, "../../certs/key.pem"),
    "utf-8"
  ),
  idpCert: fs.readFileSync(
    path.join(__dirname, "../../certs/idpCert.pem"),
    "utf-8"
  ), // Add idpCert
  wantAssertionsSigned: true,
  wantAuthnResponseSigned: true,
};

export default samlConfig;
