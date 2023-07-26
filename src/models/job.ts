export class CompletionJob {
  taskId: string;
  startDate: Date;
  endDate: Date;
  xp: number;

  constructor(taskId: string, startDate: Date, endDate: Date, xp: number,) {
    this.taskId = taskId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.xp = xp;
  }
  durationInSeconds() {
    var milEndDate: number = this.endDate.valueOf();
    var milStartDate: number = this.startDate.valueOf();
    var diffInSeconds = (milEndDate - milStartDate) / 1000
    if (diffInSeconds < 0) { diffInSeconds = -diffInSeconds }
    return diffInSeconds;
  }

  timeLeft(date : Date) {
    var time = (this.endDate.getTime() - date.getTime())  / 1000
    return time < 0 ? 0 : time;

  }

  /// duration in seconds, ok?
  static create(taskId: string, duration: number, xp: number,) {
    let currentDate = new Date();
    let endDate = new Date();
    endDate.setSeconds(endDate.getSeconds() + duration)

    return new CompletionJob(taskId, currentDate, endDate, xp);
  }
}