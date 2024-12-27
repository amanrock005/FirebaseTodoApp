export class Todo {
  constructor(title, description, status = "pending") {
    this.title = title;
    this.description = description;

    // Validate the status value
    const validStatuses = ["pending", "in progress", "completed"];
    if (!validStatuses.includes(status)) {
      throw new Error("Invalid status value");
    }

    this.status = status;
    this.createdAt = new Date();
  }
}
