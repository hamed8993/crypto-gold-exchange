export class CountdownTime {
  type:
    | "Register"
    | "Login"
    | "Lost2fa"
    | "Emaillogin"
    | "forgetPassword"
    | "addAddress"
    | "email"
    | "withdraw"
    | "2fa"
    | "address"
    | "cellphone";

  constructor(
    type:
      | "Register"
      | "Login"
      | "Lost2fa"
      | "Emaillogin"
      | "forgetPassword"
      | "addAddress"
      | "email"
      | "withdraw"
      | "2fa"
      | "address"
      | "cellphone",
  ) {
    this.type = type;
  }

  save = () => {
    const timeData = {
      type: this.type,
      time: new Date().getTime(),
    };
    localStorage.setItem("GOLDFINO_COUNTDOWN", JSON.stringify(timeData));
  };

  getTime = () => {
    const savedTimeData: {
      type:
        | "Register"
        | "Login"
        | "Lost2fa"
        | "Emaillogin"
        | "forgetPassword"
        | "addAddress"
        | "email"
        | "withdraw"
        | "2fa"
        | "address";
      time: number;
    } = localStorage.getItem("GOLDFINO_COUNTDOWN")
      ? JSON.parse(localStorage.getItem("GOLDFINO_COUNTDOWN") || "")
      : "";
    return savedTimeData;
  };

  getRemaining = () => {
    const now = new Date().getTime();
    const remaining = Math.floor((now - this.getTime().time) / 1000);

    return this.getTime().type === this.type && remaining <= 60
      ? 60 - Number(remaining)
      : -1;
  };
}
