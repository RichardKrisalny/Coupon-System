import { Notyf } from "notyf";

class NotificationService {
  private notify = new Notyf({
    duration: 2000,
    position: { x: "center", y: "top" },
  });
  public success(message: string): void {
    this.notify.success(message);
  }
  public error(error: any): void {
    const errorMessage = this.extractErrorMessage(error);
    this.notify.error(errorMessage);
  }
  private extractErrorMessage(e: any): string {
    if (typeof e === "string") return e;
    if (typeof e.response?.data.message === "string")
      return e.response.data.message;
    if (typeof e.response?.data === "string") return e.response.data;
    if (Array.isArray(e.response?.data)) return e.response.data[0];
    if (typeof e.message === "string") return e.message;
    return "ERROR";
  }
}
const notificationService = new NotificationService();
export default notificationService;
